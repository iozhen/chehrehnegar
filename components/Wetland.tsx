import {
  setIsDams,
  setIsFloodAlerts,
  setIsFloods,
  setIsWetlands,
} from "@/redux/slices/sidebarSlice";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Wetland = () => {
  const dispatch = useDispatch();
  const wetland = useSelector((state) => state.sidebar.isWetlands);
  const dams = useSelector((state) => state.sidebar.isDams);
  const floods = useSelector((state) => state.sidebar.isFloods);
  const floodAlert = useSelector((state) => state.sidebar.isFloodAlert);
  const router = useRouter();

  return (
    <div className="flex items-start flex-col gap-[2.34vh] w-full">
      <button
        disabled={
          router.pathname.includes("plans") ||
          router.pathname.includes("dashboard")
        }
        className="flex items-center gap-[17px] relative cursor-pointer"
        onClick={() => {
          // handleWetlandsToggle();
          // setWetlandActive(!wetlandActive);
          dispatch(setIsWetlands(!wetland));
        }}
      >
        <img
          src={wetland ? "/icons/wetlandactive.svg" : "/icons/wetland.svg"}
          alt="wetland"
        />
        <h3
          className={
            "text-[1.75vh] font-[500]  " +
            (wetland ? "text-[#2D60FF]" : "text-[#B1B1B1]")
          }
        >
          Wetland
        </h3>
        {wetland && (
          <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
        )}
      </button>
      <button
        disabled={
          router.pathname.includes("plans") ||
          router.pathname.includes("dashboard")
        }
        className="flex items-center gap-[17px] relative cursor-pointer"
        onClick={() => {
          // handleDamsToggle();
          // setDamsActive(!damsActive);
          dispatch(setIsDams(!dams));
        }}
      >
        <img
          src={dams ? "/icons/reservoirsactive.svg" : "/icons/reservoirs.svg"}
          alt="reservoirs"
        />
        <h3
          className={
            "text-[1.75vh] font-[500]  " +
            (dams ? "text-[#2D60FF]" : "text-[#B1B1B1]")
          }
        >
          Reservoirs
        </h3>
        {dams && (
          <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
        )}
      </button>
      <button
        disabled={
          router.pathname.includes("plans") ||
          router.pathname.includes("dashboard")
        }
        className="flex items-center gap-[17px] relative cursor-pointer"
        onClick={() => {
          // handleDamsToggle();
          // setDamsActive(!damsActive);
          dispatch(setIsFloods(!floods));
        }}
      >
        <img
          src={floods ? "/icons/reservoirsactive.svg" : "/icons/reservoirs.svg"}
          alt="reservoirs"
        />
        <h3
          className={
            "text-[1.75vh] font-[500]  " +
            (floods ? "text-[#2D60FF]" : "text-[#B1B1B1]")
          }
        >
          Flood Maps
        </h3>
        {floods && (
          <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
        )}
      </button>
      <button
        disabled={
          router.pathname.includes("plans") ||
          router.pathname.includes("dashboard")
        }
        className="flex items-center gap-[17px] relative cursor-pointer"
        onClick={() => {
          // handleDamsToggle();
          // setDamsActive(!damsActive);
          dispatch(setIsFloodAlerts(!floodAlert));
        }}
      >
        <img
          src={
            floodAlert ? "/icons/reservoirsactive.svg" : "/icons/reservoirs.svg"
          }
          alt="reservoirs"
        />
        <h3
          className={
            "text-[1.75vh] font-[500]  " +
            (floodAlert ? "text-[#2D60FF]" : "text-[#B1B1B1]")
          }
        >
          Flood Alerts
        </h3>
        {floodAlert && (
          <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
        )}
      </button>
    </div>
  );
};

export default Wetland;
