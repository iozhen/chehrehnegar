import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <header
      className={
        "fixed top-0 left-0 w-full bg-[#0007] flex justify-between items-center " +
        (router.pathname.includes("map") ? "h-[7vh]" : "h-[10%]")
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
      <nav className="text-white flex justify-center items-center gap-[40px] text-[1.5vw] pr-[35px]">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Team</a>
        <a href="#">Contact Us</a>
        <a href="#">فا</a>
      </nav>
    </header>
  );
};

export default Header;
