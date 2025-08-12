import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Cpu } from "lucide-react";

type Point = { label: string; auslastung: number; ziel?: number };

interface Props {
  title?: string;
  subtitle?: string;
  data?: Point[];
}

const defaultData: Point[] = [
  { label: "Jan", auslastung: 45, ziel: 60 },
  { label: "Feb", auslastung: 58, ziel: 60 },
  { label: "Mrz", auslastung: 72, ziel: 60 },
  { label: "Apr", auslastung: 65, ziel: 60 },
  { label: "Mai", auslastung: 78, ziel: 60 },
  { label: "Jun", auslastung: 70, ziel: 60 },
];

export function DeviceUtilizationChart({
  title = "Geräte-Auslastung",
  subtitle = "Letzte 6 Monate",
  data = defaultData,
}: Props) {
  return (
    <Card className="h-[360px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Cpu className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis width={32} tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Bar name="Auslastung (%)" dataKey="auslastung" radius={[6,6,0,0]} />
            {/* Optional zweite Serie als Ziel-/Referenzwert */}
            <Bar name="Ziel (%)" dataKey="ziel" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default DeviceUtilizationChart;
