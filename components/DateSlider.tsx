import React, { useState } from "react";

const DateSlider = () => {
   const [selectedDate, setSelectedDate] = useState("2014-09-14");
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
   ];

   const handleSliderChange = (event) => {
      const index = event.target.value;
      setSelectedDate(dates[index]);
   };

   return (
      <div className="p-4 absolute w-[76.80vw] h-[5.58vh] bottom-[3.5vh] right-[3%] py-[30px] bg-white rounded-[10px] ">
         <div className="relative flex items-center justify-center">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-white p-2 rounded shadow">
               selected date : {selectedDate}
            </div>
            <input
               type="range"
               min="0"
               max={dates.length - 1}
               value={dates.indexOf(selectedDate)}
               onChange={handleSliderChange}
               className="w-full"
            />
         </div>
         <div className="flex justify-between text-xs mt-2">
            {/* {dates.map((date, index) => (
               <span key={index}>{date}</span>
            ))} */}
         </div>
      </div>
   );
};

export default DateSlider;
