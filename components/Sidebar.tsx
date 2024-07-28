import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faAreaChart } from "@fortawesome/free-solid-svg-icons";
import { faLineChart } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface props {
   setIsSubMenu: (value: number) => void;
   isSubMenu: number;
   handleRulerButtonClick: () => void;
   handleAreaButtonClick: () => void;
   areaFlag: boolean;
   isRulerActive: boolean;
   info: boolean;
   setInfo: (value: boolean) => void;
   chart: boolean;
   setChart: (value: boolean) => void;
}

const Sidebar = ({
   setIsSubMenu,
   isSubMenu,
   handleAreaButtonClick,
   handleRulerButtonClick,
   areaFlag,
   isRulerActive,
   info,
   setInfo,
   chart,
   setChart,
}: props) => {
   return (
      <div className="w-[3vw] bg-[#2a2b2e] flex flex-col h-[93vh] gap-[2vw] pt-[3vh]">
         <button
            onClick={() => {
               if (isSubMenu == 1) {
                  setIsSubMenu(0);
               } else {
                  setIsSubMenu(1);
               }
            }}
         >
            <FontAwesomeIcon
               icon={faMap}
               aria-hidden="true"
               className="text-white"
            />
         </button>

         <button
            onClick={() => {
               if (isSubMenu == 2) {
                  setIsSubMenu(0);
               } else {
                  setIsSubMenu(2);
               }
            }}
         >
            <FontAwesomeIcon
               icon={faLayerGroup}
               aria-hidden="true"
               className="text-white"
            />
         </button>
         <button onClick={handleRulerButtonClick}>
            <FontAwesomeIcon
               icon={faRulerHorizontal}
               aria-hidden="true"
               className={isRulerActive ? "text-blue-400" : "text-white"}
            />
         </button>
         <button onClick={handleAreaButtonClick}>
            <FontAwesomeIcon
               icon={faAreaChart}
               aria-hidden="true"
               className={areaFlag ? "text-blue-400" : "text-white"}
            />
         </button>
         <button
            onClick={() => {
               setChart(!chart);
            }}
         >
            <FontAwesomeIcon
               icon={faLineChart}
               aria-hidden="true"
               className={chart ? "text-blue-400" : "text-white"}
            />
         </button>
         <button
            onClick={() => {
               setInfo(!info);
            }}
         >
            <FontAwesomeIcon
               icon={faInfoCircle}
               aria-hidden="true"
               className={info ? "text-blue-400" : "text-white"}
            />
         </button>
      </div>
   );
};

export default Sidebar;
