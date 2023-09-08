import { authReg } from "../assets";
import { RegistrationForm } from "../components";

const Registration = () => {
  return (
    <div className="w-full md:h-full h-[100vh] flex lg:justify-between justify-center items-center">
      <img src={authReg} alt="Auth image by storyset on Freepik" className="md:flex hidden w-2/5 h-[110vh] bg-primary absolute left-0 top-0 object-contain"/>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
