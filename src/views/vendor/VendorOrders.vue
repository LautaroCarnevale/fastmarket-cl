<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4 max-w-7xl">
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">Gestión de Pedidos</h1>
                    <p class="text-gray-500">Administra los pedidos de tu restaurante</p>
                </div>

                <div class="flex items-center gap-4">
                    <div class="bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500">Activos</p>
                        <p class="text-2xl font-bold text-orange-500">{{ activeOrdersCount }}</p>
                    </div>
                    <div class="bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500">Pendientes</p>
                        <p class="text-2xl font-bold text-yellow-600">{{ pendingOrdersCount }}</p>
                    </div>
                </div>
            </div>

            <div class="mb-6 flex flex-wrap gap-3">
                <button v-for="status in orderStatuses"
                        :key="status.id"
                        @click="filterStatus = status.id"
                        :class="filterStatus === status.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border border-gray-300'"
                        class="px-4 py-2 rounded-full text-sm font-medium">
                    {{ status.label }}
                    <span v-if="getStatusCount(status.id) > 0"
                          class="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">
                        {{ getStatusCount(status.id) }}
                    </span>
                </button>
            </div>

            <div v-if="loading"
                    class="text-center py-20">
                <span class="icon-[lucide--loader-2] w-12 h-12 animate-spin text-orange-500 mx-auto"></span>
                <p class="text-gray-500 mt-4">Cargando pedidos...</p>
            </div>

            <div v-else-if="!orders || orders.length === 0"
                    class="text-center py-20">
                <span class="icon-[lucide--package] w-20 h-20 text-gray-300 mx-auto mb-4"></span>
                <h3 class="text-xl font-bold text-gray-600 mb-2">No hay pedidos</h3>
            </div>

            <div v-else
                    class="space-y-4">
                <div v-for="order in filteredOrders"
                     :key="order.id"
                     class="bg-white rounded-lg border-2 p-4"
                     :class="getBorderColor(order.status)">

                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <p class="text-xs text-gray-500">Pedido #{{ order.id.slice(-8) }}</p>
                            <p class="font-bold text-gray-800">Cliente: {{ order.customerId.slice(-8) }}</p>
                            <p class="text-xs text-gray-500">{{ formatDate(order.createdAt) }}</p>
                        </div>

                        <div class="text-right">
                            <p class="text-xs text-gray-500">Total</p>
                            <p class="text-2xl font-bold">${{ calculateTotal(order.items) }}</p>
                            <span :class="getStatusColor(order.status)"
                                  class="text-xs px-2 py-1 rounded-full">
                                {{ getStatusLabel(order.status) }}
                            </span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <p class="font-semibold mb-2">Productos ({{ order.items.length }})</p>
                        <div v-for="item in order.items"
                             :key="item.productId"
                             class="flex justify-between py-2 border-b">
                            <div>
                                <span class="font-bold">{{ item.quantity }}x</span> {{ item.productName }}
                                <p class="text-xs text-gray-500">${{ item.unitPrice.amount }} c/u</p>
                            </div>
                            <p class="font-bold">${{ (item.unitPrice.amount * item.quantity).toFixed(2) }}</p>
                        </div>
                    </div>

                    <div class="mb-4 text-sm">
                        <p><strong>Dirección:</strong> {{ order.deliveryAddress.street }}, {{ order.deliveryAddress.city}}</p>
                        <p><strong>Pago:</strong> {{ getPaymentLabel(order.payment.method) }}</p>
                    </div>

                    <div class="flex gap-2">
                        <button v-if="order.status === ORDER_STATUS.PENDING"
                                @click="cambiarEstado(order.id, ORDER_STATUS.CONFIRMED)"
                                class="flex-1 bg-green-500 text-white px-4 py-2 rounded-md">
                            Aceptar
                        </button>

                        <button v-if="order.status === ORDER_STATUS.CONFIRMED"
                                @click="cambiarEstado(order.id, ORDER_STATUS.PREPARING)"
                                class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md">
                            Preparar
                        </button>

                        <button v-if="order.status === ORDER_STATUS.PREPARING"
                                @click="cambiarEstado(order.id, ORDER_STATUS.READY_FOR_PICKUP)"
                                class="flex-1 bg-purple-500 text-white px-4 py-2 rounded-md">
                            Listo
                        </button>

                        <button v-if="order.status === ORDER_STATUS.PENDING"
                                @click="cancelar(order.id)"
                                class="bg-red-500 text-white px-4 py-2 rounded-md">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrders } from '../../composables/useOrders'
