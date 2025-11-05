// src/composables/useVendor.js
import { computed, ref, watch } from 'vue'
import { useVendorsStore } from '../store/vendors'

export function useVendor() {
    const store = useVendorsStore()

    // --- Estado reactivo local (solo para esta sesión del composable) ---
    const searchQuery = ref('')
    const selectedCategory = ref(null)

    // --- Estado global del store (compartido) ---
    const vendors = computed(() => store.vendors)
    const loading = computed(() => store.loading)
    const error = computed(() => store.error)
    const selectedVendor = computed(() => store.selectedVendor)

    const setSelectedVendor = (vendor) => store.setSelectedVendor(vendor)

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

    // --- Funciones del store (reusables) ---
    const fetchVendors = async (query = '') => {
        await store.fetchVendors(query)
    }

    const fetchVendorById = async (id) => {
        await store.fetchVendorById(id)
    }

    const clearSelectedVendor = () => {
        store.clearSelectedVendor()
    }

    // --- Auto-actualización: si cambia la búsqueda, vuelve a pedir ---
    watch(searchQuery, (newQuery) => {
        if (newQuery.length === 0 || newQuery.length > 2) {
            fetchVendors(newQuery)
        }
    })

    // --- Retorno del composable ---
    return {
        // Estado global (store)
        vendors,
        loading,
        error,
        selectedVendor,

        // Estado local (reacción en vista)
        searchQuery,
        selectedCategory,

        // Datos derivados
        promotedVendors,
        filteredVendors,

        // Acciones
        setSelectedVendor,
        fetchVendors,
        fetchVendorById,
        clearSelectedVendor,
    }
}
