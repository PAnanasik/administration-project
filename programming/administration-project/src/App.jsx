import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Client from './pages/Client.jsx';
import Partner from './pages/Partner.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react';
import Background from './components/canvas/Background.jsx';

// export const UserContext = createContext();
export const ResponseContext = createContext();


function App() {

  // const [user, setUser] = useState({ loggedIn: false });
  const [responseAuth, setResponseAuth] = useState({ loggedIn: false, response: '', token: '' });

  return (
    <BrowserRouter>
        <ResponseContext.Provider value={{ responseAuth, setResponseAuth }}>
          <Routes>
              <Route path='/' element={<Registration />} />
              <Route path='/login' element={<Login />} />
              <Route element={<ProtectedRoutes logged={responseAuth.loggedIn} />}>
                <Route path='/dashboardclient' element={<Client response={responseAuth.response} />} />
                <Route path='/dashboardpartner' element={<Partner token={responseAuth.token} />} />
              </Route>
          </Routes>
          </ResponseContext.Provider>
    </BrowserRouter>

  )
}

export default App
