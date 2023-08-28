import { Navbar, DashboardClient } from '../components'
import Background from '../components/canvas/Background'


const Client = ({ responseLogin, token }) => {
  return (
    <div>
        <Navbar responseLogin={responseLogin} />
        <div className='relative z-0'>
            <DashboardClient responseLogin={responseLogin} token={token} />
            <Background />
        </div>
    </div>
  )
}

export default Client