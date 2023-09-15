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
  Confirmation,
  ConfirmationForgot,
  ConfirmEmail,
} from "./pages/index.js";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
export const ResponseContext = createContext();

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const token = window.localStorage.getItem("token");
  const method = window.localStorage.getItem("method");

  const [responseAuth, setResponseAuth] = useState({
    errorMessage: {},
    showErrorMessage: false,
    successMessage: {},
    showSuccessMessage: false,
    dataUser: {},
    toggleSidebar: false,
    phoneUser: '',
    codeUser: '',
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
          <Route path="/codeforgot" element={<ConfirmationForgot phoneUser={responseAuth.phoneUser} />} />
          <Route path="/newpassword" element={<NewPassword phoneUser={responseAuth.phoneUser} codeUser={responseAuth.codeUser} />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route element={<ProtectedRoutes />}>
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
