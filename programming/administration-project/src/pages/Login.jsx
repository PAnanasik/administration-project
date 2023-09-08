import { auth } from "../assets";
import { LoginForm } from "../components";

const Login = () => {
  return (
    <div className="w-full h-full flex lg:justify-between justify-center items-center">
      <img src={auth} alt="" className="w-2/5 h-full bg-primary absolute left-0 top-0 object-contain"/>
      {/* <div className="lg:block hidden bg-primary w-1/2 h-[100vh]"></div> */}
      <LoginForm />
    </div>
  );
};

export default Login;
