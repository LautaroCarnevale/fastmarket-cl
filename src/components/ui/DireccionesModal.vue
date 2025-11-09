<template>
    <section v-if="isOpen"
             class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
             @click="closeModal">
        <div class="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-gray-300 max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn"
             @click.stop>
            <header class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-xl font-bold text-grisOscuro">Mis direcciones</h2>
                <button @click="closeModal"
                        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                    <span class="icon-[tabler--x] w-5 h-5 text-gray-600"></span>
                </button>
            </header>

            <div class="flex-1 overflow-y-auto px-6 py-4">
                <button @click="showAddAddressForm"
                        class="w-full flex items-center gap-3 p-4 mb-3 rounded-lg border-2 border-dashed border-naranjaMedio text-naranjaMedio hover:bg-naranjaMedio/5 transition">
                    <span class="icon-[lucide--plus-circle] w-6 h-6"></span>
                    <span class="font-medium">Agregar nueva dirección</span>
                </button>

                <div class="space-y-3">
                    <article v-for="(address, index) in addresses"
                             :key="index"
                             class="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-naranjaMedio/50 transition">
                        <div v-if="address.select === true">
                            <span class="icon-[grommet-icons--radial-selected] w-5.5 h-5.5 text-verdeOk"></span>
                        </div>
                        <div v-else>
                            <span class="icon-[lsicon--radio-unselected-filled] w-5.5 h-5.5 text-grisOscuro/70"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-grisOscuro">{{ address.street }}</p>
                            <p class="text-sm text-grisMedio truncate">{{ address.city }}, {{ address.province }}</p>
                        </div>

                        <div class="flex items-center gap-2 shrink-0">
                            <button @click="editAddress(address, index)"
                                    class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
                                <span class="icon-[lucide--edit] w-4 h-4 text-blue-600"></span>
                            </button>
                        </div>
                    </article>
                </div>

                <div v-if="addresses.length === 0"
                     class="text-center py-12 text-grisMedio">
                    <span class="icon-[ps--pin-map] w-16 h-16 mx-auto mb-4 opacity-30"></span>
                    <p class="font-medium">No tienes direcciones</p>
                </div>
            </div>

            <footer class="px-6 py-4 border-t border-gray-200 flex justify-end">
                <Button variant="secondary"
                        @click="closeModal">Cerrar</Button>
            </footer>
        </div>
    </section>

    <AddressFormModal v-if="isAddingAddress || isEditingAddress"
                      :address="editingAddress"
                      :address-index="editingAddressIndex"
                      @close="closeAddressForm" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth'
import Button from './Button.vue'
import AddressFormModal from './AddressFormModal.vue'

const { user } = useAuth()

const isOpen = ref(false)
const isAddingAddress = ref(false)
const isEditingAddress = ref(false)
const editingAddress = ref(null)
const editingAddressIndex = ref(null)

const addresses = computed(() => user.value?.addresses || [])
console.log(addresses.value[2].select);

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const showAddAddressForm = () => {
    editingAddress.value = null
    editingAddressIndex.value = null
    isAddingAddress.value = true
}

const editAddress = (address, index) => {
    editingAddress.value = { ...address }
    editingAddressIndex.value = index
    isEditingAddress.value = true
}

const closeAddressForm = () => {
    isAddingAddress.value = false
    isEditingAddress.value = false
    editingAddress.value = null
    editingAddressIndex.value = null
}

defineExpose({ openModal, closeModal })
</script>
