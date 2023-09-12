import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Client from "./pages/Client.jsx";
import Partner from "./pages/Partner.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import PartnerReceipts from "./pages/PartnerReceipts.jsx";
import ClientPartnersList from "./pages/client-sidebar/ClientPartnersList.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import ForgotPhone from "./pages/ForgotPhone.jsx";
import ClientAllPartnersList from "./pages/client-sidebar/ClientAllPartnersList.jsx";

export const ResponseContext = createContext();

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const token = window.localStorage.getItem("token");
  const userDataJSON = window.localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const method = window.localStorage.getItem("method");

  const [responseAuth, setResponseAuth] = useState({
    errorMessage: {},
    dataUser: {},
    toggleSidebar: false,
  });

  return (
    <BrowserRouter>
      <ResponseContext.Provider value={{ responseAuth, setResponseAuth }}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/"
            element={
              isLoggedIn && method == "true" && token ? (
                <Partner />
              ) : isLoggedIn && method == "false" && token ? (
                <Client />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/confirmation"
            element={<Confirmation dataUser={responseAuth.dataUser} />}
          />
          <Route path="/forgot" element={<ForgotPhone />} />
          <Route element={<ProtectedRoutes logged={isLoggedIn} />}>
            <Route path="/dashboardclient" element={<Client />} />
            <Route path="/clientpartnerslist" element={<ClientPartnersList />} />
            <Route path="/clientallpartnerslist" element={<ClientAllPartnersList />} />
            <Route path="/dashboardpartner" element={<Partner />} />
            <Route path="/partnerreceipts" element={<PartnerReceipts />} />
          </Route>
        </Routes>
      </ResponseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
