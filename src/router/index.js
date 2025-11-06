import { createRouter, createWebHistory } from 'vue-router'
import { computed, h } from 'vue'


// --- Vistas principales ---
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// --- Layouts de panel ---
import MarketplacePanel from '../views/MarketplacePanel.vue'
import AdminPanel from '../views/AdminPanel.vue'
import DriverPanel from '../views/DriverPanel.vue'

// --- Pinia ---
import { ROLES } from '../constants/roles'
import VendorDetail from '../views/VendorDetail.vue'
import MarketplaceLayout from '../components/layout/MarketplaceLayout.vue'
import VendorLayout from '../components/layout/VendorLayout.vue'
import VendorDashboard from '../views/VendorDashboard.vue'
import { useAuth } from '../composables/useAuth'
import VendorMenu from '../views/VendorMenu.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // --- Público ---
        { path: '/', name: 'Home', component: Home, meta: { layout: 'default' } },
        { path: '/login', name: 'Login', component: Login, meta: { guest: true, layout: 'auth' } },
        { path: '/register', name: 'Register', component: Register, meta: { guest: true, layout: 'auth' } },

        // --- USUARIO FINAL ---
        {
            path: '/marketplace',
            component: MarketplaceLayout,
            meta: { requiresAuth: true, role: 'user', layout: 'dashboard' },
            children: [
                { path: '', name: 'UserMarketplace', component: MarketplacePanel },
                { path: 'restaurantes/:id', name: 'UserVendorDetail', component: VendorDetail },
                { path: 'cart', name: 'UserCart', component: { render: () => h('span', 'Carrito de Compras') } },
                { path: 'checkout', name: 'UserCheckout', component: { render: () => h('span', 'Finalizar Pedido') } },
                { path: 'orders', name: 'UserOrders', component: { render: () => h('span', 'Historial de Pedidos') } },
            ],
        },

        // --- ADMIN ---
        {
            path: '/admin/panel',
            component: AdminPanel,
            meta: { requiresAuth: true, role: ROLES.ADMIN, layout: 'dashboard' },
            children: [
                { path: '', name: 'AdminDashboard', component: { render: () => h('span', 'Admin Dashboard') } },
                { path: 'vendors', name: 'AdminVendors', component: { render: () => h('span', 'Admin Vendors') } },
                { path: 'drivers', name: 'AdminDrivers', component: { render: () => h('span', 'Admin Drivers') } },
                { path: 'users', name: 'AdminUsers', component: { render: () => h('span', 'Admin Users') } },
                { path: 'reports', name: 'AdminReports', component: { render: () => h('span', 'Admin Reports') } },
                { path: 'settings', name: 'AdminSettings', component: { render: () => h('span', 'Admin Settings') } },
            ],
        },

        // --- VENDOR ---
        {
            path: '/vendor/panel',
            component: VendorLayout,
            meta: { requiresAuth: true, role: ROLES.VENDOR_STAFF, layout: 'dashboard' },
            children: [
                { path: '', name: 'VendorDashboard', component: VendorDashboard },
                { path: 'menu', name: 'VendorMenu', component: VendorMenu },
                { path: 'orders', name: 'VendorOrders', component: { render: () => h('span', 'Vendor Orders') } },
                { path: 'promotions', name: 'VendorPromotions', component: { render: () => h('span', 'Vendor Promotions') } },
                { path: 'sales', name: 'VendorSales', component: { render: () => h('span', 'Vendor Sales') } },
            ],
        },

        // --- DRIVER ---
        {
            path: '/driver/panel',
            component: DriverPanel,
            meta: { requiresAuth: true, role: ROLES.DRIVER, layout: 'dashboard' },
            children: [
                { path: '', name: 'DriverDashboard', component: { render: () => h('span', 'Driver Dashboard') } },
                { path: 'available', name: 'DriverAvailableOrders', component: { render: () => h('span', 'Driver Available Orders') } },
                { path: 'deliveries', name: 'DriverMyDeliveries', component: { render: () => h('span', 'Driver My Deliveries') } },
                { path: 'earnings', name: 'DriverEarnings', component: { render: () => h('span', 'Driver Earnings') } },
                { path: 'profile', name: 'DriverProfile', component: { render: () => h('span', 'Driver Profile') } },
            ],
        },

        // --- Fallback ---
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
})


router.beforeEach(async (to, from, next) => {
    const auth = useAuth()

    const isAuthenticated = auth.isAuthenticated.value

    if (!isAuthenticated) {
        try {
            await auth.initialize()
        } catch {
            // ignorar errores
        }
    }
    const role = auth.role.value

    if (to.meta.requiresAuth && !isAuthenticated) {
        return next({ name: 'Login' })
    }

    if (to.meta.role && role !== to.meta.role) {
        return next({ name: 'Home' })
    }

    if (['Login', 'Register'].includes(to.name) && isAuthenticated) {
        if (role === ROLES.USER) return next({ name: 'UserMarketplace' })
        if (role === ROLES.VENDOR_STAFF) return next({ name: 'VendorDashboard' })
        if (role === ROLES.DRIVER) return next({ name: 'DriverDashboard' })
        if (role === ROLES.ADMIN) return next({ name: 'AdminDashboard' })
        return next({ name: 'Home' })
    }

    next()
})

export default router
