import React from 'react'
import { avatar } from '../../assets'
import { useContext } from 'react';
import { ResponseContext } from '../../App';

const Navbar = ({ responseLogin }) => {
  const { user, setUser } = useContext(ResponseContext);
  return (
    <div className='h-[80px] bg-white'>
        <nav className='md:px-[30px] px-[15px] h-full max-w-[1640px] mx-auto'>
            <div className='h-full flex md:flex-row flex-col md:justify-between justify-center items-center'>
                <h2 className='md:text-[16px] text-[14px]'>Личный кабинет клиента</h2>
                <div className='flex items-center gap-[20px]'>
                    <p className='md:text-[16px] text-[14px] font-medium'>{`${responseLogin.bonus || '0'} бонусов`}</p>
                    <img src={avatar} alt="dfaafdfad" className='w-14 h-14 md:block hidden'/>
                    <a href="" className='md:text-[16px] text-[14px] font-normal' onClick={() => setUser({ loggedIn: false })}>Выйти</a>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar