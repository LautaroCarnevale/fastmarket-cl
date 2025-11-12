// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import { useAuth } from '../composables/useAuth'
import { ROLES } from '../constants/roles'

// --- Vistas principales ---
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// --- Layouts y paneles ---
import MarketplacePanel from '../views/MarketplacePanel.vue'
import AdminPanel from '../views/AdminPanel.vue'
import DriverPanel from '../views/DriverPanel.vue'
import MarketplaceLayout from '../components/layout/MarketplaceLayout.vue'
import VendorLayout from '../components/layout/VendorLayout.vue'
import VendorDashboard from '../views/VendorDashboard.vue'
import VendorMenu from '../views/VendorMenu.vue'
import AccountLayout from '../components/layout/AccountLayout.vue'
import UserAccountSettings from '../views/UserAccountSettings.vue'
import UserPayments from '../views/UserPayments.vue'
import UserNotifications from '../views/UserNotifications.vue'
import UserLastOrders from '../views/UserLastOrders.vue'
import MarketplaceDetail from '../views/MarketplaceDetail.vue'
import MarketplaceOrders from '../views/MarketplaceOrders.vue'
import VendorOrders from '../views/VendorOrders.vue'
import MarketplaceCheckout from '../views/MarketplaceCheckout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // --- Público ---
        { path: '/', name: 'Home', component: Home, meta: { layout: 'default' } },
        { path: '/login', name: 'Login', component: Login, meta: { guest: true, layout: 'auth' } },
        { path: '/register', name: 'Register', component: Register, meta: { guest: true, layout: 'auth' } },

        // --- Marketplace (usuario final) ---
        {
            path: '/marketplace',
            component: MarketplaceLayout,
            meta: { requiresAuth: true, role: ROLES.USER, layout: 'dashboard' },
            children: [
                { path: '', name: 'UserMarketplace', component: MarketplacePanel },
                { path: 'restaurantes/:id', name: 'UserVendorDetail', component: MarketplaceDetail },
                { path: 'checkout/:id', name: 'UserCheckout', component: MarketplaceCheckout },
                { path: 'orders', name: 'UserOrders', component: MarketplaceOrders },
                {
                    path: 'account',
                    component: AccountLayout,
                    children: [
                        { path: '', redirect: { name: 'UserAccountSettings' } },
                        { path: 'profile', name: 'UserAccountSettings', component: UserAccountSettings },
                        { path: 'payments', name: 'UserPayments', component: UserPayments },
                        { path: 'notifications', name: 'UserNotifications', component: UserNotifications },
                        { path: 'last-orders', name: 'UserLastOrders', component: UserLastOrders },
                    ],
                },
            ],
        },

        // --- Admin ---
        {
            path: '/admin/panel',
            component: AdminPanel,
            meta: { requiresAuth: true, role: ROLES.ADMIN, layout: 'dashboard' },
            children: [
                { path: '', name: 'AdminDashboard', component: { render: () => h('span', 'Admin Dashboard') } },
                { path: 'vendors', name: 'AdminVendors', component: { render: () => h('span', 'Admin Vendors') } },
            ],
        },

        // --- Vendor ---
        {
            path: '/vendor/panel',
            component: VendorLayout,
            meta: { requiresAuth: true, role: ROLES.VENDOR_STAFF, layout: 'dashboard' },
            children: [
                { path: '', name: 'VendorDashboard', component: VendorDashboard },
                { path: 'menu', name: 'VendorMenu', component: VendorMenu },
                { path: 'orders', name: 'VendorOrders', component: VendorOrders },
            ],
        },

        // --- Driver ---
        {
            path: '/driver/panel',
            component: DriverPanel,
            meta: { requiresAuth: true, role: ROLES.DRIVER, layout: 'dashboard' },
            children: [
                { path: '', name: 'DriverDashboard', component: { render: () => h('span', 'Driver Dashboard') } },
            ],
        },

        // --- Fallback ---
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuth()

    if (!auth.initialized.value) {
        await auth.initialize()
    }

    const isAuthenticated = auth.isAuthenticated.value
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
