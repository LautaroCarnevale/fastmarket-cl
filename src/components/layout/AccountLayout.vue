<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const menuItems = [
    { name: 'Ajustes de cuenta', route: 'UserAccountSettings', icon: '⚙️' },
    { name: 'Pagos', route: 'UserPayments', icon: '💳' },
    { name: 'Centro de notificaciones', route: 'UserNotifications', icon: '🔔' },
    { name: 'Últimas órdenes', route: 'UserLastOrders', icon: '📦' }
]

const currentRoute = computed(() => router.currentRoute.value.name)
</script>

<template>
    <div class="min-h-screen bg-crema p-6">
        <div class="max-w-6xl mx-auto">
            <div class="flex gap-6">
                <aside class="w-64 bg-blanco rounded-lg shadow-soft p-4 h-fit">
                    <div class="flex items-center gap-3 mb-6 pb-4 border-b border-grisBajo">
                        <div
                             class="w-16 h-16 bg-naranjaMedio rounded-full flex items-center justify-center text-blanco text-2xl font-bold">
                            L
                        </div>
                        <div>
                            <p class="font-semibold text-grisOscuro">Mi perfil</p>
                            <p class="text-sm text-grisMedio">Lautaro</p>
                        </div>
                    </div>

                    <nav class="space-y-2">
                        <button v-for="item in menuItems"
                                :key="item.route"
                                @click="router.push({ name: item.route })"
                                :class="[
                                    'w-full text-left px-4 py-3 rounded-md transition-colors flex items-center gap-3',
                                    currentRoute === item.route
                                        ? 'bg-naranjaMedio/10 text-naranjaMedio font-medium'
                                        : 'text-grisOscuro hover:bg-grisBajo'
                                ]">
                            <span>{{ item.icon }}</span>
                            <span>{{ item.name }}</span>
                        </button>
                    </nav>
                </aside>

                <main class="flex-1">
                    <router-view />
                </main>
            </div>
        </div>
    </div>
</template>
