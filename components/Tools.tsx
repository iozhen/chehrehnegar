import React, { useState } from "react";

interface props {
   handleRulerButtonClick: () => void;
   handleAreaButtonClick: () => void;
   areaFlag: boolean;
   isRulerActive: boolean;
   info: boolean;
   setInfo: (value: boolean) => void;
   chart: boolean;
   setChart: (value: boolean) => void;
}

const Tools = ({
   handleAreaButtonClick,
   handleRulerButtonClick,
   areaFlag,
   isRulerActive,
   info,
   setInfo,
   chart,
   setChart,
}: props) => {
   const [selectedItem, setSelectedItem] = useState(0);
   return (
      <div className=" bg-[#f8f8f8] flex items-center absolute left-[2%] top-[2%] z-30 rounded-[20px]">
         <div
            className={
               "flex items-center gap-[10.7px] p-[15px] rounded-[20px] " +
               (selectedItem == 1 ? "bg-white" : "")
            }
            onClick={() => {
               handleRulerButtonClick();
               if (selectedItem == 1) {
                  setSelectedItem(0);
               } else {
                  setSelectedItem(1);
               }
            }}
         >
            <img src="/icons/ruler.svg" alt="ruler" />
            <span className="text-[15px]">measure length</span>
         </div>
         {selectedItem != 1 && selectedItem != 2 && (
            <div className="w-[1px] h-[30px] bg-black"></div>
         )}
         <div
            className={
               "flex items-center gap-[10.7px] p-[15px] rounded-[20px] " +
               (selectedItem == 2 ? "bg-white" : "")
            }
            onClick={() => {
               handleAreaButtonClick();
               if (selectedItem == 2) {
                  setSelectedItem(0);
               } else {
                  setSelectedItem(2);
               }
            }}
         >
            <img src="/icons/area.svg" alt="area" />
            <span className="text-[15px]">measure area</span>
         </div>
         {selectedItem != 3 && selectedItem != 2 && (
            <div className="w-[1px] h-[30px] bg-black"></div>
         )}
         <div
            className={
               "flex items-center gap-[10.7px] p-[15px] rounded-[20px] " +
               (selectedItem == 3 ? "bg-white" : "")
            }
            onClick={() => {
               if (selectedItem == 3) {
                  setSelectedItem(0);
                  setChart(false);
               } else {
                  setChart(true);
                  setSelectedItem(3);
               }
            }}
         >
            <img src="/icons/chart.svg" alt="chart" />
            <span className="text-[15px]">draw chart</span>
         </div>
         {selectedItem != 4 && selectedItem != 3 && (
            <div className="w-[1px] h-[30px] bg-black"></div>
         )}

         <div
            className={
               "flex items-center gap-[10.7px] p-[15px] rounded-[20px] " +
               (selectedItem == 4 ? "bg-white" : "")
            }
            onClick={() => {
               if (selectedItem == 4) {
                  setInfo(false);
                  setSelectedItem(0);
               } else {
                  setInfo(true);
                  setSelectedItem(4);
               }
            }}
         >
            <img src="/icons/info.svg" alt="info " />
            <span className="text-[15px]">get feature info</span>
         </div>
      </div>
   );
};

export default Tools;
