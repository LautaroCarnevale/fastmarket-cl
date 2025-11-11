import api from './index'

export async function createProduct(data) {
    const res = await api.post('/products/create', data)
    return res.data
}

export async function updateProduct(id, data) {
    const res = await api.post(`/products/update/${id}`, data)
    return res.data
}

export async function deleteProduct(id) {
    const res = await api.delete(`/products/delete/${id}`)
    return res.data
}

export async function getProductById(id) {
    const res = await api.get(`/products/find/${id}`)
    return res.data
}

export async function getProductsByIds(ids) {
    const res = await api.post('/products/find-many', { ids })
    return res.data
}

export async function getProductsByVendor(vendorId) {
    const res = await api.get(`/products/vendor/${vendorId}`)
    return res.data
}

export async function getAllProductsAdmin() {
    const res = await api.get('/products/admin/all')
    return res.data
}
