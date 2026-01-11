const API_URL = 'http://localhost:8080/'

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    if(!response.ok){
        throw new Error('Failed to register user')
    }
    return await response.json()
}

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    if(!response.ok){
        const errorData = await response.json()
        console.error('Login error response:', errorData)
        throw new Error(errorData.message || 'Failed to login')
    }
    return await response.json()
}

export const getProducts = async () => {
    const response = await fetch(`${API_URL}products/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if(!response.ok){
        throw new Error('Failed to fetch products')
    }
    return await response.json()
}

export const getProductById = async (id) => {
    if (!id) throw new Error('Product id is required')
    const response = await fetch(`${API_URL}products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if(!response.ok){
        throw new Error('Failed to fetch product')
    }
    return await response.json()
}
