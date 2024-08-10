import { productProps } from "@/pages/dashboard";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Transaction = ({
   currPageProduct,
}: {
   currPageProduct: productProps[];
}) => {
   const { t } = useTranslation();
   const transactionTh = t("transactionTh", {
      returnObjects: true,
   }) as string[];
   const isEn = i18next.language === "en";

   return (
      <div className="mt-[8.3vh]">
         <h2 className="text-[22px] font-[600] leading-[26.63px] text-[#343C6A] mb-[2.63vh]">
            {t("transactionHeading")}
         </h2>

         {/* tabs */}
         <div className="border-[#EBEEF2] border-b-[1px]">
            <button className="text-[#2D60FF]">
               <div className="px-[11px] mb-[5px]">{t("transactionTab")}</div>
               <div className="bg-[#2D60FF] rounded-[10px_10px_0_0] h-[3px]"></div>
            </button>
         </div>

         {/* table */}
         <div className="pl-[2.01vw] pr-[4.44vw] w-full rounded-[25px] bg-white mt-[2.44vh] h-[38.76vh]">
            <table className="w-full">
               <thead>
                  <tr className="border-[#E6EFF5] border-b-[1px] text-[#718EBF] font-[500] leading-[19.36px] h-[5.07vh] text-left">
                     {transactionTh.map((tab, index) => (
                        <th
                           key={index}
                           className={`${isEn ? "text-left" : "text-right"}`}
                        >
                           {tab}
                        </th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {currPageProduct.map(
                     (
                        { arrow, title, id, type, date, amount, moreIcon },
                        index
                     ) => (
                        <tr
                           key={index}
                           className="text-[#232323] h-[6.34vh] border-[#F2F4F7] [&:not(:last-child)]:border-b-[1px]"
                        >
                           <td>
                              <div className="flex items-center gap-[10px]">
                                 <div className="w-[30px] h-[30px] rounded-[50%] border-[2px] border-[#718EBF] flex justify-center items-center">
                                    <img
                                       src={
                                          amount[0] === "-"
                                             ? arrow.up
                                             : arrow.down
                                       }
                                    />
                                 </div>

                                 <p className="font-[400]">{title}</p>
                              </div>
                           </td>

                           <td>{id}</td>
                           <td>{type}</td>
                           <td>{date}</td>
                           <td>{amount}</td>

                           <td>
                              <button className="flex items-center">
                                 <img
                                    src={moreIcon}
                                    className="w-[16px] h-[2px]"
                                 />
                              </button>
                           </td>
                        </tr>
                     )
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Transaction;
