import React from 'react'
import ConfirmationForm from '../components/login/ConfirmationForm'

const Confirmation = () => {
  return (
    <div className='w-full h-full flex lg:justify-between justify-center items-center'>
        <div className='lg:block hidden bg-primary w-1/2 h-[100vh]'></div>
        <ConfirmationForm />
    </div>
  )
}

export default Confirmation