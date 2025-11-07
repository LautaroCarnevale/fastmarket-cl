<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4 max-w-6xl">
            <!-- Breadcrumb -->
            <div class="mb-6 flex items-center gap-2 text-sm text-gray-700">
                <RouterLink to="/marketplace"
                            class="hover:text-orange-500">
                    Marketplace
                </RouterLink>
                <span class="icon-[lucide--chevron-right] w-4 h-4"></span>
                <span class="font-medium">Checkout</span>
            </div>

            <!-- Título -->
            <h1 class="text-4xl font-bold text-gray-800 mb-8">
                Finalizar pedido
            </h1>

            <!-- Carrito vacío -->
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

            <!-- Formulario -->
            <div v-else
                 class="grid lg:grid-cols-3 gap-8">
                <!-- Formulario de Checkout -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Información de entrega -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span class="icon-[lucide--map-pin] w-5 h-5 text-orange-500"></span>
                            Dirección de entrega
                        </h2>

                        <div class="space-y-4">
                            <Input v-model="deliveryAddress.street"
                                   label="Dirección completa *"
                                   name="street"
                                   type="text"
                                   placeholder="Calle y número"
                                   :error-message="errors.street" />

                            <div class="grid md:grid-cols-2 gap-4">
                                <Input v-model="deliveryAddress.city"
                                       label="Ciudad *"
                                       name="city"
                                       type="text"
                                       placeholder="Ciudad"
                                       :error-message="errors.city" />

                                <Input v-model="deliveryAddress.province"
                                       label="Provincia *"
                                       name="province"
                                       type="text"
                                       placeholder="Provincia"
                                       :error-message="errors.province" />
                            </div>

                            <Textarea v-model="deliveryAddress.notes"
                                      label="Referencias adicionales (opcional)"
                                      name="notes"
                                      :rows="2"
                                      placeholder="Ej: Casa azul, portón negro..." />
                        </div>
                    </div>

                    <!-- Información de contacto -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span class="icon-[lucide--user] w-5 h-5 text-orange-500"></span>
                            Datos de contacto
                        </h2>

                        <div class="grid md:grid-cols-2 gap-4">
                            <Input v-model="contactInfo.name"
                                   label="Nombre completo *"
                                   name="name"
                                   type="text"
                                   placeholder="Tu nombre"
                                   :error-message="errors.name" />

                            <Input v-model="contactInfo.phone"
                                   label="Teléfono *"
                                   name="phone"
                                   type="tel"
                                   placeholder="+54 11 1234-5678"
                                   :error-message="errors.phone" />
                        </div>
                    </div>

                    <!-- Método de pago -->
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

                <!-- Resumen del pedido -->
                <div class="lg:col-span-1">
                    <div class="sticky top-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">
                            Resumen del pedido
                        </h2>

                        <!-- Items -->
                        <div class="space-y-3 mb-4 max-h-64 overflow-y-auto">
                            <div v-for="item in cart"
                                 :key="item._id"
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

                        <!-- Totales -->
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

                        <!-- Botón de confirmación -->
                        <Button @click="confirmOrder"
                                :disabled="!isFormValid"
                                :loading="isProcessing"
                                variant="default"
                                size="lg"
                                full-width
                                class="mt-4">
                            <span v-if="!isProcessing"
                                  class="icon-[lucide--check] w-5 h-5"></span>
                            {{ isProcessing ? 'Procesando...' : 'Confirmar pedido' }}
                        </Button>

                        <!-- Mensaje de seguridad -->
                        <p class="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                            <span class="icon-[lucide--shield-check] w-4 h-4"></span>
                            Pago seguro y protegido
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVendor } from '../composables/useVendor'
import { useAuth } from '../composables/useAuth'
import defaultRest from '../assets/images/defaultRest.jpg'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Textarea from '../components/ui/BaseTextarea.vue'

const router = useRouter()
const { cart, cartTotal, clearCart } = useVendor()
const { user } = useAuth()

// Estado del formulario
const deliveryAddress = ref({
    street: '',
    city: '',
    province: '',
    notes: ''
})

console.log(user.value);

const contactInfo = ref({
    name: user.value?.name || '',
    phone: '',
    email: user.value?.email || ''
})

const selectedPaymentMethod = ref('cash')
const isProcessing = ref(false)

// Errores de validación
const errors = ref({
    street: '',
    city: '',
    province: '',
    name: '',
    phone: ''
})

const paymentMethods = [
    { id: 'cash', name: 'Efectivo', icon: 'wallet' },
    { id: 'card', name: 'Tarjeta de crédito/débito', icon: 'credit-card' },
    { id: 'transfer', name: 'Transferencia bancaria', icon: 'building-2' }
]

// Cálculos
const deliveryFee = 300
const totalWithDelivery = computed(() => cartTotal.value + deliveryFee)

// Validación del formulario
const isFormValid = computed(() => {
    return (
        deliveryAddress.value.street.trim() !== '' &&
        deliveryAddress.value.city.trim() !== '' &&
        deliveryAddress.value.province.trim() !== '' &&
        contactInfo.value.name.trim() !== '' &&
        contactInfo.value.phone.trim() !== '' &&
        cart.value.length > 0
    )
})

// Validar campos individualmente
const validateForm = () => {
    errors.value = {
        street: '',
        city: '',
        province: '',
        name: '',
        phone: ''
    }

    let isValid = true

    if (!deliveryAddress.value.street.trim()) {
        errors.value.street = 'La dirección es requerida'
        isValid = false
    }

    if (!deliveryAddress.value.city.trim()) {
        errors.value.city = 'La ciudad es requerida'
        isValid = false
    }

    if (!deliveryAddress.value.province.trim()) {
        errors.value.province = 'La provincia es requerida'
        isValid = false
    }

    if (!contactInfo.value.name.trim()) {
        errors.value.name = 'El nombre es requerido'
        isValid = false
    }

    if (!contactInfo.value.phone.trim()) {
        errors.value.phone = 'El teléfono es requerido'
        isValid = false
    } else if (!/^\+?\d{10,}$/.test(contactInfo.value.phone.replace(/[\s-]/g, ''))) {
        errors.value.phone = 'Formato de teléfono inválido'
        isValid = false
    }

    return isValid
}

// Confirmar pedido
const confirmOrder = async () => {
    if (!validateForm()) return

    isProcessing.value = true

    try {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Aquí harías la llamada real a tu backend
        // const orderData = {
        //     items: cart.value,
        //     deliveryAddress: deliveryAddress.value,
        //     contactInfo: contactInfo.value,
        //     paymentMethod: selectedPaymentMethod.value,
        //     total: totalWithDelivery.value
        // }
        // const response = await axios.post('/api/orders', orderData)

        // Limpiar carrito
        clearCart()

        // Redirigir a página de éxito
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
