'use client'

import {
    MdDashboard,
  MdMessage,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdPeople,
} from "react-icons/md";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import Link from "next/link";
import {motion} from "framer-motion";
import {useState} from "react";
import {Badge} from "@/components/ui/badge";

type SidebarProps = {
    numOfMessages: number;
}

const Sidebar = ({numOfMessages}: SidebarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true)

  const sidebarLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      href: "/dashboard/messages",
      label: "Messages",
      icon: <MdMessage />,
    },
    {
      href: "/dashboard/users",
      label: "Users",
      icon: <MdPeople />,
    },
  ]
  return (
    <motion.div
      animate={{
        width: open ? "288px" : "80px",
      }}
      className={clsx("flex flex-col justify-between border-r-[1px] border-solid border-secondary dark:border-dark-secondary pb-4", {
        "px-3": open,
      })}>
      <div className={"flex flex-col space-y-4"}>
        <div className={"p-4 border-b-[1px] border-solid border-secondary dark:border-dark-secondary"}>
          <motion.h1 className={"text-[28px] font-bold p-1 transition duration-150"}>
            {open ? "Hgp" : "H"}
            <span className={"text-primary"}>
              {open ? "Admin" : "A"}
            </span></motion.h1>
        </div>
        <div className={"flex flex-col space-y-1"}>
          {sidebarLinks.map((link) => (
            <Link href={link.href} key={link.label}
                  className={clsx("flex items-center justify-between py-2 px-3 rounded-md hover:bg-[#F6F8FA] dark:hover:bg-[#1F242F] cursor-pointer", {
                    "bg-[#F6F8FA] border-solid border-r-[6px] border-primary dark:bg-[#1F242F]": pathname === link.href,
                    "mx-3": !open,
                  })}>
              <div className={"flex gap-x-3 items-center"}>
                <div className={"relative"}>
                  {link.icon}
                </div>
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className={"whitespace-pre"}
                >{link.label}</motion.span>
              </div>
              <motion.div
                animate={
                  {
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }
                }
              > {(link.label === "Messages" && numOfMessages > 0) && <Badge className={"rounded-md"} variant={"destructive"}>{numOfMessages}</Badge>}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <div className={clsx("flex gap-x-3 items-center py-2 px-3 cursor-pointer", {
        "justify-center": !open,
      })} onClick={() => setOpen(!open)}>
        {open ? <MdOutlineKeyboardArrowLeft className={"w-5 h-5 text-black dark:text-white"}/> : <MdOutlineKeyboardArrowRight className={"w-5 h-5 text-black dark:text-white"}/>}
        <motion.span
          animate={{
            display: open ? "inline-block" : "none",
            opacity: open ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={"whitespace-pre"}
        >Minimize</motion.span>
      </div>
    </motion.div>
  )
}

export default Sidebar