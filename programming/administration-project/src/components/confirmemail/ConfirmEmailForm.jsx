import { styles } from "../../styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { mailInput } from "../../assets";
import axios from "axios";
import { confirmEmailUrl } from "../urls";
import { ResponseContext } from "../../App";
const ConfirmEmailForm = () => {
  const { setResponseAuth } = useContext(ResponseContext);
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  const [redirection, setRedirection] = useState(false);
  const navigate = useNavigate();

  const useShowError = ({ error }) => {
    setResponseAuth((prev) => ({
      ...prev,
      errorMessage: `${error}`,
      showErrorMessage: true,
    }));
    setTimeout(
      () =>
        setResponseAuth((prev) => ({
          ...prev,
          showErrorMessage: false,
        })),
      5000
    );
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    axios({
      method: "PATCH",
      url: `${confirmEmailUrl}`,
      data: {
        email: `${userData.email}`,
        code: `${data.code}`,
      },
    })
      .then(function (response) {
        window.localStorage.setItem("verified", true);
        setRedirection(true);
      })
      .catch(function (response) {
        useShowError({ error: "Неправильный код" });
      });
    reset();
  };

  useEffect(() => {
    if (redirection) {
      navigate("/");
    }
  }, [redirection]);

  const InputIcon = ({ prop }) => {
    const array = [mailInput];
    return (
      <img
        src={array[prop]}
        alt="phone"
        className="absolute right-[20px] top-[18px] w-6 h-6"
      />
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const InputCardCode = () => {
    const [active, setActive] = useState(true);

    function handleInput(event) {
      if (event.target.value == 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }

    return (
      <div className="relative h-12 w-full">
        <input
          type="text"
          className={`${
            errors?.code ? styles.badInputStyles : styles.inputStyles
          } relative`}
          placeholder="Код подтверждения"
          onInput={handleInput}
          {...register("code", {
            required: "Поле обязательно к заполнению",
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors?.code && (
            <p className="text-red-500 text-[12px]">
              {errors?.code?.message || "Длина номера 12 символов" || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="md:w-3/5 w-full lg:h-full h-[100vh] flex justify-center items-center px-[20px] absolute right-0 top-0">
      <div className="sm:min-w-[600px] min-w-[270px]">
        <h1 className={`${styles.sectionHeadText} text-center`}>
          Подтверждение
        </h1>
        <h1 className={`${styles.sectionSubText} text-center`}>
          Введите код с почты
        </h1>
        <form
          className="flex flex-col gap-[35px] mt-[30px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputCardCode />
          <input
            type="submit"
            value="Подтвердить"
            name="submit button"
            className="bg-primary p-4 rounded-[8px] text-white font-medium
                    ease duration-300 hover:bg-hover cursor-pointer mt-[15px]"
            id="submit_btn"
          />
        </form>
      </div>
      <div
        className="fixed h-[60px] bg-primary border-solid border-[1px] border-hover bottom-[20px] 
        sm:right-[40px] sm:left-auto left-0 right-0 mx-auto
        rounded-[4px] z-10 max-w-[450px] w-full text-white flex items-center justify-center font-medium text-center"
      >
        <p>Код отправлен на почту!</p>
      </div>
    </section>
  );
};

export default ConfirmEmailForm;
