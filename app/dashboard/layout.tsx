import {cn} from "@/lib/utils";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex h-screen md:overflow-hidden",
      )}
    >
      <Sidebar />
      <div className="flex-grow md:overflow-y-auto">
        <Navbar />
        <div className={"p-8"}>
          {children}
        </div>
      </div>
      </div>
  );
}