import { useState, useEffect, useContext } from 'react'
import { styles } from '../../styles'
import { arrowExpand, arrowExpanded, nameInput, phoneInput, scan } from '../../assets'
import { useForm } from 'react-hook-form';
import { ResponseContext } from '../../App';
import axios from 'axios';
import ErrorMessage from '../common/ErrorMessage';

const DashboardPartner = ({ token, responseLogin }) => {
    console.log(token)
    const { responseAuth, setResponseAuth } = useContext(ResponseContext);
    const [show, setShow] = useState(false)
    const [responseState, setState] = useState([])


  const InputIcon = ({ prop }) => {
    const array = [phoneInput, nameInput]
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
            className={`${errors2?.phone ? styles.badInputStyles : styles.inputStyles} relative`}
            placeholder="Номер телефона"
            onInput={handleInput}
            pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
            title="Используйте формат: +79046585851"
            {...register2('phone', {
                required: "Поле обязательно к заполнению",
                minLength: 12,
                maxLength: 12,
            }  
            )}
            />
            {active && <InputIcon prop={0} />}
            <div className="mt-1">
              {errors2?.phone && <p className="text-red-500 text-[12px]">
                {errors2?.phone?.message || "Длина номера 12 символов" || "Ошибка!"}
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
                // pattern: /^[А-Яа-я]+$/
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
                // pattern: /^[0-9]+$/
            }  
            )}
            />
            {active && <InputIcon prop={1} />}
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
                // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }  
            )}
            />
            {active && <InputIcon prop={2} />}
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
            onInput={handleInput}
            {...register('date', {
                required: "Поле обязательно к заполнению",
                // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }  
            )}
            />
            {active && <InputIcon prop={2} />}
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
            {active && <InputIcon prop={2} />}
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
            {active && <InputIcon prop={2} />}
            <div className="mt-1">
            {errors?.percent && <p className="text-red-500 text-[12px]">
                {errors?.percent?.message || "Неверный формат" || "Ошибка!"}
                </p>}
            </div>
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
        method: "post",
        url: "http://localhost:8000/api/v1/add_cheque/",
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
        url: "http://localhost:8000/api/v1/add_or_remove_client/",
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
        })
        .catch(function (response) {
            console.log(response);
    });

    console.log(data)
  }

    
  const Intro = () => {
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
              <InputCardCategories />
              <button type='submit' className='bg-primary p-4 rounded-[8px] text-white font-medium md:max-w-[400px] w-full 
              mt-[10px] flex justify-center relative ease duration-300 hover:bg-hover gap-[10px]'
              {...register('name_partner', {
                value: `${responseLogin.name}`
            }  
            )}
            >
                <img src={scan} alt="" className='w-6 h-6'/>
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
                    value: `${responseLogin.name}`
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



  const ClientItem = ({ fio, phone, bonus }) => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setModal(false);
        }
    })
    const [modal, setModal] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 560px)").matches
    )

    useEffect(() => {
        window
        .matchMedia("(min-width: 560px)")
        .addEventListener('change', event => setMatches(event.matches));
    }, []);

    const ModalWindow = () => {
        const [dataBonus, setDataBonus] = useState(bonus)
        const [inputValue, setInputValue] = useState()
        console.log(bonus, Number(inputValue))
        const withdrawBonuses = async (event) => {
            if (bonus && Number(inputValue)) {
                event.preventDefault()
                axios({
                    method: "PUT",
                    url: "http://localhost:8000/api/v1/withdraw_bonus/",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `token ${token}` 
                    },
                    withCredentials: true,
                    data: {
                        bonuses: `${inputValue}`,
                        phone: `${phone}` 
                    },
                    })
                    .then(function (response) {
                        console.log(response.data.data.bonus)
                        setDataBonus(response.data.data.bonus)
                        // console.log(response);
                        
                    })
                    .catch(function (response) {
                        console.log(response)
                        setShow(true)
                        setResponseAuth({ error: {message: "Проверьте правильность введенных данных"} })
                        setTimeout(() => setShow(false), 3000)
                    });
                }
            // } else {
            //     setShow(true)
            //     setResponseAuth({ error: {message: "Количество списываемых бонусов должно быть меньше всего количества бонусов"} })
            //     setTimeout(() => setShow(false), 3000)
            // }
        }

        const removeClient = async (event) => {
            event.preventDefault()
            axios({
                method: "PUT",
                url: "http://localhost:8000/api/v1/add_or_remove_client/",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `token ${token}` 
                },
                withCredentials: true,
                data: {
                    name_partner: `${responseLogin.name}`,
                    phone: `${phone}`,
                    method: 'remove'
                },
                })
                .then(function (response) {
                    console.log(response);
                    setState(oldItem => [...oldItem, responseState])
                })
                .catch(function (response) {
                    console.log(response);
                });
                
            }
          

        return (
            <div className='max-w-[600px] w-full h-[400px] bg-white fixed border-solid border-[1px] border-[#D2D2D2] rounded-[12px]
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[100%] z-[10] p-[30px] before:w-full before:h-[60px] before:bg-primary
            before:content-normal before:block before:absolute before:top-0 before:left-0 before:rounded-t-[12px]'>
                <div className='mt-[50px] h-[300px] relative'>
                    <h2 className='font-medium text-[20px] pb-[15px]'>{fio}</h2>
                    <div className='pt-[20px] border-solid border-t-[1px] border-[#D2D2D2] flex flex-col'>
                        <>
                            <p>Бонусов: <span>{dataBonus}</span></p>
                           
                           <form action="" onSubmit={withdrawBonuses} className='flex flex-col'>
                                <input type="text" name="" id="" className='bg-input mt-[15px] h-[40px] rounded-[8px] 
                                md:max-w-[310px] w-full px-[15px] outline-primary' placeholder='Списать бонусы' 
                                onInput={(e) => setInputValue(e.target.value)}/>
                                <div className="flex items-center gap-[10px] h-full">
                                    <button type="submit" className='bg-red-500 p-2 rounded-[8px] text-white font-medium md:max-w-[150px]
                                        w-full mt-[20px] ease duration-300 hover:bg-red-400 cursor-pointer outline-none' onClick={withdrawBonuses}>
                                        Списать
                                    </button>
                                    <button type="submit" className='bg-red-500 p-2 rounded-[8px] text-white font-medium
                                        md:max-w-[150px] w-full mt-[20px] ease duration-300 hover:bg-red-400 cursor-pointer'
                                        onClick={removeClient}>
                                        Удалить
                                    </button>
                                </div>
                           </form>
                        </>
                    </div>
                    <button type="submit" className='bg-primary p-2 rounded-[8px] text-white font-medium
                    w-full mt-[10px] ease duration-300 hover:bg-hover cursor-pointer absolute bottom-0' onClick={() => setModal(false)}>
                        Закрыть
                    </button>
                </div>
            </div>
        )
    }

    const ItemDesc = () => {
        return (
          <div className='flex flex-col gap-[10px] h-[80px] justify-center px-[30px] border-solid border-t-[1px] border-[#D2D2D2]'>
            <p className='font-medium'>Номер: <span>{phone}</span></p>
          </div>
        )
      }

    return (
        <>
            <div className='border-solid border-b-[1px] border-[#D2D2D2]'>
                <div className='w-full h-[80px] flex flex-row justify-between items-center 
                font-medium relative px-[30px]'>
                    <div className='flex gap-[10px] items-center cursor-pointer' onClick={() => setModal(!modal)}>
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
            {modal && <ModalWindow /> }
        </>
    )
  }

  const ClientsList = ({ }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/v1/partner_clients/', {
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
            <input type="text" className='max-w-[400px] w-full h-[40px] rounded-[8px]  border-solid border-[1px] border-[#D2D2D2]
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
            <div className='[&>*:nth-child(10)]:border-transparent'>
                {filteredClients.map((item, index) => (
                    <ClientItem key={index} {...item}/>
                ))}
            </div>
        </div>
      </section>
    )
  }


  return (
    <section className='relative w-full h-full bgdashboard'>
      <div className='max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px] '>
        <Intro responseLogin={responseLogin} />
        <div className='flex flex-col md:gap-[30px] gap-0'>
            {/* <UserResponseContext.Provider value={{ userResponse, setUserResponse }} className='flex w-full flex-col h-full'> */}
                <div>
                    <AddPurchase responseLogin={responseLogin} />
                    <AddClient responseLogin={responseLogin} />
                    <ClientsList  />
                </div>
            {/* </UserResponseContext.Provider> */}
        </div>
      </div>
      {show && <ErrorMessage error={responseAuth.error}/>}
    </section>
  )
}

export default DashboardPartner