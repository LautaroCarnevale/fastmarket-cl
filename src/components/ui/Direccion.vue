<script setup>
import { useAuth } from '../../composables/useAuth';
import Input from './Input.vue';
const { user } = useAuth();


</script>


<template>
    <section>
        <section>
            <div>
                <h2>Agrega o selecinoe una dirección</h2>

                <div>
                    <span class="icon-[tabler--x]"></span>
                </div>
            </div>
            <div class="relative max-w-2xl mx-auto">
                <span class="icon-[ps--pin-map] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></span>
                <Input type="text"
                       placeholder="Buscar restaurantes o tiendas..."
                       v-model="searchQuery"
                       class="pl-10 w-full h-12 text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
        </section>

        <section>
            <article>
                <div>
                    <span class="icon-[grommet-icons--radial-selected]"></span>
                    <span class="icon-[lsicon--radio-unselected-filled]"></span>
                </div>
                <div>
                    <p>Camilo Carranza 2133, Col. Centro. Ciudad de México</p>
                </div>
                <div>
                    <span class="icon-[lucide--edit]"></span>
                    <span class="icon-[lucide--trash-2]"></span>
                </div>
            </article>
        </section>
    </section>

</template>
