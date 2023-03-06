const { axiosInstance } = require('.')
///////////////////// THEATRE RELATED API CALLS /////////////////////////////
// Add Theatre
export const AddTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/add-theatre`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Update/Edit Theatre
export const UpdateTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/update-theatre`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Delete Theatre
export const DeleteTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/delete-theatre`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Get all Theatres
export const GetAllTheatres = async () => {
    try {
        const response = await axiosInstance.get(`/api/theatres/get-all-theatres`)
        return response.data
    } catch (error) {
        throw error
    }
}

// Get all Theatres By Owner
export const GetAllTheatresByOnwer = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/get-all-theatres-by-owner`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
///////////////////// SHOW RELATED API CALLS /////////////////////////////
// Add Show
export const AddShow = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/add-show`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Update/Edit Show
export const UpdateShow = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/update-show`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Delete Show
export const DeleteShow = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/delete-show`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Get all Theatres
export const GetAllShowsByTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/get-all-shows-by-theatre`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Get All Theatres for a Movie
export const GetAllTheatresByMovie = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/get-all-theatres-by-movie`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Get Show By ID
export const GetShowById = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/theatres/get-show-by-id`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
///////////////////// END API CALLS /////////////////////////////