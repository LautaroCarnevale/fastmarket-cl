<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../store/auth";
import { Form, Field, ErrorMessage } from "vee-validate";

const selectedType = ref("usuario");
const auth = useAuthStore()

const form = ref({
    email: "",
    password: "",
});

async function onSubmit(values, { setErrors, setFieldError }) {
    try {
        const payload = {
            email: values.email,
            password: values.password,
            // tipoCuenta: selectedType.value
        };

        await auth.login(payload);
    } catch (err) {
        // erroes generales: ej: "usuario ya existente"
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
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Iniciar Sesión</h1>
    <p class="text-gray-500 mb-6">
        Ingresa tus credenciales para acceder a tu cuenta
    </p>

    <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</h3>
        <div class="grid grid-cols-3 gap-3">
            <button @click="selectedType = 'usuario'"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === 'usuario'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600',
                    ]">
                <i class="fa-solid fa-user text-xl mb-1"></i>
                <span class="text-sm font-medium">Usuario</span>
            </button>

            <button @click="selectedType = 'comercio'"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === 'comercio'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600',
                    ]">
                <i class="fa-solid fa-store text-xl mb-1"></i>
                <span class="text-sm font-medium">Comercio</span>
            </button>

            <button @click="selectedType = 'repartidor'"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === 'repartidor'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600',
                    ]">
                <i class="fa-solid fa-truck text-xl mb-1"></i>
                <span class="text-sm font-medium">Repartidor</span>
            </button>
        </div>
    </div>

    <Form @submit="onSubmit"
          class="flex flex-col gap-4">
        <div class="flex flex-col">
            <label class="block text-sm font-semibold mb-2">Email</label>
            <Field class="w-full border border-gray-300 rounded py-2 px-3"
                   name="email"
                   type="email"
                   placeholder="tu@email.com"
                   v-model="form.email" />
            <ErrorMessage name="email"
                          class="text-red-600 text-xs mt-1" />
        </div>

        <div class="flex flex-col">
            <label class="block text-sm font-semibold mb-2">Contraseña</label>
            <Field class="w-full border border-gray-300 rounded py-2 px-3"
                   name="password"
                   type="password"
                   placeholder="••••••••"
                   v-model="form.password" />
            <ErrorMessage name="password"
                          class="text-red-600 text-xs mt-1" />
        </div>

        <button type="submit"
                class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg mt-2 transition-all duration-200 shadow-sm">
            Iniciar Sesión
        </button>
    </Form>

    <div class="text-center mt-5 text-sm text-gray-600">
        <p>
            ¿No tienes cuenta?
            <RouterLink to="/register"
                        class="text-orange-600 font-medium hover:underline">
                Regístrate aquí
            </RouterLink>
        </p>
        <RouterLink to="/"
                    class="block mt-2 text-gray-500 hover:text-gray-700 transition-all">
            Volver al inicio
        </RouterLink>
    </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
