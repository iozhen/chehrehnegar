import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import TwoFactor from "./TwoFactor";

const Security = () => {
   const token = Cookies.get("token");
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [showPassword, setShowPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const togglePasswordVisibility = (type: string) => {
      if (type === "current") {
         setShowPassword(!showPassword);
      } else if (type === "new") {
         setShowNewPassword(!showNewPassword);
      } else if (type === "confirm") {
         setShowConfirmPassword(!showConfirmPassword);
      }
   };

   const passwordFormik = useFormik({
      initialValues: {
         currentPassword: "",
         newPassword: "",
         confirmPassword: "",
      },
      validationSchema: Yup.object({
         currentPassword: Yup.string().required("Required"),
         newPassword: Yup.string()
            .required("Required")
            .min(6, "Password must be at least 6 characters long"),
         confirmPassword: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
      }),
      onSubmit: (values) => {
         axios
            .put(
               `${baseUrl}/api/user/update-password`,
               {
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword,
               },
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            )
            .then((res) => {
               toast.success("Password updated successfully!");
            })
            .catch((err) => {
               if (err?.response?.data?.message === "Invalid password") {
                  toast.error("Current password is wrong");
               } else {
                  toast.error("Failed to update password");
               }
            });
      },
   });

   return (
      <div>
         <form onSubmit={passwordFormik.handleSubmit} className="">
            <div className="flex items-center gap-[24px] w-full h-[22.75vh]">
               <div className="w-full">
                  <div className="relative">
                     <input
                        type={showPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current Password"
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        value={passwordFormik.values.currentPassword}
                        className="mt-1 block w-full border border-gray-300 rounded-md pr-10 pl-[17px] py-[1.5vh] text-[1.56vh]"
                     />
                     <img
                        src={
                           !showPassword
                              ? "/images/hidepass.svg"
                              : "/images/showpass.svg"
                        }
                        alt="Toggle visibility"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility("current")}
                     />
                     {passwordFormik.touched.currentPassword &&
                     passwordFormik.errors.currentPassword ? (
                        <div className="text-red-500 text-sm">
                           {passwordFormik.errors.currentPassword}
                        </div>
                     ) : null}
                  </div>
                  <div className="relative mt-[1.97vh]">
                     <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        value={passwordFormik.values.newPassword}
                        className="mt-1 block w-full border border-gray-300 rounded-md pr-10 pl-[17px] py-[1.5vh] text-[1.56vh]"
                     />
                     <img
                        src={
                           !showNewPassword
                              ? "/images/hidepass.svg"
                              : "/images/showpass.svg"
                        }
                        alt="Toggle visibility"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility("new")}
                     />
                     {passwordFormik.touched.newPassword &&
                     passwordFormik.errors.newPassword ? (
                        <div className="text-red-500 text-sm">
                           {passwordFormik.errors.newPassword}
                        </div>
                     ) : null}
                  </div>
                  <div className="relative mt-[1.97vh]">
                     <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        value={passwordFormik.values.confirmPassword}
                        className="mt-1 block w-full border border-gray-300 rounded-md pr-10 pl-[17px] py-[1.5vh] text-[1.56vh]"
                     />
                     <img
                        src={
                           !showConfirmPassword
                              ? "/images/hidepass.svg"
                              : "/images/showpass.svg"
                        }
                        alt="Toggle visibility"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility("confirm")}
                     />
                     {passwordFormik.touched.confirmPassword &&
                     passwordFormik.errors.confirmPassword ? (
                        <div className="text-red-500 text-sm">
                           {passwordFormik.errors.confirmPassword}
                        </div>
                     ) : null}
                  </div>
               </div>
               <img
                  src="/images/security.png"
                  alt="Security"
                  className="w-full h-full"
               />
            </div>
            <TwoFactor />
            <div className="mt-4 flex gap-[16px]">
               <button
                  type="submit"
                  className="px-[22px] py-[0.68vh] bg-[#4379EE] text-[14px] font-[500] text-white rounded-[8px]"
               >
                  Save Changes
               </button>
               <button
                  // onClick={handleReset}
                  className="bg-transparent border-[1px] border-[#6D788D] text-[14px] font-[500] px-[22px] py-[0.68vh] text-[#6D788D] rounded-[8px]"
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
};

export default Security;
