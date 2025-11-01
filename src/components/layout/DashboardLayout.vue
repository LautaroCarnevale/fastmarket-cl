<template>
    <div class="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div class="flex flex-col flex-1">
            <Topbar />
            <main class="flex-1 p-6">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'
</script>
