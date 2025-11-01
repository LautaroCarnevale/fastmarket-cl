import { defineStore } from 'pinia'
import axios from '../api/index'
import { loginRequest, validateSessionRequest } from '../api/auth'
import router from '../router'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		token: null,
		isAuthenticated: false,
		loading: false,
		error: null
	}),

	actions: {
		async login(credentials) {
			try {
				this.loading = true
				const res = await loginRequest(credentials)
				this.user = res
				this.token = res.token
				this.isAuthenticated = true
				const role = res.roles.find(role => role === 'vendor' || role === 'driver' || role === 'admin')
				if (role == 'vendor') router.push('/vendor/panel')
				else if (role == 'driver') router.push('/driver/panel')
				else if (role == 'admin') router.push('/admin/panel')
				localStorage.setItem('token', this.token)
			} catch (err) {
				this.error = err.response?.data?.message || 'Error al iniciar sesión'
				throw err
			} finally {
				this.loading = false
			}
		},

		async register(data) {
			try {
				this.loading = true
				await axios.post('/auth/register', data)
			} catch (err) {
				this.error = err.response?.data?.message || 'Error al registrarse'
			} finally {
				this.loading = false
			}
		},

		async initializeAuth() {
			try {
				const user = await validateSessionRequest()

				if (user) {
					this.user = user
					this.isAuthenticated = true

					const path = router.currentRoute.value.path

					if (path === '/login' || path === '/register') {
						const role = user.roles.find(role => role === 'vendor' || role === 'driver' || role === 'admin')
						if (role === 'vendor') router.push('/vendor/panel')
						else if (role === 'driver') router.push('/driver/panel')
						else if (role === 'admin') router.push('/admin/panel')
						else router.push('/')
					}
				} else {
					this.user = null
					this.isAuthenticated = false
				}
			} catch {
				this.user = null
				this.isAuthenticated = false
			}
		},
		logout() {
			this.user = null
			this.token = null
			this.isAuthenticated = false
			localStorage.removeItem('token')
		},

		setUser(user) {
			this.user = user
			this.isAuthenticated = !!user
		}
	}
})
