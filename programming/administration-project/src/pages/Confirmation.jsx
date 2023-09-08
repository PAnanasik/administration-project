import { authReg } from "../assets";
import ConfirmationForm from "../components/login/ConfirmationForm";

const Confirmation = ({ dataUser }) => {
  console.log(dataUser);
  return (
    <div className="w-full h-full flex lg:justify-between justify-center items-center">
      <img src={authReg} alt="" className="lg:flex hidden w-2/5 h-[100vh] bg-primary absolute left-0 top-0 object-contain"/>
      <ConfirmationForm dataUser={dataUser} />
    </div>
  );
};

export default Confirmation;
