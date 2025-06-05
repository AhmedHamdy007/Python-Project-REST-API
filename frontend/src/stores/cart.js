import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || [],
    isOpen: false,
  }),

  getters: {
    itemsCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...product, quantity })
      }

      this.saveToLocalStorage()
    },

    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
      this.saveToLocalStorage()
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId)
      if (item) {
        item.quantity = quantity
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          this.saveToLocalStorage()
        }
      }
    },

    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items))
    },
  },
})
