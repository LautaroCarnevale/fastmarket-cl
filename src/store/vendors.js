import { defineStore } from 'pinia'
import { getVendors, getVendorById } from '../api/vendors'
export const useVendorsStore = defineStore('vendors', {
	state: () => ({
		vendors: [],
		selectedVendor: null,
		loading: false,
		error: null
	}),

	getters: {
		promotedVendors: (state) => state.vendors.filter((v) => v.promoted),
		filteredByCategory: (state) => (category) => category ? state.vendors.filter((v) => v.category === category) : state.vendors,
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
				const res = await getVendorById(id)
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
	},
})

