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
        className={`w-[75%] mx-auto mb-[70px]
          ${isEnLang ? "text-left" : "text-right"}
        `}
      >
        <h3 className="text-[35px] font-bold">{t("About_Title")}</h3>

        <p
          dir={isEnLang ? "ltr" : "rtl"}
          className="text-[25px] font-normal text-justify leading-[40px] mb-[30px]"
        >
          {t("About_desc")}
        </p>

        <h3 className="text-[35px] font-bold pb-[30px]">{t("Some_example")}</h3>

        <ul
          dir={isEnLang ? "ltr" : "rtl"}
          className={`${isEnLang ? "pl-[45px]" : "pr-[45px]"}`}
        >
          {data.aboutUsList.map(({ title }: aboutListType, index: number) => (
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

export default About;
