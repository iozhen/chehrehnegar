import HomeSlider from '@/components/SlideShow';
import React from 'react';

const Home = () => {
   return (
      <div className="w-full h-full relative overflow-hidden">
         <div className="w-[1200px] mx-auto">
            <HomeSlider />
         </div>
      </div>
   );
};

export default Home;
