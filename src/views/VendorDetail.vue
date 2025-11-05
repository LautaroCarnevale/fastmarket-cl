<template>
    <div class="min-h-screen bg-gray-50">
        <div v-if="selectedVendor"
             class="relative h-64 md:h-80">
            <img :src="selectedVendor.image || '/placeholder.svg'"
                 :alt="selectedVendor.displayName"
                 class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="container mx-auto">
                    <h1 class="text-4xl font-bold mb-2">{{ selectedVendor.displayName }}</h1>
                    <p class="text-lg mb-2">{{ selectedVendor.description }}</p>

                    <div class="flex items-center flex-wrap gap-4 text-sm">
                        <span class="flex items-center gap-1">
                            <span class="icon-[lucide--star] w-4 h-4 text-yellow-400 fill-yellow-400"></span>
                            {{ selectedVendor.rating?.average?.toFixed(1) || 0 }}
                            ({{ selectedVendor.rating?.count || 0 }} reseñas)
                        </span>
                        <span class="flex items-center gap-1">
                            <span class="icon-[lucide--map-pin] w-4 h-4"></span>
                            {{ selectedVendor.address.city }}, {{ selectedVendor.address.province }}
                        </span>
                        <span class="flex items-center gap-1">
                            <span class="icon-[lucide--clock] w-4 h-4"></span>
                            {{ selectedVendor.hours?.[0]?.open }} - {{ selectedVendor.hours?.[0]?.close }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else
             class="text-center text-gray-500 py-20">
            No se ha seleccionado ningún restaurante.
        </div>

        <div v-if="selectedVendor"
             class="container mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <div v-for="category in selectedVendor.categories"
                         :key="category._id"
                         class="mb-8">
                        <h2 class="text-2xl font-bold mb-4">{{ category.name }}</h2>

                        <div class="space-y-4">
                            <div v-for="product in productsByCategory(category.name)"
                                 :key="product._id"
                                 class="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                                <div class="flex gap-4">
                                    <img :src="product.images?.[0] || '/placeholder.svg'"
                                         :alt="product.name"
                                         class="w-24 h-24 object-cover rounded-lg" />

                                    <div class="flex-1">
                                        <h3 class="font-bold text-lg mb-1">{{ product.name }}</h3>
                                        <p class="text-sm text-gray-500 mb-2">{{ product.description }}</p>

                                        <div class="flex items-center justify-between">
                                            <span class="text-lg font-bold text-blue-600">
                                                ${{ product.price.amount }}
                                            </span>

                                            <div v-if="getItemQuantity(product._id) === 0">
                                                <button @click="addToCart(product)"
                                                        class="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition">
                                                    <span class="icon-[lucide--plus] w-4 h-4"></span>
                                                    Agregar
                                                </button>
                                            </div>
                                            <div v-else
                                                 class="flex items-center gap-2">
                                                <button @click="removeFromCart(product._id)"
                                                        class="border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-100">
                                                    <span class="icon-[lucide--minus] w-4 h-4"></span>
                                                </button>
                                                <span class="font-bold w-8 text-center">
                                                    {{ getItemQuantity(product._id) }}
                                                </span>
                                                <button @click="addToCart(product)"
                                                        class="border border-blue-500 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-50">
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

                <!-- Carrito -->
                <div class="lg:col-span-1">
                    <div class="sticky top-4 bg-white rounded-lg shadow-md border border-gray-100 p-6">
                        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                            <span class="icon-[lucide--shopping-cart] w-5 h-5"></span>
                            Tu pedido
                        </h2>

                        <div v-if="cart.length === 0"
                             class="text-gray-500 text-center py-8">
                            Tu carrito está vacío
                        </div>

                        <div v-else>
                            <div class="space-y-3 mb-4">
                                <div v-for="item in cart"
                                     :key="item._id"
                                     class="flex justify-between items-center">
                                    <div class="flex-1">
                                        <p class="font-medium">{{ item.name }}</p>
                                        <p class="text-sm text-gray-500">x{{ item.quantity }}</p>
                                    </div>
                                    <span class="font-semibold">
                                        ${{ (item.price.amount * item.quantity).toFixed(2) }}
                                    </span>
                                </div>
                            </div>

                            <div class="border-t pt-4 space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${{ cartTotal }}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>Envío</span>
                                    <span>$300</span>
                                </div>
                                <div class="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>${{ totalWithDelivery }}</span>
                                </div>
                            </div>

                            <button @click="goToCheckout"
                                    class="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition">
                                Ir al checkout ({{ cartItemsCount }})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVendor } from '../composables/useVendor'

// composable reactivo compartido
const { selectedVendor } = useVendor()
const router = useRouter()
console.log(selectedVendor);

// --- 🛒 Carrito local ---
const cart = ref([])

const addToCart = (product) => {
    const existing = cart.value.find((i) => i._id === product._id)
    if (existing) existing.quantity++
    else cart.value.push({ ...product, quantity: 1 })
}

const removeFromCart = (id) => {
    const index = cart.value.findIndex((i) => i._id === id)
    if (index !== -1) {
        if (cart.value[index].quantity > 1) cart.value[index].quantity--
        else cart.value.splice(index, 1)
    }
}

const getItemQuantity = (id) =>
    cart.value.find((i) => i._id === id)?.quantity || 0

const cartTotal = computed(() =>
    cart.value.reduce((sum, i) => sum + i.price.amount * i.quantity, 0)
)

const totalWithDelivery = computed(() => cartTotal.value + 300)
const cartItemsCount = computed(() =>
    cart.value.reduce((sum, i) => sum + i.quantity, 0)
)

const goToCheckout = () => router.push('/vendors/checkout')

// 🔹 Filtrar productos según categoría
const productsByCategory = (categoryName) => {
    if (!selectedVendor.value?.products) return []
    return selectedVendor.value.products.filter((p) => p.active)
}
</script>
