import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Client from './pages/Client.jsx';
import Partner from './pages/Partner.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react';
import Confirmation from './pages/Confirmation.jsx';
import { DashboardClient } from './components/index.js';

export const ResponseContext = createContext();


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  const token = window.localStorage.getItem("token")
  const userDataJSON = window.localStorage.getItem("userData")
  const userData = JSON.parse(userDataJSON)
  console.log(userData)

  const [responseAuth, setResponseAuth] = useState({ errorMessage: {} });

  return (
    <BrowserRouter>
      <ResponseContext.Provider value={{ responseAuth, setResponseAuth }}>
            <Routes>
              <Route path='/registration' element={<Registration />} />
              <Route path='/' element={<Login />} />
              <Route path='/confirmation' element={<Confirmation dataUser={userData} />} />
              <Route element={<ProtectedRoutes logged={isLoggedIn} />}>
                <Route path='/dashboardclient' element={<Client />} />
                <Route path='/dashboardpartner' element={<Partner />} />
              </Route>
            </Routes>
      </ResponseContext.Provider>
    </BrowserRouter>

  )
}

export default App
