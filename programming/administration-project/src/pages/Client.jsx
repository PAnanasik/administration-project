import { Navbar, DashboardClient } from '../components'
import Background from '../components/common/Background'


const Client = ({ responseLogin, token }) => {
  return (
    <div>
        <Navbar responseLogin={responseLogin} token={token} />
        <div className='relative z-0'>
            <DashboardClient responseLogin={responseLogin} token={token} />
            <Background />
        </div>
    </div>
  )
}

export default Client