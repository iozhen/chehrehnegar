import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface props {
   isPlans: boolean;
   setIsPlans: (value: boolean) => void;
}

const MoreTools = () => {
   const router = useRouter();
   return (
      <div className="flex items-start flex-col gap-[2.34vh] w-full">
         <div className="flex items-center gap-[17px] relative ">
            <img src="/icons/reservoirs.svg" alt="reservoirs" />
            <h3 className="text-[1.75vh] font-[500] text-[#B1B1B1]">
               go to website
            </h3>
         </div>
         <Link
            href={"/plans"}
            className="flex items-center gap-[17px] relative cursor-pointer"
         >
            <img
               src={
                  router.pathname.includes("plans")
                     ? "/icons/plansactive.svg"
                     : "/icons/plans.svg"
               }
               alt="Price plans"
            />
            <h3
               className={
                  "text-[1.75vh] font-[500]  " +
                  (router.pathname.includes("plans")
                     ? "text-[#2D60FF]"
                     : "text-[#B1B1B1]")
               }
            >
               Price plans
            </h3>
            {router.pathname.includes("plans") && (
               <div className="w-[6px] h-[5.85vh] bg-[#2D60FF] absolute left-[-34px] rounded-tr-[10px] rounded-br-[10px]"></div>
            )}
         </Link>
      </div>
   );
};

export default MoreTools;
