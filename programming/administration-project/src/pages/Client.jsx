import React from 'react'
import { Navbar, DashboardClient } from '../components'
import Background from '../components/client/canvas/Background'


const Client = () => {
  return (
    <div>
        <Navbar />
        <div className='relative z-0'>
            <DashboardClient />
            <Background />
        </div>
    </div>
  )
}

export default Client