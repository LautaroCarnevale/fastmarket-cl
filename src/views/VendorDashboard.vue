<script setup>
import { useVendor } from '../composables/useVendor';
const { selectedVendor } = useVendor()

const recentActivity = [
    {
        id: 1,
        title: "Pedido #12345",
        status: "Nuevo",
        description: "Cliente: María González — 2x Whopper, 1x Papas",
        amount: "$2100",
        time: "Hace 2 min",
        actions: [
            { label: "Aceptar", icon: "fa-check", type: "primary" },
            { label: "Rechazar", icon: "fa-xmark", type: "danger" },
        ],
    },
    {
        id: 2,
        title: "Pedido #12344",
        status: "Preparando",
        description: "Cliente: Carlos Ruiz — 1x Big King, 1x Coca Cola",
        amount: "$1200",
        time: "Hace 8 min",
        actions: [{ label: "Marcar como listo", type: "primary" }],
    },
    {
        id: 3,
        title: "Pedido #12343",
        status: "Listo",
        description: "Cliente: Ana Martínez — 1x Combo Familiar",
        amount: "$2340",
        time: "Hace 15 min",
        actions: null,
    },
];



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
                <span class="text-2xl font-bold text-grisOscuro">{{ selectedVendor?.rating.average }}</span>
                <p class="text-xs text-grisMedio mt-1">Basado en {{ selectedVendor?.rating.count }} reseñas</p>
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

            <div class="flex gap-3 mb-4">
                <button
                        class="px-4 py-1.5 text-sm font-medium rounded-lg border border-grisMedio text-grisOscuro hover:bg-blancoBajo transition">
                    Activas
                </button>
                <button
                        class="px-4 py-1.5 text-sm font-medium rounded-lg border border-grisMedio text-grisOscuro/60 hover:bg-blancoBajo transition">
                    Completadas
                </button>
            </div>

            <div class="space-y-4">
                <div v-for="activity in recentActivity"
                     :key="activity.id"
                     class="border border-grisMedio/40 rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 shadow-sm hover:shadow transition bg-blanco">
                    <div class="flex flex-col">
                        <p class="font-bold text-grisOscuro">
                            {{ activity.title || `Evento #${activity.id}` }}
                            <span class="ml-2 px-2 py-0.5 text-xs font-medium rounded-full"
                                  :class="{
                                    'bg-[#FFF3CD] text-[#856404]': activity.status === 'Nuevo',
                                    'bg-[#CCE5FF] text-[#004085]': activity.status === 'Preparando',
                                    'bg-[#D4EDDA] text-[#155724]': activity.status === 'Listo',
                                }">
                                {{ activity.status }}
                            </span>
                        </p>

                        <p class="text-sm text-grisAlto mt-1">
                            {{ activity.description }}
                        </p>
                    </div>

                    <div class="flex flex-col items-end justify-between">
                        <div class="text-right">
                            <p class="text-xl font-bold text-azulBajo">
                                {{ activity.amount }}
                            </p>
                            <p class="text-xs text-grisMedio">{{ activity.time }}</p>
                        </div>

                        <div v-if="activity.actions"
                             class="flex gap-2 mt-2">
                            <button v-for="(action, i) in activity.actions"
                                    :key="i"
                                    class="px-4 py-1.5 text-sm font-medium rounded-md transition"
                                    :class="{
                                        'bg-azulBajo text-white hover:bg-azulAlto': action.type === 'primary',
                                        'bg-rojoError text-white hover:bg-red-600': action.type === 'danger',
                                        'bg-grisMedio/10 text-grisOscuro hover:bg-grisMedio/20': action.type === 'neutral',
                                    }">
                                <i v-if="action.icon"
                                   :class="['fa-solid', action.icon, 'mr-1']"></i>
                                {{ action.label }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
