import { computed, ref } from 'vue'
import { useVendorsStore } from '../store/vendors'

export function useVendor() {
    const store = useVendorsStore()

    // --- Estado reactivo local (solo para esta sesión del composable) ---
    const searchQuery = ref('')
    const selectedCategory = ref(null)

    // --- Estado global del store (compartido) ---
    const vendors = computed(() => store.vendors)
    const cart = computed(() => store.cart)
    const loading = computed(() => store.loading)
    const error = computed(() => store.error)
    const selectedVendor = computed(() => store.selectedVendor)

    // Getters del carrito
    const cartTotal = computed(() => store.cartTotal)
    const cartItemsCount = computed(() => store.cartItemsCount)

    // --- Lógica extendida ---
    const promotedVendors = computed(() => store.promotedVendors)
    const filteredVendors = computed(() => {
        let result = vendors.value

        if (selectedCategory.value) {
            result = result.filter(
                (v) => v.category === selectedCategory.value
            )
        }

        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase()
            result = result.filter(
                (v) => v.name.toLowerCase().includes(query)
            )
        }

        return result
    })

    // --- Funciones del store ---
    const fetchVendors = async () => {
        await store.fetchVendors()
    }

    const fetchVendorById = async (id) => {
        await store.fetchVendorById(id)
    }

    const setSelectedVendor = (vendor) => {
        store.setSelectedVendor(vendor)
    }

    const clearSelectedVendor = () => {
        store.clearSelectedVendor()
    }

    // --- Funciones del carrito ---
    const addToCart = (product) => {
        store.addToCart(product)
    }

    const removeFromCart = (productId) => {
        store.removeFromCart(productId)
    }

    const updateQuantity = (productId, quantity) => {
        store.updateQuantity(productId, quantity)
    }

    const clearCart = () => {
        store.clearCart()
    }

    const getItemQuantity = (productId) => {
        return store.getItemQuantity(productId)
    }

    const removeItemFromCart = (productId) => {
        store.removeItemFromCart(productId)
    }

    // --- Retorno del composable ---
    return {
        // Estado global (store)
        vendors,
        cart,
        loading,
        error,
        selectedVendor,

        // Estado local (reacción en vista)
        searchQuery,
        selectedCategory,

        // Datos derivados
        promotedVendors,
        filteredVendors,
        cartTotal,
        cartItemsCount,

        // Acciones
        setSelectedVendor,
        clearSelectedVendor,
        fetchVendors,
        fetchVendorById,

        // Acciones del carrito
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        removeItemFromCart
    }
}
