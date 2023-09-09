import React from 'react'
import ForgotPhoneForm from '../components/forgot/ForgotPhoneForm'
import { authReg } from '../assets'

const ForgotPhone = () => {
  return (
    <div>
      <img src={authReg} alt="Auth image by storyset on Freepik" className="lg:flex hidden w-2/5 h-[100vh] bg-primary absolute left-0 top-0 object-contain"/>
      <ForgotPhoneForm />
    </div>
  )
}

export default ForgotPhone