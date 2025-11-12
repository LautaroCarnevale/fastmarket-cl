<template>
    <section v-if="isOpen"
             class="fixed inset-0 z-50 flex items-start justify-end"
             @click="closeMenu">
        <div class="fixed bg-white top-[70px] right-[25px] w-[250px] rounded-xl shadow-md border border-gray-300 p-2 z-60 animate-fadeIn"
             @click.stop>
            <header class="px-5 py-4 border-b border-gray-200">
                <p class="text-lg font-medium text-gray-800 truncate">{{ user.name + ' ' + user.surname }}</p>
                <p class="text-sm mt-1 inline-block bg-blue-600 text-white rounded px-2 py-0.5">
                    {{ userRole }}
                </p>
            </header>

            <nav class="w-full">
                <ul class="list-none p-0 m-0 text-gray-700">
                    <li v-if="userRole.value === ROLES.USER">
                        <RouterLink @click="closeMenu"
                                    to="marketplace/account"
                                    class="flex justify-between items-center w-full px-5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            Mi cuenta
                            <span class="icon-[lucide--edit] w-5 h-5"></span>
                        </RouterLink>

                        <RouterLink @click="closeMenu"
                                    to="marketplace/orders"
                                    class="flex justify-between items-center w-full px-5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            Mis pedidos
                            <span class="icon-[lucide--package] w-5 h-5"></span>
                        </RouterLink>
                    </li>

                    <hr v-if="userRole.value === ROLES.USER"
                        class="border-gray-200 my-2 mx-auto w-11/12" />

                    <li>
                        <button @click="closeMenu"
                                class="flex justify-between items-center w-full text-left px-5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            Tema
                        </button>
                    </li>

                    <hr class="border-gray-200 my-2 mx-auto w-11/12" />

                    <li>
                        <RouterLink @click="closeMenu"
                                    to="/"
                                    target="_blank"
                                    class="flex justify-between items-center w-full px-5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            Página principal
                            <span class="icon-[lucide--wind] w-5 h-5"></span>
                        </RouterLink>
                    </li>

                    <li>
                        <button @click="onLogout"
                                class="flex justify-between items-center w-full text-left px-5 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
                            Cerrar sesión
                            <span class="icon-[lucide--log-out] w-5 h-5"></span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script setup>
import { computed, ref, } from 'vue'
import { useAuth } from '../composables/useAuth'
import { ROLES } from '../constants/roles'

const auth = useAuth()

const isOpen = ref(false)

const user = computed(() => auth.user.value)
const userRole = computed(() => auth.role)

const openMenu = () => (isOpen.value = true)
const closeMenu = () => (isOpen.value = false)

const onLogout = () => {
    auth.logout()
    closeMenu()
}

defineExpose({ openMenu, closeMenu })
</script>
