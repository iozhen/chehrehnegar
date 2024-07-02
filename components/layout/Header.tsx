import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import data from "../../data/db.json";
import Link from "next/link";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from "../SidebarMenu";

export interface linksType {
   href: string;
   title: string;
}

const Header = () => {
   const router = useRouter();
   const isHomePage = router.pathname === "/";
   const [headerShowState, setHeaderShowState] = useState<boolean>();
   const { t } = useTranslation();
   const isEnLang = i18next.language === "en";
   const [sidebarState, setSidebarState] = useState<boolean>();

   useEffect(() => {
      window.addEventListener("scroll", (e) => {
         window.scrollY > 150
            ? setHeaderShowState(true)
            : setHeaderShowState(false);
      });
   }, []);

   return (
      <header
         className={`animate-map-fade fixed top-0 left-0 w-full flex justify-between items-center z-[10]
            ${router.pathname.includes("map") ? "h-[7vh]" : "h-[10%]"}  
            ${isEnLang ? "flex-row" : "flex-row-reverse"}
            ${
               isHomePage || headerShowState
                  ? "bg-[#0007]"
                  : "bg-[#0007] xl:bg-[#0000]"
            }
         `}
      >
         <a
            href="https://en.sharif.edu/"
            target="_blank"
            className={
               "inline-block bg-[url(/images/sharif.png)] bg-cover bg-center " +
               (router.pathname.includes("map")
                  ? "w-[45px] h-[45px]"
                  : "w-[76px] h-[76px]")
            }
         ></a>

         <nav
            className={`hidden text-white justify-center items-center gap-[40px] ___ sm:text-[22px] sm:flex
          ${isEnLang ? "flex-row pr-[35px]" : "flex-row-reverse pl-[35px]"}
        `}
         >
            {data.headerLinks.map(({ href, title }: linksType, index) => (
               <Link href={href} key={index}>
                  {t(`${title}`)}
               </Link>
            ))}

            <button
               onClick={() =>
                  isEnLang
                     ? i18next.changeLanguage("fa")
                     : i18next.changeLanguage("en")
               }
            >
               {isEnLang ? "فا" : "En"}
            </button>
         </nav>

         <button
            className="inline-block mx-[20px] text-[30px] text-white ___ sm:hidden"
            onClick={() => setSidebarState(true)}
         >
            <FontAwesomeIcon icon={faBars} />
         </button>

         <SidebarMenu
            setSidebarState={setSidebarState}
            sidebarState={sidebarState}
         />
      </header>
   );
};

export default Header;
