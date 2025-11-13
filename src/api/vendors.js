import api from './index' 

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
