import { computed } from 'vue'
import { useDriversStore } from '../store/drivers'

export function useDriver() {
    const store = useDriversStore()

    const driver = computed(() => store.driver)
    const stats = computed(() => store.stats)
    const orders = computed(() => store.orders)
    const loading = computed(() => store.loading)
    const error = computed(() => store.error)

    const availableOrders = computed(() => store.availableOrders)
    const activeOrders = computed(() => store.activeOrders)
    const completedOrders = computed(() => store.completedOrders)

    const fetchDriverProfile = async (id) => {
        await store.fetchDriverProfile(id)
    }

    const fetchDriverStats = async (id) => {
        await store.fetchDriverStats(id)
    }

    const fetchDriverOrders = async (driverId) => {
        await store.fetchDriverOrders(driverId)
    }

    const fetchOrdersForDriver = async () => {
        await store.fetchOrderForDrivers()
    }


    return {
        driver,
        stats,
        orders,
        loading,
        error,
        availableOrders,
        activeOrders,
        completedOrders,
        fetchDriverProfile,
        fetchDriverStats,
        fetchDriverOrders,
        fetchOrdersForDriver,
    }
}
