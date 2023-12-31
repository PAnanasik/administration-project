import { useState, useEffect, useContext } from "react";
import { styles } from "../../styles";
import { arrowExpand, arrowExpanded } from "../../assets";
import axios from "axios";
import { ResponseContext } from "../../App";
import { purchasesUrl, refundUrl } from "../urls";
import Intro from "../common/Intro";

const DashboardClient = () => {
  const token = window.localStorage.getItem("token");
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  const [modalInfo, setModalInfo] = useState({
    name: "",
    amount: "",
    date: "",
    total_amount: "",
  });
  const [modal, setModal] = useState(false);
  const { setResponseAuth } = useContext(ResponseContext);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 560px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 560px)")
      .addEventListener("change", (event) => setMatches(event.matches));
  }, []);

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
    setModal(false);
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

  const ModalWindow = () => {
    const [selectedCategory, setSelectedCategory] =
      useState("Товар не подошел");

    const handleModal = (event) => {
      event.preventDefault();
      axios({
        method: "POST",
        url: `${refundUrl}`,
        data: {
          phone_client: `${userData.phone}`,
          number_cheque: modalInfo.number,
          reason_refund: `${selectedCategory}`,
          date_cheque: modalInfo.date,
          total_amount: modalInfo.total_amount,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        withCredentials: true,
      })
        .then(function (response) {
          useShowSuccess({ success: "Возврат совершен!" });
          setModal(false);
        })
        .catch(function (response) {
          useShowError({ error: "Не удалось совершить возврат (чек не подтвержден)" });
        });
    };

    return (
      <div
        className="max-w-[560px] w-full h-[400px] bg-white fixed border-solid border-[1px] border-[#D2D2D2] rounded-[12px]
      lg:top-[100px] top-[100px] left-0 right-0 mx-auto z-10 px-[30px]"
      >
        <div className="mt-[50px] h-[300px] relative">
          <h2 className="font-medium text-[20px] pb-[15px]">
            Наименование товара: {modalInfo.name}
          </h2>
          <div className="pt-[16px]  flex flex-col">
            <form action="" onSubmit={handleModal} className="flex flex-col">
              <label htmlFor="selection">Причина возврата</label>
              <select
                type="select"
                className={`${styles.inputStyles}`}
                placeholder="Категория товара"
                id="selection"
                defaultValue={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Товар не подошел">Товар не подошел</option>
                <option value="Товар ненадлежащего качества">
                  Товар ненадлежащего качества
                </option>
                <option value="Гарантийный случай">Гарантийный случай</option>
              </select>
              <button
                type="submit"
                name="refund button"
                className="bg-red-500 p-2 rounded-[8px] text-white font-medium
                        md:max-w-[150px] w-full mt-[20px] ease duration-300 hover:bg-red-400 cursor-pointer"
              >
                Возврат
              </button>
            </form>
          </div>
          <button
            type="submit"
            name="close modal button"
            className="bg-primary p-2 rounded-[8px] text-white font-medium
              w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer absolute bottom-0"
            onClick={() => setModal(false)}
          >
            Закрыть
          </button>
        </div>
      </div>
    );
  };

  const HistoryInfo = ({ token }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
      const getPurchases = async () => {
        try {
          const response = await axios.get(purchasesUrl, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          const responseState = response.data;
          setState(responseState);
        } catch (error) {
          useShowError({ error: "Не удалось вывести список покупок" });
        }
      };

      getPurchases();
    }, []);

    const HistoryItem = ({
      name,
      amount,
      number,
      date,
      is_confirmed,
      bonuses_spent,
      total_amount,
    }) => {
      const [expanded, setExpanded] = useState(false);

      const HistoryItemDesc = () => {
        function handleToModalScroll() {
          setModalInfo({
            name: name,
            number: number,
            date: date,
            total_amount: total_amount,
          });
          setModal(true);
          window.scrollTo(0, 0);
        }

        return (
          <div className="flex flex-col gap-[10px] py-[20px] px-[30px] border-solid border-t-[1px] border-[#D2D2D2]">
            <p>Цена: {amount}</p>
            <p>Списанные бонусы: {bonuses_spent}</p>
            <p>Дата покупки: {date}</p>
            <p className="font-medium">Итоговая цена: {total_amount}</p>
            <div className="flex items-center gap-[8px]">
              <p className="font-medium">Подтверждено</p>
              {is_confirmed ? (
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-4 h-4 pointer-events-none"
                  readOnly
                  checked
                />
              ) : (
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-4 h-4 pointer-events-none"
                  readOnly
                />
              )}
            </div>
            <button
              className="bg-red-500 p-1 rounded-[8px] text-white font-medium
                md:max-w-[150px] w-full ease duration-300 hover:bg-red-400 cursor-pointer mt-[10px]"
              onClick={handleToModalScroll}
            >
              Возврат
            </button>
          </div>
        );
      };
      return (
        <>
          <div className="border-solid first:border-t-transparent border-t-[1px] border-[#D2D2D2]">
            <div
              className="
              w-full h-[60px] flex justify-between items-center px-[30px] "
            >
              <h2 className={`${styles.dashboardItemTitle}`}>{name}</h2>
              <button onClick={() => setExpanded(!expanded)}>
                <img
                  src={expanded ? arrowExpanded : arrowExpand}
                  alt=""
                  className="w-4 h-4"
                />
              </button>
            </div>

            {expanded && <HistoryItemDesc />}
          </div>
        </>
      );
    };

    const [value, setValue] = useState("");

    const filteredPartners = state.filter((item) => {
      return item.name?.toLowerCase()?.includes(value.toLowerCase());
    });

    return (
      <section className="mt-[15px] flex-1">
        <h2 className={`${styles.dashboardItemSubtitle}`}>История покупок</h2>
        <div className="mt-[10px] mb-[15px]">
          <input
            type="text"
            className="max-w-[400px] w-full h-[40px] rounded-[8px]  border-solid border-[1px] border-[#D2D2D2]
            px-[15px] outline-primary"
            placeholder="Поиск по покупкам"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className="bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] border-solid border-[1px] border-[#D2D2D2]">
          <div
            className="bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
            border-solid border-b-[1px] border-[#D2D2D2]"
          >
            <h2>Товар</h2>
            <h2>Информация</h2>
          </div>
          <div className="">
            {filteredPartners.map((item, index) => (
              <HistoryItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className="w-full h-full bgdashboard mt-[60px]">
      {modal && (
        <div className="absolute w-full h-full bg-black bg-opacity-[0.3] z-10"></div>
      )}
      {modal && <ModalWindow />}
      <div className="max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px]">
        <Intro responseLogin={userData} />
        <div className="flex flex-col h-full">
          <HistoryInfo token={token} />
        </div>
      </div>
    </section>
  );
};

export default DashboardClient;
