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