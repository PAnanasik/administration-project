import { avatar, notification } from '../../assets'
import { useContext, useState } from 'react';
import { ResponseContext } from '../../App';

const NavbarPartner = ({ }) => {
  const [notificationIcon, setNotificationIcon] = useState(true)
  const { user, setUser } = useContext(ResponseContext);
  const { responseAuth, setResponseAuth } = useContext(ResponseContext);
  const [menu, setMenu] = useState(false)
  const arrayNames = []
  arrayNames.push(responseAuth.responseLogin.fio)
  const arrayLength = arrayNames.length
  console.log(arrayNames)

  const Menu = () => {
    const NotificationItem = ({ fio }) => {
      return (
        <div className='w-full min-h-[60px] bg-white px-[10px] flex flex-col justify-center rounded-[8px]'>
          <h2 className='font-medium text-[14px]'>Вас добавил {fio}</h2>
          <p className='text-[12px]'>Просмотрите ваш список клиентов</p>
        </div>
      )
    }


    return (
      <div className='absolute md:max-w-[400px] w-full h-[500px] bg-input top-[80px] md:right-[40px] right-0 sm:left-auto sm:mx-0 left-0 mx-auto 
      z-20 border-solid border-[1px] border-[#D2D2D2] border-t-transparent p-4'>
        {arrayNames.map((item, index) => (
          <NotificationItem key={index} {...item}/>
        ))}
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
    if (arrayLength < arrayNames.length) {
      setNotificationIcon(true)
    }
  }

  return (
    // <>
      <div className='h-[80px] bg-white border-solid border-[1px] border-b-[#D2D2D2] fixed top-0 z-10 w-full'>
          <nav className='md:px-[30px] px-[15px] h-full max-w-[1640px] mx-auto'>
              <div className='h-full flex md:flex-row flex-col md:justify-between justify-center items-center'>
                  <h2 className='md:text-[16px] text-[14px]'>Личный кабинет партнера</h2>
                  <div className='flex items-center gap-[20px]'>
                      <a href="#" className='relative' onClick={handleMenu}>
                        <img src={notification} alt="dfaafdfad" className='w-7 h-7'/>
                        {arrayNames.length && notificationIcon && <NotificationIcon />}
                      </a>
                      <img src={avatar} alt="dfaafdfad" className='w-14 h-14 md:block hidden'/>
                      <a href="" className='md:text-[16px] text-[14px] font-normal' onClick={() => setUser({ loggedIn: false })}>Выйти</a>
                  </div>
              </div>
          </nav>
          {menu && <Menu />}
      </div>
      
    // </>
  )
}

export default NavbarPartner