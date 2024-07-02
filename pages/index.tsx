import data from "../data/db.json";
import Slider from "@/components/SlideShow";
import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const isEnLang = i18next.language === "en";

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Slider slides={data.homePageSlider} />
      <div
        className={`w-full h-full grid items-end px-[80px] absolute left-0 bottom-0`}
      >
        <p
          className={`text-[3vw] leading-[160%] text-white mb-[-180px]
          ${
            isEnLang
              ? "justify-self-start text-left"
              : "justify-self-end text-right drop-shadow-[0_0_30px_#000]"
          }
          `}
        >
          {t("Bina")} <br />
          {t("Home_desc1")} <br />
          {t("Home_desc2")} <br />
          {t("Home_desc3")} <br />
        </p>
        <button className="border-[2px] border-[#FFF] w-[12vw] h-[10vh] text-[1.8vw] text-white flex text-center items-center justify-center justify-self-center mb-[80px] ___ hover:bg-[#000]">
          {t("Home_Btn")}
        </button>
      </div>
    </div>
  );
};

export default Home;
