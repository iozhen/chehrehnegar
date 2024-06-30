import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="bg-[#465261] min-h-[100vh] w-[100vw]">
        <Header />
        <div className="flex w-full relative">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
