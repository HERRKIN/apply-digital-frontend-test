"use client";
import Footer from "./footer";
import Header from "./header";
import { Providers } from "./providers";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="flex flex-col flex-1 justify-between min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </Providers>
  );
};