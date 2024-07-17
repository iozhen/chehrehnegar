import PageTitle from "@/components/PageTitle";
import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
   const { t } = useTranslation();
   const isEnLang = i18next.language === "en";

   return (
      <div>
         <div
            dir={`${isEnLang ? "ltr" : "rtl"}`}
            className="w-[90%] mx-auto mb-[70px] ___ md:w-[700px] ___ lg:w-[900px] ___ xl:w-[1200px]"
         >
            <PageTitle title={t("ContactShowTitle")} />

            <h3 className="text-[20px] font-[700] ___ sm:text-[30px] ___ lg:text-[24px]">
               {t("Contact_Title")}
            </h3>

            <p className="text-[17px] font-normal text-justify max-sm:leading-[35px] leading-[40px] mb-[40px] ___ sm:text-[20px] sm:leading-[35px] ___ lg:text-[24px] lg:leading-[40px]">
               {t("Contact_desc1")} <br />
               {t("Contact_desc2")} <br />
               {t("Contact_desc3")} <br />
            </p>
         </div>
      </div>
   );
};

export default Contact;
