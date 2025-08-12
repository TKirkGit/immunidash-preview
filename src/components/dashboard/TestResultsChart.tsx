import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import ChartTableSwitch from "@/components/common/ChartTableSwitch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const data = [
  { name: "Mo", tests: 45, completed: 42 },
  { name: "Di", tests: 52, completed: 48 },
  { name: "Mi", tests: 38, completed: 35 },
  { name: "Do", tests: 61, completed: 58 },
  { name: "Fr", tests: 55, completed: 51 },
  { name: "Sa", tests: 22, completed: 20 },
  { name: "So", tests: 15, completed: 14 },
];

export function TestResultsChart() {
  const [mode, setMode] = useState<"chart" | "table">("chart");

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Wöchentliche Teststatistiken
        </CardTitle>
        <ChartTableSwitch mode={mode} onChange={setMode} ariaLabel="Ansicht umschalten: Diagramm oder Tabelle" />
      </CardHeader>
      <CardContent className="graph-big">
        {mode === "chart" ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="tests" 
                  fill="hsl(var(--primary))"
                  name="Tests gesamt"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="completed" 
                  fill="hsl(var(--success))"
                  name="Abgeschlossen"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto max-w-full">
            <Table aria-label="Wöchentliche Teststatistiken Tabelle">
              <TableHeader>
                <TableRow>
                  <TableHead>Tag</TableHead>
                  <TableHead>Tests gesamt</TableHead>
                  <TableHead>Abgeschlossen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.tests}</TableCell>
                    <TableCell>{d.completed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
