<script setup>
import { ref } from 'vue'
import Input from '../components/ui/Input.vue'
import Button from '../components/ui/Button.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { driverProfileSchema } from '@/validations/driver/driverProfileSchema'
import { useAuth } from '../../composables/useAuth'

const { user } = useAuth()

const driverForm = ref({
  name: user.value?.name || '',
  surname: user.value?.surname || '',
  phone: '',
  vehicleType: 'bike', 
  plate: '',
  brand: '',
  model: '',
  color: ''
})

const isSaving = ref(false)

const onSubmitDriver = async (values, { setErrors, setFieldError }) => {
  isSaving.value = true

  try {
    const payload = {
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      vehicle: {
        type: values.vehicleType,
        plate: values.plate,
        brand: values.brand,
        model: values.model,
        color: values.color
      }
    }

    console.log('Payload driver profile:', payload)

    driverForm.value = { ...driverForm.value, ...values }
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
    isSaving.value = false
  }
}
</script>

<template>
  <section class="min-h-screen container mx-auto px-4 py-8">
    <div class="bg-blanco rounded-lg shadow-soft p-6">
      <h1 class="text-2xl font-bold text-grisOscuro mb-6">
        Perfil de repartidor
      </h1>

      <Form
        :validationSchema="driverProfileSchema"
        @submit="onSubmitDriver"
        class="space-y-4"
      >
        <div class="grid grid-cols-2 gap-4">
          <Field name="name" v-slot="{ field, errorMessage }">
            <Input
              v-model="driverForm.name"
              label="Nombre"
              name="name"
              type="text"
              placeholder="Juan"
              v-bind="field"
              :errorMessage="errorMessage"
            />
          </Field>

          <Field name="surname" v-slot="{ field, errorMessage }">
            <Input
              v-model="driverForm.surname"
              label="Apellido"
              name="surname"
              type="text"
              placeholder="Pérez"
              v-bind="field"
              :errorMessage="errorMessage"
            />
          </Field>
        </div>

        <Field name="phone" v-slot="{ field, errorMessage }">
          <Input
            v-model="driverForm.phone"
            label="Teléfono"
            name="phone"
            type="tel"
            placeholder="+54 9 351..."
            v-bind="field"
            :errorMessage="errorMessage"
          />
        </Field>

        <div class="grid grid-cols-2 gap-4">
          <Field name="vehicleType" v-slot="{ field, errorMessage }">
            <div>
              <label class="text-sm font-medium text-grisMedio mb-1 block">
                Tipo de vehículo
              </label>
              <select
                v-bind="field"
                v-model="driverForm.vehicleType"
                class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-naranjaMedio"
              >
                <option value="">Selecciona...</option>
                <option value="bike">Bicicleta</option>
                <option value="motorbike">Moto</option>
                <option value="car">Auto</option>
              </select>
              <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
                {{ errorMessage }}
              </p>
            </div>
          </Field>

          <Field name="plate" v-slot="{ field, errorMessage }">
            <Input
              v-model="driverForm.plate"
              label="Patente"
              name="plate"
              type="text"
              placeholder="ABC123"
              v-bind="field"
              :errorMessage="errorMessage"
            />
          </Field>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <Field name="brand" v-slot="{ field, errorMessage }">
            <Input
              v-model="driverForm.brand"
              label="Marca"
              name="brand"
              type="text"
              placeholder="Yamaha"
              v-bind="field"
              :errorMessage="errorMessage"
            />
          </Field>

          <Field name="model" v-slot="{ field, errorMessage }">
            <Input
              v-model="driverForm.model"
              label="Modelo"
              name="model"
              type="text"
              placeholder="FZ16"
              v-bind="field"
              :errorMessage="errorMessage"
            />
          </Field>

          <Field name="color" v-slot="{ field, errorMessage }">
            <Input
              v-model="driverForm.color"
              label="Color"
              name="color"
              type="text"
              placeholder="Rojo"
              v-bind="field"
              :errorMessage="errorMessage"
            />
          </Field>
        </div>

        <ErrorMessage name="__root__" class="text-red-600 text-sm" />

        <div class="pt-4">
          <Button type="submit" variant="default" :loading="isSaving">
            Guardar cambios
          </Button>
        </div>
      </Form>
    </div>
  </section>
</template>
