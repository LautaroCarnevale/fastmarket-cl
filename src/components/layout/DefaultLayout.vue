<template>
    <div class="flex flex-col min-h-screen">
        <main class="flex-1 container mx-auto px-4 py-6">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
