import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faAreaChart } from "@fortawesome/free-solid-svg-icons";
import { faLineChart } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface props {
   setIsSubMenu: (value: boolean) => void;
   isSubMenu: boolean;
   setIsSubMenu2: (value: boolean) => void;
   isSubMenu2: boolean;
   handleRulerButtonClick: () => void;
   handleAreaButtonClick: () => void;
   areaFlag: boolean;
   isRulerActive: boolean;
}

const Sidebar = ({
   setIsSubMenu,
   isSubMenu,
   handleAreaButtonClick,
   handleRulerButtonClick,
   areaFlag,
   isRulerActive,
   setIsSubMenu2,
   isSubMenu2,
}: props) => {
   return (
      <div className="w-[3vw] bg-[#2a2b2e] flex flex-col h-[93vh] gap-[2vw] pt-[3vh]">
         <button
            onClick={() => {
               setIsSubMenu(!isSubMenu);
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
               setIsSubMenu2(!isSubMenu2);
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
         <button>
            <FontAwesomeIcon
               icon={faLineChart}
               aria-hidden="true"
               className="text-white"
            />
         </button>
         <button>
            <FontAwesomeIcon
               icon={faInfoCircle}
               aria-hidden="true"
               className="text-white"
            />
         </button>
      </div>
   );
};

export default Sidebar;
