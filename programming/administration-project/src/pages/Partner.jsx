import React from 'react'
import { NavbarPartner, DashboardPartner } from '../components'
import Background from '../components/canvas/Background'


const Partner = ({ token, responseLogin }) => {
  return (
    <div>
        <NavbarPartner />
        <div className='relative z-0'>
            <DashboardPartner token={token} responseLogin={responseLogin} />
            <Background />
        </div>
    </div>
  )
}

export default Partner