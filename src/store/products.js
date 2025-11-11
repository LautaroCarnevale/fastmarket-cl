import { defineStore } from 'pinia'
import {
    getProductsByVendor,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../api/products'

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [],
        selectedProduct: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchProducts(vendorId) {
            try {
                this.loading = true
                const data = await getProductsByVendor(vendorId)                
                this.products = data
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al cargar productos'
            } finally {
                this.loading = false
            }
        },

        async fetchProductById(id) {
            try {
                this.loading = true
                const data = await getProductById(id)
                this.selectedProduct = data
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al obtener producto'
            } finally {
                this.loading = false
            }
        },

        async createProduct(data) {
            try {
                this.loading = true
                console.log(data);

                const newProduct = await createProduct(data)
                this.products.push(newProduct)
                return newProduct
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al crear producto'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateProduct(id, data) {
            try {
                this.loading = true
                const updated = await updateProduct(id, data)
                const index = this.products.findIndex((p) => p.id === id)
                if (index !== -1) this.products[index] = updated
                return updated
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al actualizar producto'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteProduct(id) {
            try {
                this.loading = true
                await deleteProduct(id)
                this.products = this.products.filter((p) => p.id !== id)
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al eliminar producto'
            } finally {
                this.loading = false
            }
        },

        setSelectedProduct(product) {
            this.selectedProduct = product
        },

        clearSelectedProduct() {
            this.selectedProduct = null
        }
    }
})
