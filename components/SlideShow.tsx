import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

interface slideType {
  imgPath: string;
  location: string;
}

const Slider = ({ slides }: { slides: slideType[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
          <div className="fixed bottom-[40px] left-[80px] text-[2vw] text-white flex justify-center items-center gap-[15px] animate-fade-animate">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color="red"
              style={{ fontSize: "2vw" }}
            />
            <span>{location}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
