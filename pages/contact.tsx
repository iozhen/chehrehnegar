import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const isEnLang = i18next.language === "en";

  return (
    <div>
      <img
        src="/images/shadegan_header.png"
        className="w-full block mb-[40px]"
      />

      <div
        dir={`${isEnLang ? "ltr" : "rtl"}`}
        className="w-[75%] mx-auto mb-[70px]"
      >
        <h3 className="text-[35px] font-bold">{t("Contact_Title")}</h3>

        <p className="text-[25px] font-normal text-justify leading-[40px] mb-[40px]">
          {t("Contact_desc1")} <br />
          {t("Contact_desc2")} <br />
          {t("Contact_desc3")} <br />
        </p>

        {i18next.language === "en" ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9990550161046!2d51.34838808776515!3d35.70164086692187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00a6421aaaab%3A0x58579384133c80f5!2sDepartment%20of%20Civil%20Engineering!5e0!3m2!1sen!2s!4v1649746061292!5m2!1sen!2s"
            width="600"
            height="450"
            className="border-0 m-auto"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        ) : (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1619.9956034223471!2d51.35160951641142!3d35.701833996207114!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00a6421aaaab%3A0x58579384133c80f5!2z2K_Yp9mG2LTaqdiv2Ycg2YXZh9mG2K_Ys9uMINi52YXYsdin2YY!5e0!3m2!1sfa!2s!4v1663529165969!5m2!1sfa!2s"
            width="600"
            height="450"
            className="border-0 m-auto"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>

      <img src="/images/shadegan_footer.png" className="w-full opacity-50" />
    </div>
  );
};

export default Contact;
