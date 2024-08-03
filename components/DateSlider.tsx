import React, { useState } from "react";

const DateSlider = () => {
   const [selectedDate, setSelectedDate] = useState("2014-09-14");
   const [selectedIndex, setSelectedIndex] = useState(0);

   const dates = [
      "2014-09-14",
      "2015-09-14",
      "2016-09-14",
      "2017-09-14",
      "2018-09-14",
      "2019-09-14",
      "2020-09-14",
      "2021-09-14",
      "2022-09-14",
      "2023-09-14",
      "2024-09-14",
      "2024-09-23",
      "2024-10-14",
      "2024-11-14",
   ];

   const handleSliderChange = (index) => {
      setSelectedDate(dates[index]);
      setSelectedIndex(index);
   };

   return (
      <div className="p-4 absolute w-[76.80vw] h-[5.58vh] bottom-[14%] right-[4%] py-[30px] bg-[#F8F8F8] rounded-[20px] px-[22px]">
         <div className="relative h-[6px] bg-[#EDEEF1] flex items-center justify-between">
            {dates.map((item, index) => (
               <div
                  key={item}
                  className="relative w-[5px] h-[5px] bg-blue-500 rounded-full cursor-pointer"
                  onClick={() => handleSliderChange(index)}
               >
                  {selectedIndex === index && (
                     <div>
                        <div className="absolute bg-[#1070C8] rounded-full -top-[0.8vh] left-[50%] transform -translate-x-[50%] w-[2.34vh] h-[2.34vh] border-[2px] border-white"></div>
                        <div className="absolute -top-[10vh] left-[-800%] transform w-[232px] text-[1.56vh] font-[400] py-[2vh] bg-white rounded-lg text-center shadow-lg">
                           Selected Date: {selectedDate}
                           <div className="absolute bottom-[-20px] left-[10%] transform w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-white"></div>
                        </div>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};

export default DateSlider;
