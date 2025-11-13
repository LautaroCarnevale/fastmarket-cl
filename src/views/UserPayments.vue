<script setup>
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { paymentMethodSchema } from '@/validation/user/paymentMethodSchema'


const paymentMethods = ref([
  { id: 1, type: 'card', last4: '4242', brand: 'Visa', expiry: '12/25' },
  { id: 2, type: 'card', last4: '5555', brand: 'Mastercard', expiry: '08/26' }
])

const showForm = ref(false)
const isSubmitting = ref(false)

const paymentForm = ref({
  cardNumber: '',
  nameOnCard: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: ''
})

const addPaymentMethod = () => {
  showForm.value = true
}


const removePayment = (id) => {
  if (confirm('¿Deseas eliminar este método de pago?')) {
    paymentMethods.value = paymentMethods.value.filter(p => p.id !== id)
  }
}


const handleSubmit = (values, { resetForm }) => {
  isSubmitting.value = true

  const last4 = values.cardNumber.slice(-4)

  paymentMethods.value.push({
    id: Date.now(),
    type: 'card',
    last4,
    brand: 'Tarjeta',
    expiry: `${values.expiryMonth}/${values.expiryYear.slice(-2)}`
  })

  resetForm()
  paymentForm.value = {
    cardNumber: '',
    nameOnCard: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  }
  showForm.value = false
  isSubmitting.value = false
}

const cancelForm = () => {
  showForm.value = false
}
</script>

<template>
<<<<<<< HEAD
  <div class="bg-blanco rounded-lg shadow-soft p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-grisOscuro">Pagos</h1>
      <Button @click="addPaymentMethod"
              variant="default">
        + Agregar método de pago
      </Button>
=======
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
>>>>>>> eliminar
    </div>


    <Form v-if="showForm"
          :validationSchema="paymentMethodSchema"
          @submit="handleSubmit"
          class="space-y-4 mb-6 border border-grisBajo rounded-lg p-4">
      <div class="grid grid-cols-2 gap-4">
        <Field name="cardNumber"
               v-slot="{ field, errorMessage }">
          <Input v-bind="field"
                 v-model="paymentForm.cardNumber"
                 label="Número de tarjeta"
                 name="cardNumber"
                 placeholder="1234 5678 9012 3456"
                 :errorMessage="errorMessage" />
        </Field>

        <Field name="nameOnCard"
               v-slot="{ field, errorMessage }">
          <Input v-bind="field"
                 v-model="paymentForm.nameOnCard"
                 label="Nombre en la tarjeta"
                 name="nameOnCard"
                 placeholder="Nombre y apellido"
                 :errorMessage="errorMessage" />
        </Field>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <Field name="expiryMonth"
               v-slot="{ field, errorMessage }">
          <Input v-bind="field"
                 v-model="paymentForm.expiryMonth"
                 label="Mes"
                 name="expiryMonth"
                 placeholder="MM"
                 :errorMessage="errorMessage" />
        </Field>

        <Field name="expiryYear"
               v-slot="{ field, errorMessage }">
          <Input v-bind="field"
                 v-model="paymentForm.expiryYear"
                 label="Año"
                 name="expiryYear"
                 placeholder="YYYY"
                 :errorMessage="errorMessage" />
        </Field>

        <Field name="cvv"
               v-slot="{ field, errorMessage }">
          <Input v-bind="field"
                 v-model="paymentForm.cvv"
                 label="CVV"
                 name="cvv"
                 placeholder="123"
                 :errorMessage="errorMessage" />
        </Field>
      </div>

      <ErrorMessage name="__root__"
                    class="text-red-600 text-sm" />

      <div class="flex gap-3 pt-2">
        <Button type="submit"
                variant="default"
                :loading="isSubmitting">
          Guardar método de pago
        </Button>
        <Button type="button"
                variant="secondary"
                @click="cancelForm">
          Cancelar
        </Button>
      </div>
    </Form>


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
