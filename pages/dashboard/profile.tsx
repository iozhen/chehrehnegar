import Account from "@/components/Account";
import Security from "@/components/Security";
import { setIsSecurity } from "@/redux/slices/ChangeProfileSlice";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
   const { t } = useTranslation();
   const securityType = useSelector(
      (state) => state.changeProfile.securityType
   );

   const dispatch = useDispatch();
   return (
      <div className="bg-[#B1B1B1] px-[40px] pt-[1.85vh] h-full">
         <img
            src="/images/banner-dashboard.webp"
            alt="banner"
            className="w-full"
         />
         <div className="flex items-center justify-center w-full px-[18px] mt-[-4vh]">
            <div className=" bg-white p-[1.95vh] w-full rounded-[10px]">
               <div className="flex items-center gap-[18px] border-b-[#4c4e641e] border-b-[1px]">
                  <button
                     className={
                        " text-[1.36vh] py-[1.17vh] " +
                        (securityType == "account"
                           ? "border-b-[1px] border-b-[#4379EE] text-[#4379EE]"
                           : "text-[#4c4e64ab]")
                     }
                     onClick={() => {
                        dispatch(setIsSecurity("account"));
                     }}
                  >
                     {t("profileTab1")}
                  </button>
                  <button
                     className={
                        " text-[1.36vh] py-[1.17vh] " +
                        (securityType == "security"
                           ? "border-b-[1px] border-b-[#4379EE] text-[#4379EE]"
                           : "text-[#4c4e64ab]")
                     }
                     onClick={() => {
                        dispatch(setIsSecurity("security"));
                     }}
                  >
                     {t("profileTab2")}
                  </button>
               </div>
               {securityType == "account" && <Account />}
               {securityType == "security" && <Security />}
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
