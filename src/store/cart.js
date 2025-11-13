import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], 
  }),

  getters: {
    totalItems: (state) => state.items.reduce((acc, i) => acc + i.quantity, 0),
    subtotal: (state) => state.items.reduce((acc, i) => acc + i.price * i.quantity, 0),
  },

  actions: {
    addItem(product) {
      const existing = this.items.find((p) => p.id === product.id)
      if (existing) {
        existing.quantity += product.quantity || 1
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 })
      }
    },

    removeItem(id) {
      this.items = this.items.filter((p) => p.id !== id)
    },

    updateQuantity(id, quantity) {
      const item = this.items.find((p) => p.id === id)
      if (item) item.quantity = quantity
    },

    clearCart() {
      this.items = []
    }
  }
})
