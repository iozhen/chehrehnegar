import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface props {
   profileSubMenu: number;
   setProfileSubMenu: (value: number) => void;
}

const SupportSubmenu = ({ setProfileSubMenu, profileSubMenu }: props) => {
   const router = useRouter();
   return (
      <div className="relative bg-white p-[1.26vh] rounded-[10px] min-w-[205px] shadow-md z-40 px-[13px]">
         <div className="absolute top-[-18%] left-[80%] transform -translate-x-1/2 before:content-[''] before:absolute before:w-0 before:h-0 before:border-l-[10px] before:border-r-[10px] before:border-b-[30px] before:border-l-transparent before:border-r-transparent before:border-b-white before:z-40 shadow-md"></div>
         <button
            className="flex items-center gap-[15px] border-b-[1px] border-b-[#979797] py-[1.074vh] w-full"
            onClick={() => {
               router.push("/dashboard/support/new-support");
               setProfileSubMenu(0);
            }}
         >
            <img src="/icons/ticket.svg" alt="ticket" />
            <p className="text-[1.36vh] font-[600] text-[#404040]">
               Support Ticket
            </p>
         </button>
         <button
            className="flex items-center gap-[15px] py-[1.074vh] w-full"
            onClick={() => {
               router.push("/dashboard/support/support-list");
               setProfileSubMenu(0);
            }}
         >
            <img src="/icons/ticketlist.svg" alt="ticketlist" />
            <p className="text-[1.36vh] font-[600] text-[#404040]">
               Support List
            </p>
         </button>
      </div>
   );
};

export default SupportSubmenu;
