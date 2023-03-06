import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import MovieForm from './MovieForm'
import moment from 'moment'
import { message, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { DeleteMovie, GetAllMovies } from '../../apicalls/movies'
function MoviesList() {
    const [movies, setMovies] = useState([])
    const [showMovieFormModal, setShowMovieFormModal] = useState('')
    const [selectedMovie, setSelectedMovie] = useState('')
    const [formType, setFormType] = useState('add')
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await GetAllMovies()
            if (response.success) {
                setMovies(response.data)
                dispatch(HideLoading())
            } else {
                dispatch(HideLoading())
                setMovies(null)
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            dispatch(ShowLoading())
            const response = await DeleteMovie({
                movieId: id,
            })
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

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            width: 100,
            fixed: 'left',
            key: '1',
            render: (text, record) => {
                return (
                    <div className='text-center'>
                        <img
                            src={record.poster}
                            alt={record.title}
                            height='30'
                            width='80'
                            className='br-1 m-a'
                        />
                    </div>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'title',
            render: (text) => <a>{text}</a>,
            width: 200,
            fixed: 'left',
            key: '2'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 400,
            fixed: 'left',
            key: '3'
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            width: 40,
            fixed: 'left',
            key: '4'
        },
        {
            title: 'Language',
            dataIndex: 'language',
            width: 40,
            fixed: 'left',
            key: '5'
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            width: 120,
            fixed: 'left',
            key: '6',
            render: (text, record) => {
                return moment
                    .utc(record.releaseDate.toLocaleString())
                    .format('MM-DD-YYYY')
                // https://stackoverflow.com/questions/50473932/moment-js-sets-dates-to-1-day-behind
                // moment.utc(dateVariable.toLocaleString()).format("MM/DD/YYYY")
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: 'left',
            key: '7',
            render: (text, record) => {
                return (
                    <div className='flex gap-1'>
                        <i
                            className='ri-delete-bin-5-fill ri-lg'
                            style={{ color: 'red' }}
                            onClick={() => {
                                handleDelete(record._id)
                            }}
                        ></i>
                        <i
                            className='ri-pencil-fill ri-lg'
                            style={{ color: 'blue' }}
                            onClick={() => {
                                setSelectedMovie(record)
                                setShowMovieFormModal(true)
                                setFormType('edit')
                            }}
                        ></i>
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <div className='flex justify-end mb-1'>
                <Button
                    title='Add Movie'
                    variant='outlined'
                    size='medium'
                    rounded
                    onClick={() => {
                        setShowMovieFormModal(true)
                        setFormType('add')
                    }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={movies}
                rowKey={record => record._id}
            />
            {showMovieFormModal && (
                <MovieForm
                    showMovieFormModal={showMovieFormModal}
                    setShowMovieFormModal={setShowMovieFormModal}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    formType={formType}
                    getData={getData}
                />
            )}
        </div>
    )
}

export default MoviesList
