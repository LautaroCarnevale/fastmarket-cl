<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8">

            <div class="mb-8">
                <div class="relative max-w-2xl mx-auto">
                    <span
                          class="icon-[lucide--search] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></span>
                    <input type="text"
                           placeholder="Buscar restaurantes o tiendas..."
                           v-model="searchQuery"
                           class="pl-10 w-full h-12 text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
            </div>

            <div class="mb-8">
                <h2 class="text-xl font-bold mb-4">Categorías</h2>
                <div class="flex gap-3 overflow-x-auto pb-2">
                    <button v-for="category in uniqueCategories"
                            :key="category._id"
                            @click="toggleCategory(category._id)"
                            :class="[
                                'shrink-0 px-4 py-2 rounded-full border text-sm transition-all',
                                selectedCategory === category._id
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            ]">
                        {{ category.name }}
                    </button>
                </div>
            </div>

            <div v-if="topVendors.length"
                 class="mb-8">
                <h2 class="text-xl font-bold mb-4">Destacados</h2>
                <div class="grid md:grid-cols-2 gap-4">
                    <RouterLink v-for="vendor in topVendors"
                                :key="vendor._id"
                                @click="setSelectedVendor(vendor)"
                                :to="`/marketplace/restaurantes/${vendor._id}`"
                                class="block">
                        <div
                             class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            <div class="relative h-48">
                                <img :src="vendor.image || defaultRest"
                                     :alt="vendor.displayName"
                                     class="w-full h-full object-cover" />
                                <span
                                      class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                                    ★ {{ vendor.rating.average.toFixed(1) }}
                                </span>
                            </div>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-1">{{ vendor.displayName }}</h3>
                                <p class="text-sm text-gray-500 mb-2">
                                    {{ vendor.description }}
                                </p>
                                <div class="flex items-center justify-between text-sm">
                                    <span class="flex items-center gap-1 text-gray-600">
                                        <span class="icon-[lucide--map-pin] w-4 h-4"></span>
                                        {{ vendor.address.city }}, {{ vendor.address.province }}
                                    </span>
                                    <span class="font-semibold text-gray-800">
                                        {{ vendor.products?.length || 0 }} productos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>

            <div>
                <h2 class="text-xl font-bold mb-4">Todos los restaurantes</h2>

                <div v-if="loading"
                     class="text-center py-10 text-gray-500">
                    Cargando restaurantes...
                </div>

                <div v-else-if="filteredVendors.length"
                     class="grid md:grid-cols-3 gap-6">
                    <RouterLink v-for="vendor in filteredVendors"
                                :key="vendor._id"
                                @click="setSelectedVendor(vendor)"
                                :to="`/marketplace/restaurantes/${vendor._id}`"
                                class="block">
                        <div
                             class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                            <div class="relative h-40">
                                <img :src="vendor.image || defaultRest"
                                     :alt="vendor.displayName"
                                     class="w-full h-full object-cover" />
                            </div>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-1">
                                    {{ vendor.displayName }}
                                </h3>
                                <p class="text-sm text-gray-500 mb-2">
                                    {{ vendor.description }}
                                </p>
                                <div class="flex items-center justify-between text-sm mb-2 text-gray-600">
                                    <span class="flex items-center gap-1">
                                        <span
                                              class="icon-[lucide--star] w-4 h-4 text-yellow-400 fill-yellow-400"></span>
                                        {{ vendor.rating.average.toFixed(1) }} ({{ vendor.rating.count }})
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="icon-[lucide--map-pin] w-4 h-4"></span>
                                        {{ vendor.address.city }}
                                    </span>
                                </div>
                                <div class="flex items-center justify-between text-sm text-gray-600">
                                    <span class="flex items-center gap-1">
                                        <span class="icon-[lucide--clock] w-4 h-4"></span>
                                        {{ vendor.hours?.[0]?.open }} - {{ vendor.hours?.[0]?.close }}
                                    </span>
                                    <span class="font-semibold text-blue-600 text-sm">
                                        {{ vendor.categories.length }} categorías
                                    </span>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>

                <div v-else
                     class="text-center text-gray-500 py-10">
                    No se encontraron restaurantes.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useVendor } from '../composables/useVendor'
const { vendors, setSelectedVendor, loading, searchQuery, selectedCategory } = useVendor()
import defaultRest from '../assets/images/defaultRest.jpg'

// Obtener categorías únicas de todos los vendors
const uniqueCategories = computed(() => {
    const map = new Map()
    vendors.value.forEach((v) => {
        v.categories?.forEach((cat) => map.set(cat._id, cat))
    })
    return Array.from(map.values())
})



//Filtrar vendors por búsqueda y categoría
const filteredVendors = computed(() => {
    return vendors.value.filter((v) => {
        const matchSearch = v.displayName
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        const matchCategory =
            !selectedCategory.value ||
            v.categories?.some((c) => c._id === selectedCategory.value)
        return matchSearch && matchCategory && v.active
    })
})

//Filtrar los más destacados (mejor rating)
const topVendors = computed(() =>
    vendors.value
        .filter((v) => v.rating?.average >= 4.5 && v.active)
        .slice(0, 4)
)

const toggleCategory = (id) => {
    selectedCategory.value = selectedCategory.value === id ? null : id
}
</script>
