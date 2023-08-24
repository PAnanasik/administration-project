import React, { useState, useEffect } from 'react'
import { styles } from '../../styles'
import { arrowExpand, arrowExpanded, avatar, mailInput, nameInput, phoneInput } from '../../assets'
import axios from 'axios';

const DashboardPartner = ({ responseLogin, token }) => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 560px)").matches
  )

  useEffect(() => {
      window
      .matchMedia("(min-width: 560px)")
      .addEventListener('change', event => setMatches(event.matches));
  }, []);



  const [name, setName] = useState('')
  

  const Intro = ({ responseLogin }) => {
    return (
      <div className='relative w-full h-[200px] flex md:justify-between justify-center items-center md:text-left text-center 
      bg-white rounded-[12px] md:pl-[40px] pl-0'>
        <h2 className={`${styles.sectionHeadText}`}>Добрый день, <br /><span>{responseLogin.fio || 'Без имени'}</span></h2>
        <div className='md:block hidden absolute w-[600px] right-0 h-full bg-rectangle'>
        </div>
      </div>
    )
  }

  const ContactInfo = () => {

    return (
      <section className='relative mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Контактная информация</h2>
        <div className='bg-white w-full h-[460px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px] py-[30px]
        border-solid border-[1px] border-[#D2D2D2]'>
          <div className='flex flex-col w-full h-full items-center py-[10px]'>
            <div className='flex flex-col items-center'>
              <img src={avatar} alt="" className='w-[100px] h-[100px]'/>
              <div className='relative'>
                <h2 className='font-medium text-[24px] mt-[15px]'>{responseLogin.fio || 'Без имени'}</h2>
              </div>
            </div>
            <div className='py-[20px] w-full h-full flex flex-col gap-[20px]'>
              <div className='relative'>
                <input
                  type='text'
                  className={`${styles.dashboardInputAvatarStyles} relative text-center`}
                  value={responseLogin.email || 'Без почты'}
                  disabled
                  />
                <img src={mailInput} alt="name-icon" className='absolute left-[20px] top-[18px] w-6 h-6'/>
              </div>

              <div className='relative'>
                <input
                  type='text'
                  className={`${styles.dashboardInputAvatarStyles} relative text-center`}
                  value={responseLogin.phone || 'Без телефона'}
                  disabled
                  />
                <img src={phoneInput} alt="name-icon" className='absolute left-[20px] top-[18px] w-6 h-6'/>
              </div>

            </div>
          </div>
        </div>
      </section>
    )
  }

  const HistoryInfo = ({ token }) => {
    const [state, setState] = useState([])

    useEffect(() => {
      const getPurchases = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/partner_purchases/', {
              headers: {
                  Authorization: `token ${token}`
              }
          });
          const responseState = response.data;
          setState(responseState);
        } catch(error) {
          console.log(error)
        }
      };

      getPurchases();
    }, []);

    const HistoryItem = ({ name, amount, date, is_confirmed }) => {
      const [expanded, setExpanded] = useState(false)
      const HistoryItemDesc = () => {
        return (
          <div className='flex flex-col gap-[10px] my-[20px]'>
            <p>Цена: {amount}</p>
            <p>Дата покупки: {date}</p>
            <div className='flex items-center gap-[8px]'>
              <p>Подтверждено</p>
              {is_confirmed ?
                <input type="checkbox" name="" id="" className='w-4 h-4 pointer-events-none' readOnly checked/>
              :
                <input type="checkbox" name="" id="" className='w-4 h-4 pointer-events-none' readOnly/>
              }
            </div>
          </div>
        )
      }
      return (
        <div className='rounded-[8px] px-[15px]'>
            <div className={`${expanded ? 'border-solid border-b-[1px] border-[#d1d1d1]' : 'border-none'} 
            w-full h-[60px] flex justify-between items-center`}>
              <h2 className={`${styles.dashboardItemTitle}`}>{name}</h2>
              <button onClick={() => setExpanded(!expanded)}>
                <img src={expanded ? arrowExpanded : arrowExpand} alt="" className='w-4 h-4'/>
              </button>
            </div>

            {expanded && <HistoryItemDesc/>}
        </div>
      )
    }

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>История покупок</h2>
        <div className='bg-white w-full min-h-[460px] mt-[15px] rounded-[12px]
        border-solid border-[1px] border-[#D2D2D2]'>
            <div className='bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
            border-solid border-b-[1px] border-[#D2D2D2]'>
                <h2>Партнер</h2>
                <h2>{matches? 'Клиенты' : 'Информация'}</h2>
            </div>
            <div className='[&>*:nth-child(10)]:border-transparent'>
                {state.map((item, index) => (
                  <HistoryItem key={index} {...item}/>
                ))}
            </div>
        </div>
      </section>
    )
  }

  const PartnersItem = ({ name, clients }) => {
    const [expanded, setExpanded] = useState(false)

    const ItemDesc = () => {
        return (
          <div className='flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2]'>
            <p className='font-medium'>Клиентов:  <span>{clients.length}</span></p>
          </div>
        )
      }

    return (
        <div className='border-solid border-b-[1px] border-[#D2D2D2] cursor-pointer'>
            <div className='w-full h-[80px] flex flex-row justify-between items-center 
        font-medium relative px-[30px]'>
                <div className='flex gap-[10px] items-center'>
                    <div className='w-[40px] h-[40px] rounded-full bg-primary'></div>
                    <h2>{name || 'Без имени'}</h2>
                </div>
                {matches 
                ? 
                <p>{clients.length}</p> 
                : 
                <button onClick={() => setExpanded(!expanded)}>
                    <img src={expanded ? arrowExpanded : arrowExpand} className='w-4 h-4'></img>
                </button>
                }
            </div>


            {expanded && <ItemDesc/>}
        </div>
    )
  }

  const PartnersList = ({ token }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        const getPartners = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/v1/client_partners/', {
                headers: {
                    Authorization: `token ${token}`
                }
            });
            const responseState = response.data;
            setState(responseState);
          } catch(error) {
            console.log(error)
          }
        };

        getPartners();
    }, []);

    const [value, setValue] = useState('')

    const filteredPartners = state.filter((item) => {
        return item.name?.toLowerCase()?.includes(value.toLowerCase())
    })

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Список партнеров</h2>
        <div className='mt-[10px] mb-[15px]'>
            <input type="text" className='max-w-[400px] w-full h-[40px] rounded-[8px]  border-solid border-[1px] border-[#D2D2D2]
            px-[15px] outline-primary'
            placeholder='Поиск по партнерам'
            onChange={(event) => setValue(event.target.value)}/>
        </div>
        <div className='bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] h-full 
        border-solid border-[1px] border-[#D2D2D2]'>
            <div className='bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
            border-solid border-b-[1px] border-[#D2D2D2]'>
                <h2>Партнер</h2>
                <h2>{matches? 'Клиенты' : 'Информация'}</h2>
            </div>
            <div className='[&>*:nth-child(10)]:border-transparent'>
                {filteredPartners.map((item, index) => (
                  <PartnersItem key={index} {...item}/>
                ))}
            </div>
        </div>
      </section>
    )
  }

  const PartnersListAll = ({ token }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        const getAllPartners = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/v1/partners/', {
              headers: {
                  Authorization: `token ${token}`
              }
            });
            const responseState = response.data;
            setState(responseState);
          } catch(error) {
            console.log(error)
          }
        };

        getAllPartners();
    }, []);

    const [value, setValue] = useState('')

    const filteredPartners = state.filter((item) => {
        return item.name?.toLowerCase()?.includes(value.toLowerCase())
    })

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Список всех партнеров</h2>
        <div className='mt-[10px] mb-[15px]'>
            <input type="text" className='max-w-[400px] w-full h-[40px] rounded-[8px]  border-solid border-[1px] border-[#D2D2D2]
            px-[15px] outline-primary'
            placeholder='Поиск по партнерам'
            onChange={(event) => setValue(event.target.value)}/>
        </div>
        <div className='bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] h-full 
        border-solid border-[1px] border-[#D2D2D2]'>
            <div className='bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
            border-solid border-b-[1px] border-[#D2D2D2]'>
                <h2>Партнер</h2>
                <h2>{matches? 'Клиенты' : 'Информация'}</h2>
            </div>
            <div className='[&>*:nth-child(10)]:border-transparent'>
                {filteredPartners.map((item, index) => (
                  <PartnersItem key={index} {...item}/>
                ))}
            </div>
        </div>
      </section>
    )
  }


  return (
    <section className='w-full h-full bgdashboard'>
      <div className='max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px]'>
        <Intro responseLogin={responseLogin} />
        <div className='flex flex-col h-full'>
          <div className='flex md:flex-row flex-col md:gap-[30px] gap-0'> 
            <ContactInfo />
            <HistoryInfo token={token} />
          </div>
            <PartnersList token={token} />
            <PartnersListAll token={token} />
        </div>
      </div>
    </section>
  )
}

export default DashboardPartner