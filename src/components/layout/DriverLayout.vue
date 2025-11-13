<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted as vueOnMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useOrders } from '../../composables/useOrders'
import { useDriver } from '../../composables/useDriver'

const route = useRoute()

const titles = {
    DriverOrders: 'Entregas Disponibles',
    DriverMenu: 'Ganancias',
}

const currentTitle = computed(() => titles[route.name] || 'Panel del Comercio')

const { fetchOrdersForDriver } = useDriver()
const findOrdersByStatus = async () => {
    await fetchOrdersForDriver()
}

vueOnMounted(() => {
    findOrdersByStatus()
})
</script>

<template>
    <div class="min-h-screen">
        <header class="flex items-center justify-between px-6 py-4">
            <h1 v-if="route?.name !== 'DriverDashboard'"
                class="text-3xl font-semibold text-grisOscuro">
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
