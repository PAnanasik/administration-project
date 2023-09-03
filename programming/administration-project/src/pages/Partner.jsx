import { NavbarPartner, DashboardPartner } from '../components'
import Background from '../components/common/Background'


const Partner = () => {
  const method = window.localStorage.getItem("method");

  if (method == "false") {
    localStorage.clear()
    window.location.pathname = "/"
  } else {
    return (
      <div>
        <NavbarPartner />
          <div className='relative z-0'>
              <DashboardPartner />
              <Background />
          </div>
      </div>
    )
  }
}

export default Partner