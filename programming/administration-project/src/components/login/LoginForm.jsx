import React, { useState } from 'react'
import { styles } from '../../styles'
import { useForm } from 'react-hook-form';
import { mailInput, nameInput, passwordInput, phoneInput } from '../../assets';

const LoginForm = () => {
    const [partner, setPartner] = useState(true)

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

    const InputIcon = ({ prop }) => {
        const array = [phoneInput, nameInput, mailInput, passwordInput]
        return (
            <img src={array[prop]} alt="phone" className='absolute right-[20px] top-[11px] w-6 h-6'/>
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
            <div className="relative h-12 w-full">
                <input
                type='tel'
                className={`${errors?.number ? styles.badInputStyles : styles.inputStyles} relative`}
                placeholder="Номер телефона"
                onInput={handleInput}
                {...register('number', {
                    required: "Поле обязательно к заполнению",
                    minLength: 11,
                    maxLength: 11,
                    pattern: /^[0-9]+$/
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

    const InputCardPassword = () => {
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
            <div className="relative h-12 w-full">
                <input
                type='password'
                className={`${errors?.password ? styles.badInputStyles : styles.inputStyles}`}
                placeholder="Пароль"
                onInput={handleInput}
                {...register('password', {
                    required: "Поле обязательно к заполнению",
                    minLength: 8
                }  
                )}
                />
                {active && <InputIcon prop={3} />}
                <div className="mt-1">
                {errors?.password && <p className="text-red-500 text-[12px]">
                    {errors?.password?.message || "Минимальная длина пароля 8" || "Ошибка!"}
                    </p>}
                </div>
            </div>
        )
    }


    return (
        <section className='bg-white w-full h-[100vh] flex justify-center items-center px-[20px]'>
            <div className='lg:min-w-[600px] min-w-[200px]'>
                <h1 className={`${styles.sectionHeadText} text-center`}>Войти в аккаунт</h1>
                <h1 className={`${styles.sectionSubText} text-center`}>Мы вновь вас приветствуем!</h1>
                <div className='flex w-full justify-center my-[30px]'>
                    <button className={`${partner ? 'bg-primary text-white' : 'bg-input text-black'} p-2 
                    rounded-l-[8px] max-w-[150px] w-full`}
                    onClick={() => setPartner(!partner)}>Клиент</button>
                    <button className={`${partner ? 'bg-input text-black' : 'bg-primary text-white'} p-2 
                    rounded-r-[8px] max-w-[150px] w-full`}
                    onClick={() => setPartner(!partner)}>Партнер</button>
                </div>
                <form className='flex flex-col gap-[35px]'
                onSubmit={handleSubmit(onSubmit)}>
                    <InputCardPhone />
                    <InputCardPassword />
                    <input type="submit" value="Войти" className='bg-primary p-4 rounded-[8px] text-white font-medium'/>
                    <div className='flex mb-1 justify-center text-center'>
                        <p>Еще нет аккаунта? <a href="#" className='text-primary underline underline-offset-4'>Зарегистрируйтесь</a></p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default LoginForm