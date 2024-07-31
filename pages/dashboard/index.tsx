import data from "@/data/profile.json";

const profile = () => {
   return (
      <div className="px-[40px] pt-[1.75vh] h-[calc(100vh-9.76vh)]">
         {/* banner */}
         <div className="bg-[url(/images/banner-dashboard.png)] bg-[#e93b78dc] bg-blend-multiply bg-center bg-cover h-[20.8vh] rounded-[10.42px] flex justify-center items-end">
            <div className="w-[95%] bg-white shadow-[0_1.74px_5.21px_0_#00000040] rounded-[10.42px] h-[9.66vh] translate-y-[50%] flex justify-between items-center pl-[13.9px] pr-[35.16px] text-[#344767]">
               <div className="flex items-center gap-[20.84px]">
                  <img
                     className="w-[64.27px] h-[66.01px] rounded-[6.95px]"
                     src="/images/profile.png"
                     alt="profile"
                  />
                  <div>
                     <p className="text-[17.37px] font-[700] leading-[24.32px]">
                        hamed izadi
                     </p>
                     <p className="text-[12.16px] font-[400] leading-[17.02px]">
                        ux designer
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-[33.03px]">
                  <div>
                     <p className="text-[17.37px] font-[700] leading-[24.32px]">
                        your active plan : standard
                     </p>
                     <p className="text-[12.16px] font-[400] leading-[17.02px]">
                        29 days remaning
                     </p>
                  </div>
                  <button className="w-[146.97px] h-[48.99px] rounded-[30px] border-[#4880FF] border-[1.97px] text-[#4880FF] text-[15.74px] font-[700]">
                     Upgrade
                  </button>
               </div>
            </div>
         </div>

         {/* transaction */}
         <div className="mt-[8.3vh]">
            <h2 className="text-[22px] font-[600] leading-[26.63px] text-[#343C6A] mb-[2.63vh]">
               Recent Transactions
            </h2>

            {/* tabs */}
            <div className="border-[#EBEEF2] border-b-[1px]">
               <button className="text-[#2D60FF]">
                  <div className="px-[11px] mb-[5px]">All Transactions</div>
                  <div className="bg-[#2D60FF] rounded-[10px_10px_0_0] h-[3px]"></div>
               </button>
            </div>

            {/* table */}
            <div className="pl-[2.01vw] pr-[4.44vw] w-full rounded-[25px] bg-white mt-[2.44vh]">
               <table className="w-full">
                  <thead>
                     <tr className="border-[#E6EFF5] border-b-[1px] text-[#718EBF] font-[500] leading-[19.36px] h-[5.07vh] text-left">
                        {data.tabs.map((tab, index) =>
                           // prettier-ignore
                           <th key={index}>{tab}</th>
                        )}
                     </tr>
                  </thead>

                  <tbody>
                     {data.transactions.map(
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
                                       <img src={arrow.up} />
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

         {/* pagination */}
         <div className="flex justify-end w-full mt-[2.92vh]">
            <div className="flex gap-[12px]">
               <button className="text-[#2D60FF] flex items-center gap-[5px] text-[15px] font-[500]">
                  <img
                     src="/images/chevLeft.svg"
                     className="w-[12px] h-[12px]"
                  />
                  Previous
               </button>

               <div className="">
                  <button className="bg-[#2D60FF] rounded-[10px] text-white w-[40px] h-[40px]">
                     1
                  </button>
                  <button className="rounded-[10px] text-[#2D60FF] w-[40px] h-[40px]">
                     2
                  </button>
                  <button className="rounded-[10px] text-[#2D60FF] w-[40px] h-[40px]">
                     3
                  </button>
                  <button className="rounded-[10px] text-[#2D60FF] w-[40px] h-[40px]">
                     4
                  </button>
               </div>

               <button className="text-[#2D60FF] flex items-center gap-[5px] text-[15px] font-[500]">
                  Next
                  <img
                     src="/images/chevRight.svg"
                     className="w-[12px] h-[12px]"
                  />
               </button>
            </div>
         </div>
      </div>
   );
};

export default profile;
