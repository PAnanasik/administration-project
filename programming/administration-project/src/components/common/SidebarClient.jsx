import { useState, useEffect } from "react";

import { arrowExpand, arrowExpanded } from "../../assets";

const BlockUrls = () => {
  const text = ["Ваши товары", "Ваши партнеры", "Партнеры"];
  return (
    <div className="flex flex-col">
      {text.map((item, index) => (
        <div className="h-[70px] flex items-center py-4 pl-8 border-solid border-b-[1px] 
        border-[#D2D2D2] ease duration-300 hover:bg-primary hover:text-white hover:font-medium cursor-pointer">
            <a href="#" key={index}>{item}</a>
        </div>
      ))}
    </div>
  );
};

const SidebarClient = () => {
  return (
    <div
      className="border-auto bg-[#ffffff] block max-w-[300px] w-full border-solid border-[#212529] 
        border-opacity-[0.35] border-r-[1px] h-full fixed left-0 overflow-y-auto top-0 z-10"
      id="container"
    >
      <nav className={`py-[80px] z-40`}>
        <BlockUrls />
      </nav>
    </div>
  );
};

export default SidebarClient;
