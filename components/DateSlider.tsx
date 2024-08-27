import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "@/redux/slices/dateSlice";

const DateSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.date.selectedDate);
  //   const [dates, setDates] = useState([]);
  //   const { isFloodAlert, isFloods } = useSelector((state) => state.sidebar);

  //   useEffect(() => {
  //     console.log("get url");
  //     const url = isFloodAlert
  //       ? "http://bina.civil.sharif.edu/geoserver/rest/workspaces/floodalert/datastores/floodalert/featuretypes"
  //       : isFloods
  //       ? "http://bina.civil.sharif.edu/geoserver/rest/workspaces/floodmap/datastores/floodmap/featuretypes"
  //       : undefined;

  //     console.log(url);

  //     if (url) {
  //       const username = "your_username";
  //       const password = "your_password";
  //       const encodedCredentials = Buffer.from(
  //         `<span class="math-inline">${username}:</span>${password}`
  //       ).toString("base64");

  //       const config = {
  //         headers: {
  //           Authorization: `Basic ${encodedCredentials}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       };

  //       axios
  //         .get(url, config)
  //         .then((response) => {
  //           console.log("response", response.data);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   }, [isFloodAlert, isFloods]);

  const datesList = ["1403-07-01", "1403-08-01", "1403-09-01"];

  const handleSliderChange = (index: number) => {
    setSelectedIndex(index);
    dispatch(setSelectedDate(datesList[index]));
  };

  console.log("Selected date", selectedDate);

  return (
    <div className="p-4 absolute w-[76.80vw] h-[5.58vh] bottom-[14%] right-[4%] py-[30px] bg-[#F8F8F8] rounded-[20px] px-[22px]">
      <div className="relative h-[6px] bg-[#EDEEF1] flex items-center justify-between">
        {datesList.map((item, index) => (
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
