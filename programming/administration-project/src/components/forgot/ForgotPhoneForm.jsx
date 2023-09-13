import axios from "axios";
import { useForm } from "react-hook-form";
import { registrationCodeUrl } from "../urls";
import { styles } from "../../styles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseContext } from "../../App";
import { mailInput } from "../../assets";

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
    mode: "onBlur",
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
        dataMain.code = response.data.code;
        console.log(dataMain);
      })
      .catch(function (response) {
        useShowError({
          error: "Пользователь с этим номером телефона уже существует",
        });
      });
  };

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
          type="email"
          className={`${
            errors?.email ? styles.badInputStyles : styles.inputStyles
          } relative`}
          placeholder="Почта, куда отправится код"
          onInput={handleInput}
          {...register("email", {
            required: "Поле обязательно к заполнению",
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors?.email && (
            <p className="text-red-500 text-[12px]">
              {errors?.email?.message || "Некорректная почта" || "Ошибка!"}
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
          Введите вашу почту
        </h1>
        <form
          className="flex flex-col gap-[40px] mt-[30px]"
          //   onSubmit={handleSubmit(onSubmit)}
        >
          <InputCardCode />
          <input
            type="submit"
            value="Ввести"
            className="bg-primary p-4 rounded-[8px] text-white font-medium
                ease duration-300 hover:bg-hover cursor-pointer mt-[15px]"
            id="submit_btn"
          />
          <div className="flex mb-1 justify-center text-center">
            <p>
              Еще нет аккаунта?{" "}
              <a
                href="/registration"
                className="text-primary underline underline-offset-4"
              >
                Зарегистрируйтесь
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPhoneForm;
