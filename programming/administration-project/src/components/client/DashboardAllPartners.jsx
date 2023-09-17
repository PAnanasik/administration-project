import { useState, useEffect, useContext } from "react";
import { partnersListAll, remove_addUrl } from "../../components/urls";
import { styles } from "../../styles";
import { InView } from "react-intersection-observer";
import axios from "axios";
import Intro from "../common/Intro";
import { arrowExpand, arrowExpanded } from "../../assets";
import { ResponseContext } from "../../App";

const DashboardAllPartners = ({ token }) => {
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

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 560px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 560px)")
      .addEventListener("change", (event) => setMatches(event.matches));
  }, []);

  const PartnersItemAll = ({ name, token }) => {
    const [expanded, setExpanded] = useState(false);

    const addPartner = async () => {
      axios({
        method: "PUT",
        url: `${remove_addUrl}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        withCredentials: true,
        data: {
          name_partner: `${name}`,
          phone_client: `${userData.phone}`,
          method: "add",
        },
      })
        .then(function (response) {
          useShowSuccess({ success: "Партнер добавлен успешно!" });
        })
        .catch(function (response) {
          useShowError({ error: "Не удалось добавить партнера" });
        });
    };

    const ItemDesc = () => {
      return (
        <div className="flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2]">
          <button
            type="submit"
            name="add partner button"
            className="bg-primary p-2 rounded-[8px] text-white font-medium
            max-w-[150px] w-full mt-[10px] ease duration-300 hover:bg-primary cursor-pointer"
            onClick={addPartner}
          >
            Добавить
          </button>
        </div>
      );
    };

    return (
      <div className="border-solid border-b-[1px] border-[#D2D2D2] last:border-b-transparent">
        <div
          className="w-full h-[80px] flex flex-row justify-between items-center 
                font-medium relative px-[30px]"
        >
          <div className="flex gap-[10px] items-center">
            <div className="w-[40px] h-[40px] rounded-full bg-primary"></div>
            <h2>{name || "Без имени"}</h2>
          </div>
          {matches ? (
            <button
              type="submit"
              name="add partner button"
              className="bg-primary p-2 rounded-[8px] text-white font-medium
                max-w-[150px] w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer"
              onClick={addPartner}
            >
              Добавить
            </button>
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
    );
  };

  const PartnersListAll = ({ token }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
      axios({
        method: "GET",
        url: `${partnersListAll}`,
        headers: { Authorization: `token ${token}` },
        withCredentials: true,
      })
        .then(function (response) {
          const responseState = response.data;
          setState(responseState);
        })
        .catch(function (response) {
          useShowError({ error: "Не удалось вывести список всех партнеров" });
        });
    }, [partnersListAll]);

    const [value, setValue] = useState("");

    const filteredPartners = state.filter((item) => {
      return item.name?.toLowerCase()?.includes(value.toLowerCase());
    });

    return (
      <section className="mt-[15px] flex-1">
        <h2 className={`${styles.dashboardItemSubtitle}`}>
          Список всех партнеров
        </h2>
        <div className="mt-[10px] mb-[15px]">
          <input
            type="text"
            className="max-w-[400px] w-full h-[40px] rounded-[8px]  border-solid border-[1px] border-[#D2D2D2]
                px-[15px] outline-primary"
            placeholder="Поиск по всем партнерам"
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
            <h2>Партнер</h2>
            <h2>Информация</h2>
          </div>
          <InView>
            {({ inView, ref }) => (
              <div className="" ref={ref}>
                {filteredPartners.map(
                  (item, index) =>
                    inView && (
                      <PartnersItemAll key={index} {...item} token={token} />
                    )
                )}
              </div>
            )}
          </InView>
        </div>
      </section>
    );
  };
  return (
    <section className="w-full h-full bgdashboard mt-[60px]">
      <div className="max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px]">
        <Intro responseLogin={userData} />
        <div className="flex flex-col h-full">
          <PartnersListAll token={token} />
        </div>
      </div>
    </section>
  );
};

export default DashboardAllPartners;
