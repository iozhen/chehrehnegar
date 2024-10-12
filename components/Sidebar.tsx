import React, { useState } from "react";
import data from "@/data/map/submenuItems.json";
import Wetland from "./Wetland";
import TextAndBorder from "./TextAndBorder";
import MoreTools from "./MoreTools";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMapType } from "@/redux/slices/sidebarSlice";
import Link from "next/link";
import SettingButton from "./sideBar/SettingButton";

const Sidebar = () => {
  const [activeLayer, setActiveLayer] = useState<string>("Open Street Map");
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleLayerClick = (layerTitle: string) => {
    // setMapType(layerTitle);
    dispatch(setMapType(layerTitle));
    setActiveLayer(layerTitle);
    if (!router.pathname.includes("map")) {
      router.push("/map");
    }
  };

  console.log("active layer", activeLayer);

  return (
    <div className="w-[17.6%] bg-white relative custom-scroll pb-[20px]">
      <Link href="/">
        <div className="flex items-center gap-[14px] pl-[34px] h-[9.7vh] sticky top-0 bg-white z-10 shadow-[0_0_10px_10px_rgba(0,0,0,0.1)]">
          <img
            src="/images/newsharif.webp"
            alt="logo"
            className="w-[50px] h-[50px] "
          />
          <h2 className="jost-black text-[25px] text-[#343C6A]">Bina</h2>
        </div>
      </Link>
      <div className="pl-[34px] flex flex-col h-[calc(100%-100px)]">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-[17px] relative cursor-pointer mt-[2vh]"
          onClick={() => {}}
        >
          <img
            src={
              router.pathname.includes("dashboard")
                ? "/icons/dashboardactive.svg"
                : "/icons/dashboard.svg"
            }
            alt="wetland"
          />
          <h3
            className={
              "text-[1.75vh] font-[500]  " +
              (router.pathname.includes("dashboard")
                ? "text-[#2D60FF]"
                : "text-[#B1B1B1]")
            }
          >
            Dashboard
          </h3>
          {router.pathname.includes("dashboard") && (
            <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
          )}
        </Link>
        <Link
          href={"/map"}
          className="flex items-center gap-[17px] relative cursor-pointer mt-[2vh]"
          onClick={() => {}}
        >
          <img
            src={
              router.pathname.includes("map")
                ? "/icons/dashboardactive.svg"
                : "/icons/dashboard.svg"
            }
            alt="wetland"
          />
          <h3
            className={
              "text-[1.75vh] font-[500]  " +
              (router.pathname.includes("map")
                ? "text-[#2D60FF]"
                : "text-[#B1B1B1]")
            }
          >
            Map
          </h3>
          {router.pathname.includes("map") && (
            <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
          )}
        </Link>
        <TextAndBorder
          text="Tools"
          className={
            router.pathname.includes("dashboard")
              ? "!mt-[2vh] mb-[2.448vh]"
              : "mb-[2.448vh]"
          }
        />
        <Wetland />
        <div className="mt-auto flex flex-col gap-[2.34vh]">
          <TextAndBorder text="More" className="mb-[2.148vh]" />
          <SettingButton />
          <MoreTools />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
