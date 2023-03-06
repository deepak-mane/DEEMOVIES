import React from 'react'
import PageTitle from '../../components/PageTitle'
import { Tabs } from 'antd'
import MoviesList from './MoviesList'
import TheatresList from './TheatresList'
function Admin() {
    const items = [
        {
          key: '1',
          label: `Movies`,
          disabled: false,
          children: <MoviesList />,
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
            <PageTitle title='Admin' />
            <Tabs defaultActiveKey='1' items={items} size='large' type="card"/>

            {/* Deprecated TabPane has been commented out
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab='Movies' key='1'>
                    <MoviesList />
                </Tabs.TabPane>
                <Tabs.TabPane tab='Theatres' key='2'>
                    <TheatresList />
                </Tabs.TabPane>
            </Tabs> */}
        </div>
    )
}

export default Admin
