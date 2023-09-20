import axios from "axios";
import { useForm } from "react-hook-form";
import { registrationCodeUrl, resetPasswordCodeUrl } from "../urls";
import { styles } from "../../styles";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseContext } from "../../App";
import { phoneInput } from "../../assets";

const ForgotPhoneForm = () => {
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
    const array = [phoneInput];
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

  const codeSend = async (dataMain) => {
    await axios({
      method: "POST",
      url: `${resetPasswordCodeUrl}`,
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
          phoneUser: dataMain.phone,
        }));
        setRedirection(true);
      })
      .catch(function (response) {
        useShowError({
          error: "Пользователь не найден",
        });
      });
  };

  useEffect(() => {
    if (redirection) {
      navigate("/codeforgot");
    }
  }, [redirection]);

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

  return (
    <section className="md:w-3/5 w-full lg:h-full h-[100vh] flex justify-center items-center px-[20px] absolute right-0 top-0">
      <div className="sm:min-w-[600px] min-w-[270px]">
        <h1 className={`${styles.sectionHeadText} text-center`}>
          Восстановление
        </h1>
        <h1 className={`${styles.sectionSubText} text-center`}>
          Введите ваш номер телефона
        </h1>
        <form
          className="flex flex-col gap-[35px] mt-[30px]"
          onSubmit={handleSubmit(codeSend)}
        >
          <InputCardPhone />
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

export default ForgotPhoneForm;
