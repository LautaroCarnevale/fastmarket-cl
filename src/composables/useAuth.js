// src/composables/useAuth.js
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'

export function useAuth() {
    const auth = useAuthStore()
    const user = computed(() => auth.user)
    const isAuthenticated = computed(() => auth.isAuthenticated)
    const role = computed(() => auth.role)
    const loading = computed(() => auth.loading)
    const error = computed(() => auth.error)

    const login = async (credentials) => {
        try {
            await auth.login(credentials)
        } catch (err) {
            console.error('Error en login:', err)
            throw err
        }
    }

    const register = async (credentials) => {
        try {
            await auth.register(credentials)
        } catch (err) {
            console.error('Error en registro:', err)
            throw err
        }
    }

    const logout = async () => {
        await auth.logout()
    }

    const initialize = async () => {
        await auth.initializeAuth()
    }

    const is = {
        admin: computed(() => auth.isAdmin),
        vendor: computed(() => auth.isVendor),
        driver: computed(() => auth.isDriver),
        user: computed(() => auth.isUser),
    }

    return {
        user,
        role,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        initialize,
        is,
    }
}
