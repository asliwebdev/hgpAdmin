import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = "https://amused-bison-equipped.ngrok-free.app"

export const chartData = [
  { month: "January", desktop: 186, fill: "#FF6384" },
  { month: "February", desktop: 305, fill: "#36A2EB" },
  { month: "March", desktop: 237, fill: "#FFCE56" },
  { month: "April", desktop: 73, fill: "#4BC0C0" },
  { month: "May", desktop: 209, fill: "#9966FF" },
  { month: "June", desktop: 214, fill: "#FF9F40" },
  { month: "July", desktop: 145, fill: "#C9CBCF" },
  { month: "August", desktop: 345, fill: "#FF5252" },
  { month: "September", desktop: 201, fill: "#33FF57"},
  { month: "October", desktop: 65, fill: "#FFD700" },
  { month: "November", desktop: 100, fill: "#1E90FF" },
  { month: "December", desktop: 214, fill: "#FF4500" },
]