import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SignUpForm({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("hello");
      setLoading(true); // Set loading to true when the form is submitted
      axios
        .post(`${baseUrl}/api/auth/sign-up`, {
          email: email,
          password: values.password,
          otp: otp,
        })
        .then((res) => {
          console.log(res);
          toast.success("Welcome To Bina Platform, please login");
          router.push("/auth/login");
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.message === "Email already exists") {
            toast.error("You are already signed up, please login!");
            router.push("/auth/login");
          } else {
            toast.error("Please try again!");
          }
        })
        .finally(() => {
          setLoading(false); // Reset loading to false after the request completes
        });
    },
  });

  return (
    <div className="w-[36.35vw]">
      <div className="flex">
        <button
          className="ml-auto text-[18px] font-bold"
          onClick={() => router.push("/")}
        >
          {"< "}Back
        </button>
      </div>
      <h1 className="text-[3.32vw] font-[700] text-center mb-[2.93vh]">
        Sign Up
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
            disabled
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
            value={email}
          />
        </div>
        <div className="flex flex-col gap-[1.46vh]">
          <label htmlFor="password" className="font-[700] text-[1.76vw]">
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
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-[1.46vh]">
          <label htmlFor="repeatPassword" className="font-[700] text-[1.76vw]">
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
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.repeatPassword}
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p className="text-[1.11vw] font-[400] text-center mt-[1.46vh]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#58999F]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
