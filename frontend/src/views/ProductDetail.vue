<template>
  <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading product...</p>
    </div>
  </div>

  <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Product Image -->
      <div class="aspect-square">
        <img 
          :src="product.image_url || '/placeholder.svg?height=500&width=500'" 
          :alt="product.title"
          class="w-full h-full object-cover rounded-lg shadow-lg"
        >
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ product.title }}</h1>
          <p class="text-2xl font-bold text-blue-600 mt-2">${{ product.price }}</p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p class="text-gray-600 leading-relaxed">{{ product.description || 'No description available.' }}</p>
        </div>

        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500">Stock:</span>
          <span :class="product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'" class="font-semibold">
            {{ product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock' }}
          </span>
        </div>

        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500">SKU:</span>
          <span class="text-gray-900">{{ product.sku || 'N/A' }}</span>
        </div>

        <!-- Quantity Selector -->
        <div class="flex items-center space-x-4">
          <label for="quantity" class="text-sm font-medium text-gray-700">Quantity:</label>
          <select 
            id="quantity" 
            v-model="selectedQuantity" 
            :disabled="product.stock_quantity === 0"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="n in Math.min(10, product.stock_quantity)" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4">
          <button 
            @click="addToCart"
            :disabled="product.stock_quantity === 0"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {{ product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
          
          <button 
            @click="buyNow"
            :disabled="product.stock_quantity === 0"
            class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Buy Now
          </button>
        </div>

        <!-- Seller Info -->
        <div class="border-t pt-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Seller Information</h3>
          <p class="text-gray-600">Seller ID: {{ product.seller_id }}</p>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      <div class="bg-gray-50 rounded-lg p-6 text-center">
        <p class="text-gray-600">No reviews yet. Be the first to review this product!</p>
      </div>
    </div>

    <!-- Related Products -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
      <div v-if="relatedProducts.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct" />
      </div>
      <div v-else class="bg-gray-50 rounded-lg p-6 text-center">
        <p class="text-gray-600">No related products found.</p>
      </div>
    </div>
  </div>

  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center py-12">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <p class="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <router-link to="/products" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Browse Products
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api'

export default {
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const cartStore = useCartStore()
    
    const product = ref(null)
    const relatedProducts = ref([])
    const loading = ref(false)
    const selectedQuantity = ref(1)

    const fetchProduct = async () => {
      loading.value = true
      try {
        const response = await api.get(`/products/${route.params.id}`)
        product.value = response.data
        
        // Fetch related products from the same category
        if (product.value.category_id) {
          fetchRelatedProducts()
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        product.value = null
      } finally {
        loading.value = false
      }
    }

    const fetchRelatedProducts = async () => {
      try {
        const response = await api.get('/products', {
          params: {
            category_id: product.value.category_id,
            limit: 4
          }
        })
        // Filter out the current product
        relatedProducts.value = response.data.filter(p => p.id !== product.value.id)
      } catch (error) {
        console.error('Error fetching related products:', error)
      }
    }

    const addToCart = () => {
      if (product.value && product.value.stock_quantity > 0) {
        cartStore.addToCart(product.value, selectedQuantity.value)
        // You could add a toast notification here
        alert(`Added ${selectedQuantity.value} item(s) to cart!`)
      }
    }

    const buyNow = () => {
      if (product.value && product.value.stock_quantity > 0) {
        cartStore.addToCart(product.value, selectedQuantity.value)
        router.push('/checkout')
      }
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      product,
      relatedProducts,
      loading,
      selectedQuantity,
      addToCart,
      buyNow
    }
  }
}
</script>
