import { useTranslation } from "react-i18next";
import data from "../data/db.json";
import i18next from "i18next";

interface aboutListType {
   title: string;
}

const About = () => {
   const { t } = useTranslation();
   const isEnLang = i18next.language === "en";

   return (
      <div>
         <img
            src="/images/shadegan_header.png"
            className="w-full block mb-[40px]"
         />

         <div
            className={`w-[90%] mx-auto mb-[70px] ___ sm:w-[80%] ___ md:w-[75%]
               ${isEnLang ? "text-left" : "text-right"}
            `}
         >
            <h3 className="text-[21px] mb-[10px] font-bold ___ sm:text-[30px] ___ lg:text-[35px]">
               {t("About_Title")}
            </h3>

            <p
               dir={isEnLang ? "ltr" : "rtl"}
               className="text-[18px] font-normal text-justify mb-[30px] ___ sm:text-[20px] sm:leading-[35px] ___ lg:text-[25px] lg:leading-[40px]"
            >
               {t("About_desc")}
            </p>

            <h3 className="text-[21px] font-bold pb-[30px] ___ sm:text-[30px] ___ lg:text-[35px]">
               {t("Some_example")}
            </h3>

            <ul
               dir={isEnLang ? "ltr" : "rtl"}
               className={`${
                  isEnLang
                     ? "pl-[30px] ___ sm:pl-[45px]"
                     : "pr-[30px] ___ sm:pr-[45px]"
               }`}
            >
               {data.aboutUsList.map(
                  ({ title }: aboutListType, index: number) => (
                     <li
                        key={index}
                        className="list-disc font-normal mb-[5px] text-[18px] ___ lg:text-[25px]"
                     >
                        {t(`${title}`)}
                     </li>
                  )
               )}
            </ul>
         </div>

         <img src="/images/shadegan_footer.png" className="w-full opacity-50" />
      </div>
   );
};

export default About;
