import { useState, useEffect, useContext } from "react";
import { styles } from "../../styles";
import {
  arrowExpand,
  arrowExpanded,
  nameInput,
  phoneInput,
  cash,
  date,
  receipt,
  percent,
  product,
  withdraw,
  stats,
} from "../../assets";
import { useForm } from "react-hook-form";
import { ResponseContext } from "../../App";
import axios from "axios";
import {
  addNotificationClientUrl,
  getClientsListUrl,
  remove_addUrl,
} from "../urls";
import { InView } from "react-intersection-observer";
import Intro from "../common/Intro";

const DashboardPartner = ({ token }) => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  const [modalInfo, setModalInfo] = useState({
    name: "",
    bonuses: "",
    phone: "",
  });
  const [modal, setModal] = useState(false);
  const { setResponseAuth } = useContext(ResponseContext);
  const [responseState, setState] = useState([]);

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
            errors?.phone_client ? styles.badInputStyles : styles.inputStyles
          } relative`}
          placeholder="Номер телефона"
          onInput={handleInput}
          pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
          title="Используйте формат: +79046585851"
          {...register("phone_client", {
            required: "Поле обязательно к заполнению",
            minLength: 12,
            maxLength: 12,
          })}
        />
        {active && <InputIcon prop={0} />}
        <div className="mt-1">
          {errors?.phone_client && (
            <p className="text-red-500 text-[12px]">
              {errors?.phone_client?.message ||
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
            errors?.fio_client ? styles.badInputStyles : styles.inputStyles
          }`}
          placeholder="ФИО"
          onInput={handleInput}
          {...register("fio_client", {
            required: "Поле обязательно к заполнению",
          })}
        />
        {active && <InputIcon prop={1} />}
        <div className="mt-1">
          {errors?.fio_client && (
            <p className="text-red-500 text-[12px]">
              {errors?.fio_client?.message || "Ошибка!"}
            </p>
          )}
        </div>
      </div>
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

  const onSubmitAddClient = async (data, event) => {
    event.preventDefault();
    data.method = "add";
    axios({
      method: "PUT",
      url: `${remove_addUrl}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      withCredentials: true,
    })
      .then(function (response) {
        setState((oldItem) => [...oldItem, responseState]);
        useShowSuccess({ success: "Клиент добавлен успешно!" });
        axios({
          method: "PUT",
          url: `${addNotificationClientUrl}`,
          headers: { Authorization: `token ${token}` },
          data: {
            notification: `Вас добавил ${userData.name}`,
            phone_client: `${data.phone_client}`,
          },
          withCredentials: true,
        })
          .then(function (response) {
          })
          .catch(function (response) {
            console.log(response);
            useShowError({ error: "Не удалось отправить уведомление" });
          });
      })
      .catch(function (response) {
        console.log(response);
        useShowError({ error: "Не удалось добавить клиента" });
      });
  };

  const Stats = ({ responseLogin }) => {
    return (
      <section className="mt-[15px] flex-1">
        <h2 className={`${styles.dashboardItemSubtitle}`}>Статистика</h2>
        <div
          className="bg-white w-full md:h-[300px] mt-[15px] rounded-[12px] px-[30px] h-full
          border-solid border-[1px] border-[#D2D2D2] flex sm:flex-row flex-col-reverse py-4 sm:text-start text-center 
          lg:items-start items-center justify-between relative"
        >
          <div className="max-w-[400px] w-full flex flex-col gap-[20px] md:mt-[15px]">
            <div>
              <h2 className="font-medium text-[24px]">Ваша статистика</h2>
              <p className="text-[18px]">
                Клиентов: <span>{responseLogin.clients.length || 0}</span>
              </p>
            </div>
            <p className="text-[#cfcfcf] max-w-[400px]">
              Чтобы увеличить количество клиентов, пользуйтесь сервисом чаще:
              добавляйте клиентов, начисляйте им бонусы и т.д.
            </p>
          </div>
          <img
            src={stats}
            alt=""
            className="sm:w-1/2 w-full md:h-full h-[300px] object-cover py-2"
          />
        </div>
      </section>
    );
  };

  const AddClient = ({ responseLogin }) => {
    return (
      <section className="mt-[15px] flex-1">
        <h2 className={`${styles.dashboardItemSubtitle}`}>Добавить клиента</h2>
        <div
          className="bg-white w-full md:h-[300px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px] h-full
        border-solid border-[1px] border-[#D2D2D2]"
        >
          <div className="flex md:flex-row flex-col w-full h-full items-center py-[10px]">
            <form
              action=""
              onSubmit={handleSubmit(onSubmitAddClient)}
              className="w-full flex flex-col gap-[30px] h-full justify-center"
            >
              <InputCardPhone />
              <InputCardName />
              <button
                type="submit"
                name="add client button"
                className="bg-primary p-4 rounded-[8px] text-white font-medium md:max-w-[400px]
                w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer"
                {...register("name_partner", {
                  value: `${responseLogin.name}`,
                })}
              >
                Добавить клиента
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };

  const ModalWindow = () => {
    const [dataBonus, setDataBonus] = useState(modalInfo.bonuses);

    const removeClient = async (event) => {
      event.preventDefault();
      axios({
        method: "PUT",
        url: `${remove_addUrl}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        withCredentials: true,
        data: {
          name_partner: `${userData.name}`,
          phone_client: `${modalInfo.phone}`,
          method: "remove",
        },
      })
        .then(function (response) {
          setState((oldItem) => [...oldItem, responseState]);
          useShowSuccess({ success: "Клиент удален успешно!" });
          setModal(false);
        })
        .catch(function (response) {
          console.log(response);
          useShowError({ error: "Не удалось удалить клиента" });
        });
    };

    return (
      <div
        className="max-w-[560px] w-full h-[320px] bg-white fixed border-solid border-[1px] border-[#D2D2D2] rounded-[12px]
        lg:bottom-[250px] bottom-[150px] left-0 right-0 mx-auto z-10 px-[30px]"
      >
        <div className="mt-[40px] h-[230px] relative">
          <h2 className="font-medium text-[20px]">
            Имя клиента: {modalInfo.name || "Без имени"}
          </h2>
          <div className="pt-[16px] flex flex-col">
            <form action="" className="flex flex-col">
              <label htmlFor="bonuses">Количество бонусов: {dataBonus}</label>
              <button
                type="submit"
                name="delete client button"
                className="bg-red-500 p-2 rounded-[8px] text-white font-medium
                                md:max-w-[250px] w-full ease duration-300 hover:bg-red-400 cursor-pointer mt-[20px]"
                id="btn-error-handled"
                onClick={removeClient}
              >
                Удалить клиента
              </button>
            </form>
          </div>
          <button
            type="submit"
            name="modal button"
            className="bg-primary p-2 rounded-[8px] text-white font-medium
                w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer absolute bottom-[-20px]"
            onClick={() => setModal(false)}
          >
            Закрыть
          </button>
        </div>
      </div>
    );
  };

  const ClientItem = ({ fio, phone, bonuses = 0 }) => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setModal(false);
      }
    });
    const [expanded, setExpanded] = useState(false);
    const [matches, setMatches] = useState(
      window.matchMedia("(min-width: 560px)").matches
    );

    useEffect(() => {
      window
        .matchMedia("(min-width: 560px)")
        .addEventListener("change", (event) => setMatches(event.matches));
    }, []);

    const ItemDesc = () => {
      return (
        <div className="flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2]">
          <p className="font-medium">
            Номер: <span>{phone}</span>
          </p>
        </div>
      );
    };

    function handleModalInfo() {
      setModal(!modal);
      window.scrollTo(0, document.body.scrollHeight);
      setModalInfo({ name: fio, bonuses: bonuses, phone: phone });
    }

    return (
      <>
        <div className="border-solid border-b-[1px] border-[#D2D2D2] last:border-b-transparent">
          <div
            className="w-full h-[80px] flex flex-row justify-between items-center 
                font-medium relative px-[30px]"
          >
            <div
              className="flex gap-[10px] items-center cursor-pointer"
              onClick={handleModalInfo}
            >
              <div className="w-[40px] h-[40px] rounded-full bg-primary"></div>
              <h2>{fio || "Без имени"}</h2>
            </div>
            {matches ? (
              <div>
                <p>{phone}</p>
              </div>
            ) : (
              <button onClick={() => setExpanded(!expanded)}>
                <img
                  src={expanded ? arrowExpanded : arrowExpand}
                  className="w-4 h-4"
                ></img>
              </button>
            )}
          </div>
          {expanded && <ItemDesc />}
        </div>
      </>
    );
  };

  const ClientsList = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
      const getClient = async () => {
        try {
          const response = await axios.get(`${getClientsListUrl}`, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          const responseState = response.data;
          setState(responseState);
        } catch (error) {
          console.log(error);
          useShowError({ error: "Не удалось вывести список клиентов" });
        }
      };

      getClient();
    }, []);

    const [value, setValue] = useState("");

    const filteredClients = state.filter((item) => {
      return item.phone?.toLowerCase()?.includes(value.toLowerCase());
    });

    return (
      <section className="mt-[15px] flex-1">
        <h2 className={`${styles.dashboardItemSubtitle}`}>Список клиентов</h2>
        <div className="my-[10px]">
          <input
            type="text"
            className="max-w-[400px] w-full h-[40px] rounded-[8px] border-solid border-[1px] border-[#D2D2D2]
            px-[15px] outline-primary"
            placeholder="Поиск по номеру клиента"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div
          className="bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] h-full 
        border-solid border-[1px] border-[#D2D2D2]"
        >
          <div
            className="bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
            border-solid border-b-[1px] border-[#D2D2D2]"
          >
            <h2>Клиент</h2>
            <h2>Номер</h2>
          </div>
          <InView>
            {({ inView, ref }) => (
              <div className="" ref={ref}>
                {filteredClients.map(
                  (item, index) =>
                    inView && <ClientItem key={index} {...item} />
                )}
              </div>
            )}
          </InView>
        </div>
      </section>
    );
  };

  return (
    <section className="relative w-full h-full bgdashboard mt-[60px] z-0">
      {modal && (
        <div className="absolute w-full h-full bg-black bg-opacity-[0.3] z-10"></div>
      )}
      {modal && <ModalWindow />}
      <div className="max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px] ">
        <Intro responseLogin={userData} />
        <div className="flex lg:flex-row flex-col lg:gap-[30px] gap-0 w-full justify-between">
          <Stats responseLogin={userData} />
        </div>
        <div className="flex flex-col md:gap-[30px] gap-0">
          <div>
            <AddClient responseLogin={userData} />
            <ClientsList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPartner;
