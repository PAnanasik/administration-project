import React, { useState, useEffect } from 'react'
import { styles } from '../../styles'
import { arrowExpand, arrowExpanded, avatar, mailInput, nameInput, phoneInput, surnameDashboard} from '../../assets'

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const DashboardPartner = ({ response }) => {
  const [name, setName] = useState('')
  console.log(response)
  

  const Intro = () => {
    return (
      <div className='relative w-full h-[200px] flex md:justify-between justify-center items-center md:text-left text-center 
      bg-white rounded-[12px] md:pl-[40px] pl-0'>
        <h2 className={`${styles.sectionHeadText}`}>Добрый день, <br /><span>{response.fio}</span></h2>
        <div className='md:block hidden absolute w-[600px] right-0 h-full bg-rectangle'>
        </div>
      </div>
    )
  }

  const ContactInfo = () => {
    return (
      <section className='relative mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Контактная информация</h2>
        <div className='bg-white w-full md:h-[200px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px] h-full'>
          <div className='flex md:flex-row flex-col w-full h-full items-center py-[10px]'>
            {/* <div className='mb-[20px]'>
              <img src={avatar} alt="" className='w-[100px] h-[100px] md:mr-[30px]'/>
            </div> */}
            <div className='px-[10px] py-[20px] w-full h-full flex flex-col justify-center gap-[10px]'>
              <div className='relative'>
                <input
                  type='text'
                  className={`${styles.dashboardInputStyles} relative`}
                  value={response.fio}
                  disabled
                  />
                <img src={nameInput} alt="name-icon" className='absolute left-[20px] top-[11px] w-6 h-6'/>
              </div>

              <div className='relative'>
                <input
                  type='text'
                  className={`${styles.dashboardInputStyles} relative`}
                  value={response.email}
                  disabled
                  />
                <img src={mailInput} alt="name-icon" className='absolute left-[20px] top-[11px] w-6 h-6'/>
              </div>

              <div className='relative'>
                <input
                  type='text'
                  className={`${styles.dashboardInputStyles} relative`}
                  value={response.phone}
                  disabled
                  />
                <img src={phoneInput} alt="name-icon" className='absolute left-[20px] top-[11px] w-6 h-6'/>
              </div>

            </div>
          </div>
        </div>
      </section>
    )
  }

  const HistoryInfo = () => {
    const HistoryItem = ({ name, price, receipt }) => {
      const [expanded, setExpanded] = useState(false)
      const HistoryItemDesc = () => {
        return (
          <div className='flex flex-col gap-[10px] my-[20px]'>
            <p>Цена: {price}</p>
            <p>Номер чека: {receipt}</p>
            <div className='flex items-center gap-[8px]'>
              <p>Подтверждено</p>
              <input type="checkbox" name="" id="" className='w-4 h-4 pointer-events-none' readOnly checked/>
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
        <div className='bg-white w-full min-h-[200px] mt-[15px] rounded-[12px] md:px-[30px] px-[10px]'>
          <div className='flex flex-col w-full h-full py-[19px] [&>*:nth-child(odd)]:bg-input'>
            <HistoryItem name={'3113311313'} price={'31111'} receipt={'3333'} />
            <HistoryItem name={'3113311313'} price={'31111'} receipt={'3333'} />
            <HistoryItem name={'3113311313'} price={'31111'} receipt={'3333'} />
            <HistoryItem name={'3113311313'} price={'31111'} receipt={'3333'} />
            <HistoryItem name={'3113311313'} price={'31111'} receipt={'3333'} />
            <HistoryItem name={'3113311313'} price={'31111'} receipt={'3333'} />
            <HistoryItem name={'3113311313'} price={'31111'} receipt={'3333'} />
          </div>
        </div>
      </section>
    )
  }

  const PartnersSlider = () => {
    const [matches, setMatches] = useState(
      window.matchMedia("(min-width: 768px)").matches
    )
  
    useEffect(() => {
      window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', event => setMatches(event.matches));
    }, []);

    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Партнеры</h2>
        <div className='bg-white md:px-[30px] px-[10px] h-[200px] rounded-[12px] mt-[15px]'>
          <Swiper
            // install Swiper modules
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={matches ? 3 : 2}
            navigation
            className='w-full h-full flex items-center justify-center'
          >
            <SwiperSlide className='h-full flex items-center justify-center'>
              <div className='flex flex-col items-center gap-[5px]'>
                <img src={avatar} alt="" />
                <p>Васька</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className='h-full flex items-center justify-center'>
              <div className='flex flex-col items-center gap-[5px]'>
                <img src={avatar} alt="" />
                <p>Васька</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className='h-full flex items-center justify-center'>
              <div className='flex flex-col items-center gap-[5px]'>
                <img src={avatar} alt="" />
                <p>Васька</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className='h-full flex items-center justify-center'>
              <div className='flex flex-col items-center gap-[5px]'>
                <img src={avatar} alt="" />
                <p>Васька</p>
              </div>
            </SwiperSlide>
          </Swiper>

        </div>
      </section>
    )
  }

  const PartnersItem = () => {
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
            <p className='font-medium'>Номер:  <span>+79046537705</span></p>
          </div>
        )
      }

    return (
        <div className=''>
            <div className='w-full h-[80px] flex flex-row justify-between items-center 
            font-medium relative border-solid border-t-[1px] border-[#D2D2D2] px-[30px]'>
                <div className='flex gap-[10px] items-center'>
                    <div className='w-[40px] h-[40px] rounded-full bg-primary'></div>
                    <h2>Томас Мразь</h2>
                </div>
                {matches ? <p>+79046537705</p> : 
                <button onClick={() => setExpanded(!expanded)}>
                    <img src={expanded ? arrowExpanded : arrowExpand} className='w-4 h-4'></img>
                </button>
                }
            </div>


            {expanded && <ItemDesc/>}
        </div>
    )
  }

  const PartnersList = () => {
    return (
      <section className='mt-[15px] flex-1'>
        <h2 className={`${styles.dashboardItemSubtitle}`}>Список партнеров</h2>
        <div className='bg-white w-full min-h-[460px] mt-[15px] rounded-[12px] h-full 
        border-solid border-[1px] border-[#D2D2D2]'>
            <div className='bg-input w-full h-[60px] rounded-t-[12px] flex justify-between items-center px-[30px] font-medium'>
                <h2>Клиент</h2>
                <h2>Номер</h2>
            </div>
            <div className='[&>*:nth-child(10)]:border-b-transparent'>
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
                <PartnersItem />
            </div>
        </div>
      </section>
    )
  }


  return (
    <section className='w-full h-full bgdashboard'>
      <div className='max-w-[1640px] mx-auto md:px-[30px] px-[15px] relative h-full z-0 p-[40px]'>
        <Intro />
        <div className='flex md:flex-row flex-col md:gap-[30px] gap-0'>
          <div className='flex md:w-1/2 w-full flex-col h-full'>
            <ContactInfo />
            <PartnersSlider />
          </div>
          <HistoryInfo />
        </div>
        <PartnersList />
      </div>
    </section>
  )
}

export default DashboardPartner