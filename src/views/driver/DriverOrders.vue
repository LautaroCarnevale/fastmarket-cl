<template>
    <section class="min-h-screen py-8">
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-4xl font-bold text-grisOscuro mb-2">Mis Entregas</h1>
                <p class="text-grisMedio">Gestiona tus entregas disponibles y en curso</p>
            </div>

            <div class="bg-blanco px-4 py-2 rounded-lg border border-grisMedio/20">
                <p class="text-xs text-grisMedio">Disponibles</p>
                <p class="text-2xl font-bold text-naranjaMedio">{{ availableOrdersCount }}</p>
            </div>
        </div>

        <div class="mb-6 flex flex-wrap gap-3">
            <button v-for="status in orderStatuses"
                    :key="status.id"
                    @click="filterStatus = status.id"
                    :class="filterStatus === status.id ? 'bg-naranjaMedio text-blanco' : 'bg-blanco text-grisOscuro border border-grisMedio/30'"
                    class="px-4 py-2 rounded-full text-sm font-medium">
                {{ status.label }}
                <span v-if="getStatusCount(status.id) > 0"
                      class="ml-2 px-2 py-0.5 bg-grisMedio/20 rounded-full text-xs">
                    {{ getStatusCount(status.id) }}
                </span>
            </button>
        </div>

        <div v-if="loading"
             class="text-center py-20">
            <span class="icon-[lucide--loader-2] w-12 h-12 animate-spin text-naranjaMedio mx-auto"></span>
            <p class="text-grisMedio mt-4">Cargando entregas...</p>
        </div>

        <div v-else-if="!orders || orders.length === 0"
             class="text-center py-20">
            <span class="icon-[lucide--package] w-20 h-20 text-grisMedio mx-auto mb-4"></span>
            <h3 class="text-xl font-bold text-grisOscuro mb-2">No hay entregas</h3>
        </div>

        <div v-else
             class="space-y-4">
            <div v-for="order in filteredOrders"
                 :key="order.id"
                 class="bg-blanco rounded-lg border-2 p-4"
                 :class="getBorderColor(order.status)">

                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="text-xs text-grisMedio">Pedido #{{ order.id.slice(-8) }}</p>
                        <p class="font-bold text-grisOscuro">{{ order.vendorId.slice(-8) }}</p>
                        <p class="text-xs text-grisMedio">{{ formatDate(order.createdAt) }}</p>
                    </div>

                    <div class="text-right">
                        <p class="text-xs text-grisMedio">Pago a recibir</p>
                        <p class="text-2xl font-bold text-naranjaMedio">${{ calculateDeliveryFee(order) }}</p>
                        <span :class="getStatusColor(order.status)"
                              class="text-xs px-2 py-1 rounded-full">
                            {{ getStatusLabel(order.status) }}
                        </span>
                    </div>
                </div>

                <div class="mb-4 space-y-3">
                    <div class="flex items-start gap-2">
                        <span class="icon-[lucide--store] w-4 h-4 mt-1 text-orange-500"></span>
                        <div>
                            <p class="text-sm font-medium text-grisOscuro">Recolectar en:</p>
                            <p class="text-sm text-grisMedio">Vendor: {{ order.vendorId.slice(-8) }}</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-2">
                        <span class="icon-[lucide--map-pin] w-4 h-4 mt-1 text-green-500"></span>
                        <div>
                            <p class="text-sm font-medium text-grisOscuro">Entregar en:</p>
                            <p class="text-sm text-grisMedio">
                                {{ order.deliveryAddress.street }}, {{ order.deliveryAddress.city }}, {{
                                    order.deliveryAddress.province }}
                            </p>
                            <p v-if="order.deliveryAddress.extra"
                               class="text-xs text-grisMedio">
                                Ref: {{ order.deliveryAddress.extra }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mb-4 p-3 bg-grisClaro rounded-lg">
                    <p class="text-sm font-medium text-grisOscuro mb-2">Productos ({{ order.items.length }})</p>
                    <div class="space-y-1">
                        <p v-for="item in order.items"
                           :key="item.productId"
                           class="text-sm text-grisMedio">
                            {{ item.quantity }}x {{ item.productName }}
                        </p>
                    </div>
                    <p class="text-sm font-bold text-grisOscuro mt-2">
                        Total: ${{ calculateOrderTotal(order.items) }}
                    </p>
                </div>

                <div class="flex gap-2">
                    <button v-if="order.status === 'ready_for_pickup' && !order.driverId"
                            @click="acceptDelivery(order.id)"
                            class="flex-1 bg-verdeOk text-blanco px-4 py-2 rounded-md">
                        Aceptar entrega
                    </button>

                    <button v-if="order.status === 'ready_for_pickup' && order.driverId === user.id"
                            @click="cambiarEstado(order.id, 'picked_up')"
                            class="flex-1 bg-blue-500 text-blanco px-4 py-2 rounded-md">
                        Recolectado
                    </button>

                    <button v-if="order.status === 'picked_up'"
                            @click="cambiarEstado(order.id, 'on_the_way')"
                            class="flex-1 bg-purple-500 text-blanco px-4 py-2 rounded-md">
                        En camino
                    </button>

                    <button v-if="order.status === 'on_the_way'"
                            @click="cambiarEstado(order.id, 'delivered')"
                            class="flex-1 bg-verdeOk text-blanco px-4 py-2 rounded-md">
                        Entregado
                    </button>

                    <button class="bg-blanco border border-grisMedio/30 text-grisOscuro px-4 py-2 rounded-md">
                        <span class="icon-[lucide--map] w-4 h-4"></span>
                    </button>

                    <button class="bg-blanco border border-grisMedio/30 text-grisOscuro px-4 py-2 rounded-md">
                        <span class="icon-[lucide--phone] w-4 h-4"></span>
                    </button>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrders } from '../../composables/useOrders'
