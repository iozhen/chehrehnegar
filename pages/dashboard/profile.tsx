import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "@/redux/slices/ProfilesSlice";

const UserProfile = () => {
   const dispatch = useDispatch();
   const profileData = useSelector((state) => state.profile.ProfileData);
   const router = useRouter();
   const [avatar, setAvatar] = useState(null);
   const token = Cookies.get("token");
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

   useEffect(() => {
      if (profileData) {
         return;
      }
      axios
         .get(`${baseUrl}/api/user/get-profile`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(setProfileData({ ...res.data.data }));
         })
         .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
         });
   }, [profileData]);

   const profileFormik = useFormik({
      initialValues: {
         mobileNumber: profileData?.mobileNumber || "",
         firstName: profileData?.firstName || "",
         lastName: profileData?.lastName || "",
         email: profileData?.email || "",
         avatar: null,
      },
      enableReinitialize: true,
      validationSchema: Yup.object({
         firstName: Yup.string().required("Required"),
         lastName: Yup.string().required("Required"),
         email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
      }),
      onSubmit: (values) => {
         axios
            .put(
               `${baseUrl}/api/user/edit-profile`,
               {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  avatar: values.avatar,
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
               dispatch(setProfileData({ ...res.data.data }));
               toast.success("Profile updated successfully!");
            })
            .catch((err) => {
               toast.error("Failed to update profile");
            });
      },
   });

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

   const handleAvatarChange = async (event) => {
      const file = event.currentTarget.files[0];
      if (file) {
         const formData = new FormData();
         formData.append("avatar", file);

         try {
            const response = await axios.post(
               `${baseUrl}/api/user/upload-avatar`,
               formData,
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                     "Content-Type": "multipart/form-data",
                  },
               }
            );

            console.log("Avatar upload response:", response.data);
            setAvatar(URL.createObjectURL(file));
            toast.success("Avatar uploaded successfully!");
         } catch (error) {
            console.error("Error uploading avatar:", error);
            toast.error("Failed to upload avatar");
         }
      }
   };

   return (
      <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
         <form onSubmit={profileFormik.handleSubmit} className="space-y-4">
            <div>
               <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium"
               >
                  Mobile Number
               </label>
               <input
                  disabled
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values.mobileNumber}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {profileFormik.touched.mobileNumber &&
               profileFormik.errors.mobileNumber ? (
                  <div className="text-red-500 text-sm">
                     {profileFormik.errors.mobileNumber}
                  </div>
               ) : null}
            </div>
            <div>
               <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
               </label>
               <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values.firstName}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {profileFormik.touched.firstName &&
               profileFormik.errors.firstName ? (
                  <div className="text-red-500 text-sm">
                     {profileFormik.errors.firstName}
                  </div>
               ) : null}
            </div>
            <div>
               <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
               </label>
               <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values.lastName}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {profileFormik.touched.lastName &&
               profileFormik.errors.lastName ? (
                  <div className="text-red-500 text-sm">
                     {profileFormik.errors.lastName}
                  </div>
               ) : null}
            </div>
            <div>
               <label htmlFor="email" className="block text-sm font-medium">
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values.email}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {profileFormik.touched.email && profileFormik.errors.email ? (
                  <div className="text-red-500 text-sm">
                     {profileFormik.errors.email}
                  </div>
               ) : null}
            </div>
            <div>
               <label htmlFor="avatar" className="block text-sm font-medium">
                  Avatar
               </label>
               <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleAvatarChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {avatar && (
                  <div className="mt-2">
                     <img
                        src={avatar}
                        alt="avatar"
                        className="h-20 w-20 rounded-full object-cover"
                     />
                  </div>
               )}
            </div>
            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
               Update Profile
            </button>
         </form>
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

export default UserProfile;
