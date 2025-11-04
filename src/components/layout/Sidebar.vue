<template>
	<aside class="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col justify-between">
		<div>
			<h2 class="text-lg font-semibold text-gray-700 mb-4">
				{{ panelTitle }}
			</h2>

			<nav class="flex flex-col gap-2">
				<RouterLink v-for="link in filteredLinks"
							:key="link.to"
							:to="link.to"
							class="px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
							active-class="bg-blue-100 text-blue-700 font-semibold">
					{{ link.label }}
				</RouterLink>
			</nav>
		</div>

		<button @click="logout"
				class="mt-4 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition">
			Cerrar sesión
		</button>
	</aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()

const logout = () => auth.logout()

// 🔹 Links generales de cada rol
const roleLinks = {
	admin: [
		{ label: 'Dashboard', to: '/admin/panel' },
		{ label: 'Vendors', to: '/admin/panel/vendors' },
		{ label: 'Drivers', to: '/admin/panel/drivers' },
		{ label: 'Usuarios', to: '/admin/panel/users' },
		{ label: 'Reportes', to: '/admin/panel/reports' },
		{ label: 'Configuración', to: '/admin/panel/settings' },
	],
	vendor: [
		{ label: 'Dashboard', to: '/vendor/panel' },
		{ label: 'Pedidos', to: '/vendor/panel/orders' },
		{ label: 'Menú', to: '/vendor/panel/menu' },
		{ label: 'Promociones', to: '/vendor/panel/promotions' },
		{ label: 'Ventas', to: '/vendor/panel/sales' },
	],
	driver: [
		{ label: 'Dashboard', to: '/driver/panel' },
		{ label: 'Pedidos disponibles', to: '/driver/panel/available' },
		{ label: 'Mis entregas', to: '/driver/panel/deliveries' },
		{ label: 'Ganancias', to: '/driver/panel/earnings' },
		{ label: 'Perfil', to: '/driver/panel/profile' },
	],
}

// 🔹 Determinar rol y links visibles
const userRole = computed(() => {
	return auth.user?.roles?.find((r) => ['admin', 'vendor', 'driver'].includes(r))
})

const filteredLinks = computed(() => {
	return roleLinks[userRole.value] || []
})

const panelTitle = computed(() => {
	switch (userRole.value) {
		case 'admin':
			return 'Panel de Administrador'
		case 'vendor':
			return 'Panel de Comercio'
		case 'driver':
			return 'Panel de Repartidor'
		default:
			return 'Panel'
	}
})
</script>
