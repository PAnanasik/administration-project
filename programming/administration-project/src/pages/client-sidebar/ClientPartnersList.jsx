import { useContext } from "react";
import { ResponseContext } from "../../App";
import { Navbar, SidebarClient, DashboardPartners, ErrorMessage } from "../../components";
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
          <DashboardPartners token={token} />
          <Background />
        </div>
        {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
      </div>
    );
  }
};

export default ClientPartnersList;
