<script setup>
import { useRoute, } from 'vue-router'
import { computed, onMounted as vueOnMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useVendor } from '../../composables/useVendor'

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
const { fetchVendorByOwnerId } = useVendor()

const loadVendorIfAuthenticated = () => {
    const user = auth.user.value

    if (user?.id) {
        fetchVendorByOwnerId(user.id)
    }
}

vueOnMounted(() => {
    loadVendorIfAuthenticated()
})

</script>

<template>
    <div class="min-h-screen">
        <!-- Header -->
        <header class="flex items-center justify-between px-6 py-4">
            <h1 class="text-3xl font-semibold text-grisOscuro">
                {{ currentTitle }}
            </h1>

            <div>
                <slot name="action"></slot>
            </div>
        </header>

        <!-- Contenido dinámico -->
        <main class="p-6">
            <RouterView />
        </main>
    </div>
</template>
