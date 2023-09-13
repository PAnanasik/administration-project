import { useState, useEffect, useContext } from "react";
import { partnersListUrl, remove_addUrl } from "../../components/urls";
import { styles } from "../../styles";
import { InView } from "react-intersection-observer";
import axios from "axios";
import Intro from "../common/Intro";
import { arrowExpand, arrowExpanded } from "../../assets";
import { useForm } from "react-hook-form";
import { ResponseContext } from "../../App";

const DashboardPartners = ({ token }) => {
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

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 560px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 560px)")
      .addEventListener("change", (event) => setMatches(event.matches));
  }, []);

  const {
    formState: { errors: errorsDelete },
    handleSubmit: handleSubmitRemove,
  } = useForm({
    mode: "onBlur",
  });

  const PartnersItem = ({ name, token }) => {
    const [expanded, setExpanded] = useState(false);

    const removePartner = async () => {
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
          method: "remove",
        },
      })
        .then(function (response) {})
        .catch(function (response) {
          useShowError({ error: "Не удалось удалить партнера" });
          console.log(response);
        });
    };

    const ItemDesc = () => {
      return (
        <form
          className="flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2]"
          onSubmit={handleSubmitRemove(removePartner)}
        >
          <button
            type="submit"
            className="bg-red-500 p-2 rounded-[8px] text-white font-medium
                    max-w-[150px] w-full mt-[10px] ease duration-300 hover:bg-red-400 cursor-pointer"
          >
            Удалить
          </button>
        </form>
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
            <form onSubmit={handleSubmitRemove(removePartner)} className="max-w-[150px] w-full">
              <button
                type="submit"
                className="bg-red-500 p-2 rounded-[8px] text-white font-medium
                w-full mt-[10px] ease duration-300 hover:bg-red-400 cursor-pointer"
              >
                Удалить
              </button>
            </form>
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

  const PartnersList = ({ token }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
      const getPartners = async () => {
        try {
          const response = await axios.get(partnersListUrl, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          const responseState = response.data;
          setState(responseState);
          console.log(state);
        } catch (error) {
          useShowError({ error: "Не удалось вывести список партнеров" });
          console.log(error);
        }
      };

      getPartners();
    }, []);

    const [value, setValue] = useState("");

    const filteredPartners = state.filter((item) => {
      return item.name?.toLowerCase()?.includes(value.toLowerCase());
    });

    return (
      <section className="mt-[15px] flex-1">
        <h2 className={`${styles.dashboardItemSubtitle}`}>Список партнеров</h2>
        <div className="mt-[10px] mb-[15px]">
          <input
            type="text"
            className="max-w-[400px] w-full h-[40px] rounded-[8px]  border-solid border-[1px] border-[#D2D2D2]
                    px-[15px] outline-primary"
            placeholder="Поиск по партнерам"
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
                      <PartnersItem key={index} {...item} token={token} />
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
          <PartnersList token={token} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPartners;
