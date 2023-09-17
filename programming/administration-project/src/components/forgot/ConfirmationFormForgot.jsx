import { styles } from "../../styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResponseContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import { mailInput, nameInput, passwordInput, phoneInput } from "../../assets";
import axios from "axios";
import { forgotCodeUrl } from "../urls";

const ConfirmationFormForgot = ({ phoneUser }) => {
  const { setResponseAuth } = useContext(ResponseContext);
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

  const InputIcon = ({ prop }) => {
    const array = [phoneInput, nameInput, mailInput, passwordInput];
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
    mode: "onBlur",
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${forgotCodeUrl}`,
      data: {
        phone: `${phoneUser}`,
        code: `${data.code}`,
      },
    })
      .then(function (response) {
        setResponseAuth((prev) => ({
          ...prev,
          codeUser: data.code,
        })),
          setRedirection(true);
      })
      .catch(function (response) {
        useShowError({ error: "Неправильный код" });
      });
    reset();
  };

  useEffect(() => {
    if (redirection) {
      navigate("/newpassword");
    }
  }, [redirection]);

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
          Введите код из смс
        </h1>
        <form
          className="flex flex-col gap-[35px] mt-[30px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputCardCode />
          <input
            type="submit"
            value="Ввести"
            name="submit button"
            className="bg-primary p-4 rounded-[8px] text-white font-medium
                ease duration-300 hover:bg-hover cursor-pointer mt-[15px]"
            id="submit_btn"
          />
          <div className="flex flex-col mb-1 justify-center text-center">
            <p>
              Еще нет аккаунта?{" "}
              <a
                href="/registration"
                className="text-primary underline underline-offset-4"
              >
                Зарегистрируйтесь
              </a>
            </p>
            <p>
              Уже есть аккаунт?{" "}
              <a href="/" className="text-primary underline underline-offset-4">
                Войдите
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConfirmationFormForgot;
