<template>
    <section class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
                @click="$emit('close')">
        <div class="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gray-300 animate-fadeIn"
                @click.stop>
            <header class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-xl font-bold text-grisOscuro">
                    {{ isEditing ? 'Editar dirección' : 'Nueva dirección' }}
                </h2>
                <button @click="$emit('close')"
                        type="button"
                        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                    <span class="icon-[tabler--x] w-5 h-5 text-gray-600"></span>
                </button>
            </header>

            <Form ref="formRef"
                    @submit="onSubmit"
                    :key="formKey"
                    class="px-6 py-4 space-y-4">
                <Field name="street"
                        v-slot="{ field, errorMessage }">
                    <Input label="Calle y número"
                            placeholder="Av. Principal 123"
                            :model-value="formData.street"
                            @update:model-value="(val) => { field.value = val; formData.street = val }"
                            :error-message="errorMessage" />
                </Field>

                <div class="grid grid-cols-2 gap-4">
                    <Field name="city"
                            v-slot="{ field, errorMessage }">
                        <Input label="Ciudad"
                                placeholder="Córdoba"
                                :model-value="formData.city"
                                @update:model-value="(val) => { field.value = val; formData.city = val }"
                                :error-message="errorMessage" />
                    </Field>

                    <Field name="province"
                            v-slot="{ field, errorMessage }">
                        <Input label="Provincia"
                                placeholder="Córdoba"
                                :model-value="formData.province"
                                @update:model-value="(val) => { field.value = val; formData.province = val }"
                                :error-message="errorMessage" />
                    </Field>
                </div>

                <Field name="select"
                        v-slot="{ field }">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox"
                                :checked="formData.select"
                                @change="(e) => { field.value = e.target.checked; formData.select = e.target.checked }"
                                class="accent-naranjaMedio w-4 h-4" />
                        <span class="text-sm text-grisOscuro">Establecer como dirección principal</span>
                    </label>
                </Field>

                <ErrorMessage name="__root__"
                                class="text-red-600 text-sm" />

                <div class="flex justify-end gap-3 pt-4">
                    <Button type="button"
                            variant="secondary"
                            @click="$emit('close')">
                        Cancelar
                    </Button>
                    <Button type="submit"
                            variant="default"
                            :loading="isSubmitting">
                        {{ isEditing ? 'Guardar cambios' : 'Agregar dirección' }}
                    </Button>
                </div>
            </Form>
        </div>
    </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Input from './Input.vue'
import Button from './Button.vue'
import { useAuth } from '../../composables/useAuth'

const emit = defineEmits(['close'])

const props = defineProps({
    address: {
        type: Object,
        default: null
    },
})

const { newAdress, updateAdress, user } = useAuth()

const formRef = ref(null)
const formKey = ref(0)
const isEditing = computed(() => props.address !== null)
const isSubmitting = ref(false)

const formData = ref({
    street: '',
    city: '',
    province: '',
    select: false,
})

watch(
    () => props.address,
    (newAddress) => {
        formData.value = {
            street: newAddress?.street || '',
            city: newAddress?.city || '',
            province: newAddress?.province || '',
            select: newAddress?.select || false,
        }
        formKey.value += 1
    },
    { immediate: true, deep: true }
)

async function onSubmit(values, { setErrors, setFieldError }) {
    setErrors({})
    isSubmitting.value = true

    try {
        const addressData = {
            id: isEditing.value && props.address.id,
            street: formData.value.street,
            city: formData.value.city,
            province: formData.value.province,
            select: formData.value.select,
        }

        if (!user.value?.id) {
            setFieldError('__root__', 'Usuario no encontrado')
            return
        }

        if (isEditing.value) {
            await updateAdress(user.value.id, addressData)
        } else {
            await newAdress(user.value.id, addressData)
        }

        emit('close')
    } catch (err) {
        if (err?.errors && typeof err.errors === 'object') {
            setErrors(err.errors)
        } else if (Array.isArray(err?.message)) {
            setFieldError('__root__', err.message.join(' • '))
        } else if (typeof err?.message === 'string') {
            setFieldError('__root__', err.message)
        } else {
            setFieldError('__root__', 'Ocurrió un error al guardar. Intenta nuevamente.')
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>
