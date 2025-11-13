<template>
    <section class="min-h-screen bg-grisClaro py-8">
        <div class="container mx-auto px-4 max-w-7xl">
            <div class="mb-8 flex items-center justify-between">
                <Button @click="showCreateModal = true"
                        variant="default">
                    <span class="icon-[lucide--plus] w-5 h-5 mr-2"></span>
                    Crear Comercio
                </Button>
            </div>

            <div v-if="loading"
                 class="text-center py-20">
                <span class="icon-[lucide--loader-2] w-12 h-12 animate-spin text-naranjaMedio mx-auto"></span>
                <p class="text-grisMedio mt-4">Cargando comercios...</p>
            </div>

            <div v-else-if="!vendors || vendors.length === 0"
                 class="text-center py-20">
                <span class="icon-[lucide--store] w-20 h-20 text-grisMedio mx-auto mb-4"></span>
                <h3 class="text-xl font-bold text-grisOscuro mb-2">No hay comercios</h3>
            </div>

            <div v-else
                 class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="vendor in vendors"
                     :key="vendor.id"
                     class="bg-blanco rounded-lg border border-grisMedio/20 p-6 hover:shadow-md transition">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 bg-naranjaMedio/10 rounded-lg flex items-center justify-center">
                            <span class="icon-[lucide--store] w-6 h-6 text-naranjaMedio"></span>
                        </div>
                        <span :class="vendor.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                              class="text-xs px-3 py-1 rounded-full font-medium">
                            {{ vendor.active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>

                    <h3 class="text-xl font-bold text-grisOscuro mb-2">{{ vendor.displayName }}</h3>

                    <div class="space-y-2 mb-4">
                        <p class="text-sm text-grisMedio">
                            <span class="font-medium">Email:</span> {{ vendor.email || 'No disponible' }}
                        </p>
                        <p class="text-sm text-grisMedio">
                            <span class="font-medium">Dirección:</span>
                            {{ vendor.address?.street }}, {{ vendor.address?.city }}
                        </p>
                    </div>

                    <div class="flex gap-2 mt-4">
                        <Button @click="toggleActive(vendor.id, vendor.active)"
                                variant="secondary"
                                size="sm"
                                class="flex-1">
                            {{ vendor.active ? 'Desactivar' : 'Activar' }}
                        </Button>
                        <Button @click="deleteVendor(vendor.id)"
                                variant="danger"
                                size="sm"
                                class="!p-2">
                            <span class="icon-[lucide--trash-2] w-4 h-4"></span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <CreateVendorModal v-if="showCreateModal"
                           @close="showCreateModal = false"
                           @created="handleVendorCreated" />
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useVendor } from '../../composables/useVendor'
import Button from '../../components/ui/Button.vue'
import CreateVendorModal from '../../components/CreateVendorModal.vue'

const { vendors, loading, fetchVendors, updateVendorStatus } = useVendor()

const showCreateModal = ref(false)

onMounted(async () => {
    await fetchVendors()
})

const toggleActive = async (vendorId, currentStatus) => {
    await updateVendorStatus(vendorId, { active: !currentStatus })
}

const deleteVendor = async (vendorId) => {
    if (confirm('¿Estás seguro de eliminar este comercio?')) {
        console.log('Delete vendor:', vendorId)
    }
}

const handleVendorCreated = () => {
    showCreateModal.value = false
    fetchVendors()
}
</script>