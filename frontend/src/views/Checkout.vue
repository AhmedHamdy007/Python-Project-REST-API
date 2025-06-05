<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
    
    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-gray-600 text-lg mb-4">Your cart is empty.</p>
      <router-link to="/products" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Continue Shopping
      </router-link>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Order Summary -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
        
        <div class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-4">
            <img 
              :src="item.image_url || '/placeholder.svg?height=60&width=60'" 
              :alt="item.title"
              class="w-15 h-15 object-cover rounded-md"
            >
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
              <p class="text-sm text-gray-600">${{ item.price }} each</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
        </div>
        
        <div class="border-t pt-4 mt-4">
          <div class="flex justify-between text-lg font-semibold">
            <span>Total: ${{ cartStore.totalAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Checkout Form -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
        
        <form @submit.prevent="placeOrder" class="space-y-4">
          <div>
            <label for="shipping_address" class="block text-sm font-medium text-gray-700">Shipping Address</label>
            <textarea
              id="shipping_address"
              v-model="form.shipping_address"
              rows="3"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full shipping address"
            ></textarea>
          </div>
          
          <div>
            <label for="payment_method" class="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="payment_method"
              v-model="form.payment_method"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>
          </div>
          
          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Placing Order...' : `Place Order - $${cartStore.totalAmount.toFixed(2)}` }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import api from '../services/api'

export default {
  name: 'Checkout',
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    
    const form = ref({
      shipping_address: '',
      payment_method: 'credit_card'
    })
    
    const loading = ref(false)
    const error = ref('')

    const placeOrder = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const orderData = {
          items: cartStore.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity
          })),
          shipping_address: form.value.shipping_address,
          payment_method: form.value.payment_method
        }
        
        const response = await api.post('/orders', orderData)
        
        // Clear cart
        cartStore.clearCart()
        
        // Redirect to order confirmation
        router.push(`/orders/${response.data.id}`)
      } catch (err) {
        error.value = err.response?.data?.detail || 'Failed to place order'
      } finally {
        loading.value = false
      }
    }

    return {
      cartStore,
      form,
      loading,
      error,
      placeOrder
    }
  }
}
</script>
