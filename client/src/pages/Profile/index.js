import React from 'react'
import PageTitle from '../../components/PageTitle'
import { Tabs } from 'antd'
import TheatresList from './TheatresList'
import Bookings from './Bookings'
function Profile() {
    const items = [
        {
          key: '1',
          label: `Bookings`,
          disabled: false,
          children: <Bookings />,
        },
        {
          key: '2',
          label: `Theatres`,
          disabled: false,
          children: <TheatresList />,
        },
      ];
  return (
    <div>
    <PageTitle title='Profile' />
    <Tabs defaultActiveKey='1' items={items} size='large' type="card"/>
    </div>
  )
}

export default Profile