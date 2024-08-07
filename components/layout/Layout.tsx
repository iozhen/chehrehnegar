import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import English from "@/data/en.json";
import Persian from "@/data/fa.json";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useRouter } from "next/router";
import MapHeader from "../MapHeader";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { setProfileData } from "@/redux/slices/ProfilesSlice";
import { toast } from "react-toastify";
import { setLogin } from "@/redux/slices/LoginSlice";

interface LayoutProps {
  children: ReactNode;
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: English,
    },
    fa: {
      translation: Persian,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const showMapHeader =
    router.pathname.includes("map") ||
    router.pathname.includes("plans") ||
    router.pathname.includes("dashboard");
  const showHeader = !router.pathname.includes("auth") && !showMapHeader;

  const token = Cookies.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const profileData = useSelector((state: any) => state.profile.ProfileData);
  const isLogin = useSelector((state: any) => state.login.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      router.pathname.includes("map") ||
      router.pathname.includes("dashboard")
    ) {
      if (!token) {
        router.push("/auth/login");
        //   toast.error("please login first");
        return;
      }

      if (isLogin && profileData) {
        dispatch(setLogin(true));
        //   toast.error("please login first");
        return;
      }
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
        if (err?.response?.data?.message === "Invalid token.") {
          dispatch(setLogin(false));
          Cookies.remove("token");
          toast.error("Your session has expired. Please log in again.");
          router.push("/auth/login");
        } else {
          console.log("Error fetching profile data:", err);
        }
      });
  }, [token, profileData, isLogin]);

  return (
    <div>
      {showMapHeader && (
        <div className="flex relative jost h-screen overflow-y-hidden w-full">
          <Sidebar />
          <div className="w-full h-screen">
            <MapHeader />
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
      )}

      {!showMapHeader && showHeader && (
        <div>
          <Header />
          <div className="w-full">{children}</div>
        </div>
      )}

      {!showMapHeader && !showHeader && (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
}

export default Layout;
