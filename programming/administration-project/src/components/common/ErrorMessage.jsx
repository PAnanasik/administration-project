const ErrorMessage = ({ error }) => {
  return (
    <div className="fixed h-[60px] bg-red-500 border-solid border-[1px] border-red-600 bottom-[20px] left-0 right-0 mx-auto
    rounded-[4px] z-10 max-w-[450px] w-full text-white flex items-center justify-center font-medium">
      {error}
    </div>
  );
};

export default ErrorMessage;
