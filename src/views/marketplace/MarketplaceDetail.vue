<template>
  <div class="min-h-screen bg-gray-100">
    <div v-if="loading" class="text-center py-20">
      <span
        class="icon-[lucide--loader-2] w-12 h-12 animate-spin text-orange-600 mx-auto"
      ></span>
      <p class="text-gray-500 mt-4">Cargando restaurante...</p>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <span
        class="icon-[lucide--alert-circle] w-16 h-16 text-red-500 mx-auto mb-4"
      ></span>
      <h3 class="text-2xl font-semibold text-gray-800 mb-2">Error al cargar</h3>
      <p class="text-gray-500 mb-6">{{ error }}</p>

      <RouterLink
        to="/marketplace"
        class="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition"
      >
        <span class="icon-[lucide--arrow-left] w-5 h-5"></span>
        Volver al marketplace
      </RouterLink>
    </div>

    <div v-else-if="vendor">
      <div class="relative h-72 md:h-96">
        <img
          :src="vendor.image || defaultRest"
          :alt="vendor.displayName"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        ></div>

        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div class="container mx-auto">
            <h1 class="text-5xl font-extrabold drop-shadow mb-2">
              {{ vendor.displayName }}
            </h1>
            <p class="text-lg opacity-90 mb-3">{{ vendor.description }}</p>

            <div class="flex items-center flex-wrap gap-6 text-sm opacity-90">
              <span class="flex items-center gap-1">
                <span
                  class="icon-[lucide--star] w-4 h-4 text-yellow-400"
                ></span>
                {{ vendor.rating?.average?.toFixed(1) || 0 }}
                ({{ vendor.rating?.count || 0 }} reseñas)
              </span>

              <span class="flex items-center gap-1">
                <span class="icon-[lucide--map-pin] w-4 h-4"></span>
                {{ vendor.address?.city }}, {{ vendor.address?.province }}
              </span>

              <span class="flex items-center gap-1">
                <span class="icon-[lucide--clock] w-4 h-4"></span>
                {{ vendor.hours?.[0]?.open }} - {{ vendor.hours?.[0]?.close }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-10">
        <div class="grid lg:grid-cols-3 gap-10">
          <div v-if="vendor.categories?.length === 0" class="lg:col-span-2">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Productos</h2>

            <div class="space-y-5">
              <div
                v-for="product in productsByCategory(null)"
                :key="product.id"
                class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition"
              >
                <div class="flex gap-5">
                  <img
                    :src="product.images?.[0] || defaultRest"
                    :alt="product.name"
                    class="w-28 h-28 object-cover rounded-xl"
                  />

                  <div class="flex-1">
                    <h3 class="font-bold text-xl text-gray-800 mb-1">
                      {{ product.name }}
                    </h3>
                    <p class="text-sm text-gray-500 mb-3">
                      {{ product.description }}
                    </p>

                    <div class="flex items-center justify-between">
                      <span class="text-2xl font-extrabold text-orange-600">
                        ${{ product.price.amount }}
                      </span>

                      <div v-if="getItemQuantity(product.id) === 0">
                        <button
                          @click="addToCart(product)"
                          class="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-700 transition"
                        >
                          <span class="icon-[lucide--plus] w-4 h-4"></span>
                          Agregar
                        </button>
                      </div>

                      <div v-else class="flex items-center gap-3">
                        <button
                          @click="removeFromCart(product.id)"
                          class="border border-gray-300 px-3 py-1.5 rounded-xl hover:bg-gray-100"
                        >
                          <span class="icon-[lucide--minus] w-4 h-4"></span>
                        </button>

                        <span class="font-bold text-lg w-8 text-center">
                          {{ getItemQuantity(product.id) }}
                        </span>

                        <button
                          @click="addToCart(product)"
                          class="border border-orange-600 text-orange-600 px-3 py-1.5 rounded-xl hover:bg-orange-50"
                        >
                          <span class="icon-[lucide--plus] w-4 h-4"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="lg:col-span-2">
            <div
              v-for="category in vendor.categories"
              :key="category.id"
              class="mb-10"
            >
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                {{ category.name }}
              </h2>

              <div class="space-y-5">
                <div
                  v-for="product in productsByCategory(category.id)"
                  :key="product.id"
                  class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition"
                >
                  <div class="flex gap-5">
                    <img
                      :src="product.images?.[0] || defaultRest"
                      :alt="product.name"
                      class="w-28 h-28 object-cover rounded-xl"
                    />

                    <div class="flex-1">
                      <h3 class="font-bold text-xl text-gray-800 mb-1">
                        {{ product.name }}
                      </h3>
                      <p class="text-sm text-gray-500 mb-3">
                        {{ product.description }}
                      </p>

                      <div class="flex items-center justify-between">
                        <span class="text-2xl font-extrabold text-orange-600">
                          ${{ product.price.amount }}
                        </span>

                        <div v-if="getItemQuantity(product.id) === 0">
                          <button
                            @click="addToCart(product)"
                            class="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-700 transition"
                          >
                            <span class="icon-[lucide--plus] w-4 h-4"></span>
                            Agregar
                          </button>
                        </div>

                        <div v-else class="flex items-center gap-3">
                          <button
                            @click="removeFromCart(product.id)"
                            class="border border-gray-300 px-3 py-1.5 rounded-xl hover:bg-gray-100"
                          >
                            <span class="icon-[lucide--minus] w-4 h-4"></span>
                          </button>

                          <span class="font-bold text-lg w-8 text-center">
                            {{ getItemQuantity(product.id) }}
                          </span>

                          <button
                            @click="addToCart(product)"
                            class="border border-orange-600 text-orange-600 px-3 py-1.5 rounded-xl hover:bg-orange-50"
                          >
                            <span class="icon-[lucide--plus] w-4 h-4"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div
              class="sticky top-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                <span class="icon-[lucide--shopping-cart] w-6 h-6"></span>
                Tu pedido
              </h2>

              <div
                v-if="cart.length === 0"
                class="text-gray-500 text-center py-10"
              >
                Tu carrito está vacío
              </div>

              <div v-else>
                <div class="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                  <div
                    v-for="item in cart"
                    :key="item.id"
                    class="flex justify-between items-start gap-2"
                  >
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-sm truncate">
                        {{ item.name }}
                      </p>
                      <p class="text-xs text-gray-500">x{{ item.quantity }}</p>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm whitespace-nowrap">
                        ${{ (item.price.amount * item.quantity).toFixed(2) }}
                      </span>

                      <button
                        @click="removeItemFromCart(item.id)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <span class="icon-[lucide--x] w-4 h-4"></span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="border-t pt-4 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${{ cartTotal.toFixed(2) }}</span>
                  </div>

                  <div class="flex justify-between text-sm">
                    <span>Envío</span>
                    <span>$300</span>
                  </div>

                  <div
                    class="flex justify-between font-bold text-xl pt-3 border-t border-gray-200"
                  >
                    <span>Total</span>
                    <span>${{ (cartTotal + 300).toFixed(2) }}</span>
                  </div>
                </div>

                <button
                  @click="goToCheckout"
                  class="w-full mt-6 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
                >
                  Ir al checkout ({{ cartItemsCount }})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-20">
      <span
        class="icon-[lucide--store] w-16 h-16 mx-auto mb-4 opacity-50"
      ></span>
      <p>No se ha seleccionado ningún restaurante.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVendor } from "../../composables/useVendor";
import defaultRest from "../../assets/images/defaultRest.jpg";
import { useProduct } from "../../composables/useProducts";

const route = useRoute();
const router = useRouter();

const {
  selectedVendor: vendor,
  cart,
  cartTotal,
  cartItemsCount,
  loading,
  error,
  fetchVendorById,
  addToCart,
  removeFromCart,
  getItemQuantity,
  removeItemFromCart,
} = useVendor();

const { fetchProducts, products } = useProduct();
console.log(vendor.value);

onMounted(async () => {
  const vendorId = route.params.id;

  if (vendorId) {
    console.log(vendorId);

    await fetchVendorById(vendorId);
    await fetchProducts(vendorId);
  }
});

const productsByCategory = (categoryId) => {
  if (!products.value || products.value.length === 0) return [];

  if (!categoryId) {
    return products.value.filter((p) => p.active);
  }

  return products.value.filter((p) => p.categoryId === categoryId && p.active);
};

const goToCheckout = () => {
  router.push("/marketplace/checkout/" + vendor.value.id);
};
</script>
