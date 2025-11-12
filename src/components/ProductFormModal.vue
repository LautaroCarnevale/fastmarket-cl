<script setup>
import { ref, computed, watch } from "vue";
import Input from "../components/ui/Input.vue";
import Button from "../components/ui/Button.vue";
import { useVendor } from "../composables/useVendor";
import { Form, Field } from "vee-validate";

const props = defineProps({
    show: Boolean,
    mode: {
        type: String,
        default: "create",
    },
    product: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["close", "create", "update"]);

const { selectedVendor } = useVendor();

const form = ref({
    name: "",
    description: "",
    priceAmount: "",
    priceCurrency: "ARS",
    categoryId: "",
    active: true,
    promoPriceAmount: "",
    promoStart: "",
    promoEnd: "",
});


const resetForm = () => {
    form.value = {
        name: "",
        description: "",
        priceAmount: "",
        priceCurrency: "ARS",
        categoryId: "",
        active: true,
        promoPriceAmount: "",
        promoStart: "",
        promoEnd: "",
    };
};

watch(
    () => props.product,
    (newVal) => {
        if (props.mode === "edit" && newVal) {
            form.value = {
                name: newVal.name || "",
                description: newVal.description || "",
                priceAmount: newVal.price?.amount?.toString() || "",
                priceCurrency: newVal.price?.currency || "ARS",
                categoryId: newVal.categoryId || "",
                active: newVal.active ?? true,
                promoPriceAmount: newVal.promoPrice?.amount?.toString() || "",
                promoStart: newVal.promoStart || "",
                promoEnd: newVal.promoEnd || "",
            };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

const handleSubmit = () => {

    const productData = {
        name: form.value.name,
        description: form.value.description,
        price: {
            amount: parseFloat(form.value.priceAmount),
            currency: form.value.priceCurrency,
        },
        active: form.value.active,
        categoryId: form.value.categoryId || null,
        vendorId: selectedVendor.value?.id,
        promoPrice: form.value.promoPriceAmount
            ? {
                amount: parseFloat(form.value.promoPriceAmount),
                currency: form.value.priceCurrency,
            }
            : null,
        promoStart: form.value.promoStart || null,
        promoEnd: form.value.promoEnd || null,
    };

    if (props.mode === "edit") {
        emit("update", productData);
    } else {
        emit("create", productData);
    }

    resetForm();
    emit("close");
};
</script>

<template>
    <transition name="fade">
        <div v-if="show"
             class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div class="bg-blanco w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
                <button class="absolute top-3 right-3 text-grisMedio hover:text-grisOscuro text-xl"
                        @click="emit('close')">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <h2 class="text-xl font-semibold text-grisOscuro mb-4">
                    {{ mode === "edit" ? "Editar producto" : "Crear nuevo producto" }}
                </h2>

                <Form @submit="handleSubmit"
                      class="space-y-4">
                    <Field name="name"
                           v-slot="{ field, errorMessage }">
                        <Input label="Nombre"
                               placeholder="Ej: Hamburguesa"
                               v-model="form.name"
                               v-bind="field"
                               :errorMessage="errorMessage" />
                    </Field>

                    <Field name="description"
                           v-slot="{ field, errorMessage }">
                        <Input label="Descripción"
                               placeholder="Breve descripción del producto"
                               v-model="form.description"
                               v-bind="field"
                               :errorMessage="errorMessage" />
                    </Field>

                    <div class="grid grid-cols-2 gap-4">
                        <Field name="priceAmount"
                               v-slot="{ field, errorMessage }">
                            <Input label="Precio"
                                   type="number"
                                   placeholder="Ej: 1200"
                                   v-model="form.priceAmount"
                                   v-bind="field"
                                   :errorMessage="errorMessage" />
                        </Field>

                        <Field name="priceCurrency"
                               v-slot="{ field, errorMessage }">
                            <Input label="Moneda"
                                   placeholder="ARS"
                                   v-model="form.priceCurrency"
                                   v-bind="field"
                                   :errorMessage="errorMessage" />
                        </Field>
                    </div>

                    <Field name="categoryId"
                           v-slot="{ field, errorMessage }">
                        <div>
                            <label class="text-sm font-medium text-grisMedio">Categoría</label>
                            <select v-model="form.categoryId"
                                    v-bind="field"
                                    class="w-full mt-1 border rounded-md px-3 py-2"
                                    :class="errorMessage ? 'border-red-500' : 'border-grisMedio'">
                                <option value="">Seleccionar categoría</option>
                                <option v-for="cat in selectedVendor?.categories"
                                        :key="cat.id"
                                        :value="cat.id">
                                    {{ cat.name }}
                                </option>
                            </select>
                            <p v-if="errorMessage"
                               class="text-red-500 text-xs mt-1">
                                {{ errorMessage }}
                            </p>
                        </div>
                    </Field>

                    <Field name="active"
                           v-slot="{ field }">
                        <div class="flex justify-between items-center">
                            <p class="text-sm text-grisMedio">Disponible</p>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox"
                                       class="sr-only peer"
                                       v-model="form.active"
                                       v-bind="field" />
                                <div
                                     class="group peer bg-white rounded-full duration-300 w-14 h-7 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-5 after:w-5 after:top-1 after:left-1 peer-checked:after:translate-x-7">
                                </div>
                            </label>
                        </div>
                    </Field>

                    <Field name="promoPriceAmount"
                           v-slot="{ field, errorMessage }">
                        <Input label="Precio Promocional"
                               type="number"
                               placeholder="Ej: 900"
                               v-model="form.promoPriceAmount"
                               v-bind="field"
                               :errorMessage="errorMessage" />
                    </Field>

                    <div class="grid grid-cols-2 gap-4">
                        <Field name="promoStart"
                               v-slot="{ field, errorMessage }">
                            <Input label="Inicio Promoción"
                                   type="date"
                                   v-model="form.promoStart"
                                   v-bind="field"
                                   :errorMessage="errorMessage" />
                        </Field>

                        <Field name="promoEnd"
                               v-slot="{ field, errorMessage }">
                            <Input label="Fin Promoción"
                                   type="date"
                                   v-model="form.promoEnd"
                                   v-bind="field"
                                   :errorMessage="errorMessage" />
                        </Field>
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <Button variant="secondary"
                                @click="emit('close')">Cancelar</Button>
                        <Button type="submit">
                            {{ mode === 'edit' ? 'Guardar cambios' : 'Crear producto' }}
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    </transition>
</template>
