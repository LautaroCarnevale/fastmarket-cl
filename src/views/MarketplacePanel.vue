<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8">
            <div class="mb-8">
                <div class="relative max-w-2xl mx-auto">
                    <span
                          class="icon-[lucide--search] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></span>
                    <input type="text"
                           placeholder="Buscar restaurantes, tiendas o productos..."
                           class="pl-10 w-full h-12 text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                           v-model="searchQuery" />
                </div>
            </div>

            <div class="mb-8">
                <h2 class="text-xl font-bold mb-4">Categorías</h2>
                <div class="flex gap-3 overflow-x-auto pb-2">
                    <button v-for="category in categories"
                            :key="category.id"
                            @click="toggleCategory(category.id)"
                            :class="[
                                'flex-shrink-0 px-4 py-2 rounded-full border text-sm transition-all',
                                selectedCategory === category.id
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            ]">
                        <span class="mr-2">{{ category.icon }}</span>
                        {{ category.name }}
                    </button>
                </div>
            </div>

            <div class="mb-8">
                <h2 class="text-xl font-bold mb-4">Destacados</h2>
                <div class="grid md:grid-cols-2 gap-4">
                    <RouterLink v-for="restaurant in promotedRestaurants"
                                :key="restaurant.id"
                                :to="`/vendors/${restaurant.id}`"
                                class="block">
                        <div
                             class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            <div class="relative h-48">
                                <img :src="restaurant.image || '/placeholder.svg'"
                                     :alt="restaurant.name"
                                     class="w-full h-full object-cover" />
                                <span
                                      class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">Destacado</span>
                            </div>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-1">{{ restaurant.name }}</h3>
                                <p class="text-sm text-gray-500 mb-2">{{ restaurant.category }}</p>
                                <div class="flex items-center justify-between text-sm">
                                    <div class="flex items-center gap-3">
                                        <span class="flex items-center gap-1">
                                            <span
                                                  class="icon-[lucide--star] w-4 h-4 text-yellow-400 fill-yellow-400"></span>
                                            {{ restaurant.rating }}
                                        </span>
                                        <span class="flex items-center gap-1">
                                            <span class="icon-[lucide--clock] w-4 h-4"></span>
                                            {{ restaurant.deliveryTime }}
                                        </span>
                                    </div>
                                    <span class="font-semibold text-gray-700">
                                        {{ restaurant.deliveryFee }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>

            <div>
                <h2 class="text-xl font-bold mb-4">Todos los restaurantes</h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <RouterLink v-for="restaurant in filteredRestaurants"
                                :key="restaurant.id"
                                :to="`/vendors/${restaurant.id}`"
                                class="block">
                        <div
                             class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                            <div class="relative h-40">
                                <img :src="restaurant.image || '/placeholder.svg'"
                                     :alt="restaurant.name"
                                     class="w-full h-full object-cover" />
                            </div>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-1">{{ restaurant.name }}</h3>
                                <p class="text-sm text-gray-500 mb-2">{{ restaurant.category }}</p>

                                <div class="flex items-center justify-between text-sm mb-2 text-gray-600">
                                    <span class="flex items-center gap-1">
                                        <span
                                              class="icon-[lucide--star] w-4 h-4 text-yellow-400 fill-yellow-400"></span>
                                        {{ restaurant.rating }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="icon-[lucide--map-pin] w-4 h-4"></span>
                                        {{ restaurant.distance }}
                                    </span>
                                </div>

                                <div class="flex items-center justify-between text-sm text-gray-600">
                                    <span class="flex items-center gap-1">
                                        <span class="icon-[lucide--clock] w-4 h-4"></span>
                                        {{ restaurant.deliveryTime }}
                                    </span>
                                    <span class="font-semibold text-blue-600">
                                        {{ restaurant.deliveryFee }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- Estados ---
const searchQuery = ref('')
const selectedCategory = ref(null)

const categories = ref([
    { id: 1, name: 'Comida rápida', icon: '🍔' },
    { id: 2, name: 'Café', icon: '☕' },
    { id: 3, name: 'Postres', icon: '🍰' },
    { id: 4, name: 'Saludable', icon: '🥗' },
])

const restaurants = ref([
    {
        id: 1,
        name: 'Burger House',
        category: 'Comida rápida',
        rating: 4.5,
        distance: '1.2 km',
        deliveryTime: '25-35 min',
        deliveryFee: '$300',
        image: '/placeholder.svg',
        promoted: true,
    },
    {
        id: 2,
        name: 'Green Bowl',
        category: 'Saludable',
        rating: 4.8,
        distance: '2.5 km',
        deliveryTime: '30-40 min',
        deliveryFee: '$250',
        image: '/placeholder.svg',
        promoted: false,
    },
    {
        id: 3,
        name: 'Sweet Dreams',
        category: 'Postres',
        rating: 4.2,
        distance: '3 km',
        deliveryTime: '20-30 min',
        deliveryFee: '$200',
        image: '/placeholder.svg',
        promoted: true,
    },
])

// --- Funciones ---
const toggleCategory = (id) => {
    selectedCategory.value = selectedCategory.value === id ? null : id
}

// --- Filtros ---
const filteredRestaurants = computed(() => {
    return restaurants.value.filter((r) => {
        const matchSearch = r.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        const matchCategory =
            !selectedCategory.value ||
            r.category ===
            categories.value.find((c) => c.id === selectedCategory.value)?.name
        return matchSearch && matchCategory
    })
})

const promotedRestaurants = computed(() =>
    filteredRestaurants.value.filter((r) => r.promoted)
)
</script>
