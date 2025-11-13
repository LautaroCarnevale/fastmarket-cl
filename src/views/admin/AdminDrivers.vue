<template>
    <section class="min-h-screenpy-8">
        <div class="container mx-auto px-4 max-w-7xl">
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <h1 class="text-4xl font-bold text-grisOscuro mb-2">Gestión de Repartidores</h1>
                    <p class="text-grisMedio">Administra todos los repartidores registrados</p>
                </div>

                <div class="bg-blanco px-4 py-2 rounded-lg border border-grisMedio/20">
                    <p class="text-xs text-grisMedio">Total Repartidores</p>
                    <p class="text-2xl font-bold text-naranjaMedio">{{ drivers?.length || 0 }}</p>
                </div>
            </div>

            <div v-if="loading"
                 class="text-center py-20">
                <span class="icon-[lucide--loader-2] w-12 h-12 animate-spin text-naranjaMedio mx-auto"></span>
                <p class="text-grisMedio mt-4">Cargando repartidores...</p>
            </div>

            <div v-else-if="!drivers || drivers.length === 0"
                 class="text-center py-20">
                <span class="icon-[lucide--truck] w-20 h-20 text-grisMedio mx-auto mb-4"></span>
                <h3 class="text-xl font-bold text-grisOscuro mb-2">No hay repartidores</h3>
            </div>

            <div v-else
                 class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="driver in drivers"
                     :key="driver.id"
                     class="bg-blanco rounded-lg border border-grisMedio/20 p-6 hover:shadow-md transition">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <span class="icon-[lucide--truck] w-6 h-6 text-blue-500"></span>
                        </div>
                        <div class="flex flex-col gap-2 items-end">
                            <span :class="driver.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
                                  class="text-xs px-3 py-1 rounded-full font-medium">
                                {{ driver.available ? 'Disponible' : 'No disponible' }}
                            </span>
                        </div>
                    </div>

                    <h3 class="text-xl font-bold text-grisOscuro mb-2">{{ driver.name }}</h3>

                    <div class="space-y-2 mb-4">
                        <p class="text-sm text-grisMedio flex items-center gap-2">
                            <span class="icon-[lucide--mail] w-4 h-4"></span>
                            {{ driver.email }}
                        </p>
                        <p class="text-sm text-grisMedio flex items-center gap-2">
                            <span class="icon-[lucide--phone] w-4 h-4"></span>
                            {{ driver.phone || 'No disponible' }}
                        </p>
                        <p class="text-sm text-grisMedio flex items-center gap-2">
                            <span class="icon-[lucide--map-pin] w-4 h-4"></span>
                            {{ driver.location ? `Lat: ${driver.location.coordinates[1]}, Lng:
                            ${driver.location.coordinates[0]}` : 'Sin ubicación' }}
                        </p>
                    </div>

                    <div class="border-t border-grisMedio/20 pt-4 space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-grisMedio">Calificación:</span>
                            <span class="font-bold text-grisOscuro">
                                {{ driver.rating?.average?.toFixed(1) || 'N/A' }} ⭐
                                <span class="text-xs text-grisMedio">({{ driver.rating?.count || 0 }})</span>
                            </span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-grisMedio">Entregas completadas:</span>
                            <span class="font-bold text-grisOscuro">{{ driver.stats?.completedDeliveries || 0 }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-grisMedio">Entregas canceladas:</span>
                            <span class="font-bold text-rojoError">{{ driver.stats?.canceledDeliveries || 0 }}</span>
                        </div>
                    </div>

                    <div class="flex gap-2 mt-4">
                        <Button @click="toggleStatus(driver.id, driver.status)"
                                variant="secondary"
                                size="sm"
                                class="flex-1">
                            {{ driver.status === 'active' ? 'Suspender' : 'Activar' }}
                        </Button>
                        <Button @click="viewDetails(driver.id)"
                                variant="outline"
                                size="sm"
                                class="p-2!">
                            <span class="icon-[lucide--eye] w-4 h-4"></span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Button from '../../components/ui/Button.vue'
import { useDriver } from '../../composables/useDriver'
const { fetchFindAllDrivers, drivers } = useDriver()
const loading = ref(false)

onMounted(async () => {
    await fetchDrivers()
})

const fetchDrivers = async () => {
    loading.value = true
    try {
         await fetchFindAllDrivers()
    } catch (error) {
        console.error('Error al cargar repartidores:', error)
    } finally {
        loading.value = false
    }
}

const getStatusLabel = (status) => {
    const labels = {
        active: 'Activo',
        inactive: 'Inactivo',
        suspended: 'Suspendido'
    }
    return labels[status] || status
}

const toggleStatus = async (driverId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active'
    console.log('Toggle status:', driverId, newStatus)
}

const viewDetails = (driverId) => {
    console.log('View details:', driverId)
}
</script>