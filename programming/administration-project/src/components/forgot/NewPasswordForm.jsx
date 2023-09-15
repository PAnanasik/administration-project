import axios from "axios";
import { useForm } from "react-hook-form";
import { resetPasswordUrl } from "../urls";
import { styles } from "../../styles";
import { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ResponseContext } from "../../App";
import { passwordInput } from "../../assets";

const NewPasswordForm = ({ codeUser, phoneUser }) => {
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
    const array = [passwordInput];
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

  const codeSend = async (data) => {
    console.log(data);
    if (data.newpassword == data.newpasswordrepeat) {
      await axios({
        method: "PATCH",
        url: `${resetPasswordUrl}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          phone: `${phoneUser}`,
          new_password: `${data.newpassword}`,
          code: `${codeUser}`,
        },
      })
        .then(function (response) {
            setRedirection(true)
            console.log(response)
        })
        .catch(function (response) {
          useShowError({
            error: "Произошла ошибка",
          });
          console.log(response);
        });
    } else {
      useShowError({ error: "Пароли не совпадают" });
    }
  };

  useEffect(() => {
    if (redirection) {
      navigate("/");
    }
  }, [redirection]);


  const InputCardPassword = () => {
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
          type="password"
          className={`${
            errors?.newpassword ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Новый пароль"
          onInput={handleInput}
          {...register("newpassword", {
            required: "Поле обязательно к заполнению",
            minLength: 8,
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors?.newpassword && (
            <p className="text-red-500 text-[12px]">
              {errors?.newpassword?.message ||
                "Минимальная длина пароля 8" ||
                "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardRepeatPassword = () => {
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
          type="password"
          className={`${
            errors?.newpasswordrepeat
              ? styles.badInputStyles
              : styles.inputStyles
          }`}
          placeholder="Повторите пароль"
          onInput={handleInput}
          {...register("newpasswordrepeat", {
            required: "Поле обязательно к заполнению",
            minLength: 8,
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors?.newpasswordrepeat && (
            <p className="text-red-500 text-[12px]">
              {errors?.newpasswordrepeat?.message ||
                "Минимальная длина пароля 8" ||
                "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="md:w-3/5 w-full lg:h-full h-[100vh] flex justify-center items-center px-[20px] absolute right-0 top-0">
      <div className="lg:min-w-[600px] min-w-[200px]">
        <h1 className={`${styles.sectionHeadText} text-center`}>
          Восстановление
        </h1>
        <h1 className={`${styles.sectionSubText} text-center`}>
          Введите новый пароль
        </h1>
        <form
          className="flex flex-col gap-[35px] mt-[30px]"
          onSubmit={handleSubmit(codeSend)}
        >
          <InputCardPassword />
          <InputCardRepeatPassword />
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

export default NewPasswordForm;
