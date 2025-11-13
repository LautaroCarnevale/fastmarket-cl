<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="mb-6 flex items-center gap-2 text-sm text-gray-700">
                <RouterLink to="/marketplace"
                            class="hover:text-orange-500">
                    Marketplace
                </RouterLink>
                <span class="icon-[lucide--chevron-right] w-4 h-4"></span>
                <span class="font-medium">Checkout</span>
            </div>

            <h1 class="text-4xl font-bold text-gray-800 mb-8">
                Finalizar pedido
            </h1>

            <div v-if="cart.length === 0"
                    class="text-center py-20">
                <span class="icon-[lucide--shopping-cart] w-20 h-20 text-gray-300 mx-auto mb-4"></span>
                <h3 class="text-xl font-bold text-gray-600 mb-2">
                    Tu carrito está vacío
                </h3>
                <p class="text-gray-500 mb-6">
                    Agrega productos desde el marketplace
                </p>
                <RouterLink to="/marketplace">
                    <Button variant="default"
                            size="lg">
                        <span class="icon-[lucide--shopping-bag] w-5 h-5"></span>
                        Ir al marketplace
                    </Button>
                </RouterLink>
            </div>

            <div v-else
                    class="grid lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span class="icon-[lucide--map-pin] w-5 h-5 text-orange-500"></span>
                            Dirección de entrega
                        </h2>

                        <div class="space-y-4">
                            <div>
                                <p>
                                    {{
                                        addressClient.street + ', ' + addressClient.city + ', ' + addressClient.province
                                    }}
                                </p>
                            </div>

                            <Textarea v-model="deliveryNotes"
                                        label="Referencias adicionales (opcional)"
                                        name="notes"
                                        :rows="2"
                                        placeholder="Ej: Casa azul, portón negro..." />
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span class="icon-[lucide--user] w-5 h-5 text-orange-500"></span>
                            Datos de contacto
                        </h2>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="md:col-span-2 grid grid-cols-2 gap-4">
                                <Input v-model="contactInfo.name"
                                       label="Nombre completo *"
                                        name="name"
                                        type="text"
                                        placeholder="Tu nombre"
                                        :error-message="errors.name" />
                                <Input v-model="contactInfo.surname"
                                       label="Apellido *"
                                        name="surname"
                                        type="text"
                                        placeholder="Tu apellido"
                                        :error-message="errors.surname" />
                            </div>

                            <Input class="md:col-span-2"
                                    v-model="contactInfo.phone"
                                    label="Teléfono *"
                                    name="phone"
                                    type="tel"
                                    placeholder="+54 11 1234-5678"
                                    :error-message="errors.phone" />
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span class="icon-[lucide--credit-card] w-5 h-5 text-orange-500"></span>
                            Método de pago
                        </h2>

                        <div class="space-y-3">
                            <label v-for="method in paymentMethods"
                                    :key="method.id"
                                    :class="[
                                    'flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all',
                                    selectedPaymentMethod === method.id
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                ]">
                                <input type="radio"
                                        :value="method.id"
                                        v-model="selectedPaymentMethod"
                                        class="w-4 h-4 text-orange-500 focus:ring-orange-500" />
                                <span :class="`icon-[lucide--${method.icon}] w-5 h-5`"></span>
                                <span class="font-medium">{{ method.name }}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="sticky top-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">
                            Resumen del pedido
                        </h2>

                        <div class="space-y-3 mb-4 max-h-64 overflow-y-auto">
                            <div v-for="item in cart"
                                    :key="item.id"
                                    class="flex gap-3 pb-3 border-b border-gray-100">
                                <img :src="item.images?.[0] || defaultRest"
                                        :alt="item.name"
                                        class="w-16 h-16 object-cover rounded-md" />
                                <div class="flex-1 min-w-0">
                                    <p class="font-medium text-sm text-gray-800 truncate">
                                        {{ item.name }}
                                    </p>
                                    <p class="text-xs text-gray-500 mt-1">
                                        ${{ item.price.amount }} × {{ item.quantity }}
                                    </p>
                                    <p class="text-sm font-semibold text-orange-500 mt-1">
                                        ${{ (item.price.amount * item.quantity).toFixed(2) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2 py-4 border-t border-gray-200">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Subtotal</span>
                                <span class="font-medium">${{ cartTotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Envío</span>
                                <span class="font-medium">${{ deliveryFee }}</span>
                            </div>
                            <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span class="text-orange-500">${{ totalWithDelivery.toFixed(2) }}</span>
                            </div>
                        </div>

                        <Button @click="confirmOrder"
                                variant="default"
                                size="lg"
                                full-width
                                class="mt-4">
                            <span v-if="!isProcessing"
                                    class="icon-[lucide--check] w-5 h-5"></span>
                            {{ isProcessing ? 'Procesando...' : 'Confirmar pedido' }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVendor } from '../../composables/useVendor'
import { useAuth } from '../../composables/useAuth'
import defaultRest from '../assets/images/defaultRest.jpg'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Textarea from '../components/ui/BaseTextarea.vue'
import { useOrders } from '../../composables/useOrders'

const router = useRouter()
const { cart, cartTotal, clearCart, selectedVendor } = useVendor()
const { createOrder } = useOrders()
const { user } = useAuth()

const addressClient = user.value?.addresses.find((a) => a.select)

const deliveryNotes = ref('')

const contactInfo = ref({
    name: user.value?.name || '',
    surname: user.value?.surname || '',
    phone: ''
})

const selectedPaymentMethod = ref('cash')
const isProcessing = ref(false)

const errors = ref({
    name: '',
    phone: ''
})

const paymentMethods = [
    { id: 'cash', name: 'Efectivo', icon: 'wallet' },
    { id: 'card', name: 'Tarjeta de crédito/débito', icon: 'credit-card' },
    { id: 'transfer', name: 'Transferencia bancaria', icon: 'building-2' }
]

const deliveryFee = 300
const taxesAmount = 0
const totalWithDelivery = computed(() => cartTotal.value + deliveryFee + taxesAmount)

const confirmOrder = async () => {
    isProcessing.value = true

    try {
        const orderData = {
            customerId: user.value.id,
            vendorId: selectedVendor.value.id,
            items: cart.value.map(item => ({
                vendorId: selectedVendor.value.id,
                productName: item.name,
                productId: item.id,
                unitPrice: {
                    amount: item.price.amount,
                    currency: item.price.currency || 'ARS'
                },
                quantity: item.quantity,
                notes: item.notes || null
            })),
            deliveryAddress: {
                street: addressClient.street,
                city: addressClient.city,
                province: addressClient.province,
                select: addressClient.select,
                extra: deliveryNotes.value || null
            },
            payment: {
                method: selectedPaymentMethod.value,
                subtotal: {
                    amount: cartTotal.value,
                    currency: 'ARS'
                },
                deliveryFee: {
                    amount: deliveryFee,
                    currency: 'ARS'
                },
                taxes: {
                    amount: taxesAmount,
                    currency: 'ARS'
                },
                total: {
                    amount: totalWithDelivery.value,
                    currency: 'ARS'
                },
                paid: false
            },
            status: 'pending',
            timeline: [
                {
                    status: 'pending',
                    at: new Date(),
                    by: user.value.id,
                    note: 'Orden creada'
                }
            ]
        }

        createOrder(orderData)
        router.push({
            name: 'UserOrders',
            query: { success: 'true' }
        })
    } catch (error) {
        console.error('Error al procesar el pedido:', error)
        alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.')
    } finally {
        isProcessing.value = false
    }
}
</script>
