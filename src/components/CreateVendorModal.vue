<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
         @click.self="$emit('close')">
        <div class="bg-blanco rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-grisMedio/20 flex items-center justify-between sticky top-0 bg-blanco">
                <h2 class="text-2xl font-bold text-grisOscuro">Crear Comercio</h2>
                <button @click="$emit('close')"
                        class="text-grisMedio hover:text-grisOscuro">
                    <span class="icon-[lucide--x] w-6 h-6"></span>
                </button>
            </div>

            <form @submit.prevent="onSubmit"
                  class="p-6 space-y-4">

                <Input label="Nombre del Comercio *"
                       type="text"
                       placeholder="Burger King"
                       v-model="form.displayName" />

                <div>
                    <label class="block text-sm font-medium text-grisOscuro mb-2">
                        Dueño del Comercio *
                    </label>
                    <select v-model="form.ownerId"
                            class="w-full px-4 py-2 border border-grisMedio rounded-md focus:ring-2 focus:ring-naranjaMedio focus:border-naranjaMedio">
                        <option value="">Seleccionar dueño</option>
                        <option v-for="user in vendorUsers"
                                :key="user.id"
                                :value="user.id">
                            {{ user.name }} - {{ user.email }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-grisOscuro mb-2">
                        Descripción
                    </label>
                    <textarea v-model="form.description"
                              rows="3"
                              placeholder="Descripción del comercio..."
                              class="w-full px-4 py-2 border border-grisMedio rounded-md focus:ring-2 focus:ring-naranjaMedio focus:border-naranjaMedio"></textarea>
                </div>

                <div class="space-y-2">
                    <h3 class="font-semibold text-grisOscuro">Dirección *</h3>

                    <Input label="Calle"
                           type="text"
                           placeholder="Av. Corrientes 1500"
                           v-model="form.address.street" />

                    <div class="grid grid-cols-2 gap-4">
                        <Input label="Ciudad"
                               type="text"
                               placeholder="Córdoba"
                               v-model="form.address.city" />

                        <Input label="Provincia"
                               type="text"
                               placeholder="Córdoba"
                               v-model="form.address.province" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <Input label="País"
                               type="text"
                               placeholder="Argentina"
                               v-model="form.address.country" />

                        <Input label="Código Postal"
                               type="text"
                               placeholder="5000"
                               v-model="form.address.postalCode" />
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <input type="checkbox"
                           v-model="form.active"
                           class="w-5 h-5 text-naranjaMedio border-grisMedio rounded focus:ring-naranjaMedio" />
                    <label class="text-sm font-medium text-grisOscuro">
                        Comercio activo
                    </label>
                </div>

                <div v-if="error"
                     class="text-rojoError text-sm bg-red-50 p-3 rounded-md">
                    {{ error }}
                </div>

                <div class="flex gap-3 pt-4">
                    <Button type="button"
                            @click="$emit('close')"
                            variant="secondary"
                            class="flex-1">
                        Cancelar
                    </Button>
                    <Button type="submit"
                            variant="default"
                            :loading="loading"
                            class="flex-1">
                        Crear Comercio
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Input from '../components/ui/Input.vue'
import Button from '../components/ui/Button.vue'

import { useVendor } from '../composables/useVendor'
import { useAuth } from '../composables/useAuth'
import { ROLES } from '../constants/roles'
const { getUsersByRole } = useAuth()
const { createVendor } = useVendor()
const emit = defineEmits(['close', 'created'])

const loading = ref(false)
const error = ref('')
const vendorUsers = ref([])

const form = ref({
    displayName: '',
    ownerId: '',
    description: '',
    address: {
        street: '',
        city: '',
        province: '',
        country: 'Argentina',
        postalCode: '',
        extra: ''
    },
    active: true
})

onMounted(async () => {
    try {
        vendorUsers.value = await getUsersByRole(ROLES.VENDOR_STAFF)
    } catch (err) {
        console.error('Error al cargar usuarios:', err)
    }
})

const onSubmit = async () => {
    loading.value = true
    error.value = ''

    try {
        await createVendor(form.value)
        emit('created')
    } catch (err) {
        error.value = err.message || 'Error al crear el comercio'
    } finally {
        loading.value = false
    }
}
</script>