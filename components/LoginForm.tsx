"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { login } from "@/lib/actions"
import { useFormState } from "react-dom"

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, dispatch] = useFormState(login, undefined);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your login and password to enter dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login">Login</Label>
              <Input id="login" name="login" placeholder="enter your login" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
              <Input  type={showPassword ? 'text' : 'password'} placeholder={"***********"} id="password" name="password" />
              <span onClick={togglePasswordVisibility} className="absolute right-3 cursor-pointer top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-900">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
          </div>
          {error &&  <p className="text-sm text-red-500 mt-2">{error.errorMessage}</p>}
          <div className="mt-6 flex justify-center">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}