import { defineStore } from 'pinia'
import axios from '../api/vendors'

export const useVendorsStore = defineStore('vendors', {
  state: () => ({
    vendors: [],
    selectedVendor: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchVendors(query = '') {
      try {
        this.loading = true
        const res = await axios.get(`/vendors?search=${query}`)
        this.vendors = res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al cargar comercios'
      } finally {
        this.loading = false
      }
    },

    async fetchVendorById(id) {
      try {
        this.loading = true
        const res = await axios.get(`/vendors/${id}`)
        this.selectedVendor = res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'No se encontró el comercio'
      } finally {
        this.loading = false
      }
    }
  }
})
