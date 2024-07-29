import React from "react";

const MapHeader = () => {
   return (
      <div className="h-[9.76vh] bg-white pr-[55px] pl-[40px] flex items-center justify-between w-full">
         <h2 className="font-[500] text-[28px]">Map</h2>
         <div className="flex items-center gap-[30px] relative">
            <input
               type="text"
               className="rounded-[40px] bg-[#F5F7FA] text-[#8BA3CB] pr-[43px] pl-[60px] py-[1.56vh]"
               placeholder="search"
            />
            <img
               src="/icons/search.svg"
               alt="search"
               className="absolute left-[5%] top-[30%]"
            />
            <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F7FA] rounded-full">
               <img src="/icons/notification.svg" alt="notification" />
            </div>
            <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F7FA] rounded-full">
               <img src="/icons/user.svg" alt="user" />
            </div>
         </div>
      </div>
   );
};

export default MapHeader;
