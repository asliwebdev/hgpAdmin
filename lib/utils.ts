import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {ChartConfig} from "@/components/ui/chart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = "https://amused-bison-equipped.ngrok-free.app"

export const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#FF5252",
  "#33FF57",
  "#FFD700",
  "#1E90FF",
  "#FF4500"
];
export const monthNames = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};
export const chartConfig = {
  January: {
    label: "January",
    color: "#FF6384",
  },
  February: {
    label: "February",
    color: "#36A2EB",
  },
  March: {
    label: "March",
    color: "#FFCE56",
  },
  April: {
    label: "April",
    color: "#4BC0C0",
  },
  May: {
    label: "May",
    color: "#9966FF",
  },
  June: {
    label: "June",
    color: "#FF9F40",
  },
  July: {
    label: "July",
    color: "#C9CBCF",
  },
  August: {
    label: "August",
    color: "#FF5252",
  },
  September: {
    label: "September",
    color: "#33FF57",
  },
  October: {
    label: "October",
    color: "#FFD700",
  },
  November: {
    label: "November",
    color: "#1E90FF",
  },
  December: {
    label: "December",
    color: "#FF4500",
  },
} satisfies ChartConfig;

