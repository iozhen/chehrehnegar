import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setAvatar } from "@/redux/slices/ProfilesSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Account: React.FC = () => {
   const profileData = useSelector((state) => state.profile.ProfileData);
   const avatarRedux = useSelector((state) => state.profile.avatar);
   const token = Cookies.get("token");
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [avatarFile, setAvatarFile] = useState<File | null>(null);
   const [firstName, setFirstName] = useState<string>("");
   const [lastName, setLastName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const inputRef = useRef<HTMLInputElement>(null);
   const dispatch = useDispatch();

   useEffect(() => {
      if (profileData) {
         setFirstName(profileData.firstName);
         setLastName(profileData.lastName);
         setEmail(profileData.email);
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
               setFirstName(res.data.data.firstName);
               setLastName(res.data.data.lastName);
               setEmail(res.data.data.email);
            })
            .catch((err) => {
               console.log("Error fetching profile data:", err);
            });
      }
   }, [profileData, dispatch, baseUrl, token]);

   const handleReset = () => {
      dispatch(setAvatar("/images/Avatar.png")); // Save avatar to Redux
      setAvatarFile(null);
      setFirstName(profileData.firstName);
      setLastName(profileData.lastName);
      setEmail(profileData.email);
      // toast.info("Profile image reset to default.");
   };

   const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         setAvatarFile(file);

         const reader = new FileReader();
         reader.onloadend = () => {
            dispatch(setAvatar(reader.result as string)); // Save avatar to Redux
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSaveChanges = async () => {
      try {
         // Send avatar upload request if there's a new file
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
            dispatch(setAvatar(avatarResponse.data.data)); // Save avatar to Redux
         }

         // Send profile data update request
         const profileResponse = await axios.put(
            `${baseUrl}/api/user/edit-profile`,
            {
               firstName,
               lastName,
               email,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         dispatch(setProfileData({ ...profileResponse.data.data }));
         toast.success("Profile updated successfully");
      } catch (error) {
         console.error("Error updating the profile:", error);
         toast.error("Error updating the profile");
      }
   };

   const handleClick = () => {
      if (inputRef.current) {
         inputRef.current.click();
      }
   };

   const constructAvatarUrl = (path) => {
      if (path.startsWith("uploads\\")) {
         return `${baseUrl}/${path.replace(/\\/g, "/")}`;
      }
      return path;
   };

   return (
      <div>
         <div className="flex items-center">
            <img
               src={constructAvatarUrl(avatarRedux)}
               alt="profile photo"
               className="w-[120px] h-[120px]"
            />
            <div>
               <div className="flex items-center gap-[16px]">
                  <div
                     onClick={handleClick}
                     className="mt-1 block w-full border border-gray-300 rounded-md bg-blue-500 text-white text-center py-2 cursor-pointer"
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
                  <button onClick={handleReset}>Reset</button>
               </div>
               <h3>Allowed JPG, JPEG, or PNG. Max size of 500K</h3>
            </div>
         </div>
         <div className="flex items-center">
            <div className="">
               <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
               </label>
               <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
            </div>
            <div className="">
               <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
               </label>
               <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
               />
            </div>
         </div>
         <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium">
               Email
            </label>
            <input
               type="email"
               id="email"
               name="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="mt-1 block w-full border border-gray-300 rounded-md"
            />
         </div>
         <div className="mt-6 flex gap-[16px]">
            <button
               onClick={handleSaveChanges}
               className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
               Save Changes
            </button>
            <button
               onClick={handleReset}
               className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
               Cancel
            </button>
         </div>
      </div>
   );
};

export default Account;
