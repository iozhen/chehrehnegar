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

         <div className="px-[25px] w-full h-screen grid items-center absolute left-0 top-0 ___ sm:px-[50px] ___ md:px-[80px]">
            <p
               className={`text-[24px] w-full leading-[160%] text-white mb-[-180px] ___ sm:text-[35px] ___ md:text-[43px] absolute bottom-[400px] sm:bottom-[420px]
                  ${
                     isEnLang
                        ? "justify-self-start text-left left-[25px] ___ sm:left-[50px] ___ md:left-[80px]"
                        : "justify-self-end text-right drop-shadow-[0_0_30px_#000] right-[25px] ___ sm:right-[50px] ___ md:right-[80px]"
                  }
                `}
            >
               {t("Bina")} <br />
               {t("Home_desc1")} <br />
               {t("Home_desc2")} <br />
               {t("Home_desc3")} <br />
            </p>

            <button className="w-[130px] h-[50px] text-[20px] border-[2px] border-[#FFF] text-white flex text-center items-center justify-center justify-self-center mb-[90px] absolute left-[50%] translate-x-[-50%] bottom-0 ___ sm:w-[140px] sm:h-[80px] sm:text-[26px] sm:mb-[100px] ___ hover:bg-[#000]">
               {t("Home_Btn")}
            </button>
         </div>
      </div>
   );
};

export default Home;
