import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

// next translation
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function HomeSlider() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const { t } = useTranslation();
  const isEnLang = i18next.language === "en";
  const token = Cookies.get("token");
  const router = useRouter();
  const isLogin = useSelector((state: any) => state.login.isLogin);

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
        {["", "", "", "", ""].map((_, index) => (
          <SwiperSlide
            key={index}
            className="w-full h-full rounded-[20px] bg-white"
          >
            <div className="w-full h-[517px] overflow-hidden bg-[url(/images/slide.webp)] bg-cover">
              {/* prettier-ignore */}
              <div className={`w-full h-full max-sm:px-[20px] px-[45px] pt-[130px] bg-[url(/images/sliderFade.webp)] bg-cover flex flex-col ${isEnLang ? 'items-start' : 'items-end'}`}>
                        <p
                           className={`max-sm:text-[20px] text-[24px] w-full max-sm:leading-[35px] leading-[48px] text-white font-[700] ___ sm:text-[35px] ___ md:text-[40px] max-sm:mb-[20px] mb-[30px]
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
                        
                        <button className="max-sm:w-[140px] w-[180px] max-sm:h-[45px] h-[52px] rounded-[1000px] max-sm:text-[16px] text-[20px] border-[2px] border-[#FFF] text-white flex text-center items-center justify-center justify-self-center font-[700] ___ sm:text-[18px] sm:mb-[100px]" onClick={() => {
                           if(isLogin) {
                              router.push("/map")
                           } else{
                              toast.error("you should login first")
                              router.push("/auth/login")
                           }                          
                        }}>
                           {t('Home_Btn')}
                        </button>
                     </div>
            </div>
          </SwiperSlide>
        ))}

        <img
          src="/images/shape-slider.webp"
          alt="shape"
          className="absolute left-0 bottom-0 w-[232px] h-[71px] z-[9]"
        />
      </Swiper>
    </>
  );
}
