import greetings from "../greetings";
import { styles } from "../../styles";

const Intro = () => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  return (
    <div
      className="relative w-full h-[200px] flex md:justify-between justify-center items-center md:text-left text-center 
      bg-white rounded-[12px] md:pl-[40px] pl-0"
    >
      <h2 className={`${styles.sectionHeadText}`}>
        {greetings()}
        <br />
        <span>{userData.fio || "Без имени"}</span>
      </h2>
      <div className="md:block hidden absolute w-[600px] right-0 h-full bg-rectangle"></div>
    </div>
  );
};

export default Intro;
