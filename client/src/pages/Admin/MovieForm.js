import React from 'react'
import { Modal, Form, Row, Col, message } from 'antd'
import Button from '../../components/Button'
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/loadersSlice'
import { AddMovie, UpdateMovie } from '../../apicalls/movies'
import moment from 'moment'


function MovieForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType,
    getData
}) {
    // if(selectedMovie) {
    //     selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format('MM-DD-YYYY')
    // }
    const dispatch = useDispatch()
    const onFinish = async values => {
        try {
            dispatch(ShowLoading())
            let response = null
            if (formType === 'add') {
                response = await AddMovie(values)
            } else {
                response = await UpdateMovie({
                    ...values,
                    movieId : selectedMovie._id
                })
            }
            if (response.success) {
                getData()
                setShowMovieFormModal(false)
                message.success(response.message)
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    return (
        <Modal
            title={formType === 'add' ? 'ADD MOVIE' : 'EDIT MOVIE'}
            open={showMovieFormModal}
            onCancel={() => {
                setSelectedMovie(null)
                setShowMovieFormModal(false)

            }}
            footer={null}
            width={800}
        >
            <Form layout='vertical' onFinish={onFinish}
            initialValues={{
                    ...selectedMovie,
                    releaseDate: selectedMovie?.releaseDate
                        ? new Date(selectedMovie?.releaseDate)
                              .toISOString()
                              .split('T')[0]
                        : null
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item label='Movie Name' name='title'>
                            <input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label='Movie Description'
                            name='description'
                        >
                            <textarea type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label='Movie Duration (minutes)'
                            name='duration'
                        >
                            <input type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label='Movie Language'
                            name='language'
                        >
                            <select name='' id=''>
                                <option value=''>
                                    Select Language
                                </option>
                                <option value='English'>
                                    English
                                </option>
                                <option value='Marathi'>
                                    Marathi
                                </option>
                                <option value='Hindi'>Hindi</option>
                                <option value='Telugu'>Telugu</option>
                                <option value='Tamil'>Tamil</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label='Movie Release Date'
                            name='releaseDate'
                        >
                            <input type='date' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Movie Genre' name='genre'>
                            <select name='' id=''>
                                <option value=''>Select Genre</option>
                                <option value='Action'>Action</option>
                                <option value='Adventure'>
                                    Adventure
                                </option>
                                <option value='Animated'>
                                    Animated
                                </option>
                                <option value='Fantasy'>
                                    Fantasy
                                </option>
                                <option value='Historical'>
                                    Historical
                                </option>
                                <option value='Horror'>Horror</option>
                                <option value='Comedy'>Comedy</option>
                                <option value='Drama'>Drama</option>
                                <option value='Romance'>
                                    Romance
                                </option>
                                <option value='Musical'>
                                    Musical
                                </option>
                                <option value='Science Fiction'>
                                    Scrence Fiction
                                </option>
                                <option value='Thriller'>
                                    Thriller
                                </option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            label='Movie Poster URL'
                            name='poster'
                        >
                            <input type='text' />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='flex justify-end gap-1'>
                    <Button
                        title='Cancel'
                        type='button'
                        variant='outlined'
                        size='medium'
                        rounded
                        onClick={() => {
                            setShowMovieFormModal(false)
                            setSelectedMovie(null) // Makes form blank next time you open for Add movie
                        }}
                    />
                    <Button
                        title='Save'
                        type='submit'
                        size='medium'
                        rounded
                    />
                </div>
            </Form>
        </Modal>
    )
}

export default MovieForm
