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
         .get(`${baseUrl}/api/user/get-profile`)
         .then((res) => {
            dispatch(setProfileData({ ...res.data.data }));
         })
         .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
         });
   }, [profileData]);

   const formik = useFormik({
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
         <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumber}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                  <div className="text-red-500 text-sm">
                     {formik.errors.mobileNumber}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">
                     {formik.errors.firstName}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">
                     {formik.errors.lastName}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
               {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                     {formik.errors.email}
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
      </div>
   );
};

export default UserProfile;
