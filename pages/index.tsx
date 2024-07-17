import HomeSlider from "@/components/SlideShow";
import React from "react";

const Home = () => {
   return (
      <div className="w-full h-full relative overflow-hidden">
         <div className="mx-auto max-sm:w-[90%] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
            <HomeSlider />
         </div>
      </div>
   );
};

export default Home;
