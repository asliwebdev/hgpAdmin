"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {chartConfig,} from "@/lib/utils";
import {OrderStatistic} from "@/types";
import {YearSelector} from "@/components/ui/year-selector";

interface Order {
    orderStatistics: OrderStatistic[];
    year: number;
    setYear: (year: number) => void;
}

export function BarChartComponent({ orderStatistics, year, setYear }: Order) {
  return (
    <Card className="w-[50%]">
      <CardHeader className="flex flex-row justify-between items-center">
          <div>
              <CardTitle> Statistics for selling devices </CardTitle>
              <CardDescription>January - December {year}</CardDescription>
          </div>
          <YearSelector year={year} setYear={setYear} />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={orderStatistics}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="number" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing total orders for the 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