import { useAuth } from '../../composables/useAuth'
import { useDriver } from '../../composables/useDriver'

const { loading: ordersLoading, updateOrderStatus } = useOrders()
const { orders, } = useDriver()
const { user } = useAuth()

const loading = ref(ordersLoading.value)
const filterStatus = ref('all')

watch(ordersLoading, (newVal) => loading.value = newVal)

const orderStatuses = [
    { id: 'all', label: 'Todos' },
    { id: 'ready_for_pickup', label: 'Disponibles' },
    { id: 'picked_up', label: 'Recolectados' },
    { id: 'on_the_way', label: 'En camino' },
    { id: 'delivered', label: 'Entregados' }
]

const filteredOrders = computed(() => {
    if (!orders.value || !Array.isArray(orders.value)) return []
    let filtered = orders.value.filter(o =>
        ['ready_for_pickup', 'picked_up', 'on_the_way', 'delivered'].includes(o.status)
    )

    if (filterStatus.value !== 'all') {
        filtered = filtered.filter(o => o.status === filterStatus.value)
    }

    return filtered
})

const availableOrdersCount = computed(() => {
    if (!orders.value || !Array.isArray(orders.value)) return 0
    return orders.value.filter(o => o.status === 'ready_for_pickup' && !o.driverId).length
})

const getStatusCount = (statusId) => {
    if (!orders.value || !Array.isArray(orders.value) || statusId === 'all') return 0
    return orders.value.filter(o => o.status === statusId).length
}

const calculateOrderTotal = (items) => items.reduce((sum, item) => sum + (item.unitPrice.amount * item.quantity), 0).toFixed(2)

const calculateDeliveryFee = (order) => {
    return order.payment?.deliveryFee?.amount || 300
}

const formatDate = (date) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(date))
}

const getBorderColor = (status) => {
    if (status === 'ready_for_pickup') return 'border-yellow-400'
    if (status === 'picked_up') return 'border-blue-400'
    if (status === 'on_the_way') return 'border-purple-400'
    if (status === 'delivered') return 'border-green-400'
    return 'border-grisMedio/20'
}

const getStatusColor = (status) => {
    const colors = {
        ready_for_pickup: 'bg-yellow-100 text-yellow-700',
        picked_up: 'bg-blue-100 text-blue-700',
        on_the_way: 'bg-purple-100 text-purple-700',
        delivered: 'bg-green-100 text-green-700'
    }
    return colors[status] || 'bg-grisMedio/20 text-grisMedio'
}

const getStatusLabel = (status) => {
    const labels = {
        ready_for_pickup: 'Listo para recoger',
        picked_up: 'Recolectado',
        on_the_way: 'En camino',
        delivered: 'Entregado'
    }
    return labels[status] || status
}

const acceptDelivery = async (orderId) => {
    try {
        await updateOrderStatus(orderId, {
            status: 'picked_up',
            driverId: user.value.id
        })
    } catch (error) {
        console.error('Error:', error)
    }
}

const cambiarEstado = async (orderId, newStatus) => {
    try {
        await updateOrderStatus(orderId, { status: newStatus })
    } catch (error) {
        console.error('Error:', error)
    }
}
</script>
