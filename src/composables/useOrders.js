// composables/useOrders.js
import { computed } from 'vue'
import { useOrdersStore } from '../store/orders'
import { updateOrderStatus } from '../api/orders'

export function useOrders() {
    const ordersStore = useOrdersStore()

    const orders = computed(() => ordersStore.orders)
    const currentOrder = computed(() => ordersStore.currentOrder)
    const loading = computed(() => ordersStore.loading)
    const error = computed(() => ordersStore.error)

    const createOrder = async (orderData) => {
        return await ordersStore.createOrder(orderData)
    }

    const fetchOrdersByUser = async (userId) => {
        await ordersStore.fetchOrdersByUser(userId)
    }

    const fetchOrderById = async (id) => {
        await ordersStore.fetchOrderById(id)
    }

    
    const fetchOrdersByVendor = async (id) => {
        await ordersStore.fetchOrdersByVendor(id)
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        await ordersStore.updateOrderStatus(orderId, newStatus)
    }

    const clearError = () => {
        ordersStore.error = null
    }

    return {
        orders,
        currentOrder,
        loading,
        error,
        createOrder,
        fetchOrdersByUser,
        fetchOrderById,
        fetchOrdersByVendor,
        updateOrderStatus,
        clearError
    }
}
