import { useContext } from "react";
import { ResponseContext } from "../../App";
import { authReg } from "../../assets";
import { ErrorMessage } from "../../components";
import ConfirmationFormForgot from "../../components/forgot/ConfirmationFormForgot";

const Confirmation = ({ phoneUser }) => {
  const { responseAuth } = useContext(ResponseContext);
  return (
    <div className="w-full h-full flex lg:justify-between justify-center items-center">
      <img src={authReg} alt="Auth image by storyset on Freepik" className="lg:flex hidden w-2/5 h-[100vh] bg-primary absolute left-0 top-0 object-contain"/>
      <ConfirmationFormForgot phoneUser = {phoneUser} />
      {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
    </div>
  );
};

export default Confirmation;
