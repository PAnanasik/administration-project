import { useContext } from "react";
import { ResponseContext } from "../../App";
import {
  NavbarPartner,
  SidebarPartner,
  DashboardReceipts,
} from "../../components";
import Background from "../../components/common/Background";

const PartnerReceipts = () => {
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
          <DashboardReceipts token={token} />
          <Background />
        </div>
      </div>
    );
  }
};

export default PartnerReceipts;
