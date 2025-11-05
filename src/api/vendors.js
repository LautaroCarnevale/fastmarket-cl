import api from './index' // tu instancia base de axios

export async function getVendors(query = '') {
    const res = await api.get(`/vendors`, { params: { search: query } })
    return res.data
}

export async function getVendorById(id) {
    const res = await api.get(`/vendors/${id}`)
    return res.data
}