import { ORDER_STATUS } from '../../constants/roles'
const { orders, loading: ordersLoading, updateOrderStatus } = useOrders()

const loading = ref(ordersLoading.value)
const filterStatus = ref('all')

watch(ordersLoading, (newVal) => loading.value = newVal)

const orderStatuses = [
    { id: 'all', label: 'Todos' },
    { id: ORDER_STATUS.PENDING, label: 'Nuevos' },
    { id: ORDER_STATUS.CONFIRMED, label: 'Confirmados' },
    { id: ORDER_STATUS.PREPARING, label: 'En preparación' },
    { id: ORDER_STATUS.READY_FOR_PICKUP, label: 'Listos' },
    { id: ORDER_STATUS.DELIVERED, label: 'Entregados' },
    { id: ORDER_STATUS.CANCELED, label: 'Cancelados' }
]

const filteredOrders = computed(() => {
    if (!orders.value) return []
    if (filterStatus.value === 'all') return orders.value
    return orders.value.filter(o => o.status === filterStatus.value)
})

const activeOrdersCount = computed(() => {
    if (!orders.value) return 0
    return orders.value.filter(o => [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED, ORDER_STATUS.PREPARING].includes(o.status)).length
})

const pendingOrdersCount = computed(() => {
    if (!orders.value) return 0
    return orders.value.filter(o => o.status === ORDER_STATUS.PENDING).length
})

const getStatusCount = (statusId) => {
    if (!orders.value || statusId === 'all') return 0
    return orders.value.filter(o => o.status === statusId).length
}

const calculateTotal = (items) => items.reduce((sum, item) => sum + (item.unitPrice.amount * item.quantity), 0).toFixed(2)

const getPaymentLabel = (method) => ({ card: 'Tarjeta', cash: 'Efectivo', other: 'Otro' }[method] || method)

const formatDate = (date) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(date))
}

const getBorderColor = (status) => {
    if (status === ORDER_STATUS.PENDING) return 'border-yellow-400'
    if (status === ORDER_STATUS.CONFIRMED) return 'border-blue-400'
    if (status === ORDER_STATUS.PREPARING) return 'border-purple-400'
    return 'border-gray-200'
}

const getStatusColor = (status) => {
    const colors = {
        [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-700',
        [ORDER_STATUS.CONFIRMED]: 'bg-blue-100 text-blue-700',
        [ORDER_STATUS.PREPARING]: 'bg-purple-100 text-purple-700',
        [ORDER_STATUS.READY_FOR_PICKUP]: 'bg-green-100 text-green-700',
        [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-700',
        [ORDER_STATUS.CANCELED]: 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
    const labels = {
        [ORDER_STATUS.PENDING]: 'Pendiente',
        [ORDER_STATUS.CONFIRMED]: 'Confirmado',
        [ORDER_STATUS.PREPARING]: 'Preparando',
        [ORDER_STATUS.READY_FOR_PICKUP]: 'Listo',
        [ORDER_STATUS.DELIVERED]: 'Entregado',
        [ORDER_STATUS.CANCELED]: 'Cancelado'
    }
    return labels[status] || status
}

const cambiarEstado = async (orderId, newStatus) => {
    try {
        await updateOrderStatus(orderId, { status: newStatus })
    } catch (error) {
        console.error('Error:', error)
    }
}

const cancelar = (orderId) => {
    if (confirm('¿Cancelar este pedido?')) {
        cambiarEstado(orderId, ORDER_STATUS.CANCELED)
    }
}
</script>
