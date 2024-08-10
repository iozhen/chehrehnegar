import Banner from "@/components/Banner";
import Pagination from "@/components/Pagination";
import Transaction from "@/components/Transaction";
import { useEffect, useState } from "react";
import data from "@/data/profile.json";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "@/redux/slices/ProfilesSlice";
import { useTranslation } from "react-i18next";

export interface productProps {
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
}

const profile = () => {
   const { t } = useTranslation();
   const [currPage, setCurrPage] = useState(1);

   // all product
   const allProduct = t("transactions", {
      returnObjects: true,
   }) as productProps[];
   // all page
   const allPage = Math.ceil(allProduct.length / 5);
   // pagination product
   const paginationProduct = [];
   for (let i = 0; i <= allPage - 1; i++)
      paginationProduct.push(allProduct.slice(i * 5, (i + 1) * 5));
   // final product
   const [currPageProduct] = paginationProduct.filter(
      (_, index) => index + 1 === currPage
   );

   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const token = Cookies.get("token");
   const profileData = useSelector((state) => state.profile.ProfileData);
   const dispatch = useDispatch();

   useEffect(() => {
      if (profileData) {
         return;
      }
      axios
         .get(`${baseUrl}/api/user/get-profile`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(setProfileData({ ...res.data.data }));
         })
         .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
         });
   }, [profileData]);

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
