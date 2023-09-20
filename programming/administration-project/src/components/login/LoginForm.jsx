import { useState, useEffect } from "react";
import { styles } from "../../styles";
import { useForm } from "react-hook-form";
import { mailInput, nameInput, passwordInput, phoneInput } from "../../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResponseContext } from "../../App";
import { useContext } from "react";
import { clientUrl, loginUrl, partnerUrl } from "../urls";

const LoginForm = () => {
  const [partner, setPartner] = useState(false);

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

  function requestFunction(data, pcUrl) {
    axios({
      method: "post",
      url: `${loginUrl}`,
      data: data,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then(function (response) {
        const token = response.data.auth_token;
        axios({
          method: "GET",
          url: `${pcUrl}`,
          headers: { Authorization: `token ${token}` },
          withCredentials: true,
        })
          .then(function (response) {
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("loggedIn", true);
            window.localStorage.setItem(
              "userData",
              JSON.stringify(response.data[0])
            );
            window.localStorage.setItem("method", partner);
            window.localStorage.setItem(
              "verified",
              response.data[0].is_verified_email
            );
            setRedirection(true);
          })
          .catch(function (response) {
            window.localStorage.removeItem("loggedIn");
            useShowError({ error: "Проверьте правильность выбранной роли" });
          });
      })

      .catch(function (response) {
        setResponseAuth({ loggedIn: false });
        useShowError({ error: "Проверьте правильность введенных данных" });
      });
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    if (partner) {
      requestFunction(data, partnerUrl);
    } else {
      requestFunction(data, clientUrl);
    }
  };

  useEffect(() => {
    if (redirection && !partner) {
      navigate("/dashboardclient");
    } else if (redirection && partner) {
      navigate("/dashboardpartner");
    }
  }, [redirection, partner]);

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

  const InputCardPhone = () => {
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
            errors?.number ? styles.badInputStyles : styles.inputStyles
          } relative`}
          placeholder="Номер телефона"
          onInput={handleInput}
          pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
          title="Используйте формат: +79046585851"
          {...register("phone", {
            required: "Поле обязательно к заполнению",
            minLength: 12,
            maxLength: 12,
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors?.number && (
            <p className="text-red-500 text-[12px]">
              {errors?.number?.message ||
                "Длина номера 12 символов" ||
                "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

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
            errors?.password ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Пароль"
          onInput={handleInput}
          {...register("password", {
            required: "Поле обязательно к заполнению",
            minLength: 8,
          })}
        />
        {active && <InputIcon prop={3} />}
        <div className="mt-1">
          {errors?.password && (
            <p className="text-red-500 text-[12px]">
              {errors?.password?.message ||
                "Минимальная длина пароля 8" ||
                "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white md:w-3/5 w-full lg:h-full h-[100vh] flex justify-center items-center px-[20px] absolute right-0 top-0">
      <div className="sm:min-w-[600px] min-w-[270px]">
        <h1 className={`${styles.sectionHeadText} text-center`}>
          Войти в аккаунт
        </h1>
        <h1 className={`${styles.sectionSubText} text-center`}>
          Мы вновь вас приветствуем!
        </h1>
        <div className="flex w-full justify-center mt-[15px] mb-[30px]">
          <button
            className={`${
              partner ? "bg-input text-black" : "bg-primary text-white"
            } p-2 
                    rounded-l-[8px] max-w-[150px] w-full`}
            onClick={() => setPartner(!partner)}
          >
            Клиент
          </button>
          <button
            className={`${
              partner ? "bg-primary text-white" : "bg-input text-black"
            } p-2 
                    rounded-r-[8px] max-w-[150px] w-full`}
            onClick={() => setPartner(!partner)}
          >
            Партнер
          </button>
        </div>
        <form
          className="flex flex-col gap-[35px] mt-[30px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputCardPhone />
          <InputCardPassword />
          <input
            type="submit"
            name="login button"
            value="Войти"
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
              Забыли пароль?{" "}
              <a
                href="/forgot"
                className="text-primary underline underline-offset-4"
              >
                Сменить пароль
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
