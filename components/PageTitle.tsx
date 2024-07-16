interface props {
   title: string;
}

const PageTitle = ({ title }: props) => {
   return (
      <div className="w-full h-[204px] bg-[url(/images/pageTitleBack.png)] bg-cover relative mb-[80px]">
         <div className="bg-[url(/images/pageTitleBackFade.png)] bg-cover w-full h-full flex justify-center items-center">
            <h1 className="text-[48px] font-[700] text-white">{title}</h1>
         </div>
         <div className="absolute bottom-[-20px] left-[50%] translate-x-[-50%] w-[27px] h-[24px] bg-[url(/images/arrow-bottom.svg)] bg-contain bg-center bg-no-repeat"></div>
      </div>
   );
};

export default PageTitle;
