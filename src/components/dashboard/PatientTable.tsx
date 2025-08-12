import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Barcode, Clock, FlaskConical, ChevronRight } from "lucide-react";
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
            {patients.map(patient => (
              <div
                key={patient.pid}
                onClick={() => handlePatientClick(patient.pid)}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4 w-full">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {patient.firstname[0]}
                      {patient.lastname[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">
                      {patient.lastname}, {patient.firstname}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="font-medium">PID {patient.pid}</Badge>
                      <Badge variant="secondary">{patient.gender}</Badge>
                      <Badge variant="secondary" className="inline-flex items-center gap-1">
                        <FlaskConical className="h-3.5 w-3.5" />
                        {patient.testCount} Tests
                      </Badge>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:hidden">
                      <span className="inline-flex items-center gap-1">
                        <Barcode className="h-4 w-4" />
                        {patient.barcode}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {patient.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-4 shrink-0">
                    <div className="flex flex-col items-end text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {patient.timestamp}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Barcode className="h-4 w-4" />
                        {patient.barcode}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/70" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>;
}