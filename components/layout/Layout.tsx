import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="min-h-[100vh] w-[100vw]">
        <Header />
        <div className="w-full h-screen">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
