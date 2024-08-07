import Banner from "@/components/Banner";
import Pagination from "@/components/Pagination";
import Transaction from "@/components/Transaction";
import { useEffect, useState } from "react";
import data from "@/data/profile.json";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "@/redux/slices/ProfilesSlice";

const profile = () => {
  const [currPage, setCurrPage] = useState(1);

  const allPage = Math.ceil(data.transactions.length / 5);
  const paginationProduct = [];
  for (let i = 0; i <= allPage - 1; i++)
    paginationProduct.push(data.transactions.slice(i * 5, (i + 1) * 5));
  const [currPageProduct] = paginationProduct.filter(
    (_, index) => index + 1 === currPage
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = Cookies.get("token");
  const profileData = useSelector((state: any) => state.profile.ProfileData);
  const dispatch = useDispatch();

  return (
    <div className="px-[40px] py-[1.75vh] h-[calc(100vh-9.76vh)]">
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
