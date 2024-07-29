import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const SignUp = () => {
   const formik = useFormik({
      initialValues: {
         mobile: "",
         password: "",
         repeatPassword: "",
      },
      validationSchema: Yup.object({
         mobile: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, "Must be exactly 10 digits")
            .max(10, "Must be exactly 10 digits")
            .required("Required"),
         password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Required"),
         repeatPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
      }),
      onSubmit: (values) => {
         // Handle form submission
         console.log(values);
      },
   });

   return (
      <div className="flex p-[2.08vw] items-center gap-[7.82vw] overflow-y-hidden h-[100vh]">
         {/* image */}
         <img
            src="/images/loginBack.png"
            alt=""
            className="w-[44.37vw] h-[91.41vh]"
         />

         {/* sign up form */}
         <div className="w-[36.35vw]">
            <h1 className="text-[3.32vw] font-[700] text-center mb-[2.93vh]">
               Sign Up
            </h1>
            <form
               onSubmit={formik.handleSubmit}
               className="flex flex-col gap-[1.46vh]"
            >
               <div className="flex flex-col gap-[1.46vh] mb-[1.95vh]">
                  <label htmlFor="mobile" className="font-[700] text-[1.76vw]">
                     Mobile Number
                  </label>
                  <input
                     type="text"
                     id="mobile"
                     name="mobile"
                     placeholder="Enter your mobile number"
                     className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.mobile}
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                     <div className="text-red-500 text-sm">
                        {formik.errors.mobile}
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
               <div className="flex flex-col gap-[1.46vh]">
                  <label
                     htmlFor="repeatPassword"
                     className="font-[700] text-[1.76vw]"
                  >
                     Repeat Password
                  </label>
                  <input
                     type="password"
                     id="repeatPassword"
                     name="repeatPassword"
                     placeholder="Repeat your password"
                     className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.repeatPassword}
                  />
                  {formik.touched.repeatPassword &&
                  formik.errors.repeatPassword ? (
                     <div className="text-red-500 text-sm">
                        {formik.errors.repeatPassword}
                     </div>
                  ) : null}
               </div>
               <button
                  type="submit"
                  className="w-full h-[6.25vh] bg-[#58999F] rounded-[97.66vh] text-white mt-[3.42vh]"
               >
                  Sign Up
               </button>
               <p className="text-[1.11vw] font-[400] text-center mt-[1.46vh]">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-[#58999F]">
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
};

export default SignUp;
