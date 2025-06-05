import { defineStore } from "pinia"
import api from "../services/api"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await api.post("/users/login", credentials)
        this.token = response.data.access_token
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem("token", this.token)

        // Set default authorization header
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`

        return response.data
      } catch (error) {
        throw error
      }
    },

    async register(userData) {
      try {
        const response = await api.post("/users/register", userData)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async fetchProfile() {
      try {
        const response = await api.get("/users/profile")
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
    },

    initializeAuth() {
      if (this.token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`
        this.fetchProfile().catch(() => {
          this.logout()
        })
      }
    },
  },
})
