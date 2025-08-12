import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, TestTube, Calendar, Barcode, Download, ChevronDown } from "lucide-react";

// Mock data - später durch echte Datenbank ersetzen
const getTestResults = (pid: string) => {
  const testResults = {
    "001": [
      {
        pid: "001",
        name: "Schmidt",
        vorname: "Maria",
        geschlecht: "W",
        barcode: "BC001234567",
        test: "Vitamin D",
        wert: "32.5",
        einheit: "ng/ml",
        zeit: "08.01.2025 14:30",
        geraet: "COBAS E411",
        flag: "Normal",
        labnr: "L2025001",
        barcodezusatz: "A1",
        arztkuerzel: "Dr.M",
        material: "Serum"
      },
      {
        pid: "001",
        name: "Schmidt",
        vorname: "Maria",
        geschlecht: "W",
        barcode: "BC001234567",
        test: "Cholesterin",
        wert: "220",
        einheit: "mg/dl",
        zeit: "08.01.2025 14:30",
        geraet: "COBAS C311",
        flag: "Hoch",
        labnr: "L2025002",
        barcodezusatz: "A2",
        arztkuerzel: "Dr.M",
        material: "Serum"
      },
      {
        pid: "001",
        name: "Schmidt",
        vorname: "Maria",
        geschlecht: "W",
        barcode: "BC001234567",
        test: "HbA1c",
        wert: "5.9",
        einheit: "%",
        zeit: "08.01.2025 14:30",
        geraet: "DCA Vantage",
        flag: "Normal",
        labnr: "L2025003",
        barcodezusatz: "A3",
        arztkuerzel: "Dr.M",
        material: "EDTA-Blut"
      }
    ],
    "002": [
      {
        pid: "002",
        name: "Weber",
        vorname: "Thomas",
        geschlecht: "M",
        barcode: "BC001234568",
        test: "TSH",
        wert: "2.1",
        einheit: "mU/l",
        zeit: "08.01.2025 13:15",
        geraet: "COBAS E411",
        flag: "Normal",
        labnr: "L2025004",
        barcodezusatz: "B1",
        arztkuerzel: "Dr.K",
        material: "Serum"
      },
      {
        pid: "002",
        name: "Weber",
        vorname: "Thomas",
        geschlecht: "M",
        barcode: "BC001234568",
        test: "Ferritin",
        wert: "45",
        einheit: "ng/ml",
        zeit: "08.01.2025 13:15",
        geraet: "COBAS E411",
        flag: "Niedrig",
        labnr: "L2025005",
        barcodezusatz: "B2",
        arztkuerzel: "Dr.K",
        material: "Serum"
      }
    ]
  };
  
  return testResults[pid as keyof typeof testResults] || [];
};

// Download functions for test results
const downloadTestResultsCSV = (pid: string) => {
  const testData = getTestResults(pid);
  if (testData.length === 0) return;

  const csvHeaders = ['PID', 'Name', 'Vorname', 'Geschlecht', 'Barcode', 'Test', 'Wert', 'Einheit', 'Zeit', 'Gerät', 'Flag', 'Labnr', 'Barcodezusatz', 'Arztkürzel', 'Material'];
  const csvData = testData.map(test => [
    test.pid, test.name, test.vorname, test.geschlecht, test.barcode,
    test.test, test.wert, test.einheit, test.zeit, test.geraet,
    test.flag, test.labnr, test.barcodezusatz, test.arztkuerzel, test.material
  ]);

  const csvContent = [csvHeaders, ...csvData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `testergebnisse_patient_${pid}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadTestResultsXLSX = (pid: string) => {
  const testData = getTestResults(pid);
  if (testData.length === 0) return;

  // Import XLSX dynamically to avoid bundle size issues
  import('xlsx').then((XLSX) => {
    const worksheet = XLSX.utils.json_to_sheet(testData.map(test => ({
      PID: test.pid,
      Name: test.name,
      Vorname: test.vorname,
      Geschlecht: test.geschlecht,
      Barcode: test.barcode,
      Test: test.test,
      Wert: test.wert,
      Einheit: test.einheit,
      Zeit: test.zeit,
      Gerät: test.geraet,
      Flag: test.flag,
      Labnr: test.labnr,
      Barcodezusatz: test.barcodezusatz,
      Arztkürzel: test.arztkuerzel,
      Material: test.material
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Testergebnisse');
    XLSX.writeFile(workbook, `testergebnisse_patient_${pid}.xlsx`);
  });
};

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
  };
  
  return patients[pid as keyof typeof patients];
};

const statusConfig = {
  completed: { label: "Abgeschlossen", className: "bg-success/10 text-success hover:bg-success/20" },
  pending: { label: "Bearbeitung", className: "bg-warning/10 text-warning hover:bg-warning/20" },
  urgent: { label: "Dringend", className: "bg-destructive/10 text-destructive hover:bg-destructive/20" }
};

interface PatientDetailsProps {
  patientId: string;
}

export const PatientDetails = ({ patientId }: PatientDetailsProps) => {
  const patient = getPatientDetails(patientId.replace('pat', ''));

  if (!patient) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Patient mit ID {patientId} nicht gefunden.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
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
                <p className="text-sm text-muted-foreground">Anzahl Tests</p>
                <p className="font-medium">{patient.testCount}</p>
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

      {/* Test Results Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-primary" />
              Testergebnisse
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-md z-50">
                <DropdownMenuItem onClick={() => downloadTestResultsCSV(patient.pid)}>
                  .csv
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadTestResultsXLSX(patient.pid)}>
                  .xlsx
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 text-muted-foreground font-medium">PID</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Name</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Vorname</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Geschlecht</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Barcode</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Test</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Wert</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Einheit</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Zeit</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Gerät</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Flag</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Labnr</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Barcodezusatz</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Arztkürzel</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Material</th>
                </tr>
              </thead>
              <tbody>
                {getTestResults(patient.pid).map((test, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2">{test.pid}</td>
                    <td className="p-2">{test.name}</td>
                    <td className="p-2">{test.vorname}</td>
                    <td className="p-2">{test.geschlecht}</td>
                    <td className="p-2 font-mono text-xs">{test.barcode}</td>
                    <td className="p-2">{test.test}</td>
                    <td className="p-2 font-medium">{test.wert}</td>
                    <td className="p-2 text-muted-foreground">{test.einheit}</td>
                    <td className="p-2 text-xs">{test.zeit}</td>
                    <td className="p-2">{test.geraet}</td>
                    <td className="p-2">
                      <Badge variant={test.flag === 'Normal' ? 'secondary' : test.flag === 'Hoch' ? 'destructive' : 'outline'}>
                        {test.flag}
                      </Badge>
                    </td>
                    <td className="p-2">{test.labnr}</td>
                    <td className="p-2 font-mono text-xs">{test.barcodezusatz}</td>
                    <td className="p-2">{test.arztkuerzel}</td>
                    <td className="p-2">{test.material}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};