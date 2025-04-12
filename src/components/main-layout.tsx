"use client";
import Footer from "./footer";
import Header from "./header";
import { Providers } from "./providers";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
    </Providers>
  );
};