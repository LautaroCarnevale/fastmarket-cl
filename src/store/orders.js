import { defineStore } from 'pinia'
import axios from '../api/orders'

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
                const res = await axios.post('/orders', payload)
                this.currentOrder = res.data
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
                const res = await axios.get(`/orders/customer/${userId}`)
                this.orders = res.data
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al obtener pedidos'
            } finally {
                this.loading = false
            }
        },

        async fetchOrderById(id) {
            try {
                const res = await axios.get(`/orders/${id}`)
                this.currentOrder = res.data
            } catch (err) {
                this.error = 'No se pudo obtener el pedido'
            }
        }
    }
})
