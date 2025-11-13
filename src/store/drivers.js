import { defineStore } from 'pinia'
import {
	getDriverStats,
	getDriverOrders,
	findForDriver,
	getOrdersForReady,
	updateOrderStatus,
	getAllDrivers
} from '../api/driver'

export const useDriversStore = defineStore('drivers', {
	state: () => ({
		driver: null,
		drivers: [],
		stats: null,
		orders: [],
		loading: false,
		error: null
	}),

	getters: {
		availableOrders: (state) => {
			if (!state.orders) return []
			return state.orders.filter(o => o.status === 'ready_for_pickup' && !o.driverId)
		},
		activeOrders: (state) => {
			if (!state.orders) return []
			return state.orders.filter(o =>
				['picked_up', 'on_the_way'].includes(o.status) &&
				o.driverId === state.driver?.id
			)
		},
		completedOrders: (state) => {
			if (!state.orders) return []
			return state.orders.filter(o =>
				o.status === 'delivered' &&
				o.driverId === state.driver?.id
			)
		}
	},

	actions: {

		async fetchOrderForDriver(driverId) {
			this.loading = true
			this.error = null
			try {

				const data = await findForDriver(driverId)
				this.orders = data
				console.log(data);

			} catch (err) {
				this.error = err.message || 'Error al cargar perfil'
			} finally {
				this.loading = false
			}
		},

		async fetchOrdersForReady() {
			this.loading = true
			this.error = null
			try {
				const data = await getOrdersForReady()
				this.orders = data
			} catch (err) {
				this.error = err.message || 'Error al cargar perfil'
			} finally {
				this.loading = false
			}
		},

		async fetchDriverStats(id) {
			this.loading = true
			this.error = null
			try {
				const data = await getDriverStats(id)
				this.stats = data
			} catch (err) {
				this.error = err.message || 'Error al cargar estadísticas'
			} finally {
				this.loading = false
			}
		},

		async findAllDrivers() {
			this.loading = true
			this.error = null
			try {
				const data = await getAllDrivers()
				this.drivers = data
			} catch (err) {
				this.error = err.message || 'Error al cargar drivers'
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
		async fetchDriverOrders(driverId) {
			this.loading = true
			this.error = null
			try {
				const data = await getDriverOrders(driverId)
				this.orders = data
			} catch (err) {
				this.error = err.message || 'Error al cargar órdenes'
				this.orders = []
			} finally {
				this.loading = false
			}
		},
	}
})
