import { NavbarPartner } from "../../components";
import Background from "../../components/common/Background";
import DashboardReceipts from "../../components/partner/DashboardReceipts";

const PartnerReceipts = () => {
  const method = window.localStorage.getItem("method");

  if (method == "false") {
    localStorage.clear();
    window.location.pathname = "/";
  } else {
    return (
      <div>
        <NavbarPartner />
        <div className="relative z-0">
          <DashboardReceipts />
          <Background />
        </div>
      </div>
    );
  }
};

export default PartnerReceipts;
