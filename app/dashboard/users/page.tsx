import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/layout/data-table"
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa6";
import { userColumns } from './users-columns';
import { getUserStatistics, getUsers } from "@/lib/data";

const userFields = [
  { key: "email", label: "Email" },
  { key: "enabled", label: "Enabled" },
  { key: "phone", label: "Phone Number" },
  { key: "address", label: "Address" },
  { key: "firstname", label: "First Name" },
  { key: "lastname", label: "Last Name" },
  { key: "deviceId", label: "Device ID" },
  { key: "gender", label: "Gender" },
  { key: "action", label: "Action" },
];

export default async function Users() {
  const data = await getUsers()
  const statistics = await getUserStatistics()

  const cards = [
    {
      title: "All Users",
      value: statistics.allUsers,
      icon: <FaUsers className="text-4xl text-blue-500" />,
    },
    {
      title: "Enabled Users",
      value: statistics.enabled,
      icon: <FaUserCheck className="text-4xl text-green-500" />,
    },
    {
      title: "Disabled Users",
      value: statistics.disabled,
      icon: <FaUserSlash className="text-4xl text-red-500" />,
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between w-full gap-10 mb-10">
      {cards.map((card) => (
        <Card key={card.title} className="flex-1">
          <CardContent className="p-6">
          <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
                <div>{card.icon}</div>
              </div>
          </CardContent>
        </Card>
      ))}
      </div>
      <DataTable columns={userColumns} data={data} hasAddButton={true} fields={userFields} />
    </div>
  )
}
