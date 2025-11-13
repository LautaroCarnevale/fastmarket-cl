// src/store/auth.js
import { defineStore } from 'pinia'
import {
	loginRequest,
	logoutRequest,
	registerAddressRequest,
	registerRequest,
	updateAddressRequest,
	validateSessionRequest
} from '../api/auth'
import router from '../router'
import { ROLE_ROUTES, ROLES } from '../constants/roles'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		isAuthenticated: false,
		loading: false,
		error: null,
		initialized: false,
	}),

	getters: {
		role: (state) => state.user?.roles?.find((r) => Object.values(ROLES).includes(r)) || null,
		isAdmin: (state) => state.user?.roles?.includes(ROLES.ADMIN),
		isVendor: (state) => state.user?.roles?.includes(ROLES.VENDOR_STAFF),
		isDriver: (state) => state.user?.roles?.includes(ROLES.DRIVER),
		isUser: (state) => state.user?.roles?.includes(ROLES.USER),
	},

	actions: {
		async login(credentials) {
			this.loading = true
			try {
				const res = await loginRequest(credentials)
				this.user = res
				this.isAuthenticated = true

				const role = this.role
				const redirect = ROLE_ROUTES[role] || '/'
				router.push(redirect)
			} catch (err) {
				this.error = err.response?.data?.message || 'Error al iniciar sesión'
				throw err
			} finally {
				this.loading = false
			}
		},

		async register(data) {
			this.loading = true
			try {
				await registerRequest(data)
			} catch (err) {
				this.error = err.response?.data?.message || 'Error al registrarse'
				throw err
			} finally {
				this.loading = false
			}
		},

		async initializeAuth() {
			this.loading = true
			try {
				const user = await validateSessionRequest()
				if (user) {
					this.user = user
					this.isAuthenticated = true
					const path = router.currentRoute.value.path
					const isAuthPage = ['/login', '/register'].includes(path)
					if (isAuthPage) {
						const role = this.role
						const redirect = ROLE_ROUTES[role] || '/'
						router.push(redirect)
					}
				} else {
					this.resetAuth()
				}
			} catch (err) {
				this.resetAuth()
				this.error = err?.message || 'Error al validar sesión'
			} finally {
				this.loading = false
				this.initialized = true
			}
		},

		async newAdress(id, data) {
			this.loading = true
			try {
				const res = await registerAddressRequest(id, data)
				const user = this.user
				user.addresses.push(res)
				this.user = user

			} catch (err) {
				this.error = err.response?.data?.message || 'Error al registrarse'
				throw err
			} finally {
				this.loading = false
			}
		},

		async updateAdress(id, data) {
			this.loading = true
			try {
				const res = await updateAddressRequest(id, data)
				const user = { ...this.user }

				if (Array.isArray(user.addresses)) {
					user.addresses = user.addresses.map(addr => {
						if (addr.id === res.id) return { ...res }

						if (res.select === true) return { ...addr, select: false }

						return addr
					})
				}

				this.user = user
				return res
			} catch (err) {
				this.error = err.response?.data?.message || 'Error al actualizar dirección'
				throw err
			} finally {
				this.loading = false
			}
		},
		async logout() {
			this.loading = true
			try {
				await logoutRequest()
			} catch (err) {
				console.warn('Error cerrando sesión:', err)
			} finally {
				this.resetAuth()
				router.push('/login')
			}
		},

		resetAuth() {
			this.user = null
			this.isAuthenticated = false
			this.loading = false
			this.error = null
		},
	},
})
