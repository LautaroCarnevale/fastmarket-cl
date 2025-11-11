<script setup>
import { ref, computed } from "vue";
import Input from "../components/ui/Input.vue";
import Button from "../components/ui/Button.vue";
import { useVendor } from "../composables/useVendor";

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(["close", "create"]);

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

const isValid = computed(() => !!form.value.name && !!form.value.priceAmount);

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

const handleSubmit = () => {
    if (!isValid.value) return;

    const newProduct = {
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

    emit("create", newProduct);
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
                    Crear nuevo producto
                </h2>

                <form @submit.prevent="handleSubmit"
                      class="space-y-4">
                    <Input label="Nombre"
                           placeholder="Ej: Hamburguesa Clásica"
                           v-model="form.name" />

                    <Input label="Descripción"
                           placeholder="Breve descripción del producto"
                           v-model="form.description" />

                    <div class="grid grid-cols-2 gap-4">
                        <Input label="Precio"
                               type="number"
                               placeholder="Ej: 1200"
                               v-model="form.priceAmount" />
                        <Input label="Moneda"
                               placeholder="ARS"
                               v-model="form.priceCurrency" />
                    </div>

                    <div>
                        <label class="text-sm font-medium text-grisMedio">Categoría</label>
                        <select v-model="form.categoryId"
                                class="w-full mt-1 border border-grisMedio rounded-md px-3 py-2 text-grisOscuro focus:outline-none focus:ring-2 focus:ring-naranjaMedio">
                            <option value="">Seleccionar categoría</option>
                            <option v-for="cat in selectedVendor?.categories"
                                    :key="cat.id"
                                    :value="cat.id">
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>

                    <div class="flex items-center justify-between mt-2">
                        <p class="text-sm text-grisMedio">Disponible</p>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox"
                                   class="sr-only peer"
                                   v-model="form.active" />
                            <div
                                 class="group peer bg-white rounded-full duration-300 w-14 h-7 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-5 after:w-5 after:top-1 after:left-1 peer-checked:after:translate-x-7">
                            </div>
                        </label>
                    </div>

                    <Input label="Precio Promocional"
                           type="number"
                           placeholder="Ej: 900"
                           v-model="form.promoPriceAmount" />

                    <div class="grid grid-cols-2 gap-4">
                        <Input label="Inicio Promoción"
                               type="date"
                               v-model="form.promoStart" />
                        <Input label="Fin Promoción"
                               type="date"
                               v-model="form.promoEnd" />
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <Button variant="secondary"
                                type="button"
                                @click="emit('close')">
                            Cancelar
                        </Button>

                        <Button variant="default"
                                type="submit"
                                :disabled="!isValid">
                            Crear producto
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>
