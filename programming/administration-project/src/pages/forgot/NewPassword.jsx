import { useContext } from 'react'
import { ResponseContext } from '../../App';
import { ErrorMessage } from '../../components';
import NewPasswordForm from '../../components/forgot/NewPasswordForm';
import { authReg } from '../../assets';

const NewPassword = ({ codeUser, phoneUser }) => {
  const { responseAuth } = useContext(ResponseContext);
  return (
    <div>
      <img src={authReg} alt="Auth image by storyset on Freepik" className="lg:flex hidden w-2/5 h-[100vh] bg-primary absolute left-0 top-0 object-contain"/>
      <NewPasswordForm codeUser = {codeUser} phoneUser={phoneUser} />
      {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
    </div>
  )
}

export default NewPassword