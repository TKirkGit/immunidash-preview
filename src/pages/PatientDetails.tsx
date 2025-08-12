import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, TestTube, Calendar, Barcode } from "lucide-react";

// Mock data - später durch echte Datenbank ersetzen
const getPatientDetails = (pid: string) => {
  const patients = {
    "001": {
      pid: "001",
      firstname: "Maria",
      lastname: "Schmidt",
      gender: "W",
      testCount: 3,
      barcode: "BC001234567",
      timestamp: "08.01.2025 14:30",
      status: "completed" as const,
      age: 45,
      email: "maria.schmidt@email.com",
      phone: "+49 123 456 789",
      address: "Musterstraße 123, 12345 Berlin"
    },
    "002": {
      pid: "002",
      firstname: "Thomas",
      lastname: "Weber",
      gender: "M",
      testCount: 2,
      barcode: "BC001234568",
      timestamp: "08.01.2025 13:15",
      status: "pending" as const,
      age: 38,
      email: "thomas.weber@email.com",
      phone: "+49 123 456 790",
      address: "Beispielweg 456, 54321 München"
    }
    // Weitere Patienten können hier hinzugefügt werden
  };
  
  return patients[pid as keyof typeof patients];
};

const statusConfig = {
  completed: { label: "Abgeschlossen", className: "bg-success/10 text-success hover:bg-success/20" },
  pending: { label: "Bearbeitung", className: "bg-warning/10 text-warning hover:bg-warning/20" },
  urgent: { label: "Dringend", className: "bg-destructive/10 text-destructive hover:bg-destructive/20" }
};

const PatientDetails = () => {
  const { pid } = useParams<{ pid: string }>();
  const navigate = useNavigate();
  
  if (!pid) {
    return <div>Patient ID nicht gefunden</div>;
  }

  const patient = getPatientDetails(pid.replace('pat', ''));

  if (!patient) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Dashboard
          </Button>
          <Card>
            <CardContent className="p-6">
              <p>Patient mit ID {pid} nicht gefunden.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zum Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Grunddaten */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Patientendetails
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">PID</p>
                  <p className="font-medium">{patient.pid}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusConfig[patient.status].className}>
                    {statusConfig[patient.status].label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{patient.lastname}, {patient.firstname}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Geschlecht</p>
                  <p className="font-medium">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alter</p>
                  <p className="font-medium">{patient.age} Jahre</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Anzahl Tests</p>
                  <p className="font-medium">{patient.testCount}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">E-Mail</p>
                    <p className="font-medium">{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-medium">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium">{patient.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Informationen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-primary" />
                Test Informationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Barcode className="h-4 w-4" />
                  Barcode
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded">{patient.barcode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Zeitstempel
                </p>
                <p className="font-medium">{patient.timestamp}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;