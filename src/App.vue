<template>
  <component :is="layout">
    <RouterView v-if="routeReady" />
  </component>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, RouterView } from 'vue-router' 

// --- Layouts ---
import DefaultLayout from './components/layout/DefaultLayout.vue'
import AuthLayout from './components/layout/AuthLayout.vue'
import DashboardLayout from './components/layout/DashboardLayout.vue'

const route = useRoute()
const routeReady = ref(false)

onMounted(() => {
  routeReady.value = true
})

// Determina el layout de forma segura
const layout = computed(() => {
  const layoutType = route?.meta?.layout

  switch (layoutType) {
    case 'auth':
      return AuthLayout
    case 'dashboard':
      return DashboardLayout
    default:
      return DefaultLayout
  }
})
</script>


