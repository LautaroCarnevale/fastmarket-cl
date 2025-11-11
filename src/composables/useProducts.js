import { computed, ref } from 'vue'
import { useProductsStore } from '../store/products'

export function useProduct() {
    const store = useProductsStore()

    const searchQuery = ref('')
    const selectedCategory = ref(null)

    const products = computed(() => store.products)
    const selectedProduct = computed(() => store.selectedProduct)
    const loading = computed(() => store.loading)
    const error = computed(() => store.error)

    const filteredProducts = computed(() => {
        let result = products.value

        if (selectedCategory.value) {
            result = result.filter(
                (p) => p.categoryId?.toString() === selectedCategory.value.toString()
            )
        }

        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase()
            result = result.filter((p) => p.name.toLowerCase().includes(query))
        }

        return result
    })

    const fetchProducts = async (vendorId) => {
        await store.fetchProducts(vendorId)
    }

    const fetchProductById = async (id) => {
        await store.fetchProductById(id)
    }

    const createProduct = async (data) => {
        return await store.createProduct(data)
    }

    const updateProduct = async (id, data) => {
        return await store.updateProduct(id, data)
    }

    const deleteProduct = async (id) => {
        await store.deleteProduct(id)
    }

    const setSelectedProduct = (product) => {
        store.setSelectedProduct(product)
    }

    const clearSelectedProduct = () => {
        store.clearSelectedProduct()
    }

    return {
        // Estado global
        products,
        selectedProduct,
        loading,
        error,

        // Estado local
        searchQuery,
        selectedCategory,

        // Derivados
        filteredProducts,

        // Acciones
        fetchProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        setSelectedProduct,
        clearSelectedProduct
    }
}
