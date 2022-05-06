export const getToken = () => {
    const token = localStorage.getItem('token')

    return token
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
}

export const setUser = (userData, tokens) => {
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('token', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
}