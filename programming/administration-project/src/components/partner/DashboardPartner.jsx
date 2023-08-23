import React, { useState, useEffect } from 'react'
import { styles } from '../../styles'
import { nameInput, phoneInput, scan } from '../../assets'
import { useForm } from 'react-hook-form';

const DashboardPartner = () => {

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
            className={`${errors?.number ? styles.badInputStyles : styles.inputStyles} relative`}
            placeholder="Номер телефона"
            onInput={handleInput}
            pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
            title="Используйте формат: +79046585851"
            {...register('number', {
                required: "Поле обязательно к заполнению",
                minLength: 12,
                maxLength: 12,
            }  
            )}
            />
            {active && <InputIcon prop={0} />}
            <div className="mt-1">
              {errors?.number && <p className="text-red-500 text-[12px]">
                {errors?.number?.message || "Длина номера 12 символов" || "Ошибка!"}
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
            className={`${errors?.firstName ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="ФИО"
            onInput={handleInput}
            {...register('firstName', {
                required: "Поле обязательно к заполнению",
                pattern: /^[А-Яа-я]+$/
            }  
            )}
            />
            {active && <InputIcon prop={1} />}
            <div className="mt-1">
            {errors?.firstName && <p className="text-red-500 text-[12px]">
                {errors?.firstName?.message || "Только буквы русского алфавита" || "Ошибка!"}
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
              className={`${errors?.numbernext ? styles.badInputStyles : styles.inputStyles} relative`}
              placeholder="Номер телефона"
              onInput={handleInput}
              pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
              title="Используйте формат: +79046585851"
              required
              />
              {active && <InputIcon prop={0} />}
              <div className="mt-1">
                {errors?.numbernext && <p className="text-red-500 text-[12px]">
                  {errors?.numbernext?.message || "Длина номера 12 цифр" || "Ошибка!"}
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
            className={`${errors?.receipt ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Номер чека"
            onInput={handleInput}
            {...register('receipt', {
                required: "Поле обязательно к заполнению",
                pattern: /^[А-Яа-я]+$/
            }  
            )}
            />
            {active && <InputIcon prop={1} />}
            <div className="mt-1">
            {errors?.receipt && <p className="text-red-500 text-[12px]">
                {errors?.receipt?.message || "Длина чека должна быть больше 0 цифр" || "Ошибка!"}
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
            type='cash'
            className={`${errors?.cash ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Сумма покупки"
            onInput={handleInput}
            {...register('cash', {
                required: "Поле обязательно к заполнению",
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }  
            )}
            />
            {active && <InputIcon prop={2} />}
            <div className="mt-1">
            {errors?.cash && <p className="text-red-500 text-[12px]">
                {errors?.cash?.message || "Неверный формат" || "Ошибка!"}
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
            type='cash'
            className={`${errors?.date ? styles.badInputStyles : styles.inputStyles}`}
            placeholder="Дата и время покупки"
            onInput={handleInput}
            {...register('date', {
                required: "Поле обязательно к заполнению",
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
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

  const onSubmit = async (data, event) => {
    event.preventDefault()
    axios({
        method: "post",
        url: "http://localhost:8000/api/v1/add_cheque/",
        data: data,
        headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
    });

    reset();
  }
    
  const Intro = () => {
    return (
      <div className='w-full h-[200px] flex md:justify-between justify-center items-center md:text-left text-center 
      bg-white rounded-[12px] md:pl-[40px] pl-0 relative'>
        <h2 className={`${styles.sectionHeadText}`}>Добрый день, <br /><span>Your name</span></h2>
        <div className='md:block hidden absolute w-[600px] right-0 h-full bg-rectangle'>
        </div>
      </div>
    )
  }

  const AddClient = () => {
    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Добавить клиента</h2>
        <div className='bg-white w-full md:h-[300px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px] h-full'>
          <div className='flex md:flex-row flex-col w-full h-full items-center py-[10px]'>
            <form action="" onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-[30px] h-full justify-center'>
              <InputCardPhone />
              <InputCardName />
              <input type="submit" value="Добавить клиента" className='bg-primary p-4 rounded-[8px] text-white font-medium md:w-1/2 w-full 
              mt-[10px] ease duration-300 hover:bg-hover cursor-pointer'/>
            </form>
          </div>
        </div>
      </section>
    )
  }

  const AddPurchase = () => {

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Добавить покупку</h2>
        <div className='bg-white w-full max-h-[900px] p-[30px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px]'>
          <form className='w-full flex flex-col md:gap-[30px] gap-[15px] h-full justify-center' onSubmit={handleSubmit(onSubmit)}>
              <InputCardPhoneNext />
              <InputCardReceipt />
              <InputCardCash />
              <InputCardDate />
              <button type='submit' className='bg-primary p-4 rounded-[8px] text-white font-medium md:w-1/2 w-full 
              mt-[10px] flex justify-center relative ease duration-300 hover:bg-hover'>
                <img src={scan} alt="" className='w-6 h-6'/>
                <p>Добавить чек</p>
              </button>
            </form>
        </div>
      </section>
    )
  }

  return (
    <section className='w-full h-full bgdashboard'>
      <div className='max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px] '>
        <Intro />
        <div className='flex md:flex-row flex-col md:gap-[30px] gap-0'>
            <AddClient />
            <AddPurchase />
          
        </div>
      </div>
    </section>
  )
}

export default DashboardPartner