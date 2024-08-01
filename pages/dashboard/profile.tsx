import Account from "@/components/Account";
import Security from "@/components/Security";
import React, { useState, useEffect } from "react";

const UserProfile = () => {
   return (
      <div className="">
         <img src="/images/banner-dashboard.webp" alt="banner" />
         <div className="flex items-center gap-[18px]">
            <button>Account</button>
            <button>Security</button>
         </div>
         <Account />
         <Security />
      </div>
   );
};

export default UserProfile;
