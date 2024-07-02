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

      <div className="px-[25px] w-full h-full grid items-end absolute left-0 bottom-0 ___ sm:px-[50px] ___ md:px-[80px]">
        <p
          className={`text-[24px] leading-[160%] text-white mb-[-180px] ___ sm:text-[35px] ___ md:text-[43px]
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

        <button className="w-[130px] h-[50px] text-[20px] border-[2px] border-[#FFF] text-white flex text-center items-center justify-center justify-self-center mb-[90px] ___ sm:w-[140px] sm:h-[80px] sm:text-[26px] sm:mb-[100px] ___ hover:bg-[#000]">
          {t("Home_Btn")}
        </button>
      </div>
    </div>
  );
};

export default Home;
