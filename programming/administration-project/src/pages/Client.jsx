import React from 'react'
import { Navbar, DashboardClient } from '../components'
import Background from '../components/canvas/Background'


const Client = ({ response }) => {
  return (
    <div>
        <Navbar />
        <div className='relative z-0'>
            <DashboardClient response={response} />
            <Background />
        </div>
    </div>
  )
}

export default Client