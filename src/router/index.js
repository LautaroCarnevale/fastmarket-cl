import { createRouter, createWebHistory } from 'vue-router'

// --- Importación de vistas principales ---
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// --- Paneles ---
import VendorPanel from '../views/VendorPanel.vue'
import DriverPanel from '../views/DriverPanel.vue'
import AdminPanel from '../views/AdminPanel.vue'

// --- Guards opcionales (ej: autenticación, roles) ---
import { useAuthStore } from '../store/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // --- Usuario final ---
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { layout: 'default' }
        },

        // --- Autenticación ---
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { guest: true, layout: 'auth' }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: { guest: true, layout: 'auth' }
        },

        // --- Paneles ---
        {
            path: '/vendor/panel',
            name: 'VendorPanel',
            component: VendorPanel,
            meta: { requiresAuth: true, role: 'vendor', layout: 'dashboard' }
        },
        {
            path: '/driver/panel',
            name: 'DriverPanel',
            component: DriverPanel,
            meta: { requiresAuth: true, role: 'driver', layout: 'dashboard' }
        },
        {
            path: '/admin',
            name: 'AdminLogin',
            component: Login,
            meta: { layout: 'default' }
        },
        {
            path: '/admin/panel',
            name: 'AdminPanel',
            component: AdminPanel,
            meta: { requiresAuth: true, role: 'admin', layout: 'dashboard' }
        },

        // --- Fallback ---
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    const isAuthenticated = auth?.isAuthenticated

    if (!isAuthenticated) {
        try {
            await auth.initializeAuth()
        } catch {
            return next({ name: 'Login' })
        }
    }

    const authenticated = auth.isAuthenticated
    const role = auth.user?.roles?.find(r =>
        ['vendor', 'driver', 'admin'].includes(r)
    )

    if (to.meta.requiresAuth && !authenticated) {
        return next({ name: 'Login' })
    }

    if (to.meta.role && role !== to.meta.role) {
        return next({ name: 'Home' })
    }

    if (['Login', 'Register'].includes(to.name) && authenticated) {
        if (role === 'vendor') return next({ name: 'VendorPanel' })
        if (role === 'driver') return next({ name: 'DriverPanel' })
        if (role === 'admin') return next({ name: 'AdminPanel' })
        return next({ name: 'Home' })
    }

    next()
})


export default router
