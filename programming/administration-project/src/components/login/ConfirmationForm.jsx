import { styles } from '../../styles'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ResponseContext } from '../../App';
import { useContext, useState } from 'react';
import { mailInput, nameInput, passwordInput, phoneInput } from '../../assets';

const ConfirmationForm = () => {

    const { responseAuth, setResponseAuth } = useContext(ResponseContext);
    const [redirection, setRedirection] = useState(false)
    const navigate = useNavigate()

    const InputIcon = ({ prop }) => {
        const array = [phoneInput, nameInput, mailInput, passwordInput]
        return (
            <img src={array[prop]} alt="phone" className='absolute right-[20px] top-[18px] w-6 h-6'/>
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
        if (partner) {
            requestFunction(data, partnerUrl)
        } else {
            requestFunction(data, clientUrl)
        }
        
        reset();
    }

    if (redirection && !responseAuth.partner) {
        // setResponseAuth({ loggedIn: true });
        console.log(responseAuth.loggedIn)
        // console.log(partner)
        // setUser({ token: `${token}` });
        navigate('/dashboardclient')
        console.log('1111')
    } else if (redirection && responseAuth.partner) {
        // setResponseAuth({ loggedIn: true });
        console.log(responseAuth.loggedIn)
        // console.log(partner)
        // setUser({ token: `${token}` });
        navigate('/dashboardpartner')
        console.log('1111')
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
                placeholder="Код подтверждения"
                onInput={handleInput}
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


    
  return (
    <section className='bg-white w-full lg:h-full h-[100vh] flex justify-center items-center px-[20px]'>
            <div className='lg:min-w-[600px] min-w-[200px]'>
                <h1 className={`${styles.sectionHeadText} text-center`}>Подтверждение</h1>
                <h1 className={`${styles.sectionSubText} text-center`}>Введите код из смс</h1>
                <form className='flex flex-col gap-[40px] mt-[30px]'
                onSubmit={handleSubmit(onSubmit)}>
                    <InputCardPhone />
                    <input type="submit" value="Ввести" className='bg-primary p-4 rounded-[8px] text-white font-medium
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

export default ConfirmationForm