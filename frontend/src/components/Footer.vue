<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Marketplace</h3>
          <p class="text-gray-300">Your trusted online marketplace for buying and selling products worldwide.</p>
        </div>
        <div>
          <h4 class="text-md font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><router-link to="/products" class="text-gray-300 hover:text-white">Products</router-link></li>
            <li><router-link to="/categories" class="text-gray-300 hover:text-white">Categories</router-link></li>
            <li><router-link to="/register" class="text-gray-300 hover:text-white">Become a Seller</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="text-md font-semibold mb-4">Support</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-white">Help Center</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">Contact Us</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">Shipping Info</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-md font-semibold mb-4">Legal</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">Terms of Service</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">Return Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-300">&copy; 2024 Marketplace. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
