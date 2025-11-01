<template>
    <header class="bg-white border-b border-gray-200 flex justify-between items-center px-6 py-3 shadow-sm">
        <!-- Título dinámico -->
        <h1 class="text-lg font-semibold text-gray-800">{{ pageTitle }}</h1>

        <!-- Usuario -->
        <div class="flex items-center gap-3">
            <img :src="user.avatar || '/default-avatar.png'"
                 alt="avatar"
                 class="w-9 h-9 rounded-full object-cover" />
            <div>
                <p class="text-sm font-medium text-gray-800">{{ user.name }}</p>
                <p class="text-xs text-gray-500 capitalize">{{ user.role }}</p>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../store/auth'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const user = computed(() => auth.user || { name: 'Invitado', role: 'guest' })

const route = useRoute()

// Determina título según ruta
const pageTitle = computed(() => {
    const map = {
        '/admin/panel': 'Panel de Administración',
        '/vendor/panel': 'Panel del Comercio',
        '/driver/panel': 'Panel del Repartidor'
    }
    return map[route.path] || 'Panel'
})
</script>
