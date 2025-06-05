<template>
  <div class="group bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-large transition-all duration-300 transform hover:-translate-y-2">
    <div class="relative overflow-hidden">
      <img 
        :src="product.image_url || '/placeholder.svg?height=250&width=300'" 
        :alt="product.title"
        class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="absolute top-4 right-4">
        <span :class="product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'" class="px-3 py-1 text-white text-xs font-semibold rounded-full">
          {{ product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {{ product.title }}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ product.description || 'No description available.' }}
      </p>
      
      <div class="flex items-center justify-between mb-4">
        <span class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ${{ product.price }}
        </span>
        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          {{ product.stock_quantity }} left
        </div>
      </div>
      
      <div class="space-y-3">
        <button 
          @click="viewProduct"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
        
        <button 
          @click="addToCart"
          :disabled="product.stock_quantity === 0"
          class="w-full border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {{ product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const cartStore = useCartStore()
    
    const viewProduct = () => {
      router.push(`/products/${props.product.id}`)
    }
    
    const addToCart = () => {
      if (props.product.stock_quantity > 0) {
        cartStore.addToCart(props.product, 1)
        // You could add a toast notification here
      }
    }
    
    return {
      viewProduct,
      addToCart
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
