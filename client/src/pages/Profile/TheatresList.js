import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import TheatreForm from './TheatreForm'
import moment from 'moment'
import { message, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import {
    DeleteTheatre,
    GetAllTheatresByOnwer
} from '../../apicalls/theatres'
import Shows from './Shows'

function TheatresList() {
    const { user } = useSelector(state => state.users)
    const [showTheatreFormModal = false, setShowTheatreFormModal] =
        useState(false)
    const [selectedTheatre = null, setSelectedTheatre] = useState('')
    const [formType = 'add', setFormType] = useState('add')
    const [theatres = [], setTheatres] = useState([])
    const [openShowsModal = false, setOpenShowsModal] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await GetAllTheatresByOnwer({
                owner: user._id
            })
            if (response.success) {
                setTheatres(response.data)
                dispatch(HideLoading())
            } else {
                dispatch(HideLoading())
                setTheatres(null)
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    const handleDelete = async id => {
        try {
            dispatch(ShowLoading())
            const response = await DeleteTheatre({
                theatreId: id
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
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
            width: 200,
            fixed: 'left',
            key: '1'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: 500,
            fixed: 'left',
            key: '2'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: 100,
            fixed: 'left',
            key: '3'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 40,
            fixed: 'left',
            key: '4'
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            width: 100,
            fixed: 'left',
            key: '5',
            render: (text, record) => {
                if (text) {
                    return 'Approved'
                } else {
                    return 'Pending/Blocked'
                }
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: 'left',
            key: '6',
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
                                setSelectedTheatre(record)
                                setShowTheatreFormModal(true)
                                setFormType('edit')
                            }}
                        ></i>
                        {record.isActive && (
                            <span
                                className='underline'
                                onClick={() => {
                                    setSelectedTheatre(record)
                                    setOpenShowsModal(true)
                                }}
                            >
                                Shows
                            </span>
                        )}
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <div className='flex justify-end mb-2'>
                <Button
                    variant='outlined'
                    size='medium'
                    title='Add theatre'
                    rounded
                    onClick={() => {
                        setFormType('add')
                        setShowTheatreFormModal(true)
                    }}
                />
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={theatres}
                    rowKey={record => record._id}
                />
                {showTheatreFormModal && (
                    <TheatreForm
                        showTheatreFormModal={showTheatreFormModal}
                        setShowTheatreFormModal={
                            setShowTheatreFormModal
                        }
                        formType={formType}
                        setFormType={setFormType}
                        selectedTheatre={selectedTheatre}
                        setSelectedTheatre={setSelectedTheatre}
                        getData={getData}
                    />
                )}

                {openShowsModal && (
                    <Shows
                        openShowsModal={openShowsModal}
                        setOpenShowsModal={setOpenShowsModal}
                        theatre={selectedTheatre}
                    />
                )}
            </div>
        </div>
    )
}

export default TheatresList
