import { Navbar, DashboardClient } from '../components'
import Background from '../components/canvas/Background'


const Client = ({ responseLogin, token, dataPartner }) => {
  return (
    <div>
        <Navbar responseLogin={responseLogin} dataPartner={dataPartner} />
        <div className='relative z-0'>
            <DashboardClient responseLogin={responseLogin} token={token} dataPartner={dataPartner} />
            <Background />
        </div>
    </div>
  )
}

export default Client