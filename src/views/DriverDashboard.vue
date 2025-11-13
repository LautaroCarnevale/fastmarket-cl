<template>
    <section class="min-h-screen bg-grisClaro">
        <div class="bg-blanco rounded-lg shadow-sm py-15 px-10 mb-8 border border-grisMedio/20">
            <div class="flex items-center justify-between ">
                <div>
                    <h2 class="text-xl font-bold text-grisOscuro mb-1">Estado de disponibilidad</h2>
                    <p class="text-sm text-grisMedio">
                        {{ user.available ? 'Estás recibiendo pedidos' : 'No estás recibiendo pedidos' }}
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-sm font-bold text-grisOscuro">
                        {{ user.available ? 'Disponible' : 'No disponible' }}
                    </span>

                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox"
                               class="sr-only peer"
                               v-model="user.available"
                               @change="toggleDriverActive" />
                        <div
                             class="group peer bg-white rounded-full duration-300 w-14 h-7 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-5 after:w-5 after:top-1 after:left-1 peer-checked:after:translate-x-7">
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="bg-blanco rounded-lg shadow-sm p-6 border border-grisMedio/20">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Ganancias Hoy</p>
                    <span class="icon-[lucide--dollar-sign] w-5 h-5 text-grisMedio"></span>
                </div>
                <div class="text-2xl font-bold text-grisOscuro">$3,450</div>
                <p class="text-xs text-grisMedio">+12 entregas</p>
            </div>

            <div class="bg-blanco rounded-lg shadow-sm p-6 border border-grisMedio/20">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Entregas</p>
                    <span class="icon-[lucide--package] w-5 h-5 text-grisMedio"></span>
                </div>
                <div class="text-2xl font-bold text-grisOscuro">12</div>
                <p class="text-xs text-grisMedio">Esta semana: 47</p>
            </div>

            <div class="bg-blanco rounded-lg shadow-sm p-6 border border-grisMedio/20">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Calificación</p>
                    <span class="icon-[lucide--trending-up] w-5 h-5 text-grisMedio"></span>
                </div>
                <div class="text-2xl font-bold text-grisOscuro">4.8 ⭐</div>
                <p class="text-xs text-grisMedio">234 reseñas</p>
            </div>

            <div class="bg-blanco rounded-lg shadow-sm p-6 border border-grisMedio/20">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-grisOscuro">Tiempo Promedio</p>
                    <span class="icon-[lucide--clock] w-5 h-5 text-grisMedio"></span>
                </div>
                <div class="text-2xl font-bold text-grisOscuro">22 min</div>
                <p class="text-xs text-grisMedio">Por entrega</p>
            </div>
        </div>

        <div v-if="activeDelivery"
             class="bg-blanco rounded-lg shadow-sm border-2 border-naranjaMedio mb-8">
            <div class="p-6 border-b border-grisMedio/20">
                <h2 class="text-xl font-bold text-grisOscuro flex items-center gap-2">
                    <span class="icon-[lucide--package] w-5 h-5"></span>
                    Entrega Activa
                </h2>
            </div>
            <div class="p-6 space-y-4">
                <div class="flex items-start justify-between">
                    <div class="space-y-3 flex-1">
                        <div>
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
                                  :class="deliveryStatus === 'pickup' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'">
                                {{ deliveryStatus === 'pickup' ? 'Recolectar pedido' : 'En camino al cliente' }}
                            </span>
                            <h3 class="font-bold text-lg text-grisOscuro">{{ activeDelivery.restaurant }}</h3>
                            <p class="text-sm text-grisMedio">{{ activeDelivery.items }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-start gap-2">
                                <span class="icon-[lucide--map-pin] w-4 h-4 mt-1 text-orange-500"></span>
                                <div>
                                    <p class="text-sm font-medium text-grisOscuro">Recolectar en:</p>
                                    <p class="text-sm text-grisMedio">{{ activeDelivery.restaurantAddress }}</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-2">
                                <span class="icon-[lucide--map-pin] w-4 h-4 mt-1 text-green-500"></span>
                                <div>
                                    <p class="text-sm font-medium text-grisOscuro">Entregar en:</p>
                                    <p class="text-sm text-grisMedio">{{ activeDelivery.customerAddress }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-right">
                        <p class="text-3xl font-bold text-naranjaMedio">${{ activeDelivery.payment }}</p>
                        <p class="text-sm text-grisMedio">{{ activeDelivery.distance }}</p>
                    </div>
                </div>

                <div class="flex gap-2">
                    <Button variant="outline"
                            class="flex-1">
                        <span class="icon-[lucide--navigation] w-4 h-4 mr-2"></span>
                        Navegar
                    </Button>
                    <Button variant="outline"
                            class="flex-1">
                        <span class="icon-[lucide--phone] w-4 h-4 mr-2"></span>
                        Contactar
                    </Button>
                </div>

                <Button v-if="deliveryStatus === 'pickup'"
                        @click="markAsPickedUp"
                        size="lg"
                        full-width>
                    Marcar como recolectado
                </Button>
                <Button v-else
                        @click="completeDelivery"
                        size="lg"
                        full-width>
                    Completar entrega
                </Button>
            </div>
        </div>

        <div v-if="!activeDelivery"
             class="grid md:grid-cols-2 gap-6">
            <div class="bg-blanco rounded-lg shadow-sm border border-grisMedio/20">
                <div class="p-6 border-b border-grisMedio/20">
                    <h2 class="text-xl font-bold text-grisOscuro">Entregas Disponibles</h2>
                </div>
                <div class="p-6">
                    <div class="text-center py-8">
                        <span class="icon-[lucide--package] w-16 h-16 mx-auto mb-4 text-grisMedio"></span>
                        <h3 class="text-lg font-semibold mb-2 text-grisOscuro">3 entregas disponibles</h3>
                        <p class="text-sm text-grisMedio mb-4">
                            {{ user.available ? 'Hay entregas esperando por ti' : 'Activa tu disponibilidad para verlas'
                            }}
                        </p>
                        <Button @click="$router.push('/driver/deliveries')">
                            Ver entregas
                        </Button>
                    </div>
                </div>
            </div>

            <div class="bg-blanco rounded-lg shadow-sm border border-grisMedio/20">
                <div class="p-6 border-b border-grisMedio/20">
                    <h2 class="text-xl font-bold text-grisOscuro">Historial de Entregas</h2>
                </div>
                <div class="p-6">
                    <div class="space-y-3">
                        <div v-for="delivery in recentDeliveries"
                             :key="delivery.id"
                             class="flex items-center justify-between p-3 border border-grisMedio/20 rounded-lg">
                            <div>
                                <p class="font-medium text-grisOscuro">{{ delivery.restaurant }}</p>
                                <p class="text-sm text-grisMedio">{{ delivery.time }}</p>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-verdeOk">${{ delivery.amount }}</p>
                                <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                    Completada
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
console.log(user.value);

const activeDelivery = ref(null)
const deliveryStatus = ref(null)

const recentDeliveries = ref([
    { id: 1, restaurant: 'Burger King', time: 'Hace 15 min', amount: 450 },
    { id: 2, restaurant: 'Pizza Hut', time: 'Hace 45 min', amount: 520 },
    { id: 3, restaurant: 'Sushi Club', time: 'Hace 1 hora', amount: 380 }
])

const toggleDriverActive = () => {
    console.log(user.value.available)
}

const markAsPickedUp = () => {
    deliveryStatus.value = 'delivering'
}

const completeDelivery = () => {
    activeDelivery.value = null
    deliveryStatus.value = null
}
</script>
