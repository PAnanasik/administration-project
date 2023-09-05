import { avatar, close, notification, refresh } from '../../assets'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { clientUrl, notificationUrl, removeNotificationUrl } from '../urls';


const Navbar = () => {
  const token = window.localStorage.getItem("token")
  const userData = JSON.parse(window.localStorage.getItem("userData"))

  const [notificationIcon, setNotificationIcon] = useState(true)
  const [state, setState] = useState('')
  const [bonus, setBonus] = useState(userData.bonuses)
  const [menu, setMenu] = useState(false)
  const [notificationArray, setNotificationArray] = useState([])


  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(notificationUrl, {
          headers: {
              Authorization: `token ${token}`
          }
        });
        const responseState = response.data[0].notifications;
        setNotificationArray(responseState);
      } catch(error) {
        console.log(error)
        useShowError({error: "Не удалось вывести список покупок"})
      }
    };

    getNotifications();  
    
    console.log(notificationArray)
  }, [state, notificationUrl, menu]);


  // const arr = [];
  // arr.push("Вы дурак", "причем реальный")
  
  // notificationArray.push("Вы дурак")

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
    localStorage.clear()
  }

  const Menu = () => {
    const NoNotificationsText = () => {
      return (
        <div className='w-full h-full flex justify-center items-center flex-col'>
          <h2 className='font-medium text-[20px]'>Пока никаких уведомлений нет</h2>
          <p className='font-medium text-[20px]'>;(</p>
        </div>
      )
    }


    let i = 0;
    const NotificationItem = ({ text }) => {
      const removeNotification = (event) => {
        axios({
          method: "DELETE",
          url: `${removeNotificationUrl}`,
          headers: { "Authorization": `token ${token}` },
          data: {
            notification_id: event.target.id
          },
          withCredentials: true
          })
          .then(function (response) {
            setState(response)
          })
          .catch(function (response) {
            console.log(response)
        });
      } 

      return (
        <div className='relative w-full min-h-[60px] bg-white pl-[10px] flex flex-col justify-center rounded-[8px]'>
          <>
            <h2 className='font-medium text-[14px]'>{text}</h2>
            <p className='text-[12px]'>Просмотрите ваш список партнеров</p>
          </>
          <button className='absolute right-[20px] ease duration-300 p-2 rounded-full hover:bg-primary
          hover:bg-opacity-[0.2]' id={i++} onClick={removeNotification}>
            <img src={close} alt="" className='w-4 h-4 pointer-events-none'/>
          </button>
        </div>
      )
    }

    return (
      <div className='fixed md:max-w-[400px] w-full h-[500px] bg-input top-[80px] md:right-[40px] right-0 sm:left-auto sm:mx-0 left-0 mx-auto 
      z-20 border-solid border-[1px] border-[#D2D2D2] border-t-transparent p-4 flex flex-col gap-[15px]'>
        {notificationArray?.map((item, index) => (          
          <NotificationItem key={index} text={item}/>
        ))}
        {notificationArray?.length == 0 && <NoNotificationsText />}
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
    setNotificationIcon(false)
  }

  return (
    <>
      <div className='h-[80px] bg-white border-solid border-b-[1px] border-[#D2D2D2] fixed top-0 z-10 w-full'>
          <nav className='md:px-[30px] px-[15px] h-full max-w-[1640px] mx-auto'>
              <div className='h-full flex md:flex-row flex-col md:justify-between justify-center items-center'>
                  <h2 className='md:text-[16px] text-[14px]'>Личный кабинет клиента</h2>
                  <div className='flex items-center gap-[20px]'>
                      <button className='relative' onClick={handleMenu}>
                          <img src={notification} alt="notification-menu" className='w-7 h-7'/>
                          {notificationArray?.length >= 1 && notificationIcon && <NotificationIcon />}
                      </button>
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