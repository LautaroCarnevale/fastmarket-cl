import { defineStore } from 'pinia'
import { getVendors, getVendorById, getVendorByOwnerId } from '../api/vendors'

export const useVendorsStore = defineStore('vendors', {
	state: () => ({
		vendors: [],
		cart: [],
		selectedVendor: null,
		loading: false,
		error: null
	}),

	getters: {
		promotedVendors: (state) => state.vendors.filter((v) => v.promoted),
		filteredByCategory: (state) => (category) => category ? state.vendors.filter((v) => v.category === category) : state.vendors,
		cartTotal: (state) => state.cart.reduce((sum, item) => sum + item.price.amount * item.quantity, 0),
		cartItemsCount: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
		getItemQuantity: (state) => (productId) => {
			const item = state.cart.find(i => i.id === productId)
			return item ? item.quantity : 0
		}
	},

	actions: {
		async fetchVendors() {
			this.loading = true
			this.error = null
			try {
				const res = await getVendors()
				this.vendors = res				
			} catch (err) {
				this.error = err.message || 'Error al cargar comercios'
			} finally {
				this.loading = false
			}
		},

		async fetchVendorById(id) {
			this.loading = true
			this.error = null
			try {
				console.log(id);
				const res = await getVendorById(id)
				this.selectedVendor = res
				console.log(res);
			} catch (err) {
				this.error = err.message || 'No se encontró el comercio'
			} finally {
				this.loading = false
			}
		},

		async fetchVendorByOwnerId(id) {
			this.loading = true
			this.error = null
			try {
				const res = await getVendorByOwnerId(id)
				this.selectedVendor = res
			} catch (err) {
				this.error = err.message || 'No se encontró el comercio'
			} finally {
				this.loading = false
			}
		},

		setSelectedVendor(vendor) {
			this.selectedVendor = vendor
		},

		clearSelectedVendor() {
			this.selectedVendor = null
		},

		// --- Acciones del carrito ---
		addToCart(product) {
			const existing = this.cart.find(i => i.id === product.id)
			if (existing) {
				existing.quantity++
			} else {
				this.cart.push({
					...product,
					quantity: 1,
					vendorId: this.selectedVendor?.id,
					vendorName: this.selectedVendor?.displayName
				})
			}
		},

		removeFromCart(productId) {
			const index = this.cart.findIndex(i => i.id === productId)
			if (index !== -1) {
				if (this.cart[index].quantity > 1) {
					this.cart[index].quantity--
				} else {
					this.cart.splice(index, 1)
				}
			}
		},

		updateQuantity(productId, quantity) {
			const item = this.cart.find(i => i.id === productId)
			if (item) {
				if (quantity <= 0) {
					this.cart = this.cart.filter(i => i.id !== productId)
				} else {
					item.quantity = quantity
				}
			}
		},

		clearCart() {
			this.cart = []
		},

		removeItemFromCart(productId) {
			this.cart = this.cart.filter(i => i.id !== productId)
		}
	},
})
