import Sidebar from "@/components/Sidebar";
import WebsiteSection from "@/components/WebsiteSection";


export default function Home() {
  return (
      

    <main className="grid grid-cols-12 h-dvh">
      <Sidebar />
      <WebsiteSection />
    </main>
  );
}
