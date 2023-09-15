import { useContext } from "react";
import { ResponseContext } from "../../App";
import { authReg } from "../../assets";
import { ConfirmEmailForm, ErrorMessage } from "../../components";

const ConfirmEmail = () => {
  const { responseAuth } = useContext(ResponseContext);
  return (
    <div className="w-full h-full flex md:justify-between justify-center items-center">
      <img src={authReg} alt="Auth image by storyset on Freepik" className="md:flex hidden w-2/5 h-[100vh] bg-primary absolute left-0 top-0 object-contain"/>
      <ConfirmEmailForm />
      {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
    </div>
  );
};

export default ConfirmEmail