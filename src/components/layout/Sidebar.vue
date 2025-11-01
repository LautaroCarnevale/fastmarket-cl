<template>
  <aside
    class="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col justify-between"
  >
    <div>
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Panel</h2>

      <nav class="flex flex-col gap-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          active-class="bg-blue-100 text-blue-700 font-semibold"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>

    <button
      @click="logout"
      class="mt-4 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition"
    >
      Cerrar sesión
    </button>
  </aside>
</template>

<script setup>
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()

const logout = () => {
  auth.logout()
}

const links = [
  { label: 'Dashboard', to: '/admin/panel' },
  { label: 'Vendors', to: '/admin/vendors' },
  { label: 'Drivers', to: '/admin/drivers' },
  { label: 'Promociones', to: '/admin/promotions' },
  { label: 'Reseñas', to: '/admin/reviews' }
]
</script>
