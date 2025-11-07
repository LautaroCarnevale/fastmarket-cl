<script setup>
import { ref } from 'vue'

const notificationSettings = ref({
  orderUpdates: true,
  promotions: false,
  newsletter: true,
  driverLocation: true,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false
})

const saveSettings = () => {
  console.log('Guardando configuración de notificaciones', notificationSettings.value)
}
</script>

<template>
  <div class="bg-blanco rounded-lg shadow-soft p-6">
    <h1 class="text-2xl font-bold text-grisOscuro mb-6">Centro de notificaciones</h1>

    <div class="space-y-6">
      <!-- Notificaciones de pedidos -->
      <div class="border-b border-grisBajo pb-4">
        <h2 class="text-lg font-semibold text-grisOscuro mb-4">Notificaciones de pedidos</h2>
        <div class="space-y-3">
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <p class="font-medium text-grisOscuro">Actualizaciones de pedido</p>
              <p class="text-sm text-grisMedio">Recibe notificaciones sobre el estado de tus pedidos</p>
            </div>
            <input type="checkbox"
                   v-model="notificationSettings.orderUpdates"
                   class="toggle-switch accent-naranjaMedio w-12 h-6" />
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <p class="font-medium text-grisOscuro">Ubicación del repartidor</p>
              <p class="text-sm text-grisMedio">Recibe actualizaciones de la ubicación en tiempo real</p>
            </div>
            <input type="checkbox"
                   v-model="notificationSettings.driverLocation"
                   class="toggle-switch accent-naranjaMedio w-12 h-6" />
          </label>
        </div>
      </div>

      <!-- Marketing -->
      <div class="border-b border-grisBajo pb-4">
        <h2 class="text-lg font-semibold text-grisOscuro mb-4">Marketing</h2>
        <div class="space-y-3">
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <p class="font-medium text-grisOscuro">Promociones y ofertas</p>
              <p class="text-sm text-grisMedio">Recibe descuentos exclusivos y promociones</p>
            </div>
            <input type="checkbox"
                   v-model="notificationSettings.promotions"
                   class="toggle-switch accent-naranjaMedio w-12 h-6" />
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <p class="font-medium text-grisOscuro">Newsletter</p>
              <p class="text-sm text-grisMedio">Recibe novedades y noticias de FastMarket</p>
            </div>
            <input type="checkbox"
                   v-model="notificationSettings.newsletter"
                   class="toggle-switch accent-naranjaMedio w-12 h-6" />
          </label>
        </div>
      </div>

      <!-- Canales -->
      <div>
        <h2 class="text-lg font-semibold text-grisOscuro mb-4">Canales de notificación</h2>
        <div class="space-y-3">
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <p class="font-medium text-grisOscuro">Email</p>
              <p class="text-sm text-grisMedio">Recibe notificaciones por correo electrónico</p>
            </div>
            <input type="checkbox"
                   v-model="notificationSettings.emailNotifications"
                   class="toggle-switch accent-naranjaMedio w-12 h-6" />
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <p class="font-medium text-grisOscuro">Notificaciones push</p>
              <p class="text-sm text-grisMedio">Recibe notificaciones en tu dispositivo</p>
            </div>
            <input type="checkbox"
                   v-model="notificationSettings.pushNotifications"
                   class="toggle-switch accent-naranjaMedio w-12 h-6" />
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <p class="font-medium text-grisOscuro">SMS</p>
              <p class="text-sm text-grisMedio">Recibe notificaciones por mensaje de texto</p>
            </div>
            <input type="checkbox"
                   v-model="notificationSettings.smsNotifications"
                   class="toggle-switch accent-naranjaMedio w-12 h-6" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
