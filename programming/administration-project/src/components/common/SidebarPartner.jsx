import { useContext } from "react";
import { ResponseContext } from "../../App";

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
        <a
          className="h-[70px] flex items-center font-normal py-4 pl-8 border-solid border-b-[1px] 
        border-[#D2D2D2] ease duration-300 hover:bg-primary hover:text-white hover:font-medium cursor-pointer"
          key={index}
          href={item.url}
        >
          <div>{item.text}</div>
        </a>
      ))}
    </div>
  );
};

const SidebarClient = () => {
  const { responseAuth } = useContext(ResponseContext);

  return (
    <div
      className={`${
        responseAuth.toggleSidebar ? "block" : "hidden"
      } bg-[#ffffff] xs:max-w-[300px] w-full border-solid border-[#D2D2D2]
      border-r-[1px] h-full fixed left-0 overflow-y-auto top-0 z-10`}
      id="container"
    >
      <nav className={`py-[80px] z-40`}>
        <BlockUrls />
      </nav>
    </div>
  );
};

export default SidebarClient;
