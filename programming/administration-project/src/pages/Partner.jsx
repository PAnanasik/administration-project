import React from 'react'
import { Navbar, DashboardPartner } from '../components'
import Background from '../components/partner/canvas/Background'


const Partner = () => {
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

export default Partner