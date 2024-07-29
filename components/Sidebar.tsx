import React, { useState } from "react";
import data from "@/data/map/submenuItems.json";
import Wetland from "./Wetland";
import TextAndBorder from "./TextAndBorder";
import MoreTools from "./MoreTools";

interface Props {
   setIsSubMenu: (value: number) => void;
   isSubMenu: number;
   setMapType: (value: string) => void;
   handleWetlandsToggle: () => void;
   handleDamsToggle: () => void;
}

const Sidebar = ({
   setIsSubMenu,
   isSubMenu,
   setMapType,
   handleWetlandsToggle,
   handleDamsToggle,
}: Props) => {
   const [activeLayer, setActiveLayer] = useState<string>("");

   const handleLayerClick = (layerTitle: string) => {
      setMapType(layerTitle);
      setActiveLayer(layerTitle);
   };

   return (
      <div className="w-[17.6%] bg-white pl-[34px] relative">
         <div className="flex items-center gap-[14px] h-[9.7vh] mb-[3.5vh]">
            <img
               src="/images/newsharif.png"
               alt="logo"
               className="w-[50px] h-[50px] "
            />
            <h2 className="jost-black text-[25px] text-[#343C6A]">Bina</h2>
         </div>
         <Wetland
            handleWetlandsToggle={handleWetlandsToggle}
            handleDamsToggle={handleDamsToggle}
         />
         <TextAndBorder text="layers" className="mb-[2.448vh]" />
         <div
            className={
               " flex items-center flex-col pr-[30px] gap-[0.97vh] cursor-pointer w-full"
            }
         >
            {data.items.map((item) => (
               <div
                  key={item.title}
                  className={`w-full rounded-[20px] flex items-center justify-center h-[5.46vh] relative bg-center bg-contain px-[10px]  ${
                     activeLayer === item.title
                        ? "border-[#4379EE] border-[5px] "
                        : ""
                  }`}
                  style={{
                     backgroundImage: `url(${item.img})`,
                  }}
                  onClick={() => handleLayerClick(item.title)}
               >
                  {activeLayer != item.title && (
                     <div className="w-full h-full absolute top-0 left-0 bg-[#00000050] rounded-[20px]"></div>
                  )}
                  <h3 className="font-[500] text-[15px] z-20 flex-shrink-0 text-white">
                     {item.title}
                  </h3>
               </div>
            ))}
         </div>
         <TextAndBorder text="more" className="mb-[2.148vh]" />
         <MoreTools />
         <button className="bg-[#E96363] flex items-center justify-center w-full py-[1.36vh] text-[18px] font-[500] text-white mt-[2.148vh] absolute left-0 bottom-0">
            Log Out
         </button>
      </div>
   );
};

export default Sidebar;
