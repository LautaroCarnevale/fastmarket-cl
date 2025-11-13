<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'

const route = useRoute()

const titles = {
    AdminVendors: 'Gestión de Comercios',
    AdminDrivers: 'Gestión de Repartidores',
}

const currentTitle = computed(() => titles[route.name] || 'Panel del Comercio')

const { user } = useAuth()


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
