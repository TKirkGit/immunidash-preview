import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
interface ActivityItem {
  id: string;
  patient: string;
  action: string;
  time: string;
  status: "completed" | "pending" | "urgent";
}
const activities: ActivityItem[] = [{
  id: "1",
  patient: "Maria Schmidt",
  action: "Blutbild komplett - Befund erstellt",
  time: "vor 2 Min",
  status: "completed"
}, {
  id: "2",
  patient: "Thomas Weber",
  action: "Allergietest - In Bearbeitung",
  time: "vor 15 Min",
  status: "pending"
}, {
  id: "3",
  patient: "Anna Müller",
  action: "Vitamin D Test - Kritischer Wert",
  time: "vor 1 Std",
  status: "urgent"
}, {
  id: "4",
  patient: "Peter Hoffmann",
  action: "Schilddrüsenwerte - Befund freigegeben",
  time: "vor 2 Std",
  status: "completed"
}, {
  id: "5",
  patient: "Lisa Braun",
  action: "Mikrobiom-Analyse - Probe eingegangen",
  time: "vor 3 Std",
  status: "pending"
}];
const statusConfig = {
  completed: {
    label: "Erledigt",
    className: "bg-success/10 text-success hover:bg-success/20"
  },
  pending: {
    label: "Bearbeitung",
    className: "bg-warning/10 text-warning hover:bg-warning/20"
  },
  urgent: {
    label: "Dringend",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20"
  }
};
export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Letzte Aktivitäten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {activity.patient.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{activity.patient}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge className={statusConfig[activity.status].className}>
                {statusConfig[activity.status].label}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}