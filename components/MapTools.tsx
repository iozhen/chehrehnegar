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

const MapTools = ({ handleAreaButtonClick, handleRulerButtonClick }: props) => {
  const [selectedItem, setSelectedItem] = useState("");
  return (
    <div className=" bg-[#f8f8f8] flex items-center rounded-[20px] p-1">
      <div
        className={
          "flex items-center gap-[10.7px] p-[15px] rounded-[20px] cursor-pointer " +
          (selectedItem == "length" ? "bg-[#cbf3ff]" : "")
        }
        onClick={() => {
          handleRulerButtonClick();
          if (selectedItem === "length") {
            setSelectedItem("");
          } else {
            setSelectedItem("length");
          }
        }}
      >
        <img
          src="/icons/ruler.svg"
          alt="ruler"
          className="w-[24px] h-[24px] object-contain"
        />
        <span className="text-[15px]">measure length</span>
      </div>
      {selectedItem === "" && (
        <div className="w-[1px] h-[30px] bg-black flex-shrink-0"></div>
      )}
      <div
        className={
          "flex items-center gap-[10.7px] p-[15px] rounded-[20px] cursor-pointer " +
          (selectedItem === "area" ? "bg-[#cbf3ff]" : "")
        }
        onClick={() => {
          handleAreaButtonClick();
          if (selectedItem == "area") {
            setSelectedItem("");
          } else {
            setSelectedItem("area");
          }
        }}
      >
        <img
          src="/icons/area.svg"
          alt="area"
          className="w-[24px] h-[24px] object-contain"
        />
        <span className="text-[15px]">measure area</span>
      </div>
    </div>
  );
};

export default MapTools;
