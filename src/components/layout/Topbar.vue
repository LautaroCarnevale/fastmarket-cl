<template>
    <header class="bg-white border-b border-gray-200 flex justify-between items-center px-6 py-3 shadow-sm">
        <h1 class="text-lg font-semibold text-gray-800">
            {{ pageTitle }}
        </h1>

        <div class="flex items-center gap-5">
            <RouterLink v-if="userRole === 'user'"
                        to="/vendors/cart"
                        class="relative text-gray-600 hover:text-blue-600 transition">
                <span class="icon-[mdi--cart-outline] w-6 h-6"></span>
                <span v-if="cartCount > 0"
                      class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {{ cartCount }}
                </span>
            </RouterLink>

            <div class="flex items-center gap-3">
                <img :src="user.avatar || '/default-avatar.png'"
                     alt="avatar"
                     class="w-9 h-9 rounded-full object-cover border border-gray-200" />
                <div class="text-right">
                    <p class="text-sm font-medium text-gray-800">{{ user.name }}</p>
                    <p class="text-xs text-gray-500 capitalize">{{ userRoleLabel }}</p>
                </div>
            </div>

            <button @click="logout"
                    class="text-sm text-red-600 hover:text-red-700 transition">
                <span class="icon-[lucide--log-out] w-5 h-5 bg-black"></span>
            </button>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../store/auth'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()

// Usuario logueado o invitado
const user = computed(() => auth.user || { name: 'Invitado', roles: ['guest'] })

// Rol principal
const userRole = computed(() =>
    user.value.roles?.find((r) =>
        ['user', 'vendor', 'driver', 'admin'].includes(r)
    ) || 'guest'
)

// Label legible del rol
const userRoleLabel = computed(() => {
    const labels = {
        user: 'Cliente',
        vendor: 'Comercio',
        driver: 'Repartidor',
        admin: 'Administrador',
        guest: 'Invitado',
    }
    return labels[userRole.value] || 'Invitado'
})

// Contador ficticio de carrito (puedes conectar tu store del carrito)
const cartCount = computed(() => 0)

// Logout
const logout = () => auth.logout()

// Mapa de títulos por ruta
const pageTitle = computed(() => {
    const path = route.path

    const map = {
        // --- ADMIN ---
        '/admin/panel': 'Panel de Administración',
        '/admin/panel/vendors': 'Gestión de Comercios',
        '/admin/panel/drivers': 'Gestión de Repartidores',
        '/admin/panel/users': 'Gestión de Usuarios',
        '/admin/panel/reports': 'Reportes',
        '/admin/panel/settings': 'Configuración',

        // --- VENDOR ---
        '/vendor/panel': 'Panel del Comercio',
        '/vendor/panel/orders': 'Pedidos',
        '/vendor/panel/menu': 'Menú',
        '/vendor/panel/promotions': 'Promociones',
        '/vendor/panel/sales': 'Ventas',

        // --- DRIVER ---
        '/driver/panel': 'Panel del Repartidor',
        '/driver/panel/available': 'Pedidos Disponibles',
        '/driver/panel/deliveries': 'Mis Entregas',
        '/driver/panel/earnings': 'Mis Ganancias',
        '/driver/panel/profile': 'Perfil',

        // --- USER ---
        '/vendors': 'Restaurantes',
        '/vendors/cart': 'Mi Carrito',
        '/vendors/checkout': 'Finalizar Pedido',
        '/vendors/orders': 'Mis Pedidos',
    }

    return map[path] || 'Panel'
})
</script>

<style scoped>
.icon-[mdi--cart-outline] {
    display: inline-block;
}
</style>
