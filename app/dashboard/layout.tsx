import {cn} from "@/lib/utils";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import {getMessagesCount} from "@/lib/data";

export default async function Layout({children}: { children: React.ReactNode }) {
  const numOfMessages = await getMessagesCount();
  return (
    <div
      className={cn(
        "flex h-screen md:overflow-hidden",
      )}
    >
      <Sidebar numOfMessages={numOfMessages} />
      <div className="flex-grow md:overflow-y-auto">
        <Navbar />
        <div className={"p-8"}>
          {children}
        </div>
      </div>
      </div>
  );
}