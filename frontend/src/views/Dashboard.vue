<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
      <p class="text-gray-600">Manage your products and sales</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Package class="h-8 w-8 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <ShoppingCart class="h-8 w-8 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Sales</p>
            <p class="text-2xl font-bold text-gray-900">${{ stats.totalSales }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <TrendingUp class="h-8 w-8 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Star class="h-8 w-8 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Rating</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.avgRating }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div class="p-6">
        <div class="flex flex-wrap gap-4">
          <button 
            @click="showAddProductModal = true"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus class="h-4 w-4" />
            <span>Add Product</span>
          </button>
          <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <BarChart class="h-4 w-4" />
            <span>View Analytics</span>
          </button>
          <button class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Settings class="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">My Products</h2>
        <button 
          @click="fetchProducts"
          class="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
        >
          <RefreshCw class="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading products...</p>
      </div>
      
      <div v-else-if="products.length === 0" class="p-6 text-center">
        <p class="text-gray-600">No products found. Add your first product to get started!</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      :src="product.image_url || '/placeholder.svg?height=40&width=40'" 
                      :alt="product.title"
                      class="h-10 w-10 rounded-md object-cover"
                    >
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.title }}</div>
                    <div class="text-sm text-gray-500">{{ product.sku }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ product.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ product.stock_quantity }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ product.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button 
                  @click="editProduct(product)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  <Edit class="h-4 w-4" />
                </button>
                <button 
                  @click="deleteProduct(product.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div v-if="showAddProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Product</h3>
          <form @submit.prevent="addProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Title</label>
              <input v-model="newProduct.title" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea v-model="newProduct.description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Price</label>
              <input v-model="newProduct.price" type="number" step="0.01" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input v-model="newProduct.stock_quantity" type="number" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="showAddProductModal = false" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Package, ShoppingCart, TrendingUp, Star, Plus, BarChart, Settings, RefreshCw, Edit, Trash2 } from 'lucide-vue-next'
import api from '../services/api'

export default {
  name: 'Dashboard',
  components: {
    Package, ShoppingCart, TrendingUp, Star, Plus, BarChart, Settings, RefreshCw, Edit, Trash2
  },
  setup() {
    const products = ref([])
    const loading = ref(false)
    const showAddProductModal = ref(false)
    const stats = ref({
      totalProducts: 0,
      totalSales: 0,
      totalOrders: 0,
      avgRating: 4.5
    })
    
    const newProduct = ref({
      title: '',
      description: '',
      price: '',
      stock_quantity: ''
    })

    const fetchProducts = async () => {
      loading.value = true
      try {
        const response = await api.get('/products/seller/my-products')
        products.value = response.data
        stats.value.totalProducts = response.data.length
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        loading.value = false
      }
    }

    const addProduct = async () => {
      try {
        await api.post('/products', newProduct.value)
        showAddProductModal.value = false
        newProduct.value = { title: '', description: '', price: '', stock_quantity: '' }
        await fetchProducts()
      } catch (error) {
        console.error('Error adding product:', error)
        alert('Failed to add product')
      }
    }

    const editProduct = (product) => {
      // Implement edit functionality
      console.log('Edit product:', product)
    }

    const deleteProduct = async (productId) => {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await api.delete(`/products/${productId}`)
          await fetchProducts()
        } catch (error) {
          console.error('Error deleting product:', error)
          alert('Failed to delete product')
        }
      }
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      products,
      loading,
      showAddProductModal,
      stats,
      newProduct,
      fetchProducts,
      addProduct,
      editProduct,
      deleteProduct
    }
  }
}
</script>
