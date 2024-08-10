import Link from "next/link";
import { useSelector } from "react-redux";
import { ReduxStore } from "@/types/index";
import { useTranslation } from "react-i18next";

const Banner = () => {
   const { t } = useTranslation();
   const profileData = useSelector(
      (state: ReduxStore) => state.profile.ProfileData
   );

   return (
      <div className="bg-[url(/images/banner-dashboard.webp)] bg-[#e93b78dc] bg-blend-multiply bg-center bg-cover h-[20.8vh] rounded-[10.42px] flex justify-center items-end">
         <div className="w-[95%] bg-white shadow-[0_1.74px_5.21px_0_#00000040] rounded-[10.42px] h-[9.66vh] translate-y-[50%] flex justify-between items-center pl-[13.9px] pr-[35.16px] text-[#344767]">
            <div className="flex items-center gap-[20.84px]">
               <img
                  className="w-[64.27px] h-[66.01px] rounded-[6.95px]"
                  src="/images/profile.webp"
                  alt="profile"
               />
               <div>
                  <p className="text-[17.37px] font-[700] leading-[24.32px]">
                     {t("bannerName")}
                  </p>
                  <p className="text-[12.16px] font-[400] leading-[17.02px]">
                     {t("bannerPost")}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-[33.03px]">
               <div>
                  <p className="text-[17.37px] font-[700] leading-[24.32px]">
                     {t("bannerActivePlan")}{" "}
                     {profileData?.plan
                        ? profileData.plan
                        : t("bannerActivePlanVal")}
                  </p>
                  <p className="text-[12.16px] font-[400] leading-[17.02px]">
                     {t("bannerDate")}
                  </p>
               </div>
               <Link
                  href={"/plans"}
                  className="w-[146.97px] h-[48.99px] rounded-[30px] border-[#4880FF] border-[1.97px] text-[#4880FF] text-[15.74px] font-[700] flex items-center justify-center"
               >
                  {t("bannerUpgrade")}
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Banner;
