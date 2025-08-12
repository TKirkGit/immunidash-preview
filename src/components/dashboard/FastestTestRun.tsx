import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type TestRun = { id: number; test: string; dauer: string; geraet: string };

const fastestRuns: TestRun[] = [
  { id: 1, test: "KREURI", dauer: "4m 35s", geraet: "C503" },
  { id: 2, test: "LDH", dauer: "5m 12s", geraet: "Cobas Pro" },
  { id: 3, test: "CK", dauer: "5m 58s", geraet: "C502" },
];

export function FastestTestRun() {
  return (
    <Card className="h-dashboard-card flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Timer className="h-5 w-5 text-success" />
          Schnellster Testlauf heute
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full" type="auto">
          <div className="px-4 py-4 space-y-3">
            {fastestRuns.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
              >
                <div>
                  <p className="text-sm font-medium">{run.test}</p>
                  <p className="text-xs text-muted-foreground">{run.geraet}</p>
                </div>
                <span className="text-sm font-mono text-primary">{run.dauer}</span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default FastestTestRun;
