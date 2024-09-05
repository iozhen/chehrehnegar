import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import SignUpRequestOtp from "@/components/signUp/signUpRequestOtp";
import SignUpVerifyOtp from "@/components/signUp/signUpVerifyOtp";
import SignUpForm from "@/components/signUp/signUpForm";

const SignUp = () => {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  return (
    <div className="flex p-[2.08vw] items-center gap-[7.82vw] overflow-y-hidden h-[100vh]">
      {/* image */}
      <img
        src="/images/loginBack.webp"
        alt=""
        className="w-[44.37vw] h-[91.41vh]"
      />

      {/* sign up form */}
      {step === 0 ? (
        <SignUpRequestOtp setStep={setStep} setEmail={setEmail} />
      ) : step === 1 ? (
        <SignUpVerifyOtp email={email} setStep={setStep} setOtp={setOtp} />
      ) : (
        <SignUpForm otp={otp} email={email} />
      )}
    </div>
  );
};

export default SignUp;
