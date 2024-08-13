'use client'

import { usePathname, useRouter } from "next/navigation";
import {LogOut} from "lucide-react";
import { deleteCookie } from "@/lib/actions";
import { toast } from "sonner";

const Navbar = () => {
   const pathname = usePathname();
   const router = useRouter();

   async function logOut() {
    const response = await deleteCookie();
    if (response.message) {
      toast.success(`${response.message}`);
      router.push("/");
    }
  }

  return (
    <div className={"flex w-full justify-between py-5 px-6 border-b"}>
      <h1 className="font-bold text-2xl capitalize p-1">{pathname.split("/").pop()}</h1>
      <button type="button" className="flex items-center justify-center gap-x-2 text-red-600" onClick={logOut}>
      <LogOut /> <span className={"font-medium"}>Log out</span>
      </button>
    </div>
  )
}

export default Navbar;