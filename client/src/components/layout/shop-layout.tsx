import { ReactNode } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";

interface ShopLayoutProps {
  children: ReactNode;
}

export function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
