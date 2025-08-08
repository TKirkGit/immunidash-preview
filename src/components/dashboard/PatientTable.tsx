import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, FileText, Phone } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  testType: string;
  status: "pending" | "completed" | "urgent";
  date: string;
}

const patients: Patient[] = [
  {
    id: "1",
    name: "Maria Schmidt",
    age: 45,
    testType: "Blutbild komplett",
    status: "completed",
    date: "08.01.2025"
  },
  {
    id: "2",
    name: "Thomas Weber",
    age: 38,
    testType: "Allergietest",
    status: "pending",
    date: "08.01.2025"
  },
  {
    id: "3",
    name: "Anna Müller",
    age: 52,
    testType: "Vitamin D",
    status: "urgent",
    date: "07.01.2025"
  },
  {
    id: "4",
    name: "Peter Hoffmann",
    age: 61,
    testType: "Schilddrüse",
    status: "completed",
    date: "07.01.2025"
  },
  {
    id: "5",
    name: "Lisa Braun",
    age: 29,
    testType: "Mikrobiom",
    status: "pending",
    date: "07.01.2025"
  }
];

const statusConfig = {
  completed: { label: "Abgeschlossen", className: "bg-success/10 text-success hover:bg-success/20" },
  pending: { label: "Bearbeitung", className: "bg-warning/10 text-warning hover:bg-warning/20" },
  urgent: { label: "Dringend", className: "bg-destructive/10 text-destructive hover:bg-destructive/20" }
};

export function PatientTable() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Aktuelle Patienten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden">
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.age} Jahre • {patient.testType}</p>
                    <p className="text-xs text-muted-foreground">{patient.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusConfig[patient.status].className}>
                    {statusConfig[patient.status].label}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}