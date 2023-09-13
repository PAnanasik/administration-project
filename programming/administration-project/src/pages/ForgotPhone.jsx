import React, { useContext } from 'react'
import ForgotPhoneForm from '../components/forgot/ForgotPhoneForm'
import { authReg } from '../assets'
import { ResponseContext } from '../App';
import { ErrorMessage } from '../components';

const ForgotPhone = () => {
  const { responseAuth } = useContext(ResponseContext);
  return (
    <div>
      <img src={authReg} alt="Auth image by storyset on Freepik" className="lg:flex hidden w-2/5 h-[100vh] bg-primary absolute left-0 top-0 object-contain"/>
      <ForgotPhoneForm />
      {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
    </div>
  )
}

export default ForgotPhone