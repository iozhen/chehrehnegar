import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import data from "../../data/db.json";
import Link from "next/link";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

interface linksType {
  href: string;
  title: string;
}

const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const [headerShowState, setHeaderShowState] = useState<boolean>();
  const { t } = useTranslation();
  const isEnLang = i18next.language === "en";

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      window.scrollY > 150
        ? setHeaderShowState(true)
        : setHeaderShowState(false);
    });
  }, []);

  return (
    <header
      style={{
        background: `${isHomePage || headerShowState ? "#0007" : "#0000"}`,
      }}
      className={
        "animate-map-fade fixed top-0 left-0 w-full flex justify-between items-center z-[10] " +
        (router.pathname.includes("map") ? "h-[7vh] " : "h-[10%] ") +
        (isEnLang ? "flex-row" : "flex-row-reverse")
      }
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
        className={`text-white flex justify-center items-center gap-[40px] text-[1.5vw]
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
    </header>
  );
};

export default Header;
