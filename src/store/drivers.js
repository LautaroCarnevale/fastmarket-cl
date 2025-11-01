import { defineStore } from 'pinia'
import axios from '../api/drivers'

export const useDriversStore = defineStore('drivers', {
  state: () => ({
    drivers: [],
    activeDriver: null,
    assignedOrders: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAvailableOrders() {
      try {
        this.loading = true
        const res = await axios.get('/drivers/orders/available')
        this.assignedOrders = res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al obtener pedidos disponibles'
      } finally {
        this.loading = false
      }
    },

    async acceptOrder(orderId) {
      try {
        await axios.post(`/drivers/orders/${orderId}/accept`)
      } catch (err) {
        this.error = 'Error al aceptar pedido'
      }
    },

    async completeOrder(orderId) {
      try {
        await axios.post(`/drivers/orders/${orderId}/complete`)
      } catch (err) {
        this.error = 'Error al completar pedido'
      }
    }
  }
})
