import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { message, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres'
import { SpaceContext } from 'antd/es/space'

function TheatresList() {
    const [theatres = [], setTheatres] = useState([])
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await GetAllTheatres()
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

    useEffect(() => {
        getData()
    }, [])

    const handleStatusChange = async theatre => {
        try {
            dispatch(ShowLoading())
            const response = await UpdateTheatre({
                theatreId: theatre._id,
                ...theatre,
                isActive: !theatre.isActive
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
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 200,
            fixed: 'left',
            key: '1',
            render: text => <a>{text}</a>
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
            title: 'Owner',
            dataIndex: 'owner',
            width: 80,
            fixed: 'left',
            key: '5',
            render: (text, record) => {
                return record.owner.name
            }
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            width: 100,
            fixed: 'left',
            key: '6',
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
            key: '7',
            render: (text, record) => {
                return (
                    <div className='flex gap-1'>
                        {record.isActive && (
                            <span
                                className='underline'
                                onClick={() =>
                                    handleStatusChange(record)
                                }
                            >
                                Block
                            </span>
                        )}
                        {!record.isActive && (
                            <span
                                className='underline'
                                onClick={() =>
                                    handleStatusChange(record)
                                }
                            >
                                Approve
                            </span>
                        )}
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={theatres}
                rowKey={record => record._id}
            />
        </div>
    )
}

export default TheatresList
