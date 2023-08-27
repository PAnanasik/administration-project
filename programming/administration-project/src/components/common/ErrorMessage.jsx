const ErrorMessage = ({ error }) => {
    console.log(error)
    return (
        <div className='absolute top-[40px] right-0 left-0 mx-auto max-w-[500px] w-full text-center h-[70px] p-4 text-white rounded-[8px]
        flex justify-center items-center font-medium bg-red-500 z-0'>
            {error.message}
        </div>
    )
}

export default ErrorMessage