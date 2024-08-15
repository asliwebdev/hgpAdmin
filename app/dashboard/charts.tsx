"use client"

import {BarChartComponent} from "@/components/charts/barchart";
import {PieChartComponent} from "@/components/charts/piechart";
import {colors, monthNames} from "@/lib/utils";
import {getOrderStatistics} from "@/lib/data";
import {OrderStatistic} from "@/types";
import {useEffect, useState} from "react";

export default function Charts() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [orderStatistics, setOrderStatistics] = useState<OrderStatistic[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrderStatistics(year) as OrderStatistic[];
            setOrderStatistics(data);
        };

        fetchData();
    }, [year]);

    const filledStatistics = orderStatistics.map((stat, index) => {
        const monthKey = stat.month.toString().padStart(2, "0") as keyof typeof monthNames;
        return {...stat, month: monthNames[monthKey], fill: colors[index]}
    })

    return <div className="flex gap-10 mb-10">
        <BarChartComponent year={year} setYear={setYear} orderStatistics={filledStatistics}/>
        <PieChartComponent year={year} orderStatistics={filledStatistics}/>
    </div>
}