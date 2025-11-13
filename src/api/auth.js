import api from './index'

export const loginRequest = async (data) => {
    try {
        const res = await api.post('/auth/login', data)
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al iniciar sesión' }
    }
}

export const registerRequest = async (data) => {
    try {
        const res = await api.post('/auth/register', data)
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al registrarse' }
    }
}

export const registerAddressRequest = async (id, data) => {
    try {
        const res = await api.post(`/auth/address/${id.toString()}`, data)
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al registrarse' }
    }
}


export const updateAddressRequest = async (id, data) => {
    try {

        const res = await api.patch(`/auth/address/${id}`, data)
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al editar la dirección' }
    }
}

export const getUsersByRole = async (role) => {
    try {
        const res = await api.get(`/auth/find/${role}`)
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al obtener usuarios' }
    }
}

export const validateSessionRequest = async () => {
    try {
        const res = await api.get('/auth/profile')
        return res.data
    } catch {
        return null
    }
}

export const refreshTokenRequest = async () => {
    try {
        const res = await api.get('/auth/refresh')
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al refrescar sesión' }
    }
}

export const logoutRequest = async () => {
    try {
        const res = await api.post('/auth/logout')
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al cerrar sesión' }
    }
}

export const getProfileRequest = async () => {
    try {
        const res = await api.get('/auth/profile')
        return res.data
    } catch (err) {
        throw err.response?.data || { message: 'Error al obtener perfil' }
    }
}



