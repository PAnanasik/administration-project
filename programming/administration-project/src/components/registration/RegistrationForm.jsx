import { useState, useEffect, useContext } from "react";
import { styles } from "../../styles";
import { useForm } from "react-hook-form";
import { mailInput, nameInput, passwordInput, phoneInput } from "../../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResponseContext } from "../../App";
import ErrorMessage from "../common/ErrorMessage";
import { registrationCodeUrl } from "../urls";

const RegistrationForm = () => {
  const [show, setShow] = useState(false);
  const { responseAuth, setResponseAuth } = useContext(ResponseContext);
  const [partner, setPartner] = useState(false);
  const [redirection, setRedirection] = useState(false);
  const navigate = useNavigate();

  const useShowError = ({ error }) => {
    document.querySelector("#submit_btn").disabled = true;
    setShow(true);
    setResponseAuth((prev) => ({
      ...prev,
      errorMessage: `${error}`,
    }));
    setTimeout(() => setShow(false), 5000);
    setTimeout(
      () => (document.querySelector("#submit_btn").disabled = false),
      5000
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      method: "",
    },
  });

  const registration = async (dataMain) => {
    await axios({
      method: "POST",
      url: `${registrationCodeUrl}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone: `${dataMain.phone}`,
      },
    })
      .then(function (response) {
        setResponseAuth((prev) => ({
          ...prev,
          dataUser: dataMain,
        }));
        setRedirection(true);
      })
      .catch(function (response) {
        console.log(response);
        useShowError({
          error: "Пользователь с этим номером телефона уже существует",
        });
      });
  };

  useEffect(() => {
    if (redirection) {
      navigate("/confirmation");
    }
  }, [redirection]);

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
      <div className="relative h-[60px] w-full">
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
  const InputCardName = () => {
    const [fullName, setFullName] = useState("");
    const [active, setActive] = useState(true);

    function handleInput(event) {
      if (event.target.value == 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
    return (
      <div className="relative h-[60px] w-full">
        <input
          type="text"
          className={`${styles.inputStyles}`}
          placeholder="ФИО"
          maxLength={100}
          onChange={(event) => setFullName(event.target.value)}
          title="Максимальная длина 100 символов"
          onInput={handleInput}
          {...register("fio")}
        />
        {active && <InputIcon prop={1} />}
        <div className="mt-1">
          {errors?.fio && (
            <p className="text-red-500 text-[12px]">
              {errors?.fio?.message || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardCompany = () => {
    const [active, setActive] = useState(true);

    function handleInput(event) {
      if (event.target.value == 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
    return (
      <div className="relative h-[60px] w-full">
        <input
          type="text"
          className={`${
            errors?.name ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Название компании"
          onInput={handleInput}
          {...register("name", {
            required: "Поле обязательно к заполнению",
            maxLength: 100,
          })}
        />
        {active && <InputIcon prop={1} />}
        <div className="mt-1">
          {errors?.name && (
            <p className="text-red-500 text-[12px]">
              {errors?.name?.message ||
                "Максимальная длина 100 символов" ||
                "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardMail = () => {
    const [active, setActive] = useState(true);

    function handleInput(event) {
      if (event.target.value == 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
    return (
      <div className="relative h-[60px] w-full">
        <input
          type="email"
          className={`${
            errors?.email ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Почта"
          onInput={handleInput}
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            required: "Поле обязательно",
          })}
        />
        {active && <InputIcon prop={2} />}
        <div className="mt-1">
          {errors?.email && (
            <p className="text-red-500 text-[12px]">
              {errors?.email?.message || "Неверный формат почты" || "Ошибка!"}
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

  const [matches, setMatches] = useState(
    window.matchMedia("(min-height: 800px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-height: 800px)")
      .addEventListener("change", (event) => setMatches(event.matches));
  }, []);

  return (
    <section
      className={`md:w-3/5 w-full lg:h-full h-[100vh] flex justify-center items-center px-[20px] absolute right-0 top-0 ${
        matches ? "items-center" : "items-start"
      } px-[20px] my-[30px]`}
    >
      <div className="lg:min-w-[600px] min-w-[200px]">
        <h1 className={`${styles.sectionHeadText} text-center`}>
          Зарегистрироваться
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
          className="flex flex-col gap-[35px]"
          onSubmit={handleSubmit(registration)}
        >
          <InputCardPhone />
          {!partner && <InputCardName />}
          {partner && <InputCardCompany />}
          <InputCardMail />
          <InputCardPassword />
          <div className="flex gap-[10px] items-center">
            <input type="checkbox" className="w-4 h-4" required />
            <p>
              Продолжая, вы принимаете какую-то там{" "}
              <a href="#" className="text-primary underline underline-offset-4">
                оферту
              </a>
            </p>
          </div>
          <button
            type="submit"
            name="registration button"
            className="bg-primary p-4 rounded-[8px] text-white font-medium
                    ease duration-300 hover:bg-hover cursor-pointer relative z-10"
            onClick={() =>
              setValue("method", `${partner ? "company" : "client"}`)
            }
            id="submit_btn"
          >
            Зарегистрироваться
          </button>
          <div className="flex mb-1 justify-center text-center">
            <p>
              Уже есть аккаунт?{" "}
              <a href="/" className="text-primary underline underline-offset-4">
                Войдите
              </a>
            </p>
          </div>
        </form>
      </div>
      {show && <ErrorMessage error={responseAuth.errorMessage} />}
    </section>
  );
};

export default RegistrationForm;
