<template>
    <header class="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 shadow-sm">
        <div class="flex items-center gap-4">
            <RouterLink to="/"
                        class="flex items-center gap-2">
                <img :src="logo"
                     alt="FastMarket"
                     class="w-35" />
            </RouterLink>

            <div class="h-6 w-px bg-gray-300"></div>

            <template v-if="userRole === 'user'">
                <div class="flex items-center gap-2 text-sm text-gray-700">
                    <span class="icon-[mdi--map-marker-outline] w-5 h-5 text-gray-500"></span>
                    <p class="truncate max-w-[180px]">
                        {{ userAddress || 'Selecciona tu dirección' }}
                    </p>
                </div>
                <div class="h-6 w-px bg-gray-300"></div>
            </template>

            <nav v-if="userRole !== 'user'"
                 class="flex items-center gap-1 text-sm text-gray-700 ">
                <RouterLink v-for="link in commonLinks"
                            :key="link.to"
                            :to="link.to"
                            exact-active-class="text-black font-medium bg-grisMedio/15 rounded-md"
                            class="hover:bg-grisMedio/15 hover:rounded-md transition py-2 px-4 text-md font-semibold"
                            active-class="text-black font-medium bg-grisMedio/15 rounded-md">
                    {{ link.label }}
                </RouterLink>
            </nav>
        </div>

        <div class="flex items-center gap-5 relative">
            <div class="relative ">
                <button @click="toggleUserMenu"
                        title="Mi perfil"
                        class="w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:opacity-90 transition cursor-pointer">
                    <img :src="user.avatar || DefaultAvatar"
                         alt="Perfil"
                         class="w-full h-full object-cover" />
                </button>

                <UserMenu ref="userMenuRef" />
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultAvatar from '../../assets/images/person.png'
import logo from '../../../public/images/logo.png'
import UserMenu from '../UserMenu.vue'
import { ROLES } from '../../constants/roles'
import { useAuth } from '../../composables/useAuth'

const auth = useAuth()
const userMenuRef = ref(null)
const user = auth.user
const userRole = auth.role

const userAddress = computed(() => {
    const addresses = auth.user?.addresses
    if (addresses?.length) {
        const main = addresses.find((a) => a.main) || addresses[0]
        return `${main.street}`
    }
    return null
})

const toggleUserMenu = () => {
    if (userMenuRef.value) userMenuRef.value.openMenu()
}

const commonLinks = computed(() => {
    const role = userRole.value
    if (role === ROLES.ADMIN) {
        return [
            { label: 'Comercios', to: '/admin/panel/vendors' },
            { label: 'Repartidores', to: '/admin/panel/drivers' },
            { label: 'Usuarios', to: '/admin/panel/users' },
            { label: 'Reportes', to: '/admin/panel/reports' },
            { label: 'Configuración', to: '/admin/panel/settings' },
        ]
    }
    if (role === ROLES.VENDOR_STAFF) {
        return [
            { label: 'Dashboard', to: '/vendor/panel' },
            { label: 'Menú', to: '/vendor/panel/menu' },
            { label: 'Pedidos', to: '/vendor/panel/orders' },
            { label: 'Promociones', to: '/vendor/panel/promotions' },
            { label: 'Ventas', to: '/vendor/panel/sales' },
        ]
    }
    if (role === ROLES.DRIVER) {
        return [
            { label: 'Disponibles', to: '/driver/panel/available' },
            { label: 'Mis Entregas', to: '/driver/panel/deliveries' },
            { label: 'Ganancias', to: '/driver/panel/earnings' },
            { label: 'Perfil', to: '/driver/panel/profile' },
        ]
    }
    return []
})
</script>
