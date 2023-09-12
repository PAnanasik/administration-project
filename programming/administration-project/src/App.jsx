import {
  Registration,
  Login,
  NewPassword,
  ForgotPhone,
  Client,
  Partner,
  ClientAllPartnersList,
  ClientPartnersList,
  PartnerAddReceipt,
  PartnerReceipts,
  Confirmation
} from "./pages/index.js";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
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
            <Route
              path="/clientpartnerslist"
              element={<ClientPartnersList />}
            />
            <Route
              path="/clientallpartnerslist"
              element={<ClientAllPartnersList />}
            />
            <Route path="/dashboardpartner" element={<Partner />} />
            <Route path="/partnedaddreceipt" element={<PartnerAddReceipt />} />
            <Route path="/partnerreceipts" element={<PartnerReceipts />} />
          </Route>
        </Routes>
      </ResponseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
