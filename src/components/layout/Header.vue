<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      
      <RouterLink to="/"
                    class="flex items-center gap-2">
        <h1 class="text-xl font-semibold text-gray-800">FastMarket</h1>
      </RouterLink>

      <nav class="hidden md:flex gap-6 text-gray-700 font-medium">
        <RouterLink to="/"
                    class="hover:text-blue-600 transition">Inicio</RouterLink>
        <RouterLink to="/profile"
                    class="hover:text-blue-600 transition">Mi cuenta</RouterLink>
        <RouterLink to="/checkout"
                    class="hover:text-blue-600 transition">Carrito</RouterLink>
      </nav>


      <button @click="toggleMenu"
              class="md:hidden text-gray-700 hover:text-blue-600 transition">
        <svg xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>


    <div v-if="menuOpen"
          class="md:hidden bg-white border-t border-gray-100 py-2 flex flex-col items-center gap-2">
      <RouterLink @click="toggleMenu"
                  to="/"
                  class="text-gray-700 hover:text-blue-600">Inicio</RouterLink>
      <RouterLink @click="toggleMenu"
                  to="/profile"
                  class="text-gray-700 hover:text-blue-600">Mi cuenta</RouterLink>
      <RouterLink @click="toggleMenu"
                  to="/checkout"
                  class="text-gray-700 hover:text-blue-600">Carrito</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
</script>
