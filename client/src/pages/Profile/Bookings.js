import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import moment from 'moment'
import { Col, message, Row, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { useNavigate } from 'react-router-dom'
import { GetBookingsOfUser } from '../../apicalls/bookings'

function Bookings() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bookings, setBookings] = useState('')
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await GetBookingsOfUser()
            if (response.success) {
                message.success(response.message)
                setBookings(response.data)
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Row gutter={[16, 16]}>
                {bookings &&
                    bookings.map(booking => (
                        <Col span={12}>
                            <div className='card m-1 p-2 flex justify-between uppercase'>
                                <div>
                                    
                                    <h1 className='text-xl'>
                                        {booking.show.movie.title} (
                                        {booking.show.movie.language})
                                    </h1>
                                    <div className='divider'></div>
                                    <h1 className='text-sm font-normal'>
                                        {booking.show.theatre.name} (
                                        {booking.show.theatre.address})
                                    </h1>
                                    <h1 className='text-sm font-normal'>
                                        Date & Time :{' '}
                                        {moment
                                            .utc(booking.show.date)
                                            .format(
                                                'MMM Do YYYY'
                                            )}{' '}
                                        -{' '}
                                        {moment
                                            .utc(
                                                booking.show.time,
                                                'HH:mm'
                                            )
                                            .format('hh:mm A')}
                                    </h1>
                                    <h1 className='text-sm font-normal'>
                                        Amount : $
                                        {booking.show.ticketPrice *
                                            booking.seats.length}
                                    </h1>
                                    <h1 className="text-sm font-normal">Booking ID: {booking._id}</h1>
                                </div>

                                <div>
                                    <img
                                        src={booking.show.movie.poster}
                                        alt={booking.show.movie.name}
                                        height={100}
                                        width={100}
                                        className='br-1'
                                    />
                                    <h1 className='text-sm font-normal'>
                                        Seats :{' '}
                                        {booking.seats.join(',')}
                                    </h1>
                                </div>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    )
}

export default Bookings
