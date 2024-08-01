import React from "react";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Security = () => {
   const token = Cookies.get("token");
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
               console.log("====================================");
               console.log(res);
               console.log("====================================");
               toast.success("Password updated successfully!");
            })
            .catch((err) => {
               console.log("====================================");
               console.log(err);
               console.log("====================================");
               if (err?.response?.data?.message == "Invalid password") {
                  toast.error("Current pass is Wrong");
               } else {
                  toast.error("Failed to update password");
               }
            });
      },
   });

   return (
      <div>
         {" "}
         <h1 className="text-2xl font-bold my-4">Update Password</h1>
         <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
            <div>
               <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium"
               >
                  Current Password
               </label>
               <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.currentPassword}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {passwordFormik.touched.currentPassword &&
               passwordFormik.errors.currentPassword ? (
                  <div className="text-red-500 text-sm">
                     {passwordFormik.errors.currentPassword}
                  </div>
               ) : null}
            </div>
            <div>
               <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium"
               >
                  New Password
               </label>
               <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.newPassword}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {passwordFormik.touched.newPassword &&
               passwordFormik.errors.newPassword ? (
                  <div className="text-red-500 text-sm">
                     {passwordFormik.errors.newPassword}
                  </div>
               ) : null}
            </div>
            <div>
               <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
               >
                  Confirm Password
               </label>
               <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.confirmPassword}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {passwordFormik.touched.confirmPassword &&
               passwordFormik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">
                     {passwordFormik.errors.confirmPassword}
                  </div>
               ) : null}
            </div>
            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
               Update Password
            </button>
         </form>
      </div>
   );
};

export default Security;
