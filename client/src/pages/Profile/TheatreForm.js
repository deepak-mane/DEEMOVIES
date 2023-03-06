import React from 'react'
import { Modal, Form, Row, Col, message } from 'antd'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/loadersSlice'
import { AddMovie, UpdateMovie } from '../../apicalls/movies'
import moment from 'moment'
import { AddTheatre, UpdateTheatre } from '../../apicalls/theatres'

function TheatreForm({
    showTheatreFormModal,
    setShowTheatreFormModal,
    formType,
    setFormType,
    selectedTheatre,
    setSelectedTheatre,
    getData, 
}) {
    const { user } = useSelector(state=>state.users)
    const dispatch = useDispatch()
    const onFinish = async values => {
        values.owner = user._id
        try {
            dispatch(ShowLoading())
            let response = null
            if (formType === 'add') {
                response = await AddTheatre(values)
            } else {
                values.theatreId = selectedTheatre._id
                response = await UpdateTheatre(values)
            }
            if (response.success) {
                getData()
                message.success(response.message)
                setShowTheatreFormModal(false)
                setSelectedTheatre(null)
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
            title={formType === 'add' ? 'add theatre' : 'edit theatre'}
            open={showTheatreFormModal}
            onCancel={() => {
                setSelectedTheatre(null)
                setShowTheatreFormModal(false)
            }}
            footer={null}
            width={500}
        >
            <Form
                layout='vertical'
                onFinish={onFinish}
                initialValues={selectedTheatre}
            >
                <Form.Item
                    label='Theatre Name'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input theatre name.'
                        }
                    ]}
                >
                    <input type='text' />
                </Form.Item>
                <Form.Item
                    label='Theatre Address'
                    name='address'
                    rules={[
                        {
                            required: true,
                            message: 'Please input theatre address.'
                        }
                    ]}
                >
                    <textarea type='text' />
                </Form.Item>
                <Form.Item
                    label='Theatre Phone Number'
                    name='phone'
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input theatre phone number.'
                        }
                    ]}
                >
                    <input type='text' />
                </Form.Item>

                <Form.Item
                    label='Theatre Email Adress'
                    name='email'
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input theatre email address.'
                        }
                    ]}
                >
                    <input type='email' />
                </Form.Item>
                <div className='flex justify-end gap-1'>
                    <Button
                        title='Cancel'
                        type='button'
                        variant='outlined'
                        size='medium'
                        rounded
                        onClick={() => {
                            setShowTheatreFormModal(false)
                            setSelectedTheatre(null) // Makes form blank next time you open for Add movie
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

export default TheatreForm
