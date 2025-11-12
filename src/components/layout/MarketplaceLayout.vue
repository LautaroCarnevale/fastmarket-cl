<template>
    <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useVendor } from '../../composables/useVendor'
import { useOrders } from '../../composables/useOrders'
import { useAuth } from '../../composables/useAuth'
const { user } = useAuth()
const { fetchVendors } = useVendor()
const { fetchOrdersByUser, orders } = useOrders()


onMounted(() => {
    fetchVendors()
    if(!user.value) return
    fetchOrdersByUser(user.value?.id)    
})


</script>
