import React, { ReactNode } from "react";
import Header from "./Header";
import English from "@/data/en.json";
import Persian from "@/data/fa.json";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useRouter } from "next/router";
import MapHeader from "../MapHeader";
import Sidebar from "../Sidebar";

interface LayoutProps {
   children: ReactNode;
}

i18n
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      resources: {
         en: {
            translation: English,
         },
         fa: {
            translation: Persian,
         },
      },
      lng: "en",
      fallbackLng: "en",
      interpolation: {
         escapeValue: false,
      },
   });

function Layout({ children }: LayoutProps) {
   const { t } = useTranslation();
   const router = useRouter();

   const showMapHeader =
      router.pathname.includes("map") ||
      router.pathname.includes("plans") ||
      router.pathname.includes("dashboard");
   const showHeader = !router.pathname.includes("auth") && !showMapHeader;

   return (
      <div>
         {showMapHeader && (
            <div className="flex relative jost h-screen overflow-y-hidden w-full">
               <Sidebar />
               <div className="w-full h-screen">
                  <MapHeader />
                  <div className="w-full h-full">{children}</div>
               </div>
            </div>
         )}

         {!showMapHeader && showHeader && (
            <div>
               <Header />
               <div className="w-full">{children}</div>
            </div>
         )}

         {!showMapHeader && !showHeader && (
            <div className="w-full">{children}</div>
         )}
      </div>
   );
}

export default Layout;
