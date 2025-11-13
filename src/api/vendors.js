import api from './index'

export async function createVendor(vendorData) {
    const res = await api.post('/vendors/create', vendorData)
    return res.data
}

export async function getVendors() {
    const res = await api.get(`/vendors/find`)
    return res.data
}

export async function getVendorById(id) {
    const res = await api.get(`/vendors/find/${id}`)
    return res.data
}

export async function getVendorByOwnerId(id) {
    const res = await api.get(`/vendors/findByOwner/${id}`)
    return res.data
}

export async function updateVendorStatus(id, vendorData) {
    const res = await api.post(`/vendors/updateStatus/${id}`, vendorData)
    return res.data
}
