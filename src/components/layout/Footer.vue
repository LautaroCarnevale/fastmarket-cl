<template>
  <footer class="bg-gray-900 text-gray-200 py-8 mt-auto">
    <div class="container mx-auto px-4 text-center">
      <p class="text-sm">
        © {{ new Date().getFullYear() }} FastMarket · Todos los derechos reservados
      </p>
      <div class="mt-3 flex justify-center gap-4 text-gray-400 text-sm">
        <RouterLink to="/terms" class="hover:text-gray-100">Términos</RouterLink>
        <RouterLink to="/privacy" class="hover:text-gray-100">Privacidad</RouterLink>
        <RouterLink to="/help" class="hover:text-gray-100">Ayuda</RouterLink>
      </div>
    </div>
  </footer>
</template>
