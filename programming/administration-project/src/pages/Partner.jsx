import React from 'react'
import { NavbarPartner, DashboardPartner } from '../components'
import Background from '../components/canvas/Background'


const Partner = ({ token }) => {
  return (
    <div>
        <NavbarPartner />
        <div className='relative z-0'>
            <DashboardPartner token={token} />
            <Background />
        </div>
    </div>
  )
}

export default Partner