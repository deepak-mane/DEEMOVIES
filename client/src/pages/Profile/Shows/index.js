import { Col, Form, message, Modal, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetAllMovies } from '../../../apicalls/movies'
import {
    AddShow,
    DeleteShow,
    GetAllShowsByTheatre
} from '../../../apicalls/theatres'
import Button from '../../../components/Button'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice'
import moment from 'moment'

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
    const [view = 'table', setView] = useState('table')
    const [shows, setShows] = useState([])
    const [movies, setMovies] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            // For Movies
            const moviesResponse = await GetAllMovies()
            if (moviesResponse.success) {
                // message.success(response.message)
                setMovies(moviesResponse.data)
            } else {
                message.error(moviesResponse.message)
            }
            // For Shows
            const showsResponse = await GetAllShowsByTheatre({
                theatreId: theatre._id
            })
            if (showsResponse.success) {
                // message.success(response.message)
                setShows(showsResponse.data)
            } else {
                message.error(showsResponse.message)
            }

            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    const handleAddShow = async values => {
        try {
            dispatch(ShowLoading())
            // Add Show
            const response = await AddShow({
                ...values,
                theatre: theatre._id
            })
            if (response.success) {
                // message.success(response.message)
                getData()
                setView('table')
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    const handleDelete = async id => {
        try {
            dispatch(ShowLoading())
            const response = await DeleteShow({ showId: id })

            if (response.success) {
                message.success(response.message)
                getData()
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    const columns = [
        {
            title: 'Show Name',
            dataIndex: 'name',
            width: 100,
            fixed: 'left',
            key: '1'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: 150,
            fixed: 'left',
            key: '2',
            render: (text, record) => {
                return moment.utc(text).format('MMM Do YYYY')
                // moment.utc(record.releaseDate.toLocaleString())
            }
        },
        {
            title: 'Time',
            dataIndex: 'time',
            width: 30,
            fixed: 'left',
            key: '3'
        },
        {
            title: 'Movie',
            dataIndex: 'movie',
            width: 180,
            fixed: 'left',
            key: '4',
            render: (text, record) => {
                return record.movie.title
            }
        },
        {
            title: 'Ticket Price',
            dataIndex: 'ticketPrice',
            width: 30,
            fixed: 'left',
            key: '5'
        },
        {
            title: 'Total Seats',
            dataIndex: 'totalSeats',
            width: 30,
            fixed: 'left',
            key: '6'
        },
        {
            title: 'Available Seats',
            dataIndex: 'availableSeats',
            width: 30,
            fixed: 'left',
            key: '7',
            render: (text, record) => {
                return record.totalSeats - record.bookedSeats.length
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 80,
            fixed: 'center',
            key: '8',
            render: (text, record) => {
                return (
                    <div className='flex gap-1 items-center'>
                        {record.bookedSeats.length === 0 && (
                            <i
                                className='ri-delete-bin-5-fill ri-lg'
                                style={{ color: 'red' }}
                                onClick={() => {
                                    handleDelete(record._id)
                                }}
                            ></i>
                        )}
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getData()
    }, [])

    return (
        <Modal
            title=''
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}
        >
            <h1 className='text-primary text-md uppercase mb-1'>
                Theatre: {theatre.name}
            </h1>
            <hr />
            <div className='flex justify-between mt-1 mb-1 items-center'>
                <h1 className='text-md uppercase'>
                    {view === 'table' ? 'Shows' : 'Add Show'}
                </h1>
                {view === 'table' && (
                    <Button
                        variant='outlined'
                        title='Add Show'
                        size='medium'
                        rounded
                        onClick={() => {
                            setView('form')
                        }}
                    />
                )}
            </div>

            {view === 'table' && (
                <Table
                    columns={columns}
                    dataSource={shows}
                    rowKey={record => record._id}
                />
            )}
            {view === 'form' && (
                <Form layout='vertical' onFinish={handleAddShow}>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                label='Show Name'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input show name.'
                                    }
                                ]}
                            >
                                <input type='text' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Date'
                                name='date'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input show date.'
                                    }
                                ]}
                            >
                                <input
                                    type='date'
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split('T')[0]
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Time'
                                name='time'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input show time.'
                                    }
                                ]}
                            >
                                <input type='time' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Movie'
                                name='movie'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input movie name.'
                                    }
                                ]}
                            >
                                <select>
                                    <option value=''>
                                        Select Movie
                                    </option>
                                    {movies.map(movie => (
                                        <option
                                            value={movie._id}
                                            key={movie._id}
                                        >
                                            {movie.title}
                                        </option>
                                    ))}
                                </select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Ticket Price'
                                name='ticketPrice'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input ticket price.'
                                    }
                                ]}
                            >
                                <input type='number' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Total Seats'
                                name='totalSeats'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input total seats.'
                                    }
                                ]}
                            >
                                <input type='number' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className='flex justify-end'>
                        <Button
                            type='button'
                            size='medium'
                            variant='outlined'
                            title='Cancel'
                            rounded
                            onClick={() => {
                                setView('table')
                            }}
                        />
                        <Button
                            type='submit'
                            size='medium'
                            title='save'
                            rounded
                        />
                    </div>
                </Form>
            )}
        </Modal>
    )
}

export default Shows
