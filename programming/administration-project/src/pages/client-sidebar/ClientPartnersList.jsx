import { Navbar, SidebarClient } from "../../components";
import ListPartners from "../../components/client/ListPartners";
import Background from "../../components/common/Background";

const ClientPartnersList = () => {
  const token = window.localStorage.getItem("token");

  return (
    <div>
      <SidebarClient />
      <Navbar />
      <div className="relative z-0">
        <ListPartners token={token} />
        <Background />
      </div>
    </div>
  );
};

export default ClientPartnersList;
