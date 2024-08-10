import React, { useEffect } from "react";
import data from "@/data/plan.json";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "@/redux/slices/ProfilesSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface planItemProps {
   name: string;
   price: number;
   lists: { text: string; itHas: boolean }[];
}

const plans = () => {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const token = Cookies.get("token");
   const profileData = useSelector((state) => state.profile.ProfileData);
   const dispatch = useDispatch();
   const { t } = useTranslation();
   const planItems = t("planitems", { returnObjects: true }) as planItemProps[];

   useEffect(() => {
      if (profileData) {
         return;
      }
      axios
         .get(`${baseUrl}/api/user/get-profile`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(setProfileData({ ...res.data.data }));
         })
         .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
         });
   }, [profileData]);

   const handelBuyPlan = (name: string) => {
      if (profileData?.plan) {
         axios
            .put(
               `${baseUrl}/api/user/edit-profile`,
               {
                  plan: name,
               },
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            )
            .then((res) => {
               console.log("====================================");
               console.log(res);
               console.log("====================================");
               toast.success("successful transaction");
            })
            .catch((err) => {
               console.log("====================================");
               console.log(err);
               console.log("====================================");
               toast.error("please try again");
            });
      } else {
         axios
            .post(
               `${baseUrl}/api/plans`,
               {
                  name: name,
               },
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            )
            .then((res) => {
               console.log("====================================");
               console.log(res);
               console.log("====================================");
               toast.success("successful transaction");
            })
            .catch((err) => {
               console.log("====================================");
               console.log(err);
               console.log("====================================");
               toast.error("please try again");
            });
      }
   };
   return (
      <div className="bg-gray-300 h-[100vh] px-[2.84vw] pt-[2.15vh] overflow-y-hidden">
         <h2 className="font-[600] text-[3.13vh]">{t("planHeading")}</h2>
         <p className="mb-[2.63vh] text-[1.86vh] font-[400]">
            {t("planHeadingDesc")}
         </p>
         <div className="flex items-center gap-[2.75vw] justify-center">
            {planItems.map((item) => {
               return (
                  <div
                     key={item.name}
                     className="flex items-center flex-col bg-white px-[1.39vw] py-[3.71vh] rounded-[1.63vw] min-w-[344px]"
                  >
                     <h3 className="text-[2.05vh] font-[700]">{item.name}</h3>
                     <p className="text-[1.54vh]">{t("monthlyText")}</p>
                     <h2 className="text-[4.39vh] font-[900] text-[#4880FF]">
                        ${item.price}
                     </h2>
                     <div className="w-full h-[0.1vh] bg-black"></div>
                     <ul className="flex items-center flex-col gap-[2.76vh] py-[3.71vh]">
                        {item.lists.map((list, index) => {
                           return (
                              <li
                                 key={index}
                                 className={
                                    "text-[1.76vh] font-[600] " +
                                    (list.itHas ? "" : "opacity-40")
                                 }
                              >
                                 {list.text}
                              </li>
                           );
                        })}
                     </ul>
                     <div className="w-full h-[0.1vh] bg-black"></div>
                     <button
                        className="px-[3.11vw] py-[1.76vh] border-[#4880FF] border-[0.14vw] rounded-[2.08vw] mt-[2.79vh] mb-[2.19vh]"
                        onClick={() => {
                           handelBuyPlan(item.name);
                        }}
                     >
                        {t("getStarted")}
                     </button>
                     <Link
                        className="text-black font-[700] text-[1.54vh] underline"
                        href={"#"}
                     >
                        {t("startTrial")}
                     </Link>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default plans;
