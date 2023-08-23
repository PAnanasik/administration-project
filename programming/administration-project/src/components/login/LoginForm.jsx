import { useState, useEffect } from 'react'
import { styles } from '../../styles'
import { useForm } from 'react-hook-form';
import { mailInput, nameInput, passwordInput, phoneInput } from '../../assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ResponseContext, UserContext } from '../../App';
import { useContext } from 'react';

const LoginForm = () => {
    const url = 'http://127.0.0.1:8000'
    const clientUrl = `http://localhost:8000/api/v1/client/`
    const partnerUrl = `http://localhost:8000/api/v1/partners/`

    const [partner, setPartner] = useState(false)


    const { user, setUser } = useContext(UserContext);
    const { responseAuth, setResponseAuth } = useContext(ResponseContext);
    const [redirection, setRedirection] = useState(false)
    const navigate = useNavigate()


    // function handleButtonChange() {
    //     setPartner(!partner)
    //     console.log(partner)
    // }

    // setUser({ client: partner })

    function requestFunction(data, pcUrl) {
        axios({
            method: "post",
            url: `${url}/auth/token/login/`,
            data: data,
            headers: { "Content-Type": "application/json" },
            withCredentials: true
            })
            .then(function (response) {
                //handle success
                const token = response.data.auth_token;
                axios({
                method: "GET",
                url: `${pcUrl}`,
                headers: { "Authorization": `token ${token}` },
                withCredentials: true
                })
                .then(function (response) {
                    //handle success
                    setResponseAuth(response.data[0])
                    setRedirection(true);
                    setUser({ loggedIn: true });
                    console.log(response.data[0])
                    console.log(pcUrl)
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
                // setRedirection(true);
              
                // setUser({ loggedIn: true });
            })
            
            .catch(function (response) {
                //handle error
                console.log(response);
        });
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
        if (partner) {
            requestFunction(data, partnerUrl)
        } else {
            requestFunction(data, clientUrl)
        }
        
        reset();
    }

    useEffect(() => {
        if (redirection && user.client) {
            navigate('/dashboardclient')
        }
        else if (redirection && !user.client) {
            navigate('/dashboardpartner')
        }
    }, [redirection])


    const InputIcon = ({ prop }) => {
        const array = [phoneInput, nameInput, mailInput, passwordInput]
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
            <div className="relative h-12 w-full">
                <input
                type='text'
                className={`${errors?.number ? styles.badInputStyles : styles.inputStyles} relative`}
                placeholder="Номер телефона"
                onInput={handleInput}
                pattern="[+][7]\d{3}\d{3}\d{2}\d{2}"
                title="Используйте формат: +79046585851"
                {...register('phone', {
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
        <section className='bg-white w-full lg:h-full h-[100vh] flex justify-center items-center px-[20px]'>
            <div className='lg:min-w-[600px] min-w-[200px]'>
                <h1 className={`${styles.sectionHeadText} text-center`}>Войти в аккаунт</h1>
                <div className='flex w-full justify-center my-[30px]'>
                    <button className={`${partner ? 'bg-input text-black' : 'bg-primary text-white'} p-2 
                    rounded-l-[8px] max-w-[150px] w-full`}
                    onClick={() => setPartner(!partner)}>Клиент</button>
                    <button className={`${partner ? 'bg-primary text-white' : 'bg-input text-black'} p-2 
                    rounded-r-[8px] max-w-[150px] w-full`}
                    onClick={() => setPartner(!partner)}>Партнер</button>
                </div>
                <h1 className={`${styles.sectionSubText} text-center`}>Мы вновь вас приветствуем!</h1>
                <form className='flex flex-col gap-[40px] mt-[30px]'
                onSubmit={handleSubmit(onSubmit)}>
                    <InputCardPhone />
                    <InputCardPassword />
                    <input type="submit" value="Войти" className='bg-primary p-4 rounded-[8px] text-white font-medium
                    ease duration-300 hover:bg-hover cursor-pointer mt-[15px]' 
                    onClick={() => {
                    }}/>
                    <div className='flex mb-1 justify-center text-center'>
                        <p>Еще нет аккаунта? <a href="/" className='text-primary underline underline-offset-4'>Зарегистрируйтесь</a></p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default LoginForm