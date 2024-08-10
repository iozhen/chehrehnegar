import i18next from "i18next";
import { useTranslation } from "react-i18next";

const NoChat = () => {
   const { t } = useTranslation();
   const isEn = i18next.language === "en";

   return (
      <div className="flex justify-center items-center w-[39.2vw]">
         <div className="text-[#031849] text-center">
            <img
               src="/images/noMessage.png"
               className="w-[19.7vw] h-[21.4vh] mb-[2.6vh]"
            />
            <p className="font-[400] text-[1.7vw] leading-[2vw] mb-[1.4vh]">
               {t("noChatHeading")}
            </p>
            <p className="font-[400] text-[1vw] leading-[1.8vh] italic">
               {t("noChatHeadingDesc")}
            </p>
            <div className="relative mt-[4.2vh]">
               <img
                  src="/images/arrowHelp.svg"
                  style={{ transform: `${isEn ? "" : "rotateY(180deg)"}` }}
                  className={`w-[4vw] h-[4.6vh] absolute  top-[-2vh] ${
                     isEn ? "left-[-2.8vw]" : "right-[-2.8vw]"
                  }`}
               />
               <p
                  className={`w-[20vw] text-[1.25vw] font-[400] leading-[2.5vh] text-center text-[#0067FF] ${
                     isEn ? "rotate-[-5deg]" : "rotate-[4deg]"
                  }`}
               >
                  {t("noChatHelpText")}
               </p>
            </div>
         </div>
      </div>
   );
};

export default NoChat;
