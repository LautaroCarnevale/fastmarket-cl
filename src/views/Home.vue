<script setup>
import { RouterLink } from 'vue-router'
import Market from '../assets/icons/Market.vue';
</script>

<template>
    <section
             class="min-h-screen bg-linear-to-b from-rose-50 via-orange-50 to-white flex flex-col items-center justify-center px-4">
        <!-- Header -->
        <section class="text-center mb-10">
            <h1 class="text-5xl font-extrabold text-gray-900 tracking-tight">FastMarket</h1>
            <p class="mt-2 text-gray-600 text-lg max-w-md mx-auto">
                Tu marketplace de delivery favorito. Comida, compras y más, todo en un solo lugar.
            </p>
        </section>

        <!-- Card principal -->
        <section class="bg-white rounded-2xl p-8 w-full max-w-md text-center border border-gray-300">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Bienvenido</h2>
            <p class="text-gray-500 mb-9">Accede a tu cuenta o crea una nueva</p>

            <div class="flex flex-col gap-4">
                <RouterLink to="/login"
                            class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-sm">
                    Iniciar sesión
                </RouterLink>
                <RouterLink to="/register"
                            class="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 rounded-lg transition-all duration-200">
                    Registrarme
                </RouterLink>
            </div>
        </section>

        <!-- Accesos Rápidos -->
        <section class="flex flex-wrap justify-center gap-8 mt-15">
            <div class="flex flex-col items-center gap-2 min-w-[100px]">
                <div class="bg-orange-100 p-4 rounded-xl shadow-sm flex items-center">
                    <span class="icon-[iconoir--bag] text-3xl text-orange-700"></span>
                </div>
                <span class="text-gray-700 font-medium">Usuarios</span>
            </div>

            <div class="flex flex-col items-center gap-2 min-w-[100px]">
                <div class="bg-blue-100 p-4 rounded-xl shadow-sm flex items-center">
                    <span class="icon-[lsicon--marketplace-outline] text-3xl text-blue-700 "></span>
                </div>
                <span class="text-gray-700 font-medium">Comercios</span>
            </div>

            <div class="flex flex-col items-center gap-2 min-w-[100px]">
                <div class="bg-green-100 p-4 rounded-xl shadow-sm flex items-center">
                    <span class="icon-[lucide--truck] text-3xl text-green-700"></span>
                </div>
                <span class="text-gray-700 font-medium">Repartidores</span>
            </div>
        </section>

        <!-- Acceso Admin -->
        <section class="mt-12">
            <RouterLink to="/admin"
                        class="text-sm text-red-600 font-medium hover:underline cursor-pointer">
                Acceso Administrador
            </RouterLink>
        </section>
    </section>
</template>
