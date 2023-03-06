const { axiosInstance } = require('.')
///////////////////// MOVIE RELATED API CALLS /////////////////////////////
// make payment
export const MakePayment = async (token, amount) => {
    try {
        const response = await axiosInstance.post(`/api/bookings/make-payment`, {
            token,
            amount
        })
        return response.data
    } catch (error) {
        throw error
    }
}
// Book Shows
export const BookShowTickets = async (payload) => {
    try {
        const response = await axiosInstance.post(`/api/bookings/book-show`,payload)
        return response.data
    } catch (error) {
        throw error
    }
}
// Get Bookings of user
export const GetBookingsOfUser = async () => {
    try {
        const response = await axiosInstance.get(`/api/bookings/get-bookings`)
        return response.data
    } catch (error) {
        throw error
    }
}
///////////////////// END API CALLS /////////////////////////////