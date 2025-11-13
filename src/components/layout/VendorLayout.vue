<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted as vueOnMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useVendor } from '../../composables/useVendor'
import { useProduct } from '../../composables/useProducts'
import { useOrders } from '../../composables/useOrders'

const route = useRoute()

const titles = {
    VendorDashboard: 'Panel del Comercio',
    VendorOrders: 'Gestión de Pedidos',
    VendorMenu: 'Gestión de Menú',
    VendorPromotions: 'Promociones y Descuentos',
    VendorSales: 'Estadísticas de Ventas',
}

const currentTitle = computed(() => titles[route.name] || 'Panel del Comercio')

const auth = useAuth()
const { fetchVendorByOwnerId, selectedVendor } = useVendor()
const { fetchProducts } = useProduct()
const { fetchOrdersByVendor } = useOrders()
const loadVendorAndProducts = async () => {
    const user = auth.user.value

    if (user?.id) {
        await fetchVendorByOwnerId(user.id)
        const vendorId = selectedVendor.value?.id

        if (vendorId) {
            await fetchProducts(vendorId)
            await fetchOrdersByVendor(vendorId)            
        }
    }
}

vueOnMounted(() => {
    loadVendorAndProducts()
})
</script>

<template>
    <div class="min-h-screen">
        <header class="flex items-center justify-between px-6 py-4">
            <h1 class="text-3xl font-semibold text-grisOscuro">
                {{ currentTitle }}
            </h1>

            <div>
                <slot name="action"></slot>
            </div>
        </header>

        <main class="p-6">
            <RouterView />
        </main>
    </div>
</template>
