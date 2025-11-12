import { defineStore } from 'pinia'
import { createOrder, getOrderById, getOrdersByCustomer } from '../api/orders'

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
                this.currentOrder = res
                return res.data
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
                console.log(res);
                
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
