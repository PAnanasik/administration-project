import { useState, useEffect, useContext } from "react";

import { arrowExpand, arrowExpanded } from "../../assets";
import { ResponseContext } from "../../App";

const BlockUrls = () => {
  const item = [
    {
      text: "Ваши товары",
      url: "/dashboardclient",
    },
    {
      text: "Ваши партнеры",
      url: "/clientpartnerslist",
    },
    {
      text: "Все партнеры",
      url: "/clientallpartnerslist",
    },
  ];
  //   const urls = ["/clientpartnerslist", "#", "#"]
  return (
    <div className="flex flex-col">
      {item.map((item, index) => (
        <div
          className="h-[70px] flex items-center font-normal py-4 pl-8 border-solid border-b-[1px] 
        border-[#D2D2D2] ease duration-300 hover:bg-primary hover:text-white hover:font-medium cursor-pointer"
          key={index}
        >
          <a href={item.url}>{item.text}</a>
        </div>
      ))}
    </div>
  );
};

const SidebarClient = () => {
  const { responseAuth } = useContext(ResponseContext);

  return (
    <div
      className={`${responseAuth.toggleSidebar ? "block" : "hidden"}
      border-auto bg-[#ffffff] xs:max-w-[300px] w-full border-solid border-[#212529] 
        border-opacity-[0.35] border-r-[1px] h-full fixed left-0 overflow-y-auto top-0 z-10`}
      id="container"
    >
      <nav className={`py-[80px] z-40`}>
        <BlockUrls />
      </nav>
    </div>
  );
};

export default SidebarClient;
