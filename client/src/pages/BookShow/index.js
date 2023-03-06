import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { Col, message, Row, Table } from 'antd'
import { GetShowById } from '../../apicalls/theatres'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
import Button from '../../components/Button'
import { BookShowTickets, MakePayment } from '../../apicalls/bookings'

function BookShow() {
    const { user } = useSelector(state => state.users)
    const [show, setShow] = useState('')
    const [selectedSeats, setSelectedSeats] = useState([])
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            // For Shows
            const response = await GetShowById({ showId: params.id })
            if (response.success) {
                // message.success(response.message)
                setShow(response.data)
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    const getSeats = () => {
        let columns = 0
        if (show.totalSeats < 100) {
            columns = 10
        } else if (show.totalSeats > 100 && show.totalSeats < 150) {
            columns = 15
        } else if (show.totalSeats > 150) {
            columns = 20
        }

        const totalSeats = show.totalSeats
        const rows = Math.ceil(totalSeats / columns)
        console.log('rows:', rows)
        return (
            <div className='flex gap-1 flex-col p-2 card'>
                {Array.from(Array(rows).keys()).map((seat, index) => {
                    return (
                        <div className='flex gap-1 justify-center'>
                            {Array.from(Array(columns).keys()).map(
                                (column, index) => {
                                    let seatClass = 'seat'
                                    if (
                                        selectedSeats.includes(
                                            seat * columns + column + 1
                                        )
                                    ) {
                                        seatClass =
                                            seatClass +
                                            ' selected-seat'
                                    }
                                    if (
                                        show.bookedSeats.includes(
                                            seat * columns + column + 1
                                        )
                                    ) {
                                        seatClass =
                                            seatClass + ' booked-seat'
                                    }
                                    return (
                                        seat * columns + column + 1 <=
                                            totalSeats && (
                                            <div
                                                className={seatClass}
                                                onClick={() => {
                                                    const seatNumber =
                                                        seat *
                                                            columns +
                                                        column +
                                                        1
                                                    if (
                                                        selectedSeats.includes(
                                                            seatNumber
                                                        )
                                                    ) {
                                                        setSelectedSeats(
                                                            selectedSeats.filter(
                                                                item =>
                                                                    item !==
                                                                    seatNumber
                                                            )
                                                        )
                                                    } else {
                                                        setSelectedSeats(
                                                            [
                                                                ...selectedSeats,
                                                                seatNumber
                                                            ]
                                                        )
                                                    }
                                                }}
                                            >
                                                <h1 className='text-sm text-center font-bold text-shadow-1'>
                                                    {seat * columns +
                                                        column +
                                                        1}
                                                </h1>
                                            </div>
                                        )
                                    )
                                }
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }

    const book = async transactionId => {
        try {
            dispatch(ShowLoading())
            // For Booking
            const response = await BookShowTickets({
                show: params.id,
                seats: selectedSeats,
                transactionId,
                user: user._id
            })
            if (response.success) {
                message.success(response.message)
                navigate('/profile')
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    const onToken = async token => {
        try {
            dispatch(ShowLoading())
            // For Booking
            const response = await MakePayment(
                token,
                selectedSeats.length * show.ticketPrice * 100
            )
            if (response.success) {
                message.success(response.message)
                // Once payment is successful, you can call the BookShowTickets API to book ticket
                book(response.data)
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
        show && (
            <div>
                {/* show information */}
                <div className='flex justify-between card p-2 items-center'>
                    <div>
                        <h1 className='text-sm'>
                            {show.theatre.name}
                        </h1>
                        <h1 className='text-sm'>
                            {show.theatre.address}
                        </h1>
                    </div>
                    <div>
                        <h1 className='text-2xl uppercase '>
                            {show.movie.title}{' '}
                            <span className='text-sm'>
                                ({show.movie.language})
                            </span>
                        </h1>
                    </div>
                    <div>
                        <h1 className='text-sm'>
                            {moment
                                .utc(show.date)
                                .format('MMM Do yyyy')}{' '}
                            {moment
                                .utc(show.time, 'HH:mm')
                                .format('hh:mm A')}
                        </h1>
                    </div>
                </div>
                {/* seat information */}
                <div className='w-full p-3'>
                    <div className='marquee text-sm'>
                        <div className='track-speed-2'>
                            <span className='text-sm text-shadow-2'>
                                Choose your favourite seats!!!
                            </span>
                            <span className='blink  text-black'>
                                .............................
                            </span>
                            <span className='blink  text-orange'>
                                NOW
                            </span>
                            <span className='blink text-bold text-shadow-1'>
                                !!!!!!!!!
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>{getSeats()}</div>

                {selectedSeats.length > 0 && (
                    <div className='mt-2 flex uppercase card p-2 items-center flex-col'>
                        <div className='flex justify-center gap-3  '>
                            <h1 className='text-sm font-normal'>
                                Selected Seats : <span className='font-bold text-blue'>{selectedSeats.join(',')}</span>
                            </h1>
                            <h1 className='text-sm font-normal'>
                                Total Price : {' '}<span className='font-bold text-red'>${selectedSeats.length *
                                    show.ticketPrice}</span>
                                
                            </h1>
                        </div>
                        <div className="flex justify-between items-center">
                        <Button
                        title='cancel Book'
                        type='button'
                        variant='outlined'
                        size='medium'
                        rounded
                        onClick={() => {
                            navigate('/')
                        }}/>
                                                <StripeCheckout
                            token={onToken}
                            amount={
                                selectedSeats.length *
                                show.ticketPrice *
                                100
                            }
                            billingAddress
                            stripeKey='pk_test_51Kfa2gD3AHjeoSpn3DkZTB0tBNaDv2vNuKHNbsADQ1BzR0FG85UeQa6Wfq71NOntGRWD7cvKDNbgQDqTOIriJ9P500dpK3K7ie'
                        >
                            <Button
                                title='Book Now'
                                rounded
                                size='medium'
                            />
                        </StripeCheckout>
                        </div>
                       
                    </div>
                )}
            </div>
        )
    )
}

export default BookShow
