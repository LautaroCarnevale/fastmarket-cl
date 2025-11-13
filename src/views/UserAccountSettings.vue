<script setup>
import { ref } from 'vue'
import Input from '../components/ui/Input.vue'
import Button from '../components/ui/Button.vue'
import { useAuth } from '../composables/useAuth'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { userSettingsSchema } from '@/validation/user/userSettingsSchema'

const auth = useAuth()

const formData = ref({
  name: 'Lautaro',
  surname: 'Carnovalo',
  email: 'carnovolalautaro72@gmail.com',
  phone: '3576415006',
  idNumber: '',
  birthDate: '1970-01-01',
  gender: 'Hombre'
})

const isVerified = ref(true)
const isUpdating = ref(false)

const updateAccount = async (values) => {
  formData.value = { ...formData.value, ...values }

  isUpdating.value = true
  setTimeout(() => {
    isUpdating.value = false
  }, 1000)
}

const deleteAccount = () => {
  if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
  }
}

const closeOtherSessions = () => {
  if (confirm('¿Deseas cerrar todas las demas sesiones?')) {
  }
}
</script>

<template>
  <div class="bg-blanco rounded-lg shadow-soft p-6">
    <h1 class="text-2xl font-bold text-grisOscuro mb-6">Información de tu cuenta</h1>

<<<<<<< HEAD
    <Form
      :validationSchema="userSettingsSchema"
      @submit="updateAccount"
      class="space-y-4"
    >
      <div class="grid grid-cols-2 gap-4">
        <Field name="name" v-slot="{ field, errorMessage }">
          <Input
            v-model="formData.firstName"
            label="Nombre(s)"
            name="Name"
            placeholder="Lautaro"
            v-bind="field"
            :errorMessage="errorMessage"
          />
        </Field>

        <Field name="surname" v-slot="{ field, errorMessage }">
          <Input
            v-model="formData.lastName"
            label="Apellido(s)"
            name="surname"
            placeholder="Carnovalo"
            v-bind="field"
            :errorMessage="errorMessage"
          />
        </Field>
=======
    <form @submit.prevent="updateAccount"
          class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <Input v-model="formData.firstName"
                label="Nombre(s)"
                name="firstName"
                placeholder="Lautaro" />
        <Input v-model="formData.lastName"
                label="Apellido(s)"
                name="lastName"
                placeholder="Carnovalo" />
>>>>>>> eliminar
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
<<<<<<< HEAD
          <Field name="email" v-slot="{ field, errorMessage }">
            <Input
              v-model="formData.email"
              label="Correo Electrónico"
              type="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              v-bind="field"
              :errorMessage="errorMessage"
            />
          </Field>

          <div
            v-if="isVerified"
            class="flex items-center gap-2 mt-2 text-green-600 text-sm"
          >
=======
          <Input v-model="formData.email"
                  label="Correo Electrónico"
                  type="email"
                  name="email"
                  placeholder="ejemplo@gmail.com" />
          <div v-if="isVerified"
                class="flex items-center gap-2 mt-2 text-green-600 text-sm">
>>>>>>> eliminar
            <span>✓</span>
            <span>Correo verificado</span>
          </div>
        </div>
<<<<<<< HEAD

        <Field name="phone" v-slot="{ field, errorMessage }">
          <Input
            v-model="formData.phone"
            label="Celular"
            type="tel"
            name="phone"
            placeholder="3576415006"
            v-bind="field"
            :errorMessage="errorMessage"
          />
        </Field>
      </div>

      <!-- Número de identidad -->
      <Field name="idNumber" v-slot="{ field, errorMessage }">
        <Input
          v-model="formData.idNumber"
          label="Número de identidad"
          name="idNumber"
          placeholder="Ingresa tu número de identidad"
          v-bind="field"
          :errorMessage="errorMessage"
        />
      </Field>
=======
        <Input v-model="formData.phone"
                label="Celular"
                type="tel"
                name="phone"
                placeholder="3576415006" />
      </div>

      <Input v-model="formData.idNumber"
              label="Número de identidad"
              name="idNumber"
              placeholder="Ingresa tu número de identidad" />
>>>>>>> eliminar

      <div class="grid grid-cols-2 gap-4">
<<<<<<< HEAD
        <Field name="birthDate" v-slot="{ field, errorMessage }">
          <Input
            v-model="formData.birthDate"
            label="Fecha de nacimiento"
            type="date"
            name="birthDate"
            v-bind="field"
            :errorMessage="errorMessage"
          />
        </Field>

        <Field name="gender" v-slot="{ field, errorMessage }">
          <div>
            <label class="text-sm font-medium text-grisMedio mb-1 block">
              Género
=======
        <Input v-model="formData.birthDate"
                label="Fecha de nacimiento"
                type="date"
                name="birthDate" />
        <div>
          <label class="text-sm font-medium text-grisMedio mb-1 block">Género</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio"
                      v-model="formData.gender"
                      value="Hombre"
                      class="accent-naranjaMedio" />
              <span class="text-grisOscuro">Hombre</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio"
                      v-model="formData.gender"
                      value="Mujer"
                      class="accent-naranjaMedio" />
              <span class="text-grisOscuro">Mujer</span>
>>>>>>> eliminar
            </label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  class="accent-naranjaMedio"
                  :value="'Hombre'"
                  v-model="formData.gender"
                  @change="field.onChange($event)"
                  :checked="field.value === 'Hombre'"
                />
                <span class="text-grisOscuro">Hombre</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  class="accent-naranjaMedio"
                  :value="'Mujer'"
                  v-model="formData.gender"
                  @change="field.onChange($event)"
                  :checked="field.value === 'Mujer'"
                />
                <span class="text-grisOscuro">Mujer</span>
              </label>
            </div>
            <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
              {{ errorMessage }}
            </p>
          </div>
        </Field>
      </div>

<<<<<<< HEAD
      <ErrorMessage name="__root__" class="text-red-600 text-sm" />

      <!-- Botones de acción -->
=======
>>>>>>> eliminar
      <div class="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="default"
          :loading="isUpdating"
        >
          Actualizar datos
        </Button>

        <Button
          type="button"
          variant="secondary"
          @click="closeOtherSessions"
        >
          Cerrar otras sesiones
        </Button>

        <Button
          type="button"
          variant="danger"
          @click="deleteAccount"
        >
          Eliminar mi cuenta
        </Button>
      </div>
    </Form>
  </div>
</template>
