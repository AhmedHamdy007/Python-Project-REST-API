<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center animate-fade-in">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Welcome to Our
            <span class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover amazing products from sellers around the world. Buy and sell with confidence in our secure, user-friendly platform.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <router-link 
              to="/products" 
              class="group bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span class="flex items-center">
                Shop Now
                <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </router-link>
            <router-link 
              to="/register" 
              class="group border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Start Selling
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Floating elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce-slow"></div>
      <div class="absolute bottom-20 right-10 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-bounce-slow" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-bounce-slow" style="animation-delay: 2s;"></div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Marketplace?</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Experience the best online shopping with our premium features and services</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 hover:shadow-large">
            <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Secure Payments</h3>
            <p class="text-gray-600 leading-relaxed">Your transactions are protected with industry-standard security measures and encryption.</p>
          </div>
          
          <div class="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-large">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Fast Shipping</h3>
            <p class="text-gray-600 leading-relaxed">Get your orders delivered quickly with our reliable shipping partners worldwide.</p>
          </div>
          
          <div class="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:shadow-large">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
            <p class="text-gray-600 leading-relaxed">Our dedicated customer support team is always here to help you with any questions.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p class="text-xl text-gray-600">Explore our wide range of product categories</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.id" 
            @click="goToCategory(category.id)"
            class="group bg-white rounded-2xl p-8 text-center cursor-pointer hover:shadow-large transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p class="text-xl text-gray-600">Discover our most popular items</p>
        </div>
        
        <div v-if="loading" class="text-center py-12">
          <div class="loading-spinner w-12 h-12 text-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading amazing products...</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
        
        <div class="text-center mt-16">
          <router-link 
            to="/products" 
            class="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Products
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p class="text-xl text-blue-100 mb-8">Get the latest deals and product updates delivered to your inbox</p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none text-gray-900"
          >
          <button class="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  setup() {
    const router = useRouter()
    const categories = ref([
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Fashion' },
      { id: 3, name: 'Home & Garden' },
      { id: 4, name: 'Sports' },
      { id: 5, name: 'Books' },
      { id: 6, name: 'Toys' },
      { id: 7, name: 'Beauty' },
      { id: 8, name: 'Automotive' }
    ])
    const featuredProducts = ref([])
    const loading = ref(false)
    
    const fetchFeaturedProducts = async () => {
      loading.value = true
      try {
        // Mock data for now since backend might not be running
        featuredProducts.value = [
          {
            id: 1,
            title: 'Premium Wireless Headphones',
            description: 'High-quality sound with noise cancellation',
            price: 199.99,
            stock_quantity: 15,
            image_url: '/placeholder.svg?height=300&width=300'
          },
          {
            id: 2,
            title: 'Smart Fitness Watch',
            description: 'Track your health and fitness goals',
            price: 299.99,
            stock_quantity: 8,
            image_url: '/placeholder.svg?height=300&width=300'
          },
          {
            id: 3,
            title: 'Organic Coffee Beans',
            description: 'Premium organic coffee from Colombia',
            price: 24.99,
            stock_quantity: 50,
            image_url: '/placeholder.svg?height=300&width=300'
          },
          {
            id: 4,
            title: 'Minimalist Desk Lamp',
            description: 'Modern LED desk lamp with adjustable brightness',
            price: 79.99,
            stock_quantity: 12,
            image_url: '/placeholder.svg?height=300&width=300'
          }
        ]
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        loading.value = false
      }
    }
    
    const goToCategory = (categoryId) => {
      router.push({ path: '/products', query: { category_id: categoryId } })
    }
    
    onMounted(() => {
      fetchFeaturedProducts()
    })
    
    return {
      categories,
      featuredProducts,
      loading,
      goToCategory
    }
  }
}
</script>
