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

const Sidebar = () => {
   const [activeLayer, setActiveLayer] = useState<string>("");
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

   return (
      <div className="w-[17.6%] bg-white pl-[34px] relative">
         <div
            className={
               router.pathname.includes("dashboard")
                  ? "flex items-center gap-[14px] h-[9.7vh]"
                  : "flex items-center gap-[14px] h-[9.7vh] mb-[3.5vh]"
            }
         >
            <img
               src="/images/newsharif.png"
               alt="logo"
               className="w-[50px] h-[50px] "
            />
            <h2 className="jost-black text-[25px] text-[#343C6A]">Bina</h2>
         </div>
         {router.pathname.includes("dashboard") && (
            <button
               className="flex items-center gap-[17px] relative cursor-pointer mt-[1vh]"
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
            </button>
         )}
         <TextAndBorder
            text="Tools"
            className={
               router.pathname.includes("dashboard")
                  ? "!mt-[2vh] mb-[2.448vh]"
                  : "mb-[2.448vh]"
            }
         />

         <Wetland />
         <TextAndBorder text="Layers" className="mb-[2.448vh]" />
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
                  onClick={() => {
                     handleLayerClick(item.title);
                  }}
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
         <TextAndBorder text="More" className="mb-[2.148vh]" />
         <MoreTools />
         <button
            className="bg-[#E96363] flex items-center justify-center w-full py-[1.36vh] text-[18px] font-[500] text-white mt-[2.148vh] absolute left-0 bottom-0"
            onClick={() => {
               if (token) {
                  axios
                     .post(
                        `${baseUrl}/api/auth/logout`,
                        {},
                        {
                           headers: {
                              Authorization: `Bearer ${token}`,
                           },
                        }
                     )
                     .then((res) => {
                        toast.success("Logged out successfully");
                        Cookies.remove("token");
                        router.push("/");
                     })
                     .catch((err) => {
                        console.log(err);
                        toast.error("Error logging out. Please try again.");
                     });
               } else {
                  toast.error("No token found. Unable to log out.");
               }
            }}
         >
            Log Out
         </button>
      </div>
   );
};

export default Sidebar;
