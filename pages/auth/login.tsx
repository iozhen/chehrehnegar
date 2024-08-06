import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setProfileData } from "@/redux/slices/ProfilesSlice";

const Login = () => {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const router = useRouter();
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
         password: Yup.string().required("Required"),
      }),
      onSubmit: (values) => {
         setLoading(true); // Set loading to true when the form is submitted
         axios
            .post(`${baseUrl}/api/auth/login`, {
               email: values.email,
               password: values.password,
            })
            .then((res) => {
               console.log(res);
               Cookies.set("token", res.data.data.token, { expires: 1 });
               dispatch(setProfileData({ ...res.data.data.user }));
               toast.success("Login successfully!");
               router.push("/map");
            })
            .catch((err) => {
               console.log(err);
               if (err?.response?.data?.message === "User not found") {
                  toast.error("You are not registered yet, signup first");
                  // router.push("/auth/signup");
               } else {
                  toast.error("Username or password is incorrect!");
               }
            })
            .finally(() => {
               setLoading(false); // Reset loading to false after the request completes
            });
      },
   });

   return (
      <div className="flex p-[2.08vw] items-center gap-[7.82vw] overflow-y-hidden h-[100vh]">
         {/* image */}
         <img
            src="/images/loginBack.webp"
            alt=""
            className="w-[44.37vw] h-[91.41vh]"
         />

         {/* login form */}
         <div className="w-[36.35vw]">
            <h1 className="text-[3.32vw] font-[700] text-center mb-[2.93vh]">
               Login
            </h1>
            <form
               onSubmit={formik.handleSubmit}
               className="flex flex-col gap-[1.46vh]"
            >
               <div className="flex flex-col gap-[1.46vh] mb-[1.95vh]">
                  <label htmlFor="email" className="font-[700] text-[1.76vw]">
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Enter your email"
                     className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                     <div className="text-red-500 text-sm">
                        {formik.errors.email}
                     </div>
                  ) : null}
               </div>
               <div className="flex flex-col gap-[1.46vh]">
                  <label
                     htmlFor="password"
                     className="font-[700] text-[1.76vw]"
                  >
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Enter your password"
                     className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                     <div className="text-red-500 text-sm">
                        {formik.errors.password}
                     </div>
                  ) : null}
               </div>
               <Link
                  href="/auth/request-otp"
                  className="text-[#58999F] text-[1.11vw] font-[400] mt-[1.46vh] mx-[1.73vw] block"
               >
                  Forget your password?
               </Link>
               <button
                  type="submit"
                  className={`w-full h-[6.25vh] bg-[#58999F] rounded-[97.66vh] text-white mt-[3.42vh] ${
                     loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
               >
                  {loading ? "Loading..." : "Log in"}
               </button>
               <p className="text-[1.11vw] font-[400] text-center mt-[1.46vh]">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-[#58999F]">
                     Sign up
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
};

export default Login;
