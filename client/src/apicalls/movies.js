const { axiosInstance } = require('.')
///////////////////// MOVIE RELATED API CALLS /////////////////////////////
// Add Movie
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/movies/add-movie`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Update/Edit Movie
export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/movies/update-movie`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Delete Movie
export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/movies/delete-movie`, payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Get all movies
export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get(`/api/movies/get-all-movies`)
        return response.data
    } catch (error) {
        throw error
    }
}
// Get Movie By ID
export const GetMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
///////////////////// END API CALLS /////////////////////////////