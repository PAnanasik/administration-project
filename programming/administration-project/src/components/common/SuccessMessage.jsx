import React from "react";

const SuccessMessage = ({ success }) => {
  return (
    <div
      className="fixed h-[60px] bg-primary border-solid border-[1px] border-hover bottom-[20px] left-0 right-0 mx-auto
        rounded-[4px] z-10 max-w-[450px] w-full text-white flex items-center justify-center font-medium"
    >
      {success}
    </div>
  );
};

export default SuccessMessage;
