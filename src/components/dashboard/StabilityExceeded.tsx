import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type StabilityItem = { id: number; barcode: string; zeit: string; geraet: string };

const stabilityExceeded: StabilityItem[] = [
  { id: 1, barcode: "50957780", zeit: "+15 min", geraet: "C503" },
  { id: 2, barcode: "50929555", zeit: "+42 min", geraet: "Cobas Pro" },
  { id: 3, barcode: "50960013", zeit: "+7 min", geraet: "C503" },
  { id: 4, barcode: "50961117", zeit: "+23 min", geraet: "C501" },
];

export function StabilityExceeded() {
  return (
    <Card className="h-dashboard-card flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Überschrittener Stabilitätszeit
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full" type="auto">
          <div className="px-4 py-4 space-y-3">
            {stabilityExceeded.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
              >
                <div>
                  <p className="text-sm font-mono">{item.barcode}</p>
                  <p className="text-xs text-muted-foreground">{item.geraet}</p>
                </div>
                <span className="text-sm font-semibold text-destructive">{item.zeit}</span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default StabilityExceeded;
