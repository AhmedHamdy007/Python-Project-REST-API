<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Products</h1>
      
      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4">
        <select v-model="selectedCategory" @change="fetchProducts" class="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        
        <div class="flex gap-2">
          <input
            v-model="minPrice"
            type="number"
            placeholder="Min Price"
            class="px-4 py-2 border border-gray-300 rounded-lg w-32"
          >
          <input
            v-model="maxPrice"
            type="number"
            placeholder="Max Price"
            class="px-4 py-2 border border-gray-300 rounded-lg w-32"
          >
          <button @click="applyPriceFilter" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading products...</p>
    </div>

    <!-- Products Grid -->
    <div v-else-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <!-- No Products -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600 text-lg">No products found.</p>
      <router-link to="/" class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Back to Home
      </router-link>
    </div>

    <!-- Pagination -->
    <div v-if="products.length > 0" class="mt-12 flex justify-center">
      <div class="flex space-x-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span class="px-4 py-2 bg-blue-600 text-white rounded-lg">{{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="products.length < limit"
          class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  setup() {
    const route = useRoute()
    const products = ref([])
    const categories = ref([])
    const loading = ref(false)
    const selectedCategory = ref('')
    const minPrice = ref('')
    const maxPrice = ref('')
    const currentPage = ref(1)
    const limit = 20

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories')
        categories.value = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const fetchProducts = async () => {
      loading.value = true
      try {
        const params = {
          skip: (currentPage.value - 1) * limit,
          limit: limit
        }

        if (selectedCategory.value) {
          params.category_id = selectedCategory.value
        }

        if (route.query.search) {
          params.search = route.query.search
        }

        if (minPrice.value) {
          params.min_price = minPrice.value
        }

        if (maxPrice.value) {
          params.max_price = maxPrice.value
        }

        const response = await api.get('/products', { params })
        products.value = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
        products.value = []
      } finally {
        loading.value = false
      }
    }

    const applyPriceFilter = () => {
      currentPage.value = 1
      fetchProducts()
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
        fetchProducts()
      }
    }

    const nextPage = () => {
      currentPage.value++
      fetchProducts()
    }

    // Watch for route changes (search queries)
    watch(() => route.query, () => {
      currentPage.value = 1
      fetchProducts()
    })

    onMounted(() => {
      fetchCategories()
      fetchProducts()
    })

    return {
      products,
      categories,
      loading,
      selectedCategory,
      minPrice,
      maxPrice,
      currentPage,
      limit,
      fetchProducts,
      applyPriceFilter,
      previousPage,
      nextPage
    }
  }
}
</script>
