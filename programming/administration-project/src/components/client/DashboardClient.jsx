import { useState, useEffect, useContext } from 'react'
import { styles } from '../../styles'
import { arrowExpand, arrowExpanded, avatar, mailInput, phoneInput } from '../../assets'
import axios from 'axios';
import { ResponseContext } from '../../App';
import ErrorMessage from '../common/ErrorMessage';
import { partnersListUrl, purchasesUrl, refundUrl, remove_addUrl } from '../urls'
import { InView } from 'react-intersection-observer';
import greetings from '../greetings';


const DashboardClient = () => {

  const token = window.localStorage.getItem("token")
  const userData = JSON.parse(window.localStorage.getItem("userData"))

  console.log(userData)

  const [modalInfo, setModalInfo] = useState({ name: '', amount: '', date: '', total_amount: '' })
  const [modal, setModal] = useState(false)
  const [show, setShow] = useState(false)
  const { responseAuth, setResponseAuth } = useContext(ResponseContext);
  
  console.log(token)

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 560px)").matches
  )

  useEffect(() => {
      window
      .matchMedia("(min-width: 560px)")
      .addEventListener('change', event => setMatches(event.matches));
  }, []);

  const useShowError = ({error}) => {
    setShow(true);
    setResponseAuth(prev => ({ 
        ...prev,
        errorMessage: `${error}` 
    }))
    setModal(false)
    setTimeout(() => setShow(false), 5000)        
}

  

  const Intro = () => {
    return (
      <div className='relative w-full h-[200px] flex md:justify-between justify-center items-center md:text-left text-center 
      bg-white rounded-[12px] md:pl-[40px] pl-0'>
        <h2 className={`${styles.sectionHeadText}`}>{greetings()}<br /><span>{userData.fio || 'Без имени'}</span></h2>
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
                <h2 className='font-medium text-[24px] mt-[15px]'>{userData.fio || 'Без имени'}</h2>
              </div>
            </div>
            <div className='py-[20px] w-full h-full flex flex-col gap-[20px]'>
              <div className='relative'>
                <input
                  type='text'
                  className={`${styles.dashboardInputAvatarStyles} relative text-center`}
                  value={userData.email || 'Без почты'}
                  disabled
                  />
                <img src={mailInput} alt="name-icon" className='absolute left-[20px] top-[18px] w-6 h-6'/>
              </div>

              <div className='relative'>
                <input
                  type='text'
                  className={`${styles.dashboardInputAvatarStyles} relative text-center`}
                  value={userData.phone || 'Без телефона'}
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

  const ModalWindow = () => {
    const [selectedCategory, setSelectedCategory] = useState('Товар не подошел')

      const handleModal = (event) => {
        event.preventDefault()
        axios({
          method: "POST",
          url: `${refundUrl}`,
          data: {
            phone_client: `${userData.phone}`,
            number_cheque: modalInfo.amount,
            reason_refund: `${selectedCategory}`,
            date_cheque: modalInfo.date,
            total_amount: modalInfo.total_amount
          },
          headers: { 
              "Content-Type": "application/json",
              "Authorization": `token ${token}` 
          },
          withCredentials: true
          })
          .then(function (response) {

              console.log(response);
          })
          .catch(function (response) {
              console.log(response);
              useShowError({error: "Не удалось совершить возврат"})
        });

      }

    return (
      <div className='max-w-[560px] w-full h-[400px] bg-white fixed border-solid border-[1px] border-[#D2D2D2] rounded-[12px]
      lg:top-[100px] top-[100px] left-0 right-0 mx-auto z-10 px-[30px]'>
          <div className='mt-[50px] h-[300px] relative'>
              <h2 className='font-medium text-[20px] pb-[15px]'>Наименование товара: {modalInfo.name}</h2>
              <div className='pt-[16px]  flex flex-col'>
                <form action="" onSubmit={handleModal}  className='flex flex-col'>
                    <label htmlFor='selection'>Причина возврата</label>
                    <select type="select"
                    className={`${styles.inputStyles}`}
                    placeholder="Категория товара"
                    id='selection'
                    defaultValue={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}>
                      <option value="Товар не подошел">Товар не подошел</option>
                      <option value="Товар ненадлежащего качества">Товар ненадлежащего качества</option>
                      <option value="Гарантийный случай">Гарантийный случай</option>
                    </select>
                    <button type="submit" className='bg-red-500 p-2 rounded-[8px] text-white font-medium
                        md:max-w-[150px] w-full mt-[20px] ease duration-300 hover:bg-red-400 cursor-pointer'>
                        Возврат
                    </button>
                </form>
              </div>
              <button type="submit" className='bg-primary p-2 rounded-[8px] text-white font-medium
              w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer absolute bottom-0' onClick={() => setModal(false)}>
                  Закрыть
              </button>
          </div>
      </div>
    )
  }

  const HistoryInfo = ({ token }) => {
    const [state, setState] = useState([])

    useEffect(() => {
      const getPurchases = async () => {
        try {
          const response = await axios.get(purchasesUrl, {
            headers: {
                Authorization: `token ${token}`
            }
          });
          const responseState = response.data;
          setState(responseState);
        } catch(error) {
          console.log(error)
          useShowError({error: "Не удалось вывести список покупок"})
        }
      };

      getPurchases();

    }, [purchasesUrl]);
    console.log(state)

    const HistoryItem = ({ name, amount, date, is_confirmed, bonuses_spent, total_amount }) => {
      const [expanded, setExpanded] = useState(false)
      

      const HistoryItemDesc = () => {
        function handleToModalScroll() {
          setModalInfo({ name: name, amount: amount, date: date, total_amount: total_amount })
          console.log(modalInfo)
          setModal(true);
          window.scrollTo(0, 0);
        }

        return (
          <div className='flex flex-col gap-[10px] py-[20px] px-[30px] border-solid border-t-[1px] border-[#D2D2D2]'>
            <p>Цена: {amount}</p>
            <p>Списанные бонусы: {bonuses_spent}</p>
            <p>Дата покупки: {date}</p>
            <p className='font-medium'>Итоговая цена: {total_amount}</p>
            <div className='flex items-center gap-[8px]'>
              <p className='font-medium'>Подтверждено</p>
              {is_confirmed ?
                <input type="checkbox" name="" id="" className='w-4 h-4 pointer-events-none' readOnly checked/>
              :
                <input type="checkbox" name="" id="" className='w-4 h-4 pointer-events-none' readOnly/>
              }
            </div>
            <button className='bg-red-500 p-1 rounded-[8px] text-white font-medium
                md:max-w-[150px] w-full ease duration-300 hover:bg-red-400 cursor-pointer mt-[10px]'
                onClick={handleToModalScroll}>
                Возврат
            </button>
          </div>
        )
      }
      return (
        <>
          <div className='border-solid first:border-t-transparent border-t-[1px] border-[#D2D2D2]'>
              <div className='
              w-full h-[60px] flex justify-between items-center px-[30px] '>
                <h2 className={`${styles.dashboardItemTitle}`}>{name}</h2>
                <button onClick={() => setExpanded(!expanded)}>
                  <img src={expanded ? arrowExpanded : arrowExpand} alt="" className='w-4 h-4'/>
                </button>
              </div>

              {expanded && <HistoryItemDesc/>}
          </div>
        </>
      )
    }

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>История покупок</h2>
        <div className='bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] border-solid border-[1px] border-[#D2D2D2]'>
            <div className='bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
            border-solid border-b-[1px] border-[#D2D2D2]'>
                <h2>Товар</h2>
                <h2>Информация</h2>
            </div>
            <div className=''>
                {state.map((item, index) => (
                  <HistoryItem key={index} {...item}/>
                ))}
            </div>
        </div>
      </section>
    )
  }

  const PartnersItem = ({ name, token }) => {
    const [expanded, setExpanded] = useState(false)

    const removePartner = async () => {
      axios({
          method: "PUT",
          url: `${remove_addUrl}`,
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `token ${token}` 
          },
          withCredentials: true,
          data: {
            name_partner: `${name}`,
            phone_client: `${userData.phone}`,
            method: 'remove'
          },
          })
          .then(function (response) {
              console.log(response);
          })
          .catch(function (response) {
              console.log(response);
          });
          
      }

    const ItemDesc = () => {
        return (
          <div className='flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2] '>
            <button type="submit" className='bg-red-500 p-2 rounded-[8px] text-white font-medium
            max-w-[150px] w-full mt-[10px] ease duration-300 hover:bg-red-400 cursor-pointer' onClick={removePartner}>
              Удалить
            </button>
          </div>
        )
      }

    return (
        <div className='border-solid border-b-[1px] border-[#D2D2D2] last:border-b-transparent'>
            <div className='w-full h-[80px] flex flex-row justify-between items-center 
            font-medium relative px-[30px]'>
                <div className='flex gap-[10px] items-center'>
                    <div className='w-[40px] h-[40px] rounded-full bg-primary'></div>
                    <h2>{name || 'Без имени'}</h2>
                </div>
                {matches 
                ? 
                <button type="submit" className='bg-red-500 p-2 rounded-[8px] text-white font-medium
                max-w-[150px] w-full mt-[10px] ease duration-300 hover:bg-red-400 cursor-pointer' onClick={removePartner}>
                  Удалить
                </button>
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
            const response = await axios.get(partnersListUrl, {
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
    }, [state]);

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
                <h2>Информация</h2>
            </div>
            <InView>
                {({ inView, ref }) => (
                  <div className='' ref={ref}>
                      {filteredPartners.map((item, index) => (
                        inView && <PartnersItem key={index} {...item} token={token}/>
                      ))}
                  </div>
                )}
            </InView>
        </div>
      </section>
    )
  }

  const PartnersItemAll = ({ name, token }) => {
    const [expanded, setExpanded] = useState(false)

    const addPartner = async () => {
      axios({
          method: "PUT",
          url: `${remove_addUrl}`,
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `token ${token}` 
          },
          withCredentials: true,
          data: {
            name_partner: `${name}`,
            phone_client: `${userData.phone}`,
            method: 'add'
          },
          })
          .then(function (response) {
            console.log(response);

          })
          .catch(function (response) {
              console.log(response);
          });
          
      }

    const ItemDesc = () => {
        return (
          <div className='flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2]'>
            <button type='submit' className='bg-primary p-2 rounded-[8px] text-white font-medium
            max-w-[150px] w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer' onClick={addPartner}>
              Добавить
            </button>
          </div>
        )
      }

    return (
        <div className='border-solid border-b-[1px] border-[#D2D2D2] last:border-b-transparent'>
            <div className='w-full h-[80px] flex flex-row justify-between items-center 
            font-medium relative px-[30px]'>
                <div className='flex gap-[10px] items-center'>
                    <div className='w-[40px] h-[40px] rounded-full bg-primary'></div>
                    <h2>{name || 'Без имени'}</h2>
                </div>
                {matches 
                ? 
                <button type="submit" className='bg-primary p-2 rounded-[8px] text-white font-medium
                max-w-[150px] w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer' onClick={addPartner}>
                  Добавить
                </button>
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

  const PartnersListAll = ({ token }) => {

    const [state, setState] = useState([]);

    useEffect(() => {
        const getAllPartners = async () => {
          try {
            const response = await axios.get(partnersListUrl, {
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
    }, [partnersListUrl]);

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
                <h2>Информация</h2>
            </div>
              <InView>
                {({ inView, ref }) => (
                <div className='' ref={ref}>
                    {filteredPartners.map((item, index) => (
                      inView && <PartnersItemAll key={index} {...item} token={token}/>
                    ))}
                </div>
                )}
              </InView>
        </div>
      </section>
    )
  }


  return (
    <section className='w-full h-full bgdashboard mt-[60px]'>
      {modal && <div className='absolute w-full h-full bg-black bg-opacity-[0.3] z-10'></div>}
      {modal && <ModalWindow />}
      <div className='max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px]'>
        <Intro />
        <div className='flex flex-col h-full'>
          <div className='flex md:flex-row flex-col md:gap-[30px] gap-0'> 
            <ContactInfo />
            <HistoryInfo token={token} />
          </div>
            <PartnersList token={token} />
            <PartnersListAll token={token} />
        </div>
      </div>
      {show && <ErrorMessage error={responseAuth.errorMessage}/>}
    </section>
  )
}

export default DashboardClient