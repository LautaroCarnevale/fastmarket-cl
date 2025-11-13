<script setup>
import Input from '../components/ui/Input.vue'
import Button from '../components/ui/Button.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { ROLES } from '../constants/roles'
import { Form, Field, ErrorMessage } from 'vee-validate'

const { register } = useAuth()
const selectedType = ref(ROLES.USER)
const form = ref({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
});
async function handleRegister(values, { setErrors, setFieldError }) {
    setErrors({});
    if (password.value !== confirmPassword.value) {
        return alert('Las contraseñas no coinciden')
    }
    const payload = {
        email: values.email,
        password: values.password,
        name: values.name,
        role: selectedType.value,
    }


    try {
        await register(payload)
    } catch (err) {
        if (err?.errors && typeof err.errors === "object") {
            setErrors(err.errors);
        } else if (Array.isArray(err?.message)) {
            setFieldError("__root__", err.message.join(" • "));
        } else if (typeof err?.message === "string") {
            setFieldError("__root__", err.message);
        } else {
            setFieldError("__root__", "Ocurrió un error al guardar. Intenta nuevamente.");
        }
    }
}
</script>

<template>

    <h1 class="text-2xl font-bold text-gray-900 mb-1">Registro</h1>
    <p class="text-gray-500 mb-6">Crea tu cuenta para comenzar</p>

    <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</h3>
        <div class="grid grid-cols-3 gap-3">
            <button @click="selectedType = ROLES.USER"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === ROLES.USER
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                    ]">
                <i class="fa-solid fa-user text-xl mb-1"></i>
                <span class="text-sm font-medium">Usuario</span>
            </button>

            <button @click="selectedType = ROLES.VENDOR_STAFF"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === ROLES.VENDOR_STAFF
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                    ]">
                <i class="fa-solid fa-store text-xl mb-1"></i>
                <span class="text-sm font-medium">Comercio</span>
            </button>

            <button @click="selectedType = ROLES.DRIVER"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === ROLES.DRIVER
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                    ]">
                <i class="fa-solid fa-truck text-xl mb-1"></i>
                <span class="text-sm font-medium">Repartidor</span>
            </button>
        </div>
    </div>

    <Form @submit="handleRegister"
            class="flex flex-col gap-4">
        <Field name="name"
                v-slot="{ field, errorMessage }">
            <Input v-model="form.name"
                    label="Nombre completo"
                    type="text"
                    name="name"
                    placeholder="Juan Pérez"
                    v-bind="field"
                    :errorMessage="errorMessage" />
        </Field>

        <Field name="email"
                v-slot="{ field, errorMessage }">
            <Input v-model="form.email"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    v-bind="field"
                    :errorMessage="errorMessage" />
        </Field>

        <Field name="password"
                v-slot="{ field, errorMessage }">
            <Input v-model="form.password"
                    label="Contraseña"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    v-bind="field"
                    :errorMessage="errorMessage" />
        </Field>

        <Field name="confirmPassword"
                v-slot="{ field, errorMessage }">
            <Input v-model="form.confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    v-bind="field"
                    :errorMessage="errorMessage" />
        </Field>
        <ErrorMessage name="__root__"
                        class="text-red-600 text-sm" />
        <Button type="submit"
                variant="default"
                size="md"
                full-width
                class="mt-2">
            Registrarse
        </Button>
    </Form>

    <div class="text-center mt-5 text-sm text-gray-600">
        <p>
            ¿Ya tienes cuenta?
            <RouterLink to="/login"
                        class="text-orange-600 font-medium hover:underline">
                Inicia sesión aquí
            </RouterLink>
        </p>
        <RouterLink to="/"
                    class="block mt-2 text-gray-500 hover:text-gray-700 transition-all">
            Volver al inicio
        </RouterLink>
    </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
