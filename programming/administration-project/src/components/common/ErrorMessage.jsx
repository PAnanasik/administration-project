const ErrorMessage = ({ error }) => {
    console.log(error)
    return (
        <div className='absolute bottom-[120px] right-0 left-0 mx-auto max-w-[500px] w-full text-center h-[70px] p-4 text-white rounded-[8px]
        flex justify-center items-center font-medium bg-red-500 z-20'>
            {error}
        </div>
    )
}

export default ErrorMessage