<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4 max-w-6xl">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-gray-800 mb-2">
                    Mis pedidos
                </h1>
                <p class="text-gray-500">
                    Historial completo de tus órdenes
                </p>
            </div>

            <!-- Mensaje de éxito -->
            <div v-if="showSuccessMessage"
                 class="mb-6 bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <span class="icon-[lucide--check-circle] w-5 h-5"></span>
                <span class="font-medium">¡Pedido realizado con éxito!</span>
            </div>

            <!-- Filtros -->
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

            <!-- Loading -->
            <div v-if="loading"
                 class="text-center py-20">
                <span class="icon-[lucide--loader-2] w-12 h-12 animate-spin text-orange-500 mx-auto"></span>
                <p class="text-gray-500 mt-4">Cargando pedidos...</p>
            </div>

            <!-- Sin pedidos -->
            <div v-else-if="filteredOrders.length === 0"
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

            <!-- Lista de pedidos -->
            <div v-else
                 class="space-y-4">
                <div v-for="order in filteredOrders"
                     :key="order.id"
                     class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                    <!-- Header del pedido -->
                    <div
                         class="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div>
                                <p class="text-xs text-gray-500 mb-1">Pedido #{{ order.id }}</p>
                                <p class="font-bold text-gray-800">
                                    {{ order.vendor.name }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-xs text-gray-500 mb-1">Fecha</p>
                                <p class="font-medium text-sm">{{ formatDate(order.date) }}</p>
                            </div>

                            <span :class="[
                                'px-3 py-1 rounded-full text-xs font-bold',
                                getStatusClass(order.status)
                            ]">
                                {{ getStatusLabel(order.status) }}
                            </span>
                        </div>
                    </div>

                    <!-- Productos -->
                    <div class="p-4">
                        <div class="space-y-3">
                            <div v-for="item in order.items"
                                 :key="item.id"
                                 class="flex items-center gap-3">
                                <img :src="item.image || '/placeholder.svg'"
                                     :alt="item.name"
                                     class="w-16 h-16 object-cover rounded-md" />
                                <div class="flex-1">
                                    <p class="font-medium text-gray-800">
                                        {{ item.name }}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        ${{ item.price }} × {{ item.quantity }}
                                    </p>
                                </div>
                                <p class="font-bold text-orange-500">
                                    ${{ (item.price * item.quantity).toFixed(2) }}
                                </p>
                            </div>
                        </div>

                        <!-- Footer del pedido -->
                        <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">
                                    <span class="icon-[lucide--map-pin] w-4 h-4 inline-block align-text-bottom"></span>
                                    {{ order.address }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-500 mb-1">Total</p>
                                <p class="text-xl font-bold text-gray-800">
                                    ${{ order.total.toFixed(2) }}
                                </p>
                            </div>
                        </div>

                        <!-- Acciones -->
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const filterStatus = ref('all')
const showSuccessMessage = ref(false)

// Mostrar mensaje de éxito si viene de checkout
if (route.query.success === 'true') {
    showSuccessMessage.value = true
    setTimeout(() => {
        showSuccessMessage.value = false
        router.replace({ query: {} })
    }, 5000)
}

// Estados de pedido
const orderStatuses = [
    { id: 'all', label: 'Todos' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'preparing', label: 'En preparación' },
    { id: 'on_route', label: 'En camino' },
    { id: 'delivered', label: 'Entregados' },
    { id: 'cancelled', label: 'Cancelados' }
]

// Datos mock (reemplazar con llamada a API)
const orders = ref([
    {
        id: '10245',
        vendor: { name: 'La Pizzería del Centro', id: 'vendor1' },
        date: new Date('2025-11-06T19:30:00'),
        status: 'delivered',
        address: 'Av. Corrientes 1234, CABA',
        items: [
            { id: '1', name: 'Pizza Muzzarella', price: 3500, quantity: 2, image: '/pizza.jpg' },
            { id: '2', name: 'Coca Cola 1.5L', price: 800, quantity: 1, image: '/coca.jpg' }
        ],
        total: 8100
    },
    {
        id: '10244',
        vendor: { name: 'Burger House', id: 'vendor2' },
        date: new Date('2025-11-05T20:15:00'),
        status: 'on_route',
        address: 'Calle Falsa 123, CABA',
        items: [
            { id: '3', name: 'Hamburguesa Completa', price: 4200, quantity: 1, image: '/burger.jpg' }
        ],
        total: 4500
    },
    {
        id: '10243',
        vendor: { name: 'Sushi Express', id: 'vendor3' },
        date: new Date('2025-11-04T21:00:00'),
        status: 'preparing',
        address: 'Av. Santa Fe 5678, CABA',
        items: [
            { id: '4', name: 'Combo Sushi 40 piezas', price: 8900, quantity: 1, image: '/sushi.jpg' }
        ],
        total: 9200
    }
])

// Filtrar pedidos
const filteredOrders = computed(() => {
    if (filterStatus.value === 'all') return orders.value
    return orders.value.filter(order => order.status === filterStatus.value)
})

// Formatear fecha
const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

// Obtener clase de estado
const getStatusClass = (status) => {
    const classes = {
        pending: 'bg-yellow-100 text-yellow-700',
        preparing: 'bg-blue-100 text-blue-700',
        on_route: 'bg-purple-100 text-purple-700',
        delivered: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
    }
    return classes[status] || 'bg-gray-100 text-gray-700'
}

// Obtener etiqueta de estado
const getStatusLabel = (status) => {
    const labels = {
        pending: 'Pendiente',
        preparing: 'En preparación',
        on_route: 'En camino',
        delivered: 'Entregado',
        cancelled: 'Cancelado'
    }
    return labels[status] || status
}

// Ver detalles del pedido
const viewOrderDetails = (orderId) => {
    console.log('Ver detalles del pedido:', orderId)
}

// Volver a pedir
const reorderItems = (orderId) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
        router.push(`/marketplace/restaurantes/${order.vendor.id}`)
    }
}

// Cargar pedidos
onMounted(async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Aquí harías: const response = await axios.get('/api/orders')
    } catch (error) {
        console.error('Error al cargar pedidos:', error)
    } finally {
        loading.value = false
    }
}
)
</script>
