import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

const appointments = [
  {
    id: 1,
    patient: "Maria Schmidt",
    time: "09:00",
    type: "Bluttest",
    status: "Bestätigt",
    priority: "normal"
  },
  {
    id: 2,
    patient: "Hans Müller",
    time: "10:30",
    type: "Urinanalyse",
    status: "Wartend",
    priority: "hoch"
  },
  {
    id: 3,
    patient: "Anna Weber",
    time: "11:15",
    type: "Röntgen",
    status: "In Bearbeitung",
    priority: "normal"
  },
  {
    id: 4,
    patient: "Klaus Fischer",
    time: "14:00",
    type: "MRT",
    status: "Bestätigt",
    priority: "niedrig"
  },
  {
    id: 5,
    patient: "Eva Braun",
    time: "15:30",
    type: "CT-Scan",
    status: "Wartend",
    priority: "hoch"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Bestätigt":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Wartend":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "In Bearbeitung":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export function RecentAppointments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          Heutige Termine
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {appointment.time}
                </div>
                <div>
                  <p className="font-medium text-sm">{appointment.patient}</p>
                  <p className="text-xs text-muted-foreground">{appointment.type}</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={getStatusColor(appointment.status)}
              >
                {appointment.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}