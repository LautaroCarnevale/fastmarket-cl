import api from './index'


export async function getOrdersForDriver() {
    const res = await api.get('/orders/available')    
    return res.data
}




export async function createDriver(driverData) {
    const res = await api.post('/drivers/create', driverData)
    return res.data
}

export async function updateDriver(id, driverData) {
    const res = await api.post(`/drivers/update/${id}`, driverData)
    return res.data
}

export async function deleteDriver(id) {
    const res = await api.delete(`/drivers/delete/${id}`)
    return res.data
}

export async function getDriverById(id) {
    const res = await api.get(`/drivers/find/${id}`)
    return res.data
}

export async function getAllDrivers() {
    const res = await api.get('/drivers/admin/all')
    return res.data
}

export async function getDriversByStatus(status) {
    const res = await api.get(`/drivers/admin/status/${status}`)
    return res.data
}

export async function getDriverProfile(id) {
    const res = await api.get(`/drivers/profile/${id}`)
    return res.data
}

export async function getDriverStats(id) {
    const res = await api.get(`/drivers/stats/${id}`)
    return res.data
}


export async function getDriverRating(id) {
    const res = await api.get(`/drivers/rating/${id}`)
    return res.data
}

export async function assignOrder(driverId, orderId) {
    const res = await api.post(`/drivers/assign-order/${driverId}`, { orderId })
    return res.data
}

export async function unassignOrder(driverId, orderId) {
    const res = await api.post(`/drivers/unassign-order/${driverId}`, { orderId })
    return res.data
}

export async function getDriverOrders(driverId) {
    const res = await api.get(`/orders/driver/${driverId}`)
    return res.data
}


