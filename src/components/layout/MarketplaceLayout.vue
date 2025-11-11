<template>
    <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useVendor } from '../../composables/useVendor'
const { fetchVendors } = useVendor()



onMounted(() => {
    fetchVendors()
})





</script>
