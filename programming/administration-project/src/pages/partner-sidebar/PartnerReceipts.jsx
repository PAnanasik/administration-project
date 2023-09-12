
import { NavbarPartner } from "../../components";
import Background from "../../components/common/Background";
import DashboardReceipts from "../../components/partner/DashboardReceipts";

const PartnerReceipts = () => {

  return (
    <div>
        <NavbarPartner />
        <div className="relative z-0">
          <DashboardReceipts />
          <Background />
        </div>
      </div>
  );
};

export default PartnerReceipts;
