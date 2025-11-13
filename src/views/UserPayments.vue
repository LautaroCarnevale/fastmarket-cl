<script setup>
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'

const paymentMethods = ref([
    { id: 1, type: 'card', last4: '4242', brand: 'Visa', expiry: '12/25' },
    { id: 2, type: 'card', last4: '5555', brand: 'Mastercard', expiry: '08/26' }
])

const addPaymentMethod = () => {
    console.log('Agregar método de pago')
}

const removePayment = (id) => {
    if (confirm('¿Deseas eliminar este método de pago?')) {
        paymentMethods.value = paymentMethods.value.filter(p => p.id !== id)
    }
}
</script>

<template>
    <div class="bg-blanco rounded-lg shadow-soft p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-grisOscuro">Pagos</h1>
            <Button @click="addPaymentMethod"
                    variant="default">
                + Agregar método de pago
            </Button>
        </div>

        <div class="space-y-4">
            <div v-for="payment in paymentMethods"
                    :key="payment.id"
                    class="border border-grisBajo rounded-lg p-4 flex justify-between items-center hover:border-naranjaMedio transition-colors">
                <div class="flex items-center gap-4">
                    <div
                            class="w-12 h-12 bg-linear-to-br from-naranjaMedio to-naranjaAlto rounded-lg flex items-center justify-center text-blanco font-bold">
                        💳
                    </div>
                    <div>
                        <p class="font-semibold text-grisOscuro">{{ payment.brand }} •••• {{ payment.last4 }}</p>
                        <p class="text-sm text-grisMedio">Expira: {{ payment.expiry }}</p>
                    </div>
                </div>
                <Button @click="removePayment(payment.id)"
                        variant="ghost"
                        size="sm">
                    Eliminar
                </Button>
            </div>

            <div v-if="paymentMethods.length === 0"
                    class="text-center py-12 text-grisMedio">
                <p>No tienes métodos de pago registrados</p>
                <p class="text-sm">Agrega uno para realizar tus pedidos más rápido</p>
            </div>
        </div>
    </div>
</template>
