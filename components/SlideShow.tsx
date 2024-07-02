import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface slideType {
   imgPath: string;
   location: string;
}

const Slider = ({ slides }: { slides: slideType[] }) => {
   const { t } = useTranslation();
   const [currentSlide, setCurrentSlide] = useState(0);
   const isEnLang = i18next.language === "en";

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentSlide((prevSlide) =>
            prevSlide === slides.length - 1 ? 0 : prevSlide + 1
         );
      }, 5000);

      return () => clearInterval(interval);
   }, [slides.length]);

   return (
      <div className="relative w-full max-w-full h-full m-auto animate-zoom-in-zoom-out">
         {slides.map(({ imgPath, location }, index) => (
            <div
               key={index}
               style={{
                  opacity: `${index === currentSlide ? 1 : 0}`,
                  backgroundImage: `url(${imgPath})`,
               }}
               className="absolute transition duration-[1s] w-full h-full bg-center bg-cover"
            >
               <div
                  className={`fixed text-[20px] text-white flex justify-center items-center gap-[15px] animate-fade-animate bottom-[15px] ___  sm:text-[28px]
                     ${
                        isEnLang
                           ? "left-[20px] text-left ___ sm:left-[50px] ___ md:left-[80px]"
                           : "right-[20px] text-right ___ sm:right-[50px] ___ md:right-[80px]"
                     }  
                  `}
               >
                  <FontAwesomeIcon
                     icon={faMapMarkerAlt}
                     color="red"
                     className="text-[20px] ___ sm:text-[28px]"
                  />
                  <span>{t(`${location}`)}</span>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Slider;
