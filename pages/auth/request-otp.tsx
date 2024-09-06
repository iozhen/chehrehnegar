import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const RequestOtp = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${baseUrl}/api/auth/send-otp-for-password-reset`, {
          email: values.email,
        })
        .then((res) => {
          toast.success("OTP sent successfully!");
          setLoading(false);
          router.push(`/auth/verify-otp?email=${values.email}`);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err?.response?.data?.message === "User not found") {
            toast.error("You are not registered yet.");
            router.push("/auth/signup");
          } else {
            toast.error("Error sending OTP. Please try again.");
          }
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
          Request OTP
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
              placeholder="Enter your email address"
              className="w-[36.35vw] h-[6.25vh] rounded-[9.77vh] border-[0.1vh] border-[#CBCBCB] px-[1.73vw]"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full h-[6.25vh] bg-[#58999F] rounded-[97.66vh] text-white mt-[3.42vh]"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Loading ..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOtp;
