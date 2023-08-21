import React from 'react'
import { LoginForm } from '../components'

const Login = () => {
  return (
    <div className='w-full h-full flex lg:justify-between justify-center items-center'>
        <div className='lg:block hidden bg-primary w-1/2 h-[100vh]'></div>
        <LoginForm />
    </div>
  )
}

export default Login