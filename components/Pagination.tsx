import i18next from "i18next";
import { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface props {
   currPage: number;
   setCurrPage: React.Dispatch<SetStateAction<number>>;
   paginationProduct: {
      arrow: {
         up: string;
         down: string;
      };
      title: string;
      id: string;
      type: string;
      date: string;
      amount: string;
      moreIcon: string;
   }[][];
}

const Pagination = ({ currPage, setCurrPage, paginationProduct }: props) => {
   const { t } = useTranslation();
   const isEn = i18next.language === "en";

   return (
      <div className="flex justify-end w-full mt-[2.92vh]">
         <div dir="ltr" className="flex gap-[0.833vw]">
            <button
               onClick={() => currPage > 1 && setCurrPage(currPage - 1)}
               className="text-[#2D60FF] flex items-center gap-[0.347vw] text-[1.042vw] font-[500]"
            >
               <img
                  src="/images/chevLeft.svg"
                  className="w-[0.833vw] h-[1.172vh]"
               />
               {t("prevButton")}
            </button>

            <div>
               {paginationProduct.map((_, index) => (
                  <button
                     onClick={() => setCurrPage(index + 1)}
                     // prettier-ignore
                     className={`${currPage - 1 === index ? 'bg-[#2D60FF] text-white' : 'text-[#2D60FF]'}  rounded-[0.694vw] w-[2.778vw] h-[3.906vh]`}
                  >
                     {index + 1}
                  </button>
               ))}
            </div>

            <button
               onClick={() =>
                  currPage < paginationProduct.length &&
                  setCurrPage(currPage + 1)
               }
               className="text-[#2D60FF] flex items-center gap-[0.347vw] text-[1.042vw] font-[500]"
            >
               {t("nextButton")}
               <img
                  src="/images/chevRight.svg"
                  className="w-[0.833vw] h-[1.172vh]"
               />
            </button>
         </div>
      </div>
   );
};

export default Pagination;
