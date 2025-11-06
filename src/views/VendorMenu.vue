<template>
    <section class="min-h-screen container mx-auto px-4 py-6">
        <div v-if="selectedVendor"
             class="space-y-10">
            <div v-for="category in selectedVendor.categories"
                 :key="category.id"
                 class="border-b border-gray-200 pb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                    {{ category.name }}
                </h2>

                <ul class="space-y-2">
                    <li v-for="product in productsByCategory(category.id)"
                        :key="product.id"
                        class="p-3 bg-gray-50 rounded-md shadow-sm">
                        <div class="font-medium">{{ product.name }}</div>
                        <div class="text-sm text-gray-600">
                            {{ product.price?.amount }} {{ product.price?.currency }}
                        </div>
                    </li>
                    <li v-if="productsByCategory(category.id).length === 0"
                        class="text-gray-400 italic">
                        No hay productos disponibles en esta categoría.
                    </li>
                </ul>
            </div>
        </div>

        <div v-else
             class="text-center py-10 text-gray-400">
            Cargando comercio...
        </div>
    </section>
</template>

<script setup>
import { useVendor } from '../composables/useVendor'

const { selectedVendor } = useVendor()

// 🔹 Función que devuelve los productos de una categoría
const productsByCategory = (categoryId) => {
    if (!selectedVendor.value?.products) return []
    return selectedVendor.value.products.filter(
        (p) => p.category?.toString() === categoryId.toString() && p.active
    )
}
</script>
