<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../components/ui/Button.vue'

const router = useRouter()

const orders = ref([
  {
    id: '#12345',
    vendor: 'Pizza Hut',
    date: '2025-11-06',
    total: '$25.50',
    status: 'Entregado',
    items: 3
  },
  {
    id: '#12344',
    vendor: 'Burger King',
    date: '2025-11-05',
    total: '$18.20',
    status: 'Entregado',
    items: 2
  },
  {
    id: '#12343',
    vendor: 'KFC',
    date: '2025-11-03',
    total: '$32.90',
    status: 'Cancelado',
    items: 4
  }
])

const getStatusClass = (status) => {
  if (status === 'Entregado') return 'bg-green-100 text-green-700'
  if (status === 'Cancelado') return 'bg-red-100 text-red-700'
  return 'bg-yellow-100 text-yellow-700'
}

const viewOrderDetails = (orderId) => {
  router.push({ name: 'UserOrders', query: { orderId } })
}
</script>

<template>
  <div class="bg-blanco rounded-lg shadow-soft p-6">
    <h1 class="text-2xl font-bold text-grisOscuro mb-6">Últimas órdenes</h1>

    <div class="space-y-4">
      <div v-for="order in orders"
            :key="order.id"
            class="border border-grisBajo rounded-lg p-4 hover:border-naranjaMedio transition-colors">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="font-semibold text-grisOscuro">{{ order.vendor }}</h3>
            <p class="text-sm text-grisMedio">{{ order.id }} • {{ order.date }}</p>
          </div>
          <span :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            getStatusClass(order.status)
          ]">
            {{ order.status }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm text-grisMedio">
            <span>{{ order.items }} artículos</span>
            <span class="mx-2">•</span>
            <span class="font-semibold text-grisOscuro">{{ order.total }}</span>
          </div>
          <Button @click="viewOrderDetails(order.id)"
                  variant="outline"
                  size="sm">
            Ver detalles
          </Button>
        </div>
      </div>

      <div v-if="orders.length === 0"
            class="text-center py-12 text-grisMedio">
        <p>No tienes órdenes recientes</p>
        <Button @click="router.push({ name: 'UserMarketplace' })"
                variant="default"
                class="mt-4">
          Hacer un pedido
        </Button>
      </div>
    </div>
  </div>
</template>
