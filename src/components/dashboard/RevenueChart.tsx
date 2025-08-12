import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Euro } from "lucide-react";

const data = [
  { month: "Jan", revenue: 45000, costs: 32000 },
  { month: "Feb", revenue: 52000, costs: 35000 },
  { month: "Mär", revenue: 48000, costs: 33000 },
  { month: "Apr", revenue: 61000, costs: 38000 },
  { month: "Mai", revenue: 55000, costs: 36000 },
  { month: "Jun", revenue: 67000, costs: 41000 },
  { month: "Jul", revenue: 59000, costs: 39000 },
  { month: "Aug", revenue: 63000, costs: 40000 },
  { month: "Sep", revenue: 58000, costs: 37000 },
  { month: "Okt", revenue: 71000, costs: 44000 },
  { month: "Nov", revenue: 65000, costs: 42000 },
  { month: "Dez", revenue: 69000, costs: 43000 }
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Euro className="h-5 w-5 text-primary" />
          Geräte Auslastung
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `€${value.toLocaleString()}`, 
                name === 'revenue' ? 'Umsatz' : 'Kosten'
              ]}
            />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="costs" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}