import { useContext } from "react";
import { ResponseContext } from "../../App";
import { Navbar, DashboardClient, SidebarClient } from "../../components";
import Background from "../../components/common/Background";

const MainClient = () => {
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
          <DashboardClient token={token} />
          <Background />
        </div>
      </div>
    );
  }
};

export default MainClient;
