import { useContext } from "react";
import { ResponseContext } from "../../App";
import {
  NavbarPartner,
  DashboardPartner,
  SidebarPartner,
  ErrorMessage,
} from "../../components";
import Background from "../../components/common/Background";

const MainPartner = () => {
  const { responseAuth } = useContext(ResponseContext);
  const method = window.localStorage.getItem("method");
  const token = window.localStorage.getItem("token");

  if (method == "false") {
    localStorage.clear();
    window.location.pathname = "/";
  } else {
    return (
      <div>
        {responseAuth.toggleSidebar && <SidebarPartner />}
        <NavbarPartner />
        <div className="relative z-0">
          <DashboardPartner token={token} />
          <Background />
        </div>
        {responseAuth.showErrorMessage && <ErrorMessage error={responseAuth.errorMessage} />}
      </div>
    );
  }
};

export default MainPartner;
