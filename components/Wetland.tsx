import React from "react";

const Wetland = () => {
   return (
      <div className="flex items-start flex-col gap-[4.10vh] w-full">
         <div className="flex items-center gap-[17px] relative ">
            <img src="/icons/wetland.svg" alt="wetland" />
            <h3 className="text-[18px] font-[500] text-[#B1B1B1]">Wetland</h3>
            <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
         </div>
         <div className="flex items-center gap-[17px] relative ">
            <img src="/icons/reservoirs.svg" alt="reservoirs" />
            <h3 className="text-[18px] font-[500] text-[#B1B1B1]">
               reservoirs
            </h3>
            <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
         </div>
      </div>
   );
};

export default Wetland;
