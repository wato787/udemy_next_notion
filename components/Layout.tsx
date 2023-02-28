import { LayoutProps } from "@/types/types";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        <Navbar />
        <main className="w-full pb-2 px-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
