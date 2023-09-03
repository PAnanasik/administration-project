import { avatar, notification, refresh } from '../../assets'
import { useContext, useEffect, useState } from 'react';
import { ResponseContext } from '../../App';
import axios from 'axios';
import { clientUrl } from '../urls';


const Navbar = ({ responseLogin, token }) => {
  const [notificationIcon, setNotificationIcon] = useState(true)
  const { user, setUser } = useContext(ResponseContext);
  const { responseAuth, setResponseAuth } = useContext(ResponseContext);
  const [bonus, setBonus] = useState(responseLogin.bonuses)
  const [menu, setMenu] = useState(false)
  // console.log(dataPartner)



  const refreshBonuses = () => {
    axios({
      method: "GET",
      url: `${clientUrl}`,
      headers: { "Authorization": `token ${token}` },
      withCredentials: true
      })
      .then(function (response) {
        console.log(response)
        setBonus(response.data[0].bonuses)
        console.log(response)
      })
      .catch(function (response) {
        console.log(response)
    });
  } 
  console.log(bonus)

  function handleLogout() {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userData");
  }

  const Menu = () => {
    const NotificationItem = () => {
      return (
        <div className='w-full min-h-[60px] bg-white px-[10px] flex flex-col justify-center rounded-[8px]'>
          <h2 className='font-medium text-[14px]'>Вас добавил </h2>
          <p className='text-[12px]'>Просмотрите ваш список клиентов</p>
        </div>
      )
    }


    return (
      <div className='fixed md:max-w-[400px] w-full h-[500px] bg-input top-[80px] md:right-[40px] right-0 sm:left-auto sm:mx-0 left-0 mx-auto 
      z-20 border-solid border-[1px] border-[#D2D2D2] border-t-transparent p-4'>
        <NotificationItem />
        {/* {arrayNames.map((item, index) => (
        ))} */}
      </div>
    )
  }

  const NotificationIcon = () => {
    return (
      <span className='absolute flex h-3 w-3 top-0 right-0'>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
      </span>
    )
  }

  function handleMenu() {
    setMenu(!menu)
    if (menu == false) {
      setNotificationIcon(false)
    }
  }

  return (
    <>
      <div className='h-[80px] bg-white border-solid border-b-[1px] border-[#D2D2D2] fixed top-0 z-10 w-full'>
          <nav className='md:px-[30px] px-[15px] h-full max-w-[1640px] mx-auto'>
              <div className='h-full flex md:flex-row flex-col md:justify-between justify-center items-center'>
                  <h2 className='md:text-[16px] text-[14px]'>Личный кабинет клиента</h2>
                  <div className='flex items-center gap-[20px]'>
                      <a href="#" className='relative' onClick={handleMenu}>
                          <img src={notification} alt="dfaafdfad" className='w-7 h-7'/>
                          <NotificationIcon />
                      </a>
                      <div className='flex gap-[5px] items-center'>
                        <p className='md:text-[16px] text-[14px] font-medium'>{`${bonus || '0'} бонусов`}</p>
                        <button onClick={refreshBonuses}>
                          <img src={refresh} alt=""  className='w-4 h-4'/>
                        </button>
                      </div>
                      <img src={avatar} alt="dfaafdfad" className='w-14 h-14 md:block hidden'/>
                      <a href="" className='md:text-[16px] text-[14px] font-normal' onClick={handleLogout}>Выйти</a>
                  </div>
              </div>
          </nav>
      </div>
      {menu && <Menu />}
    </>
  )
}

export default Navbar