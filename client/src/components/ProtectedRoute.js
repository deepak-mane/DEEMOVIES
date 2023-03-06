import { message } from 'antd'
import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../redux/usersSlice'
import { HideLoading, ShowLoading } from '../redux/loadersSlice'

function ProtectedRoute({ children }) {
    const { user } = useSelector(state => state.users)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoading())
            const response = await GetCurrentUser()

            if (response.success) {
                dispatch(SetUser(response.data))
            } else {
                dispatch(SetUser(null))
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(SetUser(null))
            message.error(error.message)
            // TODO: remove incorrect token to redirect user to logon fresh
            localStorage.removeItem('token')
            dispatch(HideLoading())
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCurrentUser()
        } else {
            navigate('/login')
        }
    }, [])

    return (
        user && (
            <div className='layout p-1'>
                <div className='header p-2 bg-primary flex items-center justify-between rounded'>
                    <div>
                        <h1
                            className='text-xl text-white uppercase font-bold cursor-pointer'
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            deemovies
                        </h1>
                    </div>

                    <div className='flex items-center bg-white p-1 gap-1 rounded'>
                        <i className='ri-shield-user-line ri-2x'></i>
                        <h1
                            className='text-sm underline'
                            onClick={() => {
                                if (user.isAdmin) {
                                    navigate('/admin')
                                } else {
                                    navigate('/profile')
                                }
                            }}
                        >
                            {user.name}
                        </h1>
                        <i
                            className='ri-logout-box-r-line  ri-2x'
                            onClick={() => {
                                localStorage.removeItem('token')
                                navigate('/login')
                            }}
                        ></i>
                    </div>
                </div>
                <div className='content mt-1 p-1 border'>
                    {children}
                </div>
            </div>
        )
    )
}

export default ProtectedRoute
