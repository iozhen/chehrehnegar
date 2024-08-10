import React from "react";
import { useTranslation } from "react-i18next";

const TwoFactor = () => {
   const { t } = useTranslation();

   return (
      <div className="mt-[3.61vh]">
         <div className="flex items-center gap-[16px]">
            <img src="/images/key.svg" alt="key" />
            <h3 className="text-[2.34vh] font-[500] text-[#4c4e64d8]">
               {t("twoFactorHeading")}
            </h3>
         </div>
         <div className="flex items-center justify-center flex-col">
            <button className="flex items-center gap-[10px] bg-gray-100 p-[12px] rounded-[8px]">
               <img src="/images/open.svg" alt="open" />
               <p className="text-[1.36vh] font-[500]">{t("enableBtn")}</p>
            </button>
            <h3 className="text-[1.95vh] font-[500] text-[#4c4e64e9] my-[1.56vh]">
               {t("twoFactorDesc1")}
            </h3>
            <p className="text-[1.36vh] font-[400] text-[#4c4e64a6]">
               {t("twoFactorDesc2")}
            </p>
         </div>
      </div>
   );
};

export default TwoFactor;
