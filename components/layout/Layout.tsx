import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import English from "@/data/en.json";
import Persian from "@/data/fa.json";
import i18n from "i18next";

import { useTranslation, initReactI18next } from "react-i18next";

interface LayoutProps {
  children: ReactNode;
}
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: English,
      },
      fa: {
        translation: Persian,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  // i18n.changeLanguage("fa");

  return (
    <div>
      <div className="bg-[#465261] min-h-[100vh] w-[100vw]">
        <Header />
        <div className="flex w-full relative">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
