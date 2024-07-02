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
    <div>
      <img
        src="/images/shadegan_header.png"
        className="w-full block mb-[40px]"
      />

      <div dir={isEnLang ? "ltr" : "rtl"} className="w-[75%] mx-auto mb-[70px]">
        <h3 className="text-[35px] font-bold pb-[30px]">{t("Team_Title")}</h3>

        <ul className={`${isEnLang ? "pl-[45px]" : "pr-[45px]"}`}>
          {data.teamList.map(({ title }: teamListType, index: number) => (
            <li key={index} className="list-disc text-[25px] font-normal">
              {t(`${title}`)}
            </li>
          ))}
        </ul>
      </div>

      <img src="/images/shadegan_footer.png" className="w-full opacity-50" />
    </div>
  );
};

export default Team;
