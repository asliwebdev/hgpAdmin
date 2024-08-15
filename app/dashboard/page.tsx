import {DataTable} from "@/components/layout/data-table";
import {getOrders} from "@/lib/data";
import {orderColumns} from "./order-columns";
import Charts from "@/app/dashboard/charts";

const orderFields = [
    {key: "id", label: "ID"},
    {key: "userId", label: "User ID"},
    {key: "orderDate", label: "Order Date"},
    {key: "orderAddress", label: "Address"},
    {key: "delivered", label: "Delivered"},
]

export default async function Dashboard() {
    const data = await getOrders()
    return <main>
        <Charts />
        <h2 className="mb-10 font-bold text-4xl">Orders</h2>
        <DataTable columns={orderColumns} data={data} fields={orderFields} />
    </main>
}