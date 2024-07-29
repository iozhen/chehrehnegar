import React, { useState } from "react";

interface Props {
   handleWetlandsToggle: () => void;
   handleDamsToggle: () => void;
}

const Wetland = ({ handleWetlandsToggle, handleDamsToggle }: Props) => {
   const [wetlandActive, setWetlandActive] = useState(false);
   const [damsActive, setDamsActive] = useState(false);

   return (
      <div className="flex items-start flex-col gap-[4.10vh] w-full">
         <div
            className="flex items-center gap-[17px] relative cursor-pointer"
            onClick={() => {
               handleWetlandsToggle();
               setWetlandActive(!wetlandActive);
            }}
         >
            <img
               src={
                  wetlandActive
                     ? "/icons/wetlandactive.svg"
                     : "/icons/wetland.svg"
               }
               alt="wetland"
            />
            <h3
               className={
                  "text-[18px] font-[500]  " +
                  (wetlandActive ? "text-[#2D60FF]" : "text-[#B1B1B1]")
               }
            >
               Wetland
            </h3>
            {wetlandActive && (
               <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
            )}
         </div>
         <div
            className="flex items-center gap-[17px] relative cursor-pointer"
            onClick={() => {
               handleDamsToggle();
               setDamsActive(!damsActive);
            }}
         >
            <img
               src={
                  damsActive
                     ? "/icons/reservoirsactive.svg"
                     : "/icons/reservoirs.svg"
               }
               alt="reservoirs"
            />
            <h3
               className={
                  "text-[18px] font-[500]  " +
                  (damsActive ? "text-[#2D60FF]" : "text-[#B1B1B1]")
               }
            >
               reservoirs
            </h3>
            {damsActive && (
               <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
            )}
         </div>
      </div>
   );
};

export default Wetland;
