import { defineStore } from 'pinia'
import axios from '../api/index'
import { loginRequest, logoutRequest, validateSessionRequest } from '../api/auth'
import router from '../router'
import { ROLE_ROUTES, ROLES } from '../constants/roles'

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
				const role = res.roles.find(r => Object.values(ROLES).includes(r))

				if (role && ROLE_ROUTES[role]) {
					router.push(ROLE_ROUTES[role])
				} else {
					console.warn('Rol desconocido:', role)
					router.push('/')
				}
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

					const currentPath = router.currentRoute.value.path
					const isAuthPage = ['/login', '/register'].includes(currentPath)

					if (isAuthPage) {
						const role = user.roles.find(r => Object.values(ROLES).includes(r))
						const redirect = ROLE_ROUTES[role] || '/'

						router.push(redirect)
					}
				} else {
					this.user = null
					this.isAuthenticated = false
				}
			} catch (err) {
				this.user = null
				this.isAuthenticated = false
				this.error = err?.message || 'Error al validar sesión'
			}
		},
		async logout() {
			try {
				await logoutRequest()
			} catch (err) {
				console.error('Error cerrando sesión:', err)
			} finally {
				this.user = null
				this.token = null
				this.isAuthenticated = false
				router.push('/login')
			}
		},

		setUser(user) {
			this.user = user
			this.isAuthenticated = !!user
		}
	}
})
