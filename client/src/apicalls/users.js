const { axiosInstance } = require('.')
///////////////////// USER RELATED API CALLS /////////////////////////////
// Register a new user
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/users/register`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}


// Login a user
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/users/login`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}

// Get Current user
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get(`/api/users/get-current-user`)
        return response.data
    } catch (error) {
        throw error
    }
}
///////////////////// END API CALLS /////////////////////////////