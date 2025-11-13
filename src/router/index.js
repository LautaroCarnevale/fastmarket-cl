import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { ROLES } from '../constants/roles'

import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import MarketplacePanel from '../views/marketplace/MarketplacePanel.vue'
import MarketplaceLayout from '../components/layout/MarketplaceLayout.vue'
import VendorLayout from '../components/layout/VendorLayout.vue'
import VendorDashboard from '../views/vendor/VendorDashboard.vue'
import VendorMenu from '../views/vendor/VendorMenu.vue'
import AccountLayout from '../components/layout/AccountLayout.vue'
import UserAccountSettings from '../views/UserAccountSettings.vue'
import UserPayments from '../views/UserPayments.vue'
import UserNotifications from '../views/UserNotifications.vue'
import UserLastOrders from '../views/UserLastOrders.vue'
import MarketplaceDetail from '../views/marketplace/MarketplaceDetail.vue'
import MarketplaceOrders from '../views/marketplace/MarketplaceOrders.vue'
import VendorOrders from '../views/vendor/VendorOrders.vue'
import MarketplaceCheckout from '../views/marketplace/MarketplaceCheckout.vue'
import DriverLayout from '../components/layout/DriverLayout.vue'
import DriverDashboard from '../views/driver/DriverDashboard.vue'
import DriverOrders from '../views/driver/DriverOrders.vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import LoginAdmin from '../views/auth/LoginAdmin.vue'
import AdminVendors from '../views/admin/AdminVendors.vue'
import AdminDrivers from '../views/admin/AdminDrivers.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/login', name: 'Login', component: Login, meta: { layout: 'auth' } },
        { path: '/register', name: 'Register', component: Register, meta: { layout: 'auth' } },

        {
            path: '/admin',
            name: 'AdminLogin',
            component: LoginAdmin,
            meta: { layout: 'auth' }
        },
        {
            path: '/admin/panel',
            component: AdminLayout,
            meta: { requiresAuth: true, role: ROLES.ADMIN, layout: 'dashboard' },
            children: [
                { path: '', name: 'AdminVendors', component: AdminVendors },
                { path: 'drivers', name: 'AdminDrivers', component: AdminDrivers },
            ],
        },

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

        {
            path: '/driver/panel',
            component: DriverLayout,
            meta: { requiresAuth: true, role: ROLES.DRIVER, layout: 'dashboard' },
            children: [
                { path: '', name: 'DriverDashboard', component: DriverDashboard },
                { path: 'deliveries', name: 'DriverOrders', component: DriverOrders },
            ],
        },

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

    if (['Login', 'Register', 'AdminLogin'].includes(to.name) && isAuthenticated) {
        if (role === ROLES.USER) return next({ name: 'UserMarketplace' })
        if (role === ROLES.VENDOR_STAFF) return next({ name: 'VendorDashboard' })
        if (role === ROLES.DRIVER) return next({ name: 'DriverDashboard' })
        if (role === ROLES.ADMIN) return next({ name: 'AdminVendors' })
        return next({ name: 'Home' })
    }

    next()
})

export default router