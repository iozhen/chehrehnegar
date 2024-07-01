import data from "../data/db.json";
import Slider from "@/components/SlideShow";
import React from "react";

const Home = () => {
  return (
    <div className="animate-zoom-in-zoom-out w-full h-full relative">
      <Slider slides={data.homePageSlider} />
      <div className="w-full h-full grid items-end pl-[80px] absolute left-0 bottom-0 z-[10]">
        <p className="text-[3vw] leading-[160%] text-white mb-[-180px]">
          "BINA" <br />
          An AI-based Platform to <br />
          Process, Analyze and Visualize <br />
          Environmental Data <br />
        </p>
        <button className="border-[2px] border-[#FFF] w-[151px] h-[100px] text-[1.8vw] text-white flex text-center items-center justify-self-center mb-[80px]">
          Launch BINA
        </button>
      </div>
    </div>
  );
};

export default Home;
