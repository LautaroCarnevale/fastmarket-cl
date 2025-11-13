import { defineStore } from 'pinia'
import {
	getOrdersForDriver,
	getDriverStats,
	getDriverOrders
} from '../api/driver'

export const useDriversStore = defineStore('drivers', {
	state: () => ({
		driver: null,
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

		async fetchOrderForDrivers() {
			this.loading = true
			this.error = null
			try {
				const data = await getOrdersForDriver()
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
