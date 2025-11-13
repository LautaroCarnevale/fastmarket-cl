<template>
    <section class="min-h-screen container mx-auto px-4 py-8">
        <div v-if="selectedVendor">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-semibold text-grisOscuro">Productos</h1>
                <Button variant="default"
                        @click="showCreateModal = true">
                    Agregar producto
                </Button>
            </div>

            <div class="overflow-x-auto bg-blanco rounded-xl shadow-sm border border-grisMedio/30">
                <table class="min-w-full border-collapse">
                    <thead class="bg-blancoBajo">
                        <tr class="text-left text-sm text-grisAlto border-b border-grisMedio/30">
                            <th class="py-3 px-4 font-semibold">Nombre</th>
                            <th class="py-3 px-4 font-semibold">Precio</th>
                            <th class="py-3 px-4 font-semibold">Categoría</th>
                            <th class="py-3 px-4 font-semibold">Disponibilidad</th>
                            <th class="py-3 px-4 font-semibold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="product in products"
                            :key="product.id"
                            class="border-b border-grisMedio/30 hover:bg-blancoBajo transition">
                            <td class="py-3 px-4 font-medium text-grisOscuro">
                                {{ product.name }}
                            </td>
                            <td class="py-3 px-4 text-grisOscuro">
                                {{ product.price?.amount }} {{ product.price?.currency }}
                            </td>
                            <td class="py-3 px-4 text-grisAlto">
                                {{ getCategoryName(product.categoryId) }}
                            </td>
                            <td class="py-3 px-4">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox"
                                            class="sr-only peer"
                                            v-model="product.active"
                                            @change="toggleProductActive(product)" />
                                    <div
                                            class="group peer bg-white rounded-full duration-300 w-14 h-7 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-5 after:w-5 after:top-1 after:left-1 peer-checked:after:translate-x-7">
                                    </div>
                                </label>
                            </td>
                            <td class="py-3 px-4 text-right flex gap-2">
                                <button @click="editProduct(product)"
                                        class="text-azulBajo hover:text-azulAlto p-2 hover:bg-grisMedio/40 flex items-center justify-center rounded-md">
                                    <span class="icon-[akar-icons--edit] w-6 h-6"></span>
                                </button>
                                <button @click="eliminarProducto(product.id)"
                                        class="text-azulBajo hover:text-azulAlto p-2 hover:bg-grisMedio/40 flex items-center justify-center rounded-md">
                                    <span class="icon-[iconamoon--trash] w-6 h-6 text-red-500"></span>
                                </button>
                            </td>
                        </tr>

                        <tr v-if="products.length === 0">
                            <td colspan="5"
                                class="text-center py-6 text-grisMedio italic">
                                No hay productos cargados.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else
                class="text-center py-10 text-grisMedio">
            Cargando comercio...
        </div>
    </section>

    <ProductFormModal :show="showCreateModal"
                        mode="create"
                        @close="showCreateModal = false"
                        @create="handleCreateProduct" />

    <ProductFormModal :show="showEditModal"
                        mode="edit"
                        :product="selectedProductToEdit"
                        @close="showEditModal = false"
                        @update="handleUpdateProduct" />
</template>

<script setup>
import { ref } from "vue";
import ProductFormModal from "../components/ProductFormModal.vue";
import Button from "../components/ui/Button.vue";
import { useVendor } from "../composables/useVendor";
import { useProduct } from "../composables/useProducts";

const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedProductToEdit = ref(null);

const { selectedVendor } = useVendor();
const { createProduct, updateStatusProduct, deleteProduct, updateProduct, products } = useProduct();

const getCategoryName = (categoryId) => {
    const category = selectedVendor.value?.categories?.find(
        (c) => c.id?.toString() === categoryId?.toString()
    );
    return category ? category.name : "Sin categoría";
};

const handleCreateProduct = (newProduct) => {
    createProduct(newProduct);
    showCreateModal.value = false;
};

const handleUpdateProduct = async (updatedData) => {
    await updateProduct(selectedProductToEdit.value.id, updatedData);
    showEditModal.value = false;
    selectedProductToEdit.value = null;
};

const eliminarProducto = async (productId) => {
    try {
        await deleteProduct(productId);
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar el producto");
    }
};

const toggleProductActive = async (product) => {
    try {
        await updateStatusProduct(product.id, {
            ...product,
            active: product.active
        });

    } catch (error) {
        product.active = !product.active;
        console.error('Error al actualizar producto:', error);
        alert('Error al actualizar el producto');
    }
};

const editProduct = (product) => {
    selectedProductToEdit.value = product;
    showEditModal.value = true;
};
</script>
