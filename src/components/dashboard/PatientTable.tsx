import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, FileText, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface Patient {
  pid: string;
  firstname: string;
  lastname: string;
  gender: "M" | "W" | "D";
  testCount: number;
  barcode: string;
  timestamp: string;
  status: "pending" | "completed" | "urgent";
}

interface PatientTableProps {
  onPatientSelect?: (pid: string) => void;
}
const patients: Patient[] = [{
  pid: "001",
  firstname: "Maria",
  lastname: "Schmidt",
  gender: "W",
  testCount: 3,
  barcode: "BC001234567",
  timestamp: "08.01.2025 14:30",
  status: "completed"
}, {
  pid: "002",
  firstname: "Thomas",
  lastname: "Weber",
  gender: "M",
  testCount: 2,
  barcode: "BC001234568",
  timestamp: "08.01.2025 13:15",
  status: "pending"
}, {
  pid: "003",
  firstname: "Anna",
  lastname: "Müller",
  gender: "W",
  testCount: 1,
  barcode: "BC001234569",
  timestamp: "07.01.2025 16:45",
  status: "urgent"
}, {
  pid: "004",
  firstname: "Peter",
  lastname: "Hoffmann",
  gender: "M",
  testCount: 4,
  barcode: "BC001234570",
  timestamp: "07.01.2025 11:20",
  status: "completed"
}, {
  pid: "005",
  firstname: "Lisa",
  lastname: "Braun",
  gender: "W",
  testCount: 2,
  barcode: "BC001234571",
  timestamp: "07.01.2025 09:30",
  status: "pending"
}];
const statusConfig = {
  completed: {
    label: "Abgeschlossen",
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
export function PatientTable({ onPatientSelect }: PatientTableProps) {
  const navigate = useNavigate();
  const handlePatientClick = (pid: string) => {
    if (onPatientSelect) {
      onPatientSelect(pid);
    } else {
      navigate(`/details/pat${pid}`);
    }
  };
  return <Card className="col-span-3">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Aktuelle Patienten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden">
          <div className="space-y-4">
            {patients.map(patient => <div key={patient.pid} onClick={() => handlePatientClick(patient.pid)} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {patient.firstname[0]}{patient.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      <span className="text-xs text-muted-foreground">PID:</span> {patient.pid}
                    </p>
                    <p className="font-medium text-foreground">
                      <span className="text-xs text-muted-foreground">Name:</span> {patient.lastname}, {patient.firstname}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span><span className="text-xs">Geschlecht:</span> {patient.gender}</span>
                      <span><span className="text-xs">Tests:</span> {patient.testCount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span>Barcode:</span> {patient.barcode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span>Zeitstempel:</span> {patient.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusConfig[patient.status].className}>
                    {statusConfig[patient.status].label}
                  </Badge>
                  <div className="flex gap-2">
                    
                    
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </CardContent>
    </Card>;
}