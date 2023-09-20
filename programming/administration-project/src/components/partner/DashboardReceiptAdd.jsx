import { styles } from "../../styles";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import {
  phoneInput,
  receipt,
  cash,
  product,
  percent,
  withdraw,
  nameInput,
  date,
} from "../../assets";
import Intro from "../common/Intro";
import axios from "axios";
import { addChequeUrl, addNotificationClientUrl } from "../urls";
import { ResponseContext } from "../../App";

const DashboardReceiptAdd = ({ token }) => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  const { setResponseAuth } = useContext(ResponseContext);

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

  const useShowSuccess = ({ success }) => {
    setResponseAuth((prev) => ({
      ...prev,
      successMessage: `${success}`,
      showSuccessMessage: true,
    }));
    setTimeout(
      () =>
        setResponseAuth((prev) => ({
          ...prev,
          showSuccessMessage: false,
        })),
      5000
    );
  };

  const onSubmitAddPurchase = async (data, event) => {
    data.date += "+00:00";
    event.preventDefault();
    axios({
      method: "POST",
      url: `${addChequeUrl}`,
      data: data,
      headers: { Authorization: `token ${token}` },
      withCredentials: true,
    })
      .then(function (response) {
        useShowSuccess({ success: "Покупка добавлена успешно!" });
        axios({
          method: "PUT",
          url: `${addNotificationClientUrl}`,
          headers: { Authorization: `token ${token}` },
          data: {
            notification: `Вы совершили покупку у ${userData.name}`,
            phone_client: `${data.phone}`,
          },
          withCredentials: true,
        })
          .then(function (response) {})
          .catch(function (response) {
            useShowError({ error: "Не удалось отправить уведомление" });
          });
      })
      .catch(function (response) {
        useShowError({ error: "Не удалось добавить покупку (проверьте существование пользователя и его бонусы)" });
      });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const InputIcon = ({ prop }) => {
    const array = [
      phoneInput,
      nameInput,
      receipt,
      cash,
      date,
      product,
      percent,
      withdraw,
    ];
    return (
      <img
        src={array[prop]}
        alt="phone"
        className="absolute right-[20px] top-[18px] w-6 h-6 opacity-[0.6]"
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
          type="tel"
          className={`${
            errors2?.phone_client ? styles.badInputStyles : styles.inputStyles
          } relative`}
          placeholder="Номер телефона"
          onInput={handleInput}
          pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
          title="Используйте формат: +79046585851"
          {...register2("phone_client", {
            required: "Поле обязательно к заполнению",
            minLength: 12,
            maxLength: 12,
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors2?.phone_client && (
            <p className="text-red-500 text-[12px]">
              {errors2?.phone_client?.message ||
                "Длина номера 12 символов" ||
                "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardName = () => {
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
            errors2?.fio_client ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="ФИО"
          onInput={handleInput}
          {...register2("fio_client", {
            required: "Поле обязательно к заполнению",
          })}
        />
        {active && <InputIcon prop={1} />}
        <div className="mt-1">
          {errors2?.fio_client && (
            <p className="text-red-500 text-[12px]">
              {errors2?.fio_client?.message || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardPhoneNext = () => {
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
            errors?.phone ? styles.badInputStyles : styles.inputStyles
          } relative`}
          placeholder="Номер телефона"
          onInput={handleInput}
          pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
          title="Используйте формат: +79046585851"
          required
          {...register("phone", {
            required: "Поле обязательно к заполнению",
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors?.phone && (
            <p className="text-red-500 text-[12px]">
              {errors?.phone?.message || "Длина номера 12 цифр" || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardReceipt = () => {
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
          }`}
          placeholder="Номер чека"
          onInput={handleInput}
          {...register("number", {
            required: "Поле обязательно к заполнению",
            pattern: /^[0-9]+$/,
          })}
        />
        {active && <InputIcon prop={2} />}
        <div className="mt-1">
          {errors?.number && (
            <p className="text-red-500 text-[12px]">
              {errors?.number?.message ||
                "Длина чека должна быть больше 0 цифр" ||
                "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardCash = () => {
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
            errors?.amount ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Сумма покупки"
          onInput={handleInput}
          {...register("amount", {
            required: "Поле обязательно к заполнению",
            pattern: /^[0-9]+$/,
          })}
        />
        {active && <InputIcon prop={3} />}
        <div className="mt-1">
          {errors?.amount && (
            <p className="text-red-500 text-[12px]">
              {errors?.amount?.message || "Неверный формат" || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardDate = () => {
    const [active, setActive] = useState(true);

    function handleInput(event) {
      if (event.target.value == 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }

    function todayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var time = today.toLocaleTimeString("ru-Ru");
      var yyyy = today.getFullYear();
      var currentDateTime = `${yyyy}-${mm}-${dd} ${time}`;
      return currentDateTime;
    }

    return (
      <div className="relative h-[60px] w-full">
        <input
          type="text"
          className={`${
            errors?.date ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Дата и время покупки"
          pattern="^(19|20)\d{2}-(0[1-9]|1[1,2])-(0[1-9]|[12][0-9]|3[01])\s(0|1|2){1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}"
          title="Используйте формат: 2023-08-23 07:58:53"
          onInput={handleInput}
          {...register("date", {
            required: "Поле обязательно к заполнению",
            value: todayDate(),
          })}
        />
        {active && <InputIcon prop={4} />}
        <div className="mt-1">
          {errors?.date && (
            <p className="text-red-500 text-[12px]">
              {errors?.date?.message || "Неверный формат" || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardPurchaseName = () => {
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
            errors?.name_purchase ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Название товара"
          onInput={handleInput}
          {...register("name_purchase", {
            required: "Поле обязательно к заполнению",
          })}
        />
        {active && <InputIcon prop={5} />}
        <div className="mt-1">
          {errors?.name_purchase && (
            <p className="text-red-500 text-[12px]">
              {errors?.name_purchase?.message || "Неверный формат" || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardBonusPercent = () => {
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
            errors?.percent ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="Бонусный процент"
          onInput={handleInput}
          {...register("percent", {
            pattern: /^[0-9]+$/,
            required: "Поле обязательно к заполнению",
          })}
        />
        {active && <InputIcon prop={6} />}
        <div className="mt-1">
          {errors?.percent && (
            <p className="text-red-500 text-[12px]">
              {errors?.percent?.message || "Только цифры" || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputBonuses = () => {
    const [inputBonus, setInputBonus] = useState("");
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
          placeholder="Бонусов для снятия"
          onInput={(e) => setInputBonus(e.target.value)}
          {...register("bonuses_spent", {
            value: `${inputBonus}`,
            pattern: /^[0-9]+$/,
            required:
              "Поле обязательно (если вы не хотите снимать бонусы, напишите 0)",
          })}
        />
        {active && <InputIcon prop={7} />}
        <div className="mt-1">
          {errors?.bonuses_spent && (
            <p className="text-red-500 text-[12px]">
              {errors?.bonuses_spent?.message || "Только цифры" || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const InputCardCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState("Электроника");

    return (
      <div className="relative h-[60px] w-full">
        <select
          type="select"
          className={`${styles.inputStyles}`}
          placeholder="Категория товара"
          id="selection"
          defaultValue={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          {...register("payment_order", {
            value: `${selectedCategory}`,
          })}
        >
          <option value="Электроника">Электроника</option>
          <option value="Одежда и обувь">Одежда и обувь</option>
          <option value="Одежда и обувь">Красота и здоровье</option>
          <option value="Одежда и обувь">Спорт и отдых</option>
          <option value="Одежда и обувь">Дом и сад</option>
          <option value="Одежда и обувь">Авто и мото</option>
          <option value="Одежда и обувь">Продукты питания</option>
          <option value="Одежда и обувь">Книги и развлечения</option>
        </select>
      </div>
    );
  };

  const InputOrdered = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event) => {
      setIsChecked(event.target.checked);
    };

    return (
      <div className="flex gap-[10px] items-center">
        <input
          type="checkbox"
          className="w-4 h-4"
          onChange={handleChange}
          {...register("to_order", {
            value: isChecked,
          })}
        />
        <p>Товар на заказ</p>
      </div>
    );
  };

  const AddPurchase = () => {
    return (
      <section className="mt-[15px] flex-1">
        <div className="flex w-full justify-between">
          <h2 className={`${styles.dashboardItemSubtitle}`}>
            Добавить покупку
          </h2>
        </div>
        <div
          className="bg-white w-full max-h-[900px] md:py-[30px] py-[10px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px]
            border-solid border-[1px] border-[#D2D2D2]"
        >
          <form
            key={1}
            className="w-full flex flex-col gap-[30px] h-full justify-center"
            onSubmit={handleSubmit(onSubmitAddPurchase)}
          >
            <InputCardPhoneNext />
            <InputCardReceipt />
            <InputCardCash />
            <InputCardDate />
            <InputCardPurchaseName />
            <InputCardBonusPercent />
            <InputBonuses />
            <InputCardCategories />
            <InputOrdered />
            <button
              type="submit"
              name="add receipt button"
              className="bg-primary p-4 rounded-[8px] text-white font-medium md:max-w-[400px] w-full 
                  mt-[10px] flex justify-center relative ease duration-300 hover:bg-hover gap-[10px]"
              {...register("name_partner", {
                value: `${userData.name}`,
              })}
            >
              <p>Добавить чек</p>
            </button>
          </form>
        </div>
      </section>
    );
  };
  return (
    <section className="relative w-full h-full bgdashboard mt-[60px] z-0">
      <div className="max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px] ">
        <Intro responseLogin={userData} />
        <div className="flex flex-col md:gap-[30px] gap-0">
          <div>
            <AddPurchase token={token} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardReceiptAdd;
