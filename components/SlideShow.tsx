import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

// next translation
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export default function HomeSlider() {
   const pagination = {
      clickable: true,
      renderBullet: function (index: number, className: string) {
         return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
   };

   const { t } = useTranslation();
   const isEnLang = i18next.language === 'en';

   return (
      <>
         <Swiper
            pagination={pagination}
            modules={[Pagination, Autoplay]}
            className="homeSlider relative rounded-[20px]"
            autoplay={{
               delay: 5000,
               disableOnInteraction: false,
            }}
         >
            {['', '', '', '', ''].map((_, index) => (
               <SwiperSlide
                  key={index}
                  className="w-full h-full rounded-[20px] bg-white"
               >
                  <div className="w-full h-[517px] overflow-hidden bg-[url(/images/slide.png)] bg-cover">
                     {/* prettier-ignore */}
                     <div className={`w-full h-full px-[45px] pt-[130px] bg-[url(/images/sliderFade.png)] bg-cover flex flex-col ${isEnLang ? 'items-start' : 'items-end'}`}>
                        <p
                           className={`text-[24px] w-full leading-[48px] text-white font-[700] ___ sm:text-[35px] ___ md:text-[40px] mb-[30px]
                        ${
                           isEnLang
                              ? 'justify-self-start text-left left-[25px] ___ sm:left-[50px] ___ md:left-[80px]'
                              : 'justify-self-end text-right drop-shadow-[0_0_30px_#000] right-[25px] ___ sm:right-[50px] ___ md:right-[80px]'
                        }
                        `}
                        >
                           {t('Home_desc1')} <br />
                           {t('Home_desc2')} <br />
                           {t('Home_desc3')} <br />
                        </p>
                        <button className="w-[180px] h-[52px] rounded-[1000px] text-[20px] border-[2px] border-[#FFF] text-white flex text-center items-center justify-center justify-self-center font-[700] ___ sm:text-[18px] sm:mb-[100px] ___ hover:bg-[#000]">
                           {t('Home_Btn')}
                        </button>
                     </div>
                  </div>
               </SwiperSlide>
            ))}

            <img
               src="/images/shape-slider.png"
               alt="shape"
               className="absolute left-0 bottom-0 w-[232px] h-[71px] z-[9]"
            />
         </Swiper>
      </>
   );
}
