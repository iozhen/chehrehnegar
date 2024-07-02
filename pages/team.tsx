import { useTranslation } from "react-i18next";
import data from "../data/db.json";
import React from "react";
import i18next from "i18next";

interface teamListType {
   title: string;
}

const Team = () => {
   const { t } = useTranslation();
   const isEnLang = i18next.language === "en";

   return (
      <div className="min-h-screen">
         <img
            src="/images/shadegan_header.png"
            className="w-full block mb-[40px]"
         />

         <div
            dir={isEnLang ? "ltr" : "rtl"}
            className="w-[90%] mx-auto mb-[70px] ___ sm:w-[80%] ___ md:w-[75%]"
         >
            <h3 className="text-[21px] font-bold pb-[30px] ___ sm:text-[30px] ___ lg:text-[35px]">
               {t("Team_Title")}
            </h3>

            <ul
               className={`${
                  isEnLang
                     ? "pl-[30px] ___ sm:pl-[45px]"
                     : "pr-[30px] sm:pr-[45px]"
               }`}
            >
               {data.teamList.map(({ title }: teamListType, index: number) => (
                  <li
                     key={index}
                     className="list-disc font-normal mb-[5px] text-[18px] ___ lg:text-[25px]"
                  >
                     {t(`${title}`)}
                  </li>
               ))}
            </ul>
         </div>

         <img
            src="/images/shadegan_footer.png"
            className="w-full opacity-50 absolute bottom-0"
         />
      </div>
   );
};

export default Team;
