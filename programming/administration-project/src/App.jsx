import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Client from './pages/Client.jsx';
import Partner from './pages/Partner.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react';
import Confirmation from './pages/Confirmation.jsx';

export const ResponseContext = createContext();
export const PartnerContext = createContext();


function App() {

  const [responseAuth, setResponseAuth] = useState({ dataUser: {}, loggedIn: false, responseLogin: '', token: '', error: '' });
  const [partnerData, setPartnerData] = useState({ dataPartner: {} })
  console.log(partnerData.dataPartner)

  return (
    <BrowserRouter>
      <ResponseContext.Provider value={{ responseAuth, setResponseAuth }}>
        <PartnerContext.Provider value={{ partnerData, setPartnerData }}>
          <Routes>
            <Route path='/registration' element={<Registration />} />
            <Route path='/' element={<Login />} />
            <Route path='/confirmation' element={<Confirmation dataUser={responseAuth.dataUser} />} />
            <Route element={<ProtectedRoutes logged={responseAuth.loggedIn} />}>
              <Route path='/dashboardclient' element={<Client responseLogin={responseAuth.responseLogin} token={responseAuth.token} dataPartner={partnerData.dataPartner}  />} />
              <Route path='/dashboardpartner' element={<Partner token={responseAuth.token} responseLogin={responseAuth.responseLogin} />} />
            </Route>
          </Routes>
        </PartnerContext.Provider>
      </ResponseContext.Provider>
    </BrowserRouter>

  )
}

export default App
