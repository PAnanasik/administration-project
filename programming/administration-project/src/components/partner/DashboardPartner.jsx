import { useState, useEffect, useContext } from 'react'
import { styles } from '../../styles'
import { arrowExpand, arrowExpanded, nameInput, phoneInput, cash, date, receipt, percent, product } from '../../assets'
import { useForm } from 'react-hook-form';
import { ResponseContext } from '../../App';
import axios from 'axios';
import ErrorMessage from '../common/ErrorMessage';
import { addChequeUrl, getClientsListUrl, remove_addUrl, withdrawBonusesUrl } from '../urls';
import { InView } from 'react-intersection-observer';


const DashboardPartner = () => {
    const token = window.localStorage.getItem("token")
    const userData = JSON.parse(window.localStorage.getItem("userData"))
    const [modalInfo, setModalInfo] = useState({ name: '', bonuses: '', phone: '' })
    const [modal, setModal] = useState(false)
    const { responseAuth, setResponseAuth } = useContext(ResponseContext);
    const [show, setShow] = useState(false)
    const [responseState, setState] = useState([])

    const useShowError = ({error}) => {
        setShow(true);
        setResponseAuth({
            errorMessage: `${error}` 
        })
        setModal(false)
        setTimeout(() => setShow(false), 5000)        
    }


    const InputIcon = ({ prop }) => {
        const array = [phoneInput, nameInput, receipt, cash, date, product, percent]
        return (
            <img src={array[prop]} alt="phone" className='absolute right-[20px] top-[18px] w-6 h-6'/>
        )
    }

  const InputCardPhone = () => {
    const [active, setActive] = useState(true)

    function handleInput(event) {
        if (event.target.value == 0) {
            setActive(true)
        } 
        else {
            setActive(false)
        }
    }
    return (
        <div className="relative h-[60px] w-full">
            <input
            type='tel'
            className={`${errors2?.phone_client ? styles.badInputStyles : styles.inputStyles} relative`}
            placeholder="Номер телефона"
            onInput={handleInput}
            pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
            title="Используйте формат: +79046585851"
            {...register2('phone_client', {
                required: "Поле обязательно к заполнению",
                minLength: 12,
                maxLength: 12,
            }  
            )}
            />
            {active && <InputIcon prop={0} />}
            <div className="mt-1">
              {errors2?.phone_client && <p className="text-red-500 text-[12px]">
                {errors2?.phone_client?.message || "Длина номера 12 символов" || "Ошибка!"}
                </p>}
            </div>
        </div>
    )
  }


  const InputCardName = () => {
    const [active, setActive] = useState(true)

    function handleInput(event) {
        if (event.target.value == 0) {
            setActive(true)
        } 
        else {
            setActive(false)
        }
    }
    return (
        <div className="relative h-[60px] w-full">
            <input
            type='text'
            className={`${errors2?.fio ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="ФИО"
            onInput={handleInput}
            {...register2('fio', {
                required: "Поле обязательно к заполнению",
                pattern: /^[А-Яа-я]+$/
            }  
            )}
            />
            {active && <InputIcon prop={1} />}
            <div className="mt-1">
            {errors2?.fio && <p className="text-red-500 text-[12px]">
                {errors2?.fio?.message || "Только буквы русского алфавита" || "Ошибка!"}
                </p>}
            </div>
        </div>
    )
}

    const InputCardPhoneNext = () => {
      const [active, setActive] = useState(true)

      function handleInput(event) {
          if (event.target.value == 0) {
              setActive(true)
          } 
          else {
              setActive(false)
          }
      }
      return (
          <div className="relative h-[60px] w-full">
              <input
              type='text'
              className={`${errors?.phone ? styles.badInputStyles : styles.inputStyles} relative`}
              placeholder="Номер телефона"
              onInput={handleInput}
              pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
              title="Используйте формат: +79046585851"
              required
              {...register('phone', {
                required: "Поле обязательно к заполнению",
              })}  
              />
              {active && <InputIcon prop={0} />}
              <div className="mt-1">
                {errors?.phone && <p className="text-red-500 text-[12px]">
                  {errors?.phone?.message || "Длина номера 12 цифр" || "Ошибка!"}
                  </p>}
              </div>
          </div>
      )
    }

  const InputCardReceipt = () => {
    const [active, setActive] = useState(true)

    function handleInput(event) {
        if (event.target.value == 0) {
            setActive(true)
        } 
        else {
            setActive(false)
        }
    }
    return (
        <div className="relative h-[60px] w-full">
            <input
            type='text'
            className={`${errors?.number ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Номер чека"
            onInput={handleInput}
            {...register('number', {
                required: "Поле обязательно к заполнению",
                pattern: /^[0-9]+$/
            }  
            )}
            />
            {active && <InputIcon prop={2} />}
            <div className="mt-1">
            {errors?.number && <p className="text-red-500 text-[12px]">
                {errors?.number?.message || "Длина чека должна быть больше 0 цифр" || "Ошибка!"}
                </p>}
            </div>
        </div>
    )
  }

  const InputCardCash = () => {
    const [active, setActive] = useState(true)

    function handleInput(event) {
        if (event.target.value == 0) {
            setActive(true)
        } 
        else {
            setActive(false)
        }
    }
    return (
        <div className="relative h-[60px] w-full">
            <input
            type='text'
            className={`${errors?.amount ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Сумма покупки"
            onInput={handleInput}
            {...register('amount', {
                required: "Поле обязательно к заполнению",
                pattern: /^[0-9]+$/
                // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }  
            )}
            />
            {active && <InputIcon prop={3} />}
            <div className="mt-1">
            {errors?.amount && <p className="text-red-500 text-[12px]">
                {errors?.amount?.message || "Неверный формат" || "Ошибка!"}
                </p>}
            </div>
        </div>
    )
  }

  const InputCardDate = () => {
    const [active, setActive] = useState(true)

    function handleInput(event) {
        if (event.target.value == 0) {
            setActive(true)
        } 
        else {
            setActive(false)
        }
    }
    return (
        <div className="relative h-[60px] w-full">
            <input
            type='text'
            className={`${errors?.date ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Дата и время покупки"
            pattern="^(19|20)\d{2}-(0[1-9]|1[1,2])-(0[1-9]|[12][0-9]|3[01])\s(0|1|2){1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}[+][0-9]{1}[0]{1}:[0]{2}"
            title="Используйте формат: 2023-08-23 07:58:53+00:00"
            onInput={handleInput}
            {...register('date', {
                required: "Поле обязательно к заполнению",
            }  
            )}
            />
            {active && <InputIcon prop={4} />}
            <div className="mt-1">
            {errors?.date && <p className="text-red-500 text-[12px]">
                {errors?.date?.message || "Неверный формат" || "Ошибка!"}
                </p>}
            </div>
        </div>
    )
  }

  const InputCardPurchaseName = () => {
    const [active, setActive] = useState(true)

    function handleInput(event) {
        if (event.target.value == 0) {
            setActive(true)
        } 
        else {
            setActive(false)
        }
    }
    return (
        <div className="relative h-[60px] w-full">
            <input
            type='text'
            className={`${errors?.name_purchase ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Название товара"
            onInput={handleInput}
            {...register('name_purchase', {
                required: "Поле обязательно к заполнению",
                // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }  
            )}
            />
            {active && <InputIcon prop={5} />}
            <div className="mt-1">
            {errors?.name_purchase && <p className="text-red-500 text-[12px]">
                {errors?.name_purchase?.message || "Неверный формат" || "Ошибка!"}
                </p>}
            </div>
        </div>
    )
  }
  const InputCardBonusPercent = () => {
    const [active, setActive] = useState(true)

    function handleInput(event) {
        if (event.target.value == 0) {
            setActive(true)
        } 
        else {
            setActive(false)
        }
    }
    return (
        <div className="relative h-[60px] w-full">
            <input
            type='text'
            className={`${errors?.percent ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Бонусный процент"
            onInput={handleInput}
            {...register('percent', {
                required: "Поле обязательно к заполнению",
                // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }  
            )}
            />
            {active && <InputIcon prop={6} />}
            <div className="mt-1">
            {errors?.percent && <p className="text-red-500 text-[12px]">
                {errors?.percent?.message || "Неверный формат" || "Ошибка!"}
                </p>}
            </div>
        </div>
    )
}

    const InputBonuses = () => {
        const [inputBonus, setInputBonus] = useState(0)

        return (
            <div className="relative h-[60px] w-full">
                <input
                type='text'
                className={`${styles.inputStyles}`}
                placeholder="Бонусов для снятия"
                // onInput={handleInput}
                onInput={e => setInputBonus(e.target.value)}
                {...register('bonuses_spent', {
                    value: `${inputBonus}`
                }  
                )}
                />
            </div>
        )
    }

  const InputCardCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState('')

    return (
        <div className="relative h-[60px] w-full">
            <select
            type='select'
            className={`${styles.inputStyles}`}
            placeholder="Категория товара"
            id='selection'
            defaultValue={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            {...register('payment_order', {
              value: `${selectedCategory}`
            }  
            )}
            >
              <option value="Электроника">Электроника</option>
              <option value="Одежда и обувь">Одежда и обувь</option>
              {/* <option value="">4314</option> */}
            </select>
             
        </div>
    )
  }


  const {
      register,
      formState: {
          errors
      },
      handleSubmit,
      reset,
  } = useForm({
      mode: "onBlur"
  });

  const {
    register: register2,
    formState: {
        errors2
    },
    handleSubmit: handleSubmit2,
    reset: reset2,
} = useForm({
    mode: "onBlur"
});

  const onSubmitAddPurchase = async (data, event) => {
    event.preventDefault()
    axios({
        method: "POST",
        url: `${addChequeUrl}`,
        data: data,
        headers: { "Authorization": `token ${token}` },
        withCredentials: true
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
    });

    reset();
    console.log(data)
  }

  const onSubmitAddClient = async (data, event) => {
    event.preventDefault()
    data.method = "add"
    axios({
        method: "PUT",
        url: `${remove_addUrl}`,
        data: data,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `token ${token}` 
        },
        withCredentials: true
        })
        .then(function (response) {
            console.log(response);
            setState(oldItem => [...oldItem, responseState])
            // setPartnerData({ dataPartner: data })
        })
        .catch(function (response) {
            console.log(response);
    });

  }

    
  const Intro = ({ responseLogin }) => {
    console.log(responseLogin)
    return (
      <div className='w-full h-[200px] flex md:justify-between justify-center items-center md:text-left text-center 
      bg-white rounded-[12px] md:pl-[40px] pl-0 relative'>
        <h2 className={`${styles.sectionHeadText}`}>Добрый день, <br /><span>{responseLogin.name}</span></h2>
        <div className='md:block hidden absolute w-[600px] right-0 h-full bg-rectangle'>
        </div>
      </div>
    )
  }

   const AddPurchase = ({ responseLogin }) => {

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Добавить покупку</h2>
        <div className='bg-white w-full max-h-[900px] md:py-[30px] py-[10px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px]
        border-solid border-[1px] border-[#D2D2D2]'>
          <form key={1} className='w-full flex flex-col gap-[30px] h-full justify-center' 
          onSubmit={handleSubmit(onSubmitAddPurchase)}>
              <InputCardPhoneNext />
              <InputCardReceipt />
              <InputCardCash />
              <InputCardDate />
              <InputCardPurchaseName />
              <InputCardBonusPercent />
              <InputBonuses />
              <InputCardCategories />
              <button type='submit' className='bg-primary p-4 rounded-[8px] text-white font-medium md:max-w-[400px] w-full 
              mt-[10px] flex justify-center relative ease duration-300 hover:bg-hover gap-[10px]'
              {...register('name_partner', {
                value: `${userData.name}`
            }  
            )}
            >
                <p>Добавить чек</p>
              </button>
            </form>
        </div>
      </section>
    )
  }

  const AddClient = ({ responseLogin }) => {
    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Добавить клиента</h2>
        <div className='bg-white w-full md:h-[300px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px] h-full
        border-solid border-[1px] border-[#D2D2D2]'>
          <div className='flex md:flex-row flex-col w-full h-full items-center py-[10px]'>
            <form key={2} action="" onSubmit={handleSubmit2(onSubmitAddClient)} className='w-full flex flex-col gap-[30px] h-full justify-center'>
              <InputCardPhone />
              <InputCardName />
              <button type="submit" className='bg-primary p-4 rounded-[8px] text-white font-medium md:max-w-[400px]
                w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer'
                {...register2('name_partner', {
                    value: `${userData.name}`
                }  
                )}>
                    Добавить клиента
                </button>
            </form>
          </div>
        </div>
      </section>
    )
  }

  const ModalWindow = () => {
    const [dataBonus, setDataBonus] = useState(modalInfo.bonuses)
    const [inputValue, setInputValue] = useState(0)
    // console.log(bonuses, Number(inputValue))
    const withdrawBonuses = async (event) => {
        event.preventDefault()
        axios({
            method: "PUT",
            url: `${withdrawBonusesUrl}`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `token ${token}` 
            },
            withCredentials: true,
            data: {
                bonuses: inputValue,
                phone: `${modalInfo.phone}` 
            },
            })
            .then(function (response) {
                console.log(response.data.data.bonuses)
                setDataBonus(response.data.data.bonuses)
                // console.log(response);
                
            })
            .catch(function (response) {
                console.log(response);
                useShowError({error: "Не удалось списать бонусы"})
            });
    }

    const removeClient = async (event) => {
        event.preventDefault()
        axios({
            method: "PUT",
            url: `${remove_addUrl}`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `token ${token}` 
            },
            withCredentials: true,
            data: {
                name_partner: `${userData.name}`,
                phone_client: `${modalInfo.phone}`,
                method: 'remove'
            },
            })
            .then(function (response) {
                setState(oldItem => [...oldItem, responseState])
                setModal(false)
            })
            .catch(function (response) {
                console.log(response);
                useShowError({error: "Не удалось удалить пользователя"})
            });
            
        }
      

    return (
        <div className='max-w-[560px] w-full h-[360px] bg-white fixed border-solid border-[1px] border-[#D2D2D2] rounded-[12px]
        lg:bottom-[250px] bottom-[150px] left-0 right-0 mx-auto z-10 px-[30px]'>
            <div className='mt-[40px] h-[260px] relative'>
                <h2 className='font-medium text-[20px]'>Имя клиента: {modalInfo.name}</h2>
                <div className='pt-[16px] flex flex-col'>
                    <>
                        {/* <p className='text-[20px]'>Бонусов: <span>{dataBonus}</span></p> */}
                       
                       <form action="" onSubmit={withdrawBonuses} className='flex flex-col'>
                            <label htmlFor="bonuses">Количество бонусов: {dataBonus}</label>
                            <input type="text" name="" id="bonuses" className='bg-input mb-[15px] h-[50px] rounded-[8px] 
                            md:max-w-[310px] w-full px-[15px] outline-primary' placeholder='Списать бонусы' 
                            onInput={(e) => setInputValue(e.target.value)}/>
                            <div className="flex items-center gap-[10px] h-full mt-[10px]">
                                <button type="submit" className='bg-red-500 p-2 rounded-[8px] text-white font-medium md:max-w-[150px]
                                    w-full ease duration-300 hover:bg-red-400 cursor-pointer outline-none' onClick={withdrawBonuses}>
                                    Списать
                                </button>
                                <button type="submit" className='bg-red-500 p-2 rounded-[8px] text-white font-medium
                                    md:max-w-[150px] w-full ease duration-300 hover:bg-red-400 cursor-pointer' id='btn-error-handled'
                                    onClick={removeClient}>
                                    Удалить
                                </button>
                            </div>
                       </form>
                    </>
                </div>
                <button type="submit" className='bg-primary p-2 rounded-[8px] text-white font-medium
                w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer absolute bottom-[-20px]' onClick={() => setModal(false)}>
                    Закрыть
                </button>
            </div>
        </div>
    )
}



  const ClientItem = ({ fio, phone, bonuses = 0 }) => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setModal(false);
        }
    })
    const [expanded, setExpanded] = useState(false)
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 560px)").matches
    )

    useEffect(() => {
        window
        .matchMedia("(min-width: 560px)")
        .addEventListener('change', event => setMatches(event.matches));
    }, []);


    const ItemDesc = () => {
        return (
          <div className='flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2]'>
            <p className='font-medium'>Номер: <span>{phone}</span></p>
          </div>
        )
    }  

    function handleModalInfo() {
        setModal(!modal)
        window.scrollTo(0, document.body.scrollHeight);
        setModalInfo({ name: fio, bonuses: bonuses, phone: phone })
    }

    return (
        <>
            <div className='border-solid border-b-[1px] border-[#D2D2D2]'>
                <div className='w-full h-[80px] flex flex-row justify-between items-center 
                font-medium relative px-[30px]'>
                    <div className='flex gap-[10px] items-center cursor-pointer' onClick={handleModalInfo}>
                        <div className='w-[40px] h-[40px] rounded-full bg-primary'></div>
                        <h2>{fio || 'Без имени'}</h2>
                    </div>
                    {matches 
                    ? 
                    <div>
                        <p>{phone}</p>  
                    </div> 
                    : 
                    <button onClick={() => setExpanded(!expanded)}>
                        <img src={expanded ? arrowExpanded : arrowExpand} className='w-4 h-4'></img>
                    </button>
                    }
                </div>
                {expanded && <ItemDesc/>}
            </div>
        </>
    )
  }

  const ClientsList = ({ }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
          try {
            const response = await axios.get(`${getClientsListUrl}`, {
                headers: {
                    Authorization: `token ${token}`
                }
            });
            console.log(response);
            const responseState = response.data;
            setState(responseState);
          } catch(error) {
            console.log(error)
          }
        };

        dataFetch();
    }, []);

    const [value, setValue] = useState('')

    const filteredClients = state.filter((item) => {
        return item.fio?.toLowerCase()?.includes(value.toLowerCase())
    })
   
    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Список клиентов</h2>
        <div className='my-[10px]'>
            <input type="text" className='max-w-[400px] w-full h-[40px] rounded-[8px] border-solid border-[1px] border-[#D2D2D2]
            px-[15px] outline-primary'
            placeholder='Поиск по клиентам'
            onChange={(event) => setValue(event.target.value)}/>
        </div>
        <div className='bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] h-full 
        border-solid border-[1px] border-[#D2D2D2]'>
            <div className='bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium
            border-solid border-b-[1px] border-[#D2D2D2]'>
                <h2>Клиент</h2>
                <h2>Номер</h2>
            </div>
            <InView>
                {({ inView, ref }) => (
                <div className='' ref={ref}>
                    {filteredClients.map((item, index) => (
                        inView && <ClientItem key={index} {...item}/>
                    ))}
                </div>
                )}
            </InView>
        </div>
      </section>
    )
  }


  return (
    <section className='relative w-full h-full bgdashboard mt-[60px] z-0'>
        {modal && <div className='absolute w-full h-full bg-black bg-opacity-[0.3] z-10'></div>}
        {modal && <ModalWindow /> }
        <div className='max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px] '>
            <Intro responseLogin={userData} />
            <div className='flex flex-col md:gap-[30px] gap-0'>
                <div >
                    <AddPurchase responseLogin={userData} />
                    <AddClient responseLogin={userData} />
                    <ClientsList  />
                </div>
            </div>
        </div>
        {show && <ErrorMessage error={responseAuth.errorMessage}/>}
    </section>
  )
}

export default DashboardPartner