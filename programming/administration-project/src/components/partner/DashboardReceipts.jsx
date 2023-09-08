import { useState, useEffect, useContext } from "react";
import { styles } from "../../styles";
import greetings from "../greetings";
import { ordersUrl, sendActUrl } from "../urls";
import axios from "axios";
import { arrowExpand, arrowExpanded } from "../../assets";
import { ResponseContext } from "../../App";

const DashboardReceipts = () => {
  const token = window.localStorage.getItem("token");
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  const [show, setShow] = useState(false);
  const { responseAuth, setResponseAuth } = useContext(ResponseContext);

  const useShowError = ({ error }) => {
    setShow(true);
    setResponseAuth({
      errorMessage: `${error}`,
    });
    setTimeout(() => setShow(false), 5000);
  };

  const Intro = ({ responseLogin }) => {
    return (
      <div
        className="w-full h-[200px] flex md:justify-between justify-center items-center md:text-left text-center 
              bg-white rounded-[12px] md:pl-[40px] pl-0 relative"
      >
        <h2 className={`${styles.sectionHeadText}`}>
          {greetings()}
          <br />
          <span>{responseLogin.name}</span>
        </h2>
        <div className="md:block hidden absolute w-[600px] right-0 h-full bg-rectangle"></div>
      </div>
    );
  };

  const ReceiptInfo = ({ token }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
      const getOrders = async () => {
        try {
          const response = await axios.get(ordersUrl, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          const responseState = response.data;
          setState(responseState);
        } catch (error) {
          console.log(error);
          useShowError({ error: "Не удалось вывести список покупок" });
          alert("Не удалось вывести список покупок");
        }
      };

      getOrders();
    }, [ordersUrl]);

    // uploadInput.addEventListener('change', onSelectFile, false);

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

      const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

      const [file, setFile] = useState(null);

      const submitFile = async (event) => {

        var formData = new FormData();
        formData.append("cheque_number", number);
        formData.append("act", file);

        axios(sendActUrl, {
          method: "PUT",
          headers: {
            Authorization: `token ${token}`,
          },
          data: formData,
          type: "POST",
          contentType: false,
          processData: false,
        })
          .then(function (response) {
            alert("Файл отправлен успешно!");
          })
          .catch(function (response) {
            useShowError({ error: "Не удалось добавить файл" });
            alert("Не удалось добавить файл");
          });
      };

      const HistoryItemDesc = () => {
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
            <form onSubmit={submitFile} id="form-order">
              <label htmlFor="uploadInput">
                <div
                  className="md:max-w-[450px] w-full h-[40px] border-primary border-[1px] border-solid rounded-[8px] flex items-center
                        justify-center relative ease duration-300 hover:border-[#9dbefc]"
                >
                  {(file && `${file.name}`) || "Выберите файл"}
                  <input
                    type="file"
                    id="uploadInput"
                    className="fileInput"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </label>
              <button
                type="submit"
                className="bg-primary p-2 rounded-[8px] text-white font-medium
                            md:max-w-[450px] w-full ease duration-300 hover:bg-hover cursor-pointer mt-[10px]"
              >
                Прикрепить акт приема-передачи товара
              </button>
            </form>
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
        <h2 className={`${styles.dashboardItemSubtitle}`}>История заказов</h2>
        <div className="mt-[10px] mb-[15px]">
          <input
            type="text"
            className="max-w-[400px] w-full h-[40px] rounded-[8px]  border-solid border-[1px] border-[#D2D2D2]
                      px-[15px] outline-primary"
            placeholder="Поиск по заказам"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className="bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] border-solid border-[1px] border-[#D2D2D2]">
          <div
            className="bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
                      border-solid border-b-[1px] border-[#D2D2D2]"
          >
            <h2>Заказ</h2>
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
    <section className="relative w-full h-full bgdashboard mt-[60px] z-0">
      <div className="max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px] ">
        <div className="mb-[20px]">
          <a href="/dashboardpartner" className="font-medium">
            Вернуться обратно
          </a>
        </div>
        <Intro responseLogin={userData} />
        <div className="flex flex-col md:gap-[30px] gap-0">
          <div>
            <ReceiptInfo token={token} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardReceipts;
