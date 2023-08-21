import React from 'react'
import { Navbar, DashboardPartner } from '../components'
import Background from '../components/dashboard/canvas/Background'

const Client = () => {
  return (
    <div>
        <Navbar />
        <div className='relative z-0'>
            <DashboardPartner />
            <Background />
        </div>
    </div>
  )
}

export default Client