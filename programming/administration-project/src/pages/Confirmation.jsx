import { useContext } from "react";
import { ResponseContext } from "../App";
import { authReg } from "../assets";
import ConfirmationForm from "../components/login/ConfirmationForm";
import { ErrorMessage } from "../components";

const Confirmation = ({ dataUser }) => {
  const { responseAuth } = useContext(ResponseContext);
  return (
    <div className="w-full h-full flex lg:justify-between justify-center items-center">
      <img src={authReg} alt="Auth image by storyset on Freepik" className="lg:flex hidden w-2/5 h-[100vh] bg-primary absolute left-0 top-0 object-contain"/>
      <ConfirmationForm dataUser={dataUser} />
      {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
    </div>
  );
};

export default Confirmation;
