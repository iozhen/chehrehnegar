import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileSubMenu from "./ProfileSubMenu";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const MapHeader = () => {
   const router = useRouter();
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const avatarRedux = useSelector((state) => state.profile.avatar);
   const [profileSubMenu, setProfileSubMenu] = useState(false);
   const { t } = useTranslation();
   const isEn = i18next.language === "en";

   const TextCreater = () => {
      if (router.pathname.includes("map")) {
         return t("headerHeading4");
      } else if (router.pathname.includes("plans")) {
         return t("headerHeading3");
      } else if (router.pathname.includes("support")) {
         return t("headerHeading1");
      } else if (router.pathname.includes("profile")) {
         return t("headerHeading5");
      } else {
         return t("headerHeading2");
      }
   };

   const constructAvatarUrl = (path) => {
      if (path.startsWith("uploads\\")) {
         return `${baseUrl}/${path.replace(/\\/g, "/")}`;
      }
      return path;
   };

   const profileData = useSelector((state) => state.profile.ProfileData);

   return (
      <div
         dir={isEn ? "ltr" : "rtl"}
         className="h-[9.76vh] bg-white pr-[55px] pl-[40px] flex items-center justify-between w-full"
      >
         <h2 className="font-[500] text-[28px]">{TextCreater()}</h2>
         <div className="flex items-center gap-[30px]">
            <div className="relative">
               <input
                  type="text"
                  className={`rounded-[40px] bg-[#F5F7FA] text-[#8BA3CB] py-[1.56vh] ${
                     isEn ? "pr-[43px] pl-[60px]" : "pr-[60px] pl-[43px]"
                  }`}
                  placeholder={t("placeholderSearch")}
               />
               <img
                  src="/icons/search.svg"
                  alt="search"
                  className={`absolute top-[30%] ${
                     isEn ? "left-[7%]" : "right-[7%]"
                  }`}
               />
            </div>
            <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F7FA] rounded-full">
               <img src="/icons/notification.svg" alt="notification" />
            </div>
            <button
               onClick={() => {
                  setProfileSubMenu(!profileSubMenu);
               }}
               className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F7FA] rounded-full relative"
            >
               <img
                  src={
                     avatarRedux
                        ? constructAvatarUrl(avatarRedux)
                        : "/images/Avatar.png"
                  }
                  alt="user"
                  className="rounded-full"
               />
               {profileSubMenu && (
                  <div
                     className={`absolute top-[160%] ${
                        isEn ? "right-[-20%]" : "left-[-20%]"
                     }`}
                  >
                     <ProfileSubMenu
                        profileSubMenu={profileSubMenu}
                        setProfileSubMenu={setProfileSubMenu}
                     />
                  </div>
               )}
            </button>
         </div>
      </div>
   );
};

export default MapHeader;
