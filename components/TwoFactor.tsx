import React from "react";

const TwoFactor = () => {
   return (
      <div className="mt-[3.61vh]">
         <div className="flex items-center gap-[16px]">
            <img src="/images/key.svg" alt="key" />
            <h3 className="text-[2.34vh] font-[500] text-[#4c4e64d8]">
               Two-factor authentication
            </h3>
         </div>
         <div className="flex items-center justify-center flex-col">
            <button className="flex items-center gap-[10px] bg-gray-100 p-[12px]">
               <img src="/images/open.svg" alt="open" />
               <p className="text-[1.36vh] font-[500]">ENABLE IT</p>
            </button>
            <h3 className="text-[1.95vh] font-[500] text-[#4c4e64e9] my-[1.56vh]">
               Two factor authentication is not enabled yet.
            </h3>
            <p className="text-[1.36vh] font-[400] text-[#4c4e64a6]">
               Two-factor authentication adds an additional layer of security to
               your account by requiring more than just a password to log in.
               Learn more.
            </p>
         </div>
      </div>
   );
};

export default TwoFactor;
