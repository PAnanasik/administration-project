import { avatar, close, menuNav, notification } from "../../assets";
import { useEffect, useState, useContext } from "react";
import { notificationUrl, removeNotificationUrl, sendEmailUrl } from "../urls";
import { ResponseContext } from "../../App";
import axios from "axios";
import { styles } from "../../styles";

const NavbarPartner = () => {
  const token = window.localStorage.getItem("token");
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  const verified = JSON.parse(window.localStorage.getItem("verified"));
  const { responseAuth, setResponseAuth } = useContext(ResponseContext);

  const [notificationIcon, setNotificationIcon] = useState(true);
  const [state, setState] = useState("");
  const [menu, setMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [notificationArray, setNotificationArray] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(notificationUrl, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const responseState = response.data[0].notifications;
        setNotificationArray(responseState);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, [state, notificationUrl, menu]);

  function handleSend() {
    axios({
      method: "POST",
      url: `${sendEmailUrl}`,
      headers: { Authorization: `token ${token}` },
      data: {
        email: userData.email,
      },
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
    window.location.pathname = "/confirmemail";
  }

  const Menu = () => {
    const NoNotificationsText = () => {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col absolute left-0 top-0">
          <h2 className="font-medium text-[20px]">
            Пока никаких уведомлений нет
          </h2>
          <p className="font-medium text-[20px]">;(</p>
        </div>
      );
    };

    const StinkyNotificationItem = () => {
      return (
        <div className="relative w-full min-h-[60px] bg-white pl-[10px] flex flex-col justify-center rounded-[8px]">
          <p className="font-medium text-[14px] md:max-w-[340px] sm:max-w-[650px] xs:max-w-[400px] max-w-[240px] w-full">
            Подтвердите почту,{" "}
            <a
              onClick={handleSend}
              className="text-primary border-solid border-b-[1px] border-primary underline-offset-[3px] cursor-pointer"
            >
              нажав на это сообщение
            </a>
          </p>
        </div>
      );
    };

    let i = notificationArray.length;

    const NotificationItem = ({ text }) => {
      const removeNotification = (event) => {
        axios({
          method: "DELETE",
          url: `${removeNotificationUrl}`,
          headers: { Authorization: `token ${token}` },
          data: {
            notification_id: event.target.id,
          },
          withCredentials: true,
        })
          .then(function (response) {
            setState(response);
          })
          .catch(function (response) {
            console.log(response);
          });
      };

      return (
        <div className="relative w-full min-h-[60px] bg-white pl-[10px] flex flex-col justify-center rounded-[8px]">
          <h2 className="font-medium text-[14px] md:max-w-[340px] sm:max-w-[650px] xs:max-w-[400px] max-w-[240px] w-full">
            {text}
          </h2>
          <button
            className="absolute right-[20px] ease duration-300 p-2 rounded-full hover:bg-primary
          hover:bg-opacity-[0.2]"
            id={i != 1 ? i-- - 1 : (i = 0)}
            onClick={removeNotification}
            name="remove notification button"
          >
            <img src={close} alt="" className="w-4 h-4 pointer-events-none" />
          </button>
        </div>
      );
    };

    return (
      <div
        className="fixed md:max-w-[450px] w-full h-[400px] bg-input top-[80px] md:right-[40px] right-0 sm:left-auto sm:mx-0 left-0 mx-auto 
        z-20 border-solid border-[1px] border-[#D2D2D2] border-t-transparent p-4 flex flex-col gap-[15px] overflow-y-auto"
        id="menu"
      >
        {notificationArray?.map((item, index) => (
          <NotificationItem key={index} text={item} />
        ))}
        {(notificationArray?.length == null ||
          (notificationArray?.length == 0 && verified)) && (
          <NoNotificationsText />
        )}
        {!verified && <StinkyNotificationItem />}
      </div>
    );
  };

  const NotificationIcon = () => {
    return (
      <span className="absolute flex h-3 w-3 top-0 right-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
      </span>
    );
  };

  function handleMenu() {
    setMenu(!menu);
    setProfileMenu(false);
    setNotificationIcon(false);
  }

  function handleProfileMenu() {
    setProfileMenu(!profileMenu);
    setMenu(false);
  }

  function handleLogout() {
    window.location.pathname = "/";
    localStorage.clear();
  }

  const ContactInfo = () => {
    return (
      <section className="relative flex">
        <div
          className="bg-white w-full rounded-[12px] px-[10px] py-[30px]
        border-solid border-[1px] border-[#D2D2D2]"
        >
          <div className="flex flex-col w-full h-full items-center py-[10px]">
            <div className="flex flex-col items-center justify-center">
              <img src={avatar} alt="" className="w-[80px] h-[80px]" />
              <div className="relative">
                <h2 className="font-medium text-[18px] mt-[15px] text-center">
                  {userData.name || "Без ФИО"}
                </h2>
                {verified ? (
                  <div>Почта подтверждена</div>
                ) : (
                  <div>Почта не подтверждена</div>
                )}
              </div>
            </div>
            <div className="pt-[20px] w-full h-full flex flex-col gap-[20px]">
              <div className="relative">
                <input
                  type="text"
                  className={`${styles.dashboardInputAvatarStyles} relative text-center`}
                  value={userData.email || "Без почты"}
                  disabled
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  className={`${styles.dashboardInputAvatarStyles} relative text-center`}
                  value={userData.phone || "Без телефона"}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ProfileMenu = () => {
    return (
      <div
        className="fixed md:max-w-[400px] w-full min-h-[400px] bg-input top-[80px] md:right-[40px] right-0 sm:left-auto sm:mx-0 left-0 mx-auto 
      z-20 border-solid border-[1px] border-[#D2D2D2] border-t-transparent p-4 flex flex-col gap-[15px] justify-center"
      >
        <ContactInfo />
      </div>
    );
  };

  return (
    <div className="h-[80px] bg-white border-solid border-[1px] border-b-[#D2D2D2] fixed top-0 z-10 w-full">
      <nav className="md:px-[30px] px-[15px] h-full max-w-[1640px] mx-auto">
        <div className="h-full flex flex-row md:justify-between justify-center items-center">
          <div className="flex md:gap-[20px] gap-[10px]">
            <button
              onClick={() =>
                setResponseAuth((prev) => ({
                  ...prev,
                  toggleSidebar: !responseAuth.toggleSidebar,
                }))
              }
              name="sidebar button"
              className="mr-[10px]"
            >
              <img src={menuNav} alt="menu" className="w-6 h-6" />
            </button>
            <h2 className="md:text-[16px] md:block text-[14px] hidden">
              Личный кабинет партнера
            </h2>
          </div>
          <div className="flex items-center gap-[10px]">
            <button
              className={`${
                menu
                  ? "bg-primary bg-opacity-[0.2] rounded-full"
                  : "bg-none p-0"
              } relative`}
              onClick={handleMenu}
              name="notification button"
            >
              <img
                src={notification}
                alt="notification-menu"
                className="w-8 h-8 p-1"
              />
              {notificationArray?.length >= 1 && notificationIcon && (
                <NotificationIcon />
              )}
              {!verified && <NotificationIcon />}
            </button>
            <img
              src={avatar}
              alt="dfaafdfad"
              className={`${
                profileMenu
                  ? "bg-primary bg-opacity-[0.2] rounded-full"
                  : "bg-none"
              } relative w-11 h-11 p-1 cursor-pointer`}
              onClick={handleProfileMenu}
            />
            <button
              className="md:text-[16px] text-[14px] font-normal"
              onClick={handleLogout}
              name="logout button"
            >
              Выйти
            </button>
          </div>
        </div>
      </nav>
      {menu && <Menu />}
      {profileMenu && <ProfileMenu />}
    </div>
  );
};

export default NavbarPartner;
