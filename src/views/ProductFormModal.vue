<template>
  <div
    v-if="show"
    class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
  >
    <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
      
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        @click="closeModal"
      >
        ✕
      </button>

      <h2 class="text-xl font-bold text-gray-800 mb-4">
        {{ isEdit ? 'Editar producto' : 'Crear producto' }}
      </h2>

      <Form
        :validationSchema="productSchema"
        :initial-values="initialValues"
        @submit="onSubmit"
        class="space-y-4"
      >
        <Field name="name" v-slot="{ field, errorMessage }">
          <Input
            v-bind="field"
            label="Nombre *"
            name="name"
            type="text"
            placeholder="Ej: Hamburguesa doble"
            :errorMessage="errorMessage"
          />
        </Field>

        <Field name="description" v-slot="{ field, errorMessage }">
          <BaseTextarea
            v-bind="field"
            label="Descripción"
            name="description"
            :rows="3"
            placeholder="Describe el producto..."
          />
          <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
            {{ errorMessage }}
          </p>
        </Field>

        <div class="grid grid-cols-3 gap-3">
          <Field name="priceAmount" v-slot="{ field, errorMessage }">
            <Input
              v-bind="field"
              label="Precio *"
              name="priceAmount"
              type="number"
              step="0.01"
              placeholder="0.00"
              :errorMessage="errorMessage"
            />
          </Field>

          <Field name="priceCurrency" v-slot="{ field, errorMessage }">
            <div class="col-span-1">
              <label class="text-sm font-medium text-gray-700 mb-1 block">
                Moneda *
              </label>
              <select
                v-bind="field"
                class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </select>
              <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
                {{ errorMessage }}
              </p>
            </div>
          </Field>

          <Field name="active" v-slot="{ field }">
            <div class="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                class="accent-orange-500"
                :checked="field.value"
                @change="field.onChange($event.target.checked)"
              />
              <span class="text-sm text-gray-700">Activo</span>
            </div>
          </Field>
        </div>


        <Field name="categoryId" v-slot="{ field, errorMessage }">
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">
              Categoría *
            </label>
            <select
              v-bind="field"
              class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Selecciona una categoría</option>
              <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
            <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
              {{ errorMessage }}
            </p>
          </div>
        </Field>

        <Field name="imageUrl" v-slot="{ field, errorMessage }">
          <Input
            v-bind="field"
            label="Imagen (URL)"
            name="imageUrl"
            type="text"
            placeholder="https://..."
            :errorMessage="errorMessage"
          />
        </Field>

        <ErrorMessage
          name="__root__"
          class="text-red-600 text-sm"
        />

        <div class="mt-4 flex justify-end gap-3">
          <Button type="button" variant="secondary" @click="closeModal">
            Cancelar
          </Button>
          <Button type="submit" variant="default">
            {{ isEdit ? 'Guardar cambios' : 'Crear producto' }}
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { productSchema } from '@/validations/vendor/productSchema';
import Input from './ui/Input.vue';
import BaseTextarea from './ui/BaseTextarea.vue';
import Button from './ui/Button.vue';
import { useVendor } from '../composables/useVendor';

const props = defineProps({
  show: { type: Boolean, default: false },
  mode: { type: String, default: 'create' }, // 'create' | 'edit'
  product: { type: Object, default: null },
});

const emit = defineEmits(['close', 'create', 'update']);

const { selectedVendor } = useVendor();

const isEdit = computed(() => props.mode === 'edit');

const categories = computed(() => selectedVendor.value?.categories || []);

const initialValues = ref(buildInitialValues());

function buildInitialValues() {
  if (props.product) {
    return {
      name: props.product.name || '',
      description: props.product.description || '',
      priceAmount: props.product.price?.amount ?? 0,
      priceCurrency: props.product.price?.currency || 'ARS',
      categoryId: props.product.categoryId || '',
      active: props.product.active ?? true,
      imageUrl: props.product.images?.[0] || '',
    };
  }

  return {
    name: '',
    description: '',
    priceAmount: 0,
    priceCurrency: 'ARS',
    categoryId: '',
    active: true,
    imageUrl: '',
  };
}

watch(
  () => props.product,
  () => {
    initialValues.value = buildInitialValues();
  },
  { immediate: true },
);

const closeModal = () => {
  emit('close');
};

const onSubmit = (values) => {
  const payload = {
    name: values.name,
    description: values.description,
    price: {
      amount: Number(values.priceAmount),
      currency: values.priceCurrency,
    },
    categoryId: values.categoryId,
    active: values.active,
    images: values.imageUrl ? [values.imageUrl] : [],
  };

  if (isEdit.value) {
    emit('update', payload);
  } else {
    emit('create', payload);
  }
};
</script>
