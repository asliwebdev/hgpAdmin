"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { LuPlus } from "react-icons/lu";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { useFormState } from "react-dom"
import { addAdmin } from "@/lib/actions"
import { toast } from "sonner"

export function AddAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function clientAction(formData: FormData) {
    const response = await addAdmin(formData);
    if (response.message) {
      toast.success(`${response.message}`);
      setIsDialogOpen(false);
    } else if(response.errorMessage) {
      setError(response.errorMessage)
    }
  }
  
  return  (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-x-2"><LuPlus className={"h-5 w-5"} /> Add admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <form action={clientAction}>
        <DialogHeader>
          <DialogTitle>Add new admin</DialogTitle>
          <DialogDescription>
            You can add new admin here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="login" className="text-right">
              Login
            </Label>
            <Input
              id="login"
              name="login"
              placeholder="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <div className="relative col-span-3">
              <Input  type={showPassword ? 'text' : 'password'} placeholder={"***********"} id="password" name="password" />
              <span onClick={togglePasswordVisibility} className="absolute right-3 cursor-pointer top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-900">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            {error &&  <p className="text-sm text-red-500 mt-2 col-span-4">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
