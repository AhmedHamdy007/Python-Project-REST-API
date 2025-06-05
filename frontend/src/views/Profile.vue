<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1>
      </div>
      
      <div class="p-6">
        <form @submit.prevent="updateProfile" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="first_name"
                v-model="form.first_name"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="last_name"
                v-model="form.last_name"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              disabled
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
            />
            <p class="mt-1 text-sm text-gray-500">Email cannot be changed</p>
          </div>
          
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              disabled
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
            />
            <p class="mt-1 text-sm text-gray-500">Username cannot be changed</p>
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              v-model="form.address"
              rows="3"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>
          
          <div v-if="success" class="text-green-600 text-sm">
            {{ success }}
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="loading"
              class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ loading ? 'Updating...' : 'Update Profile' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

export default {
  name: 'Profile',
  setup() {
    const authStore = useAuthStore()
    
    const form = ref({
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      phone: '',
      address: ''
    })
    
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    const loadProfile = () => {
      if (authStore.user) {
        form.value = { ...authStore.user }
      }
    }

    const updateProfile = async () => {
      loading.value = true
      error.value = ''
      success.value = ''
      
      try {
        const updateData = {
          first_name: form.value.first_name,
          last_name: form.value.last_name,
          phone: form.value.phone,
          address: form.value.address
        }
        
        await api.put('/users/profile', updateData)
        success.value = 'Profile updated successfully!'
        
        // Update the auth store
        await authStore.fetchProfile()
      } catch (err) {
        error.value = err.response?.data?.detail || 'Failed to update profile'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadProfile()
    })

    return {
      form,
      loading,
      error,
      success,
      updateProfile
    }
  }
}
</script>
