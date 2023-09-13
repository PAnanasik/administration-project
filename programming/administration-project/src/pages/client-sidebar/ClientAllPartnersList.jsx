import { useContext } from "react";
import { Navbar, SidebarClient, DashboardAllPartners, ErrorMessage } from "../../components";
import Background from "../../components/common/Background";
import { ResponseContext } from "../../App";
import SuccessMessage from "../../components/common/SuccessMessage";

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
          <DashboardAllPartners token={token} />
          <Background />
        </div>
        {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
        {responseAuth.showSuccessMessage && <SuccessMessage success={responseAuth.successMessage} />}
      </div>
    );
  }
};

export default ClientAllPartnersList;
