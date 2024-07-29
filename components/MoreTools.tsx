import React from "react";

const MoreTools = () => {
   return (
      <div className="flex items-start flex-col gap-[4.10vh] w-full">
         <div className="flex items-center gap-[17px] relative ">
            <img src="/icons/wetland.svg" alt="wetland" />
            <h3 className="text-[18px] font-[500] text-[#B1B1B1]">
               go to website
            </h3>
         </div>
         <div className="flex items-center gap-[17px] relative ">
            <img src="/icons/reservoirs.svg" alt="reservoirs" />
            <h3 className="text-[18px] font-[500] text-[#B1B1B1]">
               Price plans
            </h3>
         </div>
      </div>
   );
};

export default MoreTools;
