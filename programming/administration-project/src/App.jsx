import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Client from './pages/Client.jsx';
import Partner from './pages/Partner.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react';
import Background from './components/canvas/Background.jsx';

export const UserContext = createContext();
export const ResponseContext = createContext();


function App() {

  const [user, setUser] = useState({ loggedIn: false, client: false });
  const [responseAuth, setResponseAuth] = useState({  });

  return (
    <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <ResponseContext.Provider value={{ responseAuth, setResponseAuth }}>
            <Routes>
                <Route path='/' element={<Registration />} />
                <Route path='/login' element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path='/dashboardclient' element={<Client response={responseAuth} />} />
                  
                  <Route path='/dashboardpartner' element={<Partner />} />
                </Route>
            </Routes>
            </ResponseContext.Provider>
        </UserContext.Provider>
    </BrowserRouter>

  )
}

export default App
