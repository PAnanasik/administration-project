import { auth } from "../assets";
import { LoginForm } from "../components";

const Login = () => {
  return (
    <div className="w-full h-full flex lg:justify-between justify-center items-center">
      <img src={auth} alt="Auth image by storyset on Freepik" className="w-2/5 h-full bg-primary absolute left-0 top-0 object-contain"/>
      <LoginForm />
    </div>
  );
};

export default Login;
