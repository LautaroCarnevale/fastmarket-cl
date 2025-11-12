<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-gray-800 mb-2">
                    Mis pedidos
                </h1>
                <p class="text-gray-500">
                    Historial completo de tus órdenes
                </p>
            </div>

            <div v-if="showSuccessMessage"
                 class="mb-6 bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <span class="icon-[lucide--check-circle] w-5 h-5"></span>
                <span class="font-medium">¡Pedido realizado con éxito!</span>
            </div>

            <div class="mb-6 flex flex-wrap gap-3">
                <button v-for="status in orderStatuses"
                        :key="status.id"
                        @click="filterStatus = status.id"
                        :class="[
                            'px-4 py-2 rounded-full text-sm font-medium transition-all',
                            filterStatus === status.id
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        ]">
                    {{ status.label }}
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
                <h3 class="text-xl font-bold text-gray-600 mb-2">
                    No tienes pedidos aún
                </h3>
                <p class="text-gray-500 mb-6">
                    Explora nuestros restaurantes y haz tu primer pedido
                </p>
                <RouterLink to="/marketplace"
                            class="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
                    <span class="icon-[lucide--shopping-bag] w-5 h-5"></span>
                    Ir al marketplace
                </RouterLink>
            </div>

            <div v-else
                 class="space-y-4">
                <div v-for="order in filteredOrders"
                     :key="order.id"
                     class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                    <div
                         class="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div>
                                <p class="text-xs text-gray-500 mb-1">Pedido #{{ order.id.slice(-8) }}</p>
                                <p class="font-bold text-gray-800">
                                    Vendor ID: {{ order.vendorId.slice(-8) }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-xs text-gray-500 mb-1">Fecha</p>
                                <p class="font-medium text-sm">{{ formatDate(order.createdAt) }}</p>
                            </div>

                            <span :class="[
                                'px-3 py-1 rounded-full text-xs font-bold',
                                getStatusClass(order.status)
                            ]">
                                {{ getStatusLabel(order.status) }}
                            </span>
                        </div>
                    </div>

                    <div class="p-4">
                        <div class="space-y-3">
                            <div v-for="item in order.items"
                                 :key="item.productId"
                                 class="flex items-center gap-3">
                                <div class="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                    <span class="icon-[lucide--package] w-8 h-8 text-gray-400"></span>
                                </div>
                                <div class="flex-1">
                                    <p class="font-medium text-gray-800">
                                        {{ item.productName }}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        ${{ item.unitPrice.amount }} × {{ item.quantity }}
                                    </p>
                                </div>
                                <p class="font-bold text-orange-500">
                                    ${{ (item.unitPrice.amount * item.quantity).toFixed(2) }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                            <div class="flex-1">
                                <p class="text-sm text-gray-500">
                                    <span class="icon-[lucide--map-pin] w-4 h-4 inline-block align-text-bottom"></span>
                                    {{ order.deliveryAddress.street }}, {{ order.deliveryAddress.city }}, {{
                                        order.deliveryAddress.province }}
                                </p>
                                <p class="text-xs text-gray-400 mt-1">
                                    Método de pago: {{ getPaymentMethodLabel(order.payment.method) }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-500 mb-1">Total</p>
                                <p class="text-xl font-bold text-gray-800">
                                    ${{ calculateOrderTotal(order.items) }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-4 flex gap-2">
                            <button @click="viewOrderDetails(order.id)"
                                    class="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition">
                                <span class="icon-[lucide--eye] w-4 h-4"></span>
                                Ver detalles
                            </button>
                            <button v-if="order.status === 'delivered'"
                                    @click="reorderItems(order.id)"
                                    class="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                                <span class="icon-[lucide--repeat] w-4 h-4"></span>
                                Volver a pedir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrders } from '../composables/useOrders'

const { orders, loading: ordersLoading } = useOrders()
const route = useRoute()
const router = useRouter()

const loading = ref(ordersLoading.value)
const filterStatus = ref('all')
const showSuccessMessage = ref(false)

if (route.query.success === 'true') {
    showSuccessMessage.value = true
    setTimeout(() => {
        showSuccessMessage.value = false
        router.replace({ query: {} })
    }, 5000)
}

watch(ordersLoading, (newVal) => {
    loading.value = newVal
})

const orderStatuses = [
    { id: 'all', label: 'Todos' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'preparing', label: 'En preparación' },
    { id: 'on_the_way', label: 'En camino' },
    { id: 'delivered', label: 'Entregados' },
    { id: 'canceled', label: 'Cancelados' }
]

const filteredOrders = computed(() => {
    if (!orders.value || orders.value.length === 0) return []
    if (filterStatus.value === 'all') return orders.value

    return orders.value.filter(order => order.status === filterStatus.value)
})

const calculateOrderTotal = (items) => {
    const total = items.reduce((sum, item) => {
        return sum + (item.unitPrice.amount * item.quantity)
    }, 0)
    return total.toFixed(2)
}

const getPaymentMethodLabel = (method) => {
    const labels = {
        card: 'Tarjeta',
        cash: 'Efectivo',
        other: 'Otro'
    }
    return labels[method] || method
}

const formatDate = (date) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date))
}

const getStatusClass = (status) => {
    const classes = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-blue-100 text-blue-700',
        preparing: 'bg-blue-100 text-blue-700',
        ready_for_pickup: 'bg-purple-100 text-purple-700',
        picked_up: 'bg-purple-100 text-purple-700',
        on_the_way: 'bg-purple-100 text-purple-700',
        delivered: 'bg-green-100 text-green-700',
        canceled: 'bg-red-100 text-red-700'
    }
    return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
    const labels = {
        pending: 'Pendiente',
        confirmed: 'Confirmado',
        preparing: 'En preparación',
        ready_for_pickup: 'Listo para recoger',
        picked_up: 'Recogido',
        on_the_way: 'En camino',
        delivered: 'Entregado',
        canceled: 'Cancelado'
    }
    return labels[status] || status
}

const viewOrderDetails = (orderId) => {
    console.log('Ver detalles del pedido:', orderId)
}

const reorderItems = (orderId) => {
    const order = orders.value?.find(o => o.id === orderId)
    if (order) {
        router.push(`/marketplace/vendor/${order.vendorId}`)
    }
}
</script>
