import { computed, ref } from 'vue'
import { useVendorsStore } from '../store/vendors'

export function useVendor() {
    const store = useVendorsStore()

    const searchQuery = ref('')
    const selectedCategory = ref(null)

    const vendors = computed(() => store.vendors)
    const cart = computed(() => store.cart)
    const loading = computed(() => store.loading)
    const error = computed(() => store.error)
    const selectedVendor = computed(() => store.selectedVendor)

    const cartTotal = computed(() => store.cartTotal)
    const cartItemsCount = computed(() => store.cartItemsCount)

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

    const fetchVendors = async () => {
        await store.fetchVendors()
    }

    const fetchVendorById = async (id) => {
        await store.fetchVendorById(id)
    }

    const fetchVendorByOwnerId = async (id) => {
        await store.fetchVendorByOwnerId(id)
    }

    const setSelectedVendor = (vendor) => {
        store.setSelectedVendor(vendor)
    }

    const clearSelectedVendor = () => {
        store.clearSelectedVendor()
    }

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

    return {
        vendors,
        cart,
        loading,
        error,
        selectedVendor,

        searchQuery,
        selectedCategory,

        promotedVendors,
        filteredVendors,
        cartTotal,
        cartItemsCount,

        setSelectedVendor,
        clearSelectedVendor,
        fetchVendors,
        fetchVendorById,
        fetchVendorByOwnerId,
        
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        removeItemFromCart
    }
}
