import React, { useEffect, useState } from 'react'
import { Col, message, Row, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { GetAllMovies } from '../../apicalls/movies'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

function Home() {
    const [searchText = '', setSearchText] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])

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

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <input
                type='text'
                placeholder='Search for movies'
                className='search-input text-md' 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Row className='m-2' gutter={[20, 20]}>
                {movies &&
                    movies
                        .filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
                        .map(movie => (
                        <Col span={6} key={movie._id}>
                            <div
                                className='card flex flex-col gap-1 cursor-pointer'
                                onClick={() => (
                                    navigate(`/movie/${movie._id}?date=${moment().format('YYYY-MM-DD')}`))}
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.name}
                                    height={200}
                                />
                                <div className='flex justify-center pl-3'>
                                    <div className="marquee">
                                        <div className="track-speed-3">
                                            <div>
                                            <h1 className='text-md uppercase'>
                                        {movie.title}
                                            </h1>
                                            </div>
                                                </div>                                
                                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    )
}

export default Home
