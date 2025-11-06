<script setup>
import { computed } from 'vue';
import { useVendor } from '../composables/useVendor';
const { selectedVendor } = useVendor()



const recentActivity = [
    { id: 1, type: "order", message: "Nuevo pedido recibido #1245", time: "Hace 5 min" },
    { id: 2, type: "menu", message: "Producto 'Empanadas' actualizado", time: "Hace 20 min" },
    { id: 3, type: "promotion", message: "Promoción '2x1 en pizzas' activada", time: "Hace 1 hora" },
    { id: 4, type: "sale", message: "Ventas totales: $12.540 hoy", time: "Hace 2 horas" },
]

const vendor = computed(() => selectedVendor.value)

</script>

<template>
    <section class="min-h-screen">
        <!-- Main Stats -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="bg-blanco p-5 rounded-xl shadow-sm border border-grisMedio/30">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Pedidos de hoy</p>
                    <span class="text-naranjaBajo text-lg">🛒</span>
                </div>
                <span class="text-2xl font-bold text-grisOscuro">56</span>
                <p class="text-xs text-grisMedio mt-1">+12% vs ayer</p>
            </div>

            <div class="bg-blanco p-5 rounded-xl shadow-sm border border-grisMedio/30">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Productos activos</p>
                    <span class="text-naranjaBajo text-lg">🍔</span>
                </div>
                <span class="text-2xl font-bold text-grisOscuro">124</span>
                <p class="text-xs text-grisMedio mt-1">3 desactivados</p>
            </div>

            <div class="bg-blanco p-5 rounded-xl shadow-sm border border-grisMedio/30">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Ingresos del día</p>
                    <span class="text-naranjaBajo text-lg">💰</span>
                </div>
                <span class="text-2xl font-bold text-grisOscuro">$4,350</span>
                <p class="text-xs text-grisMedio mt-1">+8% respecto al promedio</p>
            </div>

            <div class="bg-blanco p-5 rounded-xl shadow-sm border border-grisMedio/30">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Calificación</p>
                    <span class="text-naranjaBajo text-lg">⭐</span>
                </div>
                <span class="text-2xl font-bold text-grisOscuro">{{ vendor?.rating.average }}</span>
                <p class="text-xs text-grisMedio mt-1">Basado en {{ vendor?.rating.count }} reseñas</p>
            </div>
        </div>

        <!-- Revenue Stats -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-blanco p-5 rounded-xl shadow-sm border border-grisMedio/30">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Ingresos Totales</p>
                    <span class="text-naranjaBajo text-lg">📈</span>
                </div>
                <span class="text-2xl font-bold text-grisOscuro">$128,540</span>
                <p class="text-xs text-grisMedio mt-1">Este mes</p>
            </div>

            <div class="bg-blanco p-5 rounded-xl shadow-sm border border-grisMedio/30">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Comisiones</p>
                    <span class="text-naranjaBajo text-lg">💼</span>
                </div>
                <span class="text-2xl font-bold text-grisOscuro">$12,854</span>
                <p class="text-xs text-grisMedio mt-1">Promedio 10%</p>
            </div>

            <div class="bg-blanco p-5 rounded-xl shadow-sm border border-grisMedio/30">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Ticket Promedio</p>
                    <span class="text-naranjaBajo text-lg">🧾</span>
                </div>
                <span class="text-2xl font-bold text-grisOscuro">$320</span>
                <p class="text-xs text-grisMedio mt-1">+5% vs mes pasado</p>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-blanco p-6 rounded-xl shadow-sm border border-grisMedio/30">
            <h2 class="text-lg font-semibold mb-4 text-grisOscuro">
                Actividad reciente
            </h2>
            <div class="space-y-4">
                <div v-for="activity in recentActivity"
                     :key="activity.id"
                     class="flex items-start gap-4 p-4 border border-grisMedio/30 rounded-lg hover:bg-crema transition">
                    <div class="w-10 h-10 flex items-center justify-center rounded-full text-blanco font-bold"
                         :class="{
                            'bg-naranjaBajo': activity.type === 'order',
                            'bg-verdeOk': activity.type === 'menu',
                            'bg-[varnaranjaAlto': activity.type === 'promotion',
                            'bg-grisOscuro': activity.type === 'sale',
                        }">
                        {{ activity.type.charAt(0).toUpperCase() }}
                    </div>
                    <div class="flex-1">
                        <p class="font-medium text-grisOscuro">
                            {{ activity.message }}
                        </p>
                        <p class="text-sm text-grisMedio">{{ activity.time }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
