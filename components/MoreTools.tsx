import React from "react";

interface props {
   isPlans: boolean;
   setIsPlans: (value: boolean) => void;
}

const MoreTools = ({ isPlans, setIsPlans }: props) => {
   return (
      <div className="flex items-start flex-col gap-[4.10vh] w-full">
         <div className="flex items-center gap-[17px] relative ">
            <img src="/icons/reservoirs.svg" alt="reservoirs" />
            <h3 className="text-[18px] font-[500] text-[#B1B1B1]">
               go to website
            </h3>
         </div>
         <div
            className="flex items-center gap-[17px] relative cursor-pointer"
            onClick={() => {
               setIsPlans(!isPlans);
            }}
         >
            <img
               src={isPlans ? "/icons/plansactive.svg" : "/icons/plans.svg"}
               alt="Price plans"
            />
            <h3
               className={
                  "text-[18px] font-[500]  " +
                  (isPlans ? "text-[#2D60FF]" : "text-[#B1B1B1]")
               }
            >
               Price plans
            </h3>
            {isPlans && (
               <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
            )}
         </div>
      </div>
   );
};

export default MoreTools;
