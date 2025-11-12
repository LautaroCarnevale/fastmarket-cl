<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <Topbar />
        <main class="flex-1 p-6 mt-17">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Topbar from '../../components/layout/Topbar.vue'
</script>
