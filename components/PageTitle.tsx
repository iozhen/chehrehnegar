interface props {
   title: string;
}

const PageTitle = ({ title }: props) => {
   return (
      <div className="w-full bg-[url(/images/pageTitleBack.png)] bg-contain bg-no-repeat relative h-[60px] max-sm:mb-[30px] md:mb-[50px] xl:mb-[80px] md:h-[125px] ___ lg:h-[165px] ___ xl:h-[204px]">
         <div className="bg-[url(/images/pageTitleBackFade.png)] bg-contain bg-no-repeat w-full h-full flex justify-center items-center">
            <h1 className="max-sm:text-[20px] text-[48px] font-[700] text-white">
               {title}
            </h1>
         </div>
         <div className="absolute bottom-[-15px] xl:bottom-[-20px] left-[50%] translate-x-[-50%] max-sm:w-[15px] w-[27px] h-[24px] bg-[url(/images/arrow-bottom.svg)] bg-contain bg-center bg-no-repeat"></div>
      </div>
   );
};

export default PageTitle;
