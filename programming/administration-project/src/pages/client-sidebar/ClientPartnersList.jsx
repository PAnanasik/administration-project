import { useContext } from "react";
import { ResponseContext } from "../../App";
import { Navbar, SidebarClient, DashboardPartners, ErrorMessage } from "../../components";
import Background from "../../components/common/Background";
import SuccessMessage from "../../components/common/SuccessMessage";

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
        {responseAuth.showSuccessMessage && <SuccessMessage error={responseAuth.successMessage} />}
      </div>
    );
  }
};

export default ClientPartnersList;
