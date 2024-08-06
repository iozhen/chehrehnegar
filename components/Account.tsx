import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setAvatar } from "@/redux/slices/ProfilesSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import * as Yup from "yup";

const Account: React.FC = () => {
  const profileData = useSelector((state) => state.profile.ProfileData);
  const avatarRedux = useSelector((state) => state.profile.avatar);
  const token = Cookies.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileData) {
      formik.setValues({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || "",
        nationalCode: profileData.nationalCode || "",
        mobile: profileData.mobile || "",
        birthday: profileData.birthday
          ? new Date(profileData.birthday).toISOString().split("T")[0]
          : "", // Format the birthday correctly
      });
      dispatch(setAvatar(profileData.avatar));
    } else {
      axios
        .get(`${baseUrl}/api/user/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setProfileData({ ...res.data.data }));
          formik.setValues({
            firstName: res.data.data.firstName || "",
            lastName: res.data.data.lastName || "",
            email: res.data.data.email || "",
            nationalCode: res.data.data.nationalCode || "",
            mobile: res.data.data.mobile || "",
            birthday: res.data.data.birthday
              ? new Date(res.data.data.birthday).toISOString().split("T")[0]
              : "", // Format the birthday correctly
          });
        })
        .catch((err) => {
          console.log("Error fetching profile data:", err);
        });
    }
  }, [profileData, dispatch, baseUrl, token]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      nationalCode: "",
      mobile: "",
      birthday: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      nationalCode: Yup.string().required("National code is required"),
      mobile: Yup.string().required("Mobile is required"),
      birthday: Yup.date().required("Birthday is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (avatarFile) {
          const formData = new FormData();
          formData.append("avatar", avatarFile);

          const avatarResponse = await axios.post(
            `${baseUrl}/api/user/upload-avatar`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(setAvatar(avatarResponse.data.data));
        }

        const profileResponse = await axios.put(
          `${baseUrl}/api/user/edit-profile`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setProfileData({ ...profileResponse.data.data }));
        toast.success("Profile updated successfully");
        console.log(profileResponse);
      } catch (error) {
        console.error("Error updating the profile:", error);
        toast.error("Error updating the profile");
      }
    },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleReset = () => {
    dispatch(setAvatar("/images/Avatar.png"));
    setAvatarFile(null);
    formik.resetForm();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setAvatar(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const constructAvatarUrl = (path: string) => {
    if (path?.startsWith("uploads\\")) {
      return `${baseUrl}/${path.replace(/\\/g, "/")}`;
    }
    return path;
  };

  return (
    <div className="py-[3.5vh]">
      <div className="flex items-center gap-[20px]">
        <img
          src={
            constructAvatarUrl(avatarRedux)
              ? constructAvatarUrl(avatarRedux)
              : "/images/Avatar.png"
          }
          alt="profile photo"
          className="w-[11.71vh] h-[11.71vh] rounded-[10px]"
        />
        <div>
          <div className="flex items-center gap-[16px]">
            <div
              onClick={handleClick}
              className="px-[22px] py-[0.68vh] bg-[#4379EE] text-[14px] font-[500] text-white rounded-[8px] cursor-pointer"
            >
              Upload new photo
            </div>
            <input
              type="file"
              id="avatar"
              name="avatar"
              ref={inputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/jpeg,image/png,image/jpg"
            />
            <button
              onClick={handleReset}
              className="bg-transparent border-[1px] border-[#FF4D49] text-[14px] font-[500] px-[22px] py-[0.68vh] text-[#FF4D49] rounded-[8px]"
            >
              Reset
            </button>
          </div>
          <h3 className="mt-[1.56vh] text-[#4c4e64a1] text-[12px] font-[400]">
            Allowed JPG, JPEG, or PNG. Max size of 500K
          </h3>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center w-full gap-[24px] mt-[4.49vh]">
          <div className="w-full relative">
            <label
              htmlFor="firstName"
              className="absolute top-[-20%] left-[2%] bg-white text-[12px] font-[400] text-[#4c4e64a5] px-[4px]"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full border border-gray-300 rounded-md py-[1.46vh] px-[12px] text-[16px]"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm absolute">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>
          <div className="w-full relative">
            <label
              htmlFor="lastName"
              className="absolute top-[-20%] left-[2%] bg-white text-[12px] font-[400] text-[#4c4e64a5] px-[4px]"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full border border-gray-300 rounded-md py-[1.46vh] px-[12px] text-[16px]"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm absolute">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center w-full gap-[24px] mt-[4.49vh]">
          <div className=" relative w-full">
            <label
              htmlFor="nationalCode"
              className="absolute top-[-20%] left-[1%] bg-white text-[12px] font-[400] text-[#4c4e64a5] px-[4px]"
            >
              National Code
            </label>
            <input
              type="text"
              id="nationalCode"
              name="nationalCode"
              value={formik.values.nationalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full border border-gray-300 rounded-md py-[1.46vh] px-[12px] text-[16px]"
            />
            {formik.touched.nationalCode && formik.errors.nationalCode ? (
              <div className="text-red-500 text-sm absolute">
                {formik.errors.nationalCode}
              </div>
            ) : null}
          </div>
          <div className=" relative w-full">
            <label
              htmlFor="mobile"
              className="absolute top-[-20%] left-[1%] bg-white text-[12px] font-[400] text-[#4c4e64a5] px-[4px]"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full border border-gray-300 rounded-md py-[1.46vh] px-[12px] text-[16px]"
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-red-500 text-sm absolute">
                {formik.errors.mobile}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center w-full gap-[24px] mt-[4.49vh]">
          <div className=" relative w-full">
            <label
              htmlFor="birthday"
              className="absolute top-[-20%] left-[1%] bg-white text-[12px] font-[400] text-[#4c4e64a5] px-[4px]"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full border border-gray-300 rounded-md py-[1.46vh] px-[12px] text-[16px]"
            />
            {formik.touched.birthday && formik.errors.birthday ? (
              <div className="text-red-500 text-sm absolute">
                {formik.errors.birthday}
              </div>
            ) : null}
          </div>
          <div className="relative w-full">
            <label
              htmlFor="email"
              className="absolute top-[-20%] left-[1%] bg-white text-[12px] font-[400] text-[#4c4e64a5] px-[4px]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled
              value={profileData?.email}
              readOnly
              className="block w-full border border-gray-300 rounded-md py-[1.46vh] px-[12px] text-[16px]"
            />
          </div>
        </div>
        <div className="flex gap-[16px] mt-[4.49vh]">
          <button
            type="submit"
            className="px-[22px] py-[0.68vh] bg-[#4379EE] text-[14px] font-[500] text-white rounded-[8px]"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-transparent border-[1px] border-[#6D788D] text-[14px] font-[500] px-[22px] py-[0.68vh] text-[#6D788D] rounded-[8px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
