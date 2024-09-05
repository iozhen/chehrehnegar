import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SignUpVerifyOtp({
  email,
  setStep,
  setOtp,
}: {
  email?: string;
  setStep: (setp: number) => void;
  setOtp: (otp: string) => void;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .length(6, "Must be exactly 6 digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${baseUrl}/api/auth/check-otp`, {
          email: email,
          otp: values.otp,
        })
        .then((res) => {
          toast.success("OTP verified successfully!");
          setOtp(values.otp);
          setLoading(false);
          setStep(2);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Invalid or expired OTP. Please try again.");
          setLoading(false);
        });
    },
  });

  return (
    <div className="w-[36.35vw]">
      <h1 className="text-[3.32vw] font-[700] text-center mb-[2.93vh]">
        Verify OTP
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[1.46vh]"
      >
        <div className="flex flex-col gap-[1.46vh] mb-[1.95vh]">
          <label htmlFor="otp" className="font-[700] text-[1.76vw]">
            OTP Code
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP code"
            className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otp}
          />
          {formik.touched.otp && formik.errors.otp ? (
            <div className="text-red-500 text-sm">{formik.errors.otp}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full h-[6.25vh] bg-[#58999F] rounded-[97.66vh] text-white mt-[3.42vh]"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Loading..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
