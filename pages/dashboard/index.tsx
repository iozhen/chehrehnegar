import Banner from "@/components/Banner";
import Pagination from "@/components/Pagination";
import Transaction from "@/components/Transaction";
import { useState } from "react";
import data from "@/data/profile.json";

const profile = () => {
   const [currPage, setCurrPage] = useState(1);

   const allPage = Math.ceil(data.transactions.length / 5);
   const paginationProduct = [];
   for (let i = 0; i <= allPage - 1; i++)
      paginationProduct.push(data.transactions.slice(i * 5, (i + 1) * 5));
   const [currPageProduct] = paginationProduct.filter(
      (_, index) => index + 1 === currPage
   );

   return (
      <div className="px-[40px] pt-[1.75vh] h-[calc(100vh-9.76vh)]">
         <Banner />

         <Transaction currPageProduct={currPageProduct} />

         <Pagination
            currPage={currPage}
            setCurrPage={setCurrPage}
            paginationProduct={paginationProduct}
         />
      </div>
   );
};

export default profile;
