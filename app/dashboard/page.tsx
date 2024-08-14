import {BarChartComponent} from "@/components/charts/barchart";
import {PieChartComponent} from "@/components/charts/piechart";

export default function Dashboard() {
    return <main className="">
        <div className="flex gap-10">
            <BarChartComponent />
            <PieChartComponent />
        </div>
    </main>
}