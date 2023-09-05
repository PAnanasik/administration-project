import { RegistrationForm } from "../components";

const Registration = () => {
  return (
    <div className="w-full md:h-full h-[100vh] flex lg:justify-between justify-center items-center">
      <div className="lg:block hidden bg-primary w-1/2 h-[100vh]"></div>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
