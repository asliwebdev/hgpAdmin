import {cn} from "@/lib/utils";
import Sidebar from "@/components/layout/sidebar";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex h-screen md:overflow-hidden",
      )}
    >
      <Sidebar />
        <div className={"py-4 pl-4 pr-6"}>
          {children}
        </div>
      </div>
  );
}