import api from './index'


export async function createOrder(orderData) {
    const res = await api.post('/orders', orderData)
    return res.data
}

export async function getOrderById(id) {
    const res = await api.get(`/orders/${id}`)
    return res.data
}

export async function getOrdersByCustomer(customerId) {
    const res = await api.get(`/orders/customer/${customerId}`)
    return res.data
}

export async function getOrdersByVendor(vendorId) {
    const res = await api.get(`/orders/vendor/${vendorId}`)
    return res.data
}

export async function updateOrderStatus(id, statusData) {
    const res = await api.patch(`/orders/${id}/status`, statusData)
    return res.data
}



export async function deleteOrder(id) {
    const res = await api.delete(`/orders/${id}`)
    return res.data
}



export default {
    createOrder,
    getOrderById,
    getOrdersByCustomer,
    getOrdersByVendor,
    updateOrderStatus,
    deleteOrder,
}
