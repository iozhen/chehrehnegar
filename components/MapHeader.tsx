import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileSubMenu from "./ProfileSubMenu";
import SupportSubmenu from "./SupportSubmenu";

const MapHeader = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const avatarRedux = useSelector((state) => state.profile.avatar);
  const [profileSubMenu, setProfileSubMenu] = useState(0);

  const TextCreater = () => {
    if (router.pathname.includes("dashboard")) {
      return "Dashboard";
    } else if (router.pathname.includes("plans")) {
      return "Price Tables";
    } else {
      return "Map";
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
    <div className="h-[9.76vh] bg-white pr-[55px] pl-[40px] flex items-center justify-between w-full">
      <h2 className="font-[500] text-[28px]">{TextCreater()}</h2>
      <div className="flex items-center gap-[30px] relative">
        <input
          type="text"
          className="rounded-[40px] bg-[#F5F7FA] text-[#8BA3CB] pr-[43px] pl-[60px] py-[1.56vh]"
          placeholder="search"
        />
        <img
          src="/icons/search.svg"
          alt="search"
          className="absolute left-[5%] top-[30%]"
        />
        {/* <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F7FA] rounded-full">
               <img src="/icons/notification.svg" alt="notification" />
            </div> */}
        <button
          onClick={() => {
            if (profileSubMenu == 2) {
              setProfileSubMenu(0);
            } else {
              setProfileSubMenu(2);
            }
          }}
          className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F7FA] rounded-full"
        >
          <img src="/icons/support.svg" alt="support" />
        </button>
        <button
          onClick={() => {
            if (profileSubMenu == 1) {
              setProfileSubMenu(0);
            } else {
              setProfileSubMenu(1);
            }
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
          {profileSubMenu == 1 && (
            <div className="absolute top-[160%] right-[-20%]">
              <ProfileSubMenu
                profileSubMenu={profileSubMenu}
                setProfileSubMenu={setProfileSubMenu}
              />
            </div>
          )}
          {profileSubMenu == 2 && (
            <div className="absolute top-[150%] right-[145%]">
              <SupportSubmenu
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
