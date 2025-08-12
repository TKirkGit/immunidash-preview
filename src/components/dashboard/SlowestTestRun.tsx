import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type TestRun = { id: number; test: string; dauer: string; geraet: string };

const slowestRuns: TestRun[] = [
  { id: 1, test: "HPLC", dauer: "42m 10s", geraet: "HPLC-9000" },
  { id: 2, test: "DNA-PCR", dauer: "38m 55s", geraet: "Cobas 6800" },
  { id: 3, test: "Immunoassay", dauer: "35m 20s", geraet: "E801" },
];

export function SlowestTestRun() {
  return (
    <Card className="h-dashboard-card flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Hourglass className="h-5 w-5 text-destructive" />
          Längster Testlauf heute
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full" type="auto">
          <div className="px-4 py-4 space-y-3">
            {slowestRuns.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
              >
                <div>
                  <p className="text-sm font-medium">{run.test}</p>
                  <p className="text-xs text-muted-foreground">{run.geraet}</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground">{run.dauer}</span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default SlowestTestRun;
