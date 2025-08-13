import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Anomaly = { id: number; pid: string; barcode: string; labnr: string; zeit: string };

const anomalies: Anomaly[] = [
  { id: 1, pid: "001", barcode: "50957780", labnr: "2506241609", zeit: "09:12" },
  // ...
];

export function RecentAnomalies() {
  const navigate = useNavigate();

  return (
    <Card className="h-[420px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">🚨 Letzte Anomalieberichte</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full" type="always">
          <div className="px-4 py-4 space-y-3">
            {anomalies.map((a) => (
              <div
                key={a.id}
                onClick={() => navigate(`/patients/${a.pid}`)}
                className="p-3 rounded-lg border bg-muted/30 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground leading-none mb-1">PID</p>
                    <p className="font-semibold font-mono">{a.pid}</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono tabular-nums">{a.zeit}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground leading-none mb-1">Barcode</p>
                    <p className="font-mono">{a.barcode}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground leading-none mb-1">Labnr</p>
                    <p className="font-mono">{a.labnr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default RecentAnomalies;
