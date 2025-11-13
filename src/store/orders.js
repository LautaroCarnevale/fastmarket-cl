import { defineStore } from 'pinia'
import { createOrder, getOrderById, getOrdersByCustomer, getOrdersByVendor, updateOrderStatus } from '../api/orders'

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [],
        currentOrder: null,
        loading: false,
        error: null
    }),

    actions: {
        async createOrder(payload) {
            try {
                this.loading = true
                const res = await createOrder(payload)
                this.orders.push(res)
                return res
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al crear pedido'
            } finally {
                this.loading = false
            }
        },

        async fetchOrdersByUser(userId) {
            try {
                this.loading = true
                const res = await getOrdersByCustomer(userId)
                this.orders = res
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al obtener pedidos'
            } finally {
                this.loading = false
            }
        },

        async fetchOrdersByVendor(vendorId) {
            try {
                this.loading = true
                const res = await getOrdersByVendor(vendorId)
                this.orders = res
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al obtener pedidos'
            } finally {
                this.loading = false
            }
        },

   

        async updateOrderStatus(orderId, newStatus) {
            try {
                this.loading = true
                const res = await updateOrderStatus(orderId, newStatus)

                const index = this.orders.findIndex(o => o.id === orderId)
                if (index !== -1) {
                    this.orders[index] = res
                }

                return res
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al obtener pedidos'
            } finally {
                this.loading = false
            }
        },

        async fetchOrderById(id) {
            try {
                const res = await getOrderById(userId)
                this.currentOrder = res.data
            } catch (err) {
                this.error = 'No se pudo obtener el pedido'
            }
        }
    }
})
