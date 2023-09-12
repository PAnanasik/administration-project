import { Navbar, DashboardClient, SidebarClient } from "../components";
import Background from "../components/common/Background";

const Client = () => {
  const method = window.localStorage.getItem("method");

  if (method == "true") {
    localStorage.clear();
    window.location.pathname = "/";
  } else {
    return (
      <div>
        <SidebarClient />
        <Navbar />
        <div className="relative z-0">
          <DashboardClient />
          <Background />
        </div>
      </div>
    );
  }
};

export default Client;
