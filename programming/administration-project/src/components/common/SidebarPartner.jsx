import { useContext } from "react";
import { ResponseContext } from "../../App";
import { NavLink } from "react-router-dom";

const BlockUrls = () => {
  const item = [
    {
      text: "Главная",
      url: "/dashboardpartner",
    },
    {
      text: "Добавить чек",
      url: "/partnedaddreceipt",
    },
    {
      text: "История заказов",
      url: "/partnerreceipts",
    },
  ];
  return (
    <div className="flex flex-col">
      {item.map((item, index) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active link" : "link-unactive link"
          }
          exact="true"
          key={index}
          to={item.url}
          onClick={() =>
            setResponseAuth((prev) => ({
              ...prev,
              toggleSidebar: false,
            }))
          }
        >
          <div>{item.text}</div>
        </NavLink>
      ))}
    </div>
  );
};

const SidebarPartner = () => {
  const { responseAuth } = useContext(ResponseContext);

  return (
    <div
      className={`${
        responseAuth.toggleSidebar ? "block sidebar-animation-in" : "hidden"
      } bg-[#ffffff] xs:max-w-[300px] w-full border-solid border-[#D2D2D2]
      border-r-[1px] h-full fixed left-0 overflow-y-auto top-0 z-10 ease duration-300`}
      id="container"
    >
      <nav className={`py-[80px] z-40`}>
        <BlockUrls />
      </nav>
    </div>
  );
};

export default SidebarPartner;
