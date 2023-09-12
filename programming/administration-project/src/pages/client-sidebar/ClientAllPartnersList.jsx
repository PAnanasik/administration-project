import React, { useContext } from "react";
import ListAllPartners from "../../components/client/ListAllPartners";
import { Navbar, SidebarClient } from "../../components";
import Background from "../../components/common/Background";
import { ResponseContext } from "../../App";

const ClientAllPartnersList = () => {
  const { responseAuth } = useContext(ResponseContext);
  const token = window.localStorage.getItem("token");
  const method = window.localStorage.getItem("method");

  if (method == "true") {
    localStorage.clear();
    window.location.pathname = "/";
  } else {
    return (
      <div>
        {responseAuth.toggleSidebar && <SidebarClient />}
        <Navbar />
        <div className="relative z-0">
          <ListAllPartners token={token} />
          <Background />
        </div>
      </div>
    );
  }
};

export default ClientAllPartnersList;
