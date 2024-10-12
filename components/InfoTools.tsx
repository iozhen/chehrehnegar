import React, { useState } from "react";

interface props {
  info: boolean;
  setInfo: (value: boolean) => void;
  chart: boolean;
  setChart: (value: boolean) => void;
}

const InfoTools = ({ info, setInfo, chart, setChart }: props) => {
  const [selectedItem, setSelectedItem] = useState("");
  return (
    <div className=" bg-[#f8f8f8] flex items-center rounded-[20px] p-1">
      <div
        className={
          "flex items-center gap-[10.7px] p-[15px] rounded-[20px] cursor-pointer " +
          (selectedItem == "chart" ? "bg-[#cbf3ff]" : "")
        }
        onClick={() => {
          if (selectedItem == "chart") {
            setSelectedItem("");
            setChart(false);
          } else {
            setChart(true);
            setSelectedItem("chart");
          }
        }}
      >
        <img src="/icons/chart.svg" alt="chart" />
        <span className="text-[15px]">draw chart</span>
      </div>
      {selectedItem == "" && (
        <div className="w-[1px] h-[30px] bg-black flex-shrink-0"></div>
      )}

      <div
        className={
          "flex items-center gap-[10.7px] p-[15px] rounded-[20px] cursor-pointer " +
          (selectedItem == "info" ? "bg-[#cbf3ff]" : "")
        }
        onClick={() => {
          if (selectedItem == "info") {
            setInfo(false);
            setSelectedItem("");
          } else {
            setInfo(true);
            setSelectedItem("info");
          }
        }}
      >
        <img src="/icons/info.svg" alt="info " />
        <span className="text-[15px]">get feature info</span>
      </div>
    </div>
  );
};

export default InfoTools;
