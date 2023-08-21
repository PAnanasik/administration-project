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
            pattern="[\+][7]\d{3}\d{3}\d{2}\d{2}"
            title="Используйте формат: +79046585851"
            {...register('number', {
                required: "Поле обязательно к заполнению",
                minLength: 11,
                maxLength: 11,
            }  
            )}
            />
            {active && <InputIcon prop={0} />}
            <div className="mt-1">
              {errors?.number && <p className="text-red-500 text-[12px]">
                {errors?.number?.message || "Длина номера 11 цифр" || "Ошибка!"}
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
            type='tel'
            className={`${errors?.numbernext ? styles.badInputStyles : styles.inputStyles} relative`}
            placeholder="Номер телефона"
            onInput={handleInput}
            pattern="[7]\d{3}\d{3}\d{2}\d{2}"
            title="Используйте формат: 79046585851"
            required
            />
            {active && <InputIcon prop={0} />}
            <div className="mt-1">
              {errors?.numbernext && <p className="text-red-500 text-[12px]">
                {errors?.numbernext?.message || "Длина номера 11 цифр" || "Ошибка!"}
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

  const onSubmit = (data) => {
      alert(JSON.stringify(data));
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
    const [matches, setMatches] = useState(
      window.matchMedia("(min-width: 768px)").matches
    )
  
    useEffect(() => {
      window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', event => setMatches(event.matches));

      matches ? 
      document.querySelector('#scan-input').disabled = true :
      document.querySelector('#scan-input').disabled = false
    }, []);

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Добавить покупку</h2>
        <div className='bg-white w-full h-[300px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px]'>
          <form className='w-full flex flex-col md:gap-[30px] gap-[15px] h-full justify-center'>
              <InputCardPhoneNext />
              <p className='text-[16px] text-[#9B9B9B]'>
                Чтобы сканировать чек вам нужно воспользоваться камерой телефона. 
                Зайдите на сайт с мобильного устройства.
              </p>
              <button type='submit' className='bg-primary p-4 rounded-[8px] text-white font-medium md:w-1/2 w-full 
              mt-[10px] flex justify-center relative ease duration-300 hover:bg-hover'>
                <img src={scan} alt="" className='w-6 h-6'/>
                <p>Сканировать чек</p>
                <input type="file" accept="image/*;capture=camera" className='opacity-0 absolute w-full h-full top-0' id="scan-input"/>
              </button>
            </form>
        </div>
      </section>
    )
  }

  return (
    <section className='max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px]'>
      <Intro />
      <div className='flex md:flex-row flex-col md:gap-[30px] gap-0'>
          <AddClient />
          <AddPurchase />
        
      </div>
    </section>
  )
}

export default DashboardPartner