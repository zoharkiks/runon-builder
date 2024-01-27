import { Poppins } from "next/font/google";
import "./globals.css";
import DNDWrapper from "@/components/DNDWrapper";
import { Toaster } from "@/components/ui/toaster"


const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "500"] });

export const metadata = {
  title: "Runon Builder",
  description: "A Site Builder for Runon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  `}>
        <DNDWrapper>{children}</DNDWrapper>
        <Toaster />

      </body>
    </html>
  );
}
