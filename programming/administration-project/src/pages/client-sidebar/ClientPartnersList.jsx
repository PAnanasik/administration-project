import { useContext } from "react";
import { ResponseContext } from "../../App";
import { Navbar, SidebarClient } from "../../components";
import ListPartners from "../../components/client/ListPartners";
import Background from "../../components/common/Background";

const ClientPartnersList = () => {
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
          <ListPartners token={token} />
          <Background />
        </div>
      </div>
    );
  }
};

export default ClientPartnersList;
