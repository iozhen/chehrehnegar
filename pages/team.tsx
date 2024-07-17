import { useTranslation } from "react-i18next";
import data from "../data/db.json";
import React from "react";
import i18next from "i18next";
import PageTitle from "@/components/PageTitle";

interface teamListType {
   title: string;
}

const Team = () => {
   const { t } = useTranslation();
   const isEnLang = i18next.language === "en";

   return (
      <div className="flex flex-col min-h-full">
         <div
            dir={isEnLang ? "ltr" : "rtl"}
            className="w-[90%] mx-auto mb-[70px] ___ md:w-[700px] ___ lg:w-[900px] ___ xl:w-[1200px] flex-1"
         >
            <PageTitle title={t("DeveloperShowTitle")} />

            <h3 className="text-[20px] font-[700] pb-[5px] ___ sm:text-[30px] ___ lg:text-[24px]">
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
                     className="list-disc font-normal mb-[5px] text-[18px] ___ lg:text-[24px]"
                  >
                     {t(`${title}`)}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Team;
