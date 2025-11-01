<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const selectedType = ref("usuario");
const nombre = ref("");
const email = ref("");
const telefono = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = () => {
    console.log({
        tipoCuenta: selectedType.value,
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    });
};
</script>

<template>
    <AuthLayout>
        <!-- Título -->
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Registro</h1>
        <p class="text-gray-500 mb-6">Crea tu cuenta para comenzar</p>

        <!-- Tipo de cuenta -->
        <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</h3>
            <div class="grid grid-cols-3 gap-3">
                <button @click="selectedType = 'usuario'"
                        :class="[
                            'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer ',
                            selectedType === 'usuario'
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-gray-300 hover:border-gray-400 text-gray-600',
                        ]">
                    <i class="fa-solid fa-user text-xl mb-1"></i>
                    <span class="text-sm font-medium">Usuario</span>
                </button>

                <button @click="selectedType = 'comercio'"
                        :class="[
                            'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer ',
                            selectedType === 'comercio'
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-gray-300 hover:border-gray-400 text-gray-600',
                        ]">
                    <i class="fa-solid fa-store text-xl mb-1"></i>
                    <span class="text-sm font-medium">Comercio</span>
                </button>

                <button @click="selectedType = 'repartidor'"
                        :class="[
                            'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer ',
                            selectedType === 'repartidor'
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-gray-300 hover:border-gray-400 text-gray-600',
                        ]">
                    <i class="fa-solid fa-truck text-xl mb-1"></i>
                    <span class="text-sm font-medium">Repartidor</span>
                </button>
            </div>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleRegister"
              class="flex flex-col gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input v-model="nombre"
                       type="text"
                       placeholder="Juan Pérez"
                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input v-model="email"
                       type="email"
                       placeholder="tu@email.com"
                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input v-model="telefono"
                       type="tel"
                       placeholder="+54 11 1234-5678"
                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input v-model="password"
                       type="password"
                       placeholder="••••••••"
                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                <input v-model="confirmPassword"
                       type="password"
                       placeholder="••••••••"
                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <button type="submit"
                    class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg mt-2 transition-all duration-200 shadow-sm">
                Registrarse
            </button>
        </form>

        <!-- Enlaces -->
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
    </AuthLayout>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
