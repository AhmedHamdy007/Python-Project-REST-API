<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading orders...</p>
    </div>
    
    <div v-else-if="orders.length === 0" class="text-center py-12">
      <p class="text-gray-600 text-lg mb-4">You haven't placed any orders yet.</p>
      <router-link to="/products" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Start Shopping
      </router-link>
    </div>
    
    <div v-else class="space-y-6">
      <div v-for="order in orders" :key="order.id" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Order #{{ order.order_number }}</h3>
              <p class="text-sm text-gray-600">Placed on {{ formatDate(order.created_at) }}</p>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-gray-900">${{ order.total_amount }}</p>
              <span :class="getStatusColor(order.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4">
          <div class="space-y-3">
            <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-4">
              <div class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md"></div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">Product ID: {{ item.product_id }}</p>
                <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                <p class="text-sm text-gray-600">Price: ${{ item.price }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Shipping Address:</p>
                <p class="text-sm text-gray-900">{{ order.shipping_address }}</p>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="viewOrderDetails(order.id)"
                  class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  View Details
                </button>
                <button 
                  v-if="order.status === 'pending'"
                  @click="cancelOrder(order.id)"
                  class="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export default {
  name: 'Orders',
  setup() {
    const router = useRouter()
    const orders = ref([])
    const loading = ref(false)

    const fetchOrders = async () => {
      loading.value = true
      try {
        const response = await api.get('/orders')
        orders.value = response.data
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const getStatusColor = (status) => {
      const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const viewOrderDetails = (orderId) => {
      // Navigate to order details page
      router.push(`/orders/${orderId}`)
    }

    const cancelOrder = async (orderId) => {
      if (confirm('Are you sure you want to cancel this order?')) {
        try {
          await api.put(`/orders/${orderId}/status`, { status: 'cancelled' })
          await fetchOrders() // Refresh orders
        } catch (error) {
          console.error('Error cancelling order:', error)
          alert('Failed to cancel order')
        }
      }
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      orders,
      loading,
      formatDate,
      getStatusColor,
      viewOrderDetails,
      cancelOrder
    }
  }
}
</script>
