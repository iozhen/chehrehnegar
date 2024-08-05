import { setIsSecurity } from "@/redux/slices/ChangeProfileSlice";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface props {
   profileSubMenu: number;
   setProfileSubMenu: (value: number) => void;
}

const ProfileSubMenu = ({ setProfileSubMenu, profileSubMenu }: props) => {
   const router = useRouter();
   const token = Cookies.get("token");
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

   const dispatch = useDispatch();
   return (
      <div className="relative bg-white p-[1.26vh] rounded-[10px] min-w-[205px] shadow-md z-40 px-[13px]">
         <div className="absolute top-[-18%] left-[80%] transform -translate-x-1/2 before:content-[''] before:absolute before:w-0 before:h-0 before:border-l-[10px] before:border-r-[10px] before:border-b-[30px] before:border-l-transparent before:border-r-transparent before:border-b-white before:z-40 shadow-md"></div>
         <div>
            <button
               className="flex items-center gap-[15px] border-b-[1px] border-b-[#979797] py-[1.074vh] w-full"
               onClick={(e) => {
                  e.stopPropagation();

                  router.push("/dashboard/profile");
                  dispatch(setIsSecurity("account"));
                  setProfileSubMenu(0);
               }}
            >
               <img src="/images/profileEdite.svg" alt="profileEdite" />
               <p className="text-[1.36vh] font-[600] text-[#404040]">
                  Manage Account
               </p>
            </button>
            <button
               className="flex items-center gap-[15px] border-b-[1px] border-b-[#979797] py-[1.074vh] w-full"
               onClick={(e) => {
                  e.stopPropagation();

                  router.push("/dashboard/profile");
                  dispatch(setIsSecurity("security"));
                  setProfileSubMenu(0);
               }}
            >
               <img src="/icons/passEdite.svg" alt="passedite" />
               <p className="text-[1.36vh] font-[600] text-[#404040]">
                  Change Password
               </p>
            </button>
            <button
               className="flex items-center gap-[15px] py-[1.074vh] w-full"
               onClick={(e) => {
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
                  e.stopPropagation();

                  setProfileSubMenu(0);
               }}
            >
               <img src="/icons/logout.svg" alt="logout" />
               <p className="text-[1.36vh] font-[600] text-[#404040]">
                  Log out
               </p>
            </button>
         </div>
      </div>
   );
};

export default ProfileSubMenu;
