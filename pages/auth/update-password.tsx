import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const UpdatePassword = () => {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const router = useRouter();
   const { email } = router.query;
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: {
         newPassword: "",
         confirmPassword: "",
      },
      validationSchema: Yup.object({
         newPassword: Yup.string().required("Required"),
         confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Required"),
      }),
      onSubmit: (values) => {
         setLoading(true); // Set loading to true when the form is submitted
         axios
            .post(`${baseUrl}/api/auth/reset-password`, {
               email: email,
               newPassword: values.newPassword,
            })
            .then((res) => {
               toast.success("Password reset successfully!");
               router.push("/auth/login");
            })
            .catch((err) => {
               console.log(err);
               toast.error("Error resetting password. Please try again.");
            })
            .finally(() => {
               setLoading(false); // Reset loading to false after the request completes
            });
      },
   });

   return (
      <div className="flex p-[2.08vw] items-center gap-[7.82vw] overflow-y-hidden h-[100vh]">
         <img
            src="/images/loginBack.webp"
            alt=""
            className="w-[44.37vw] h-[91.41vh]"
         />
         <div className="w-[36.35vw]">
            <h1 className="text-[3.32vw] font-[700] text-center mb-[2.93vh]">
               Reset Password
            </h1>
            <form
               onSubmit={formik.handleSubmit}
               className="flex flex-col gap-[1.46vh]"
            >
               <div className="flex flex-col gap-[1.46vh] mb-[1.95vh]">
                  <label
                     htmlFor="newPassword"
                     className="font-[700] text-[1.76vw]"
                  >
                     New Password
                  </label>
                  <input
                     type="password"
                     id="newPassword"
                     name="newPassword"
                     placeholder="Enter new password"
                     className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.newPassword}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                     <div className="text-red-500 text-sm">
                        {formik.errors.newPassword}
                     </div>
                  ) : null}
               </div>
               <div className="flex flex-col gap-[1.46vh]">
                  <label
                     htmlFor="confirmPassword"
                     className="font-[700] text-[1.76vw]"
                  >
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     id="confirmPassword"
                     name="confirmPassword"
                     placeholder="Confirm new password"
                     className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                     <div className="text-red-500 text-sm">
                        {formik.errors.confirmPassword}
                     </div>
                  ) : null}
               </div>
               <button
                  type="submit"
                  className={`w-full h-[6.25vh] bg-[#58999F] rounded-[97.66vh] text-white mt-[3.42vh] ${
                     loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
               >
                  {loading ? "Loading..." : "Reset Password"}
               </button>
            </form>
         </div>
      </div>
   );
};

export default UpdatePassword;