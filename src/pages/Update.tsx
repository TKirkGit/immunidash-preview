import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PageHeader from "@/components/layout/PageHeader";
import { Search, Calendar, Clock } from "lucide-react";

const Update = () => {
const [query, setQuery] = useState("");
const [timeframe, setTimeframe] = useState<string>("7");
const [timeFrom, setTimeFrom] = useState<string>("");
const [timeTo, setTimeTo] = useState<string>("");
  // Mock data for the table
  const [testResults, setTestResults] = useState([
    {
      id: 1,
      test: "Hämatokrit",
      barcode: "BC001",
      pidId: "PID001",
      einheit: "%",
      geraet: "Sysmex XN-1000",
      status: "ausstehend"
    },
    {
      id: 2,
      test: "Hämoglobin",
      barcode: "BC002",
      pidId: "PID002",
      einheit: "g/dL",
      geraet: "Sysmex XN-1000",
      status: "ausstehend"
    },
    {
      id: 3,
      test: "Leukozyten",
      barcode: "BC003",
      pidId: "PID003",
      einheit: "/µL",
      geraet: "Sysmex XN-1000",
      status: "ausstehend"
    },
    {
      id: 4,
      test: "Thrombozyten",
      barcode: "BC004",
      pidId: "PID004",
      einheit: "/µL",
      geraet: "Sysmex XN-1000",
      status: "ausstehend"
    },
    {
      id: 5,
      test: "Kreatinin",
      barcode: "BC005",
      pidId: "PID005",
      einheit: "mg/dL",
      geraet: "Cobas 8000",
      status: "ausstehend"
    }
  ]);

  const handleSearch = () => {
    console.log("Suche ausgeführt mit:", { query, timeframe, timeFrom, timeTo });
  };

  const handleStatusUpdate = (id: number) => {
    setTestResults(prev => 
      prev.map(result => 
        result.id === id 
          ? { ...result, status: result.status === "Update" ? "ausstehend" : "Update" }
          : result
      )
    );
  };

  const selectedCount = testResults.filter(result => result.status === "Update").length;
  const selectedTests = testResults.filter(result => result.status === "Update");

  const handleUpdateConfirm = () => {
    console.log("Tests aktualisiert:", selectedTests);
    // Reset selected items back to "ausstehend"
    setTestResults(prev => 
      prev.map(result => 
        result.status === "Update" 
          ? { ...result, status: "ausstehend" }
          : result
      )
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === "ausstehend") {
      return <Badge variant="secondary">{status}</Badge>;
    } else if (status === "Update") {
      return <Badge className="bg-destructive text-destructive-foreground">{status}</Badge>;
    }
    return <Badge variant="default">{status}</Badge>;
  };


  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
        <PageHeader title="Update" description="Suchen und markieren Sie Testergebnisse zur Aktualisierung." />

<section className="flex flex-wrap items-end gap-3 md:gap-4">
  <div className="space-y-2 basis-[260px] lg:basis-[320px] grow-0 shrink">
    <Label htmlFor="update-search">Suche</Label>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id="update-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Test, Barcode oder PID suchen..."
        className="pl-10 w-full"
        aria-label="Update suchen"
      />
    </div>
  </div>
  <div className="space-y-2 basis-[160px] shrink-0">
    <Label>Zeitraum</Label>
    <Select value={timeframe} onValueChange={setTimeframe}>
      <SelectTrigger className="w-full">
        <Calendar className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Zeitraum" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Letzte 7 Tage</SelectItem>
        <SelectItem value="30">Letzte 30 Tage</SelectItem>
        <SelectItem value="90">Letzte 90 Tage</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div className="space-y-2 basis-[120px] shrink-0">
    <Label htmlFor="update-time-from">Von</Label>
    <div className="relative">
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id="update-time-from"
        type="time"
        value={timeFrom}
        onChange={(e) => setTimeFrom(e.target.value)}
        className="pl-10 w-full"
        aria-label="Uhrzeit von"
      />
    </div>
  </div>
  <div className="space-y-2 basis-[120px] shrink-0">
    <Label htmlFor="update-time-to">Bis</Label>
    <div className="relative">
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id="update-time-to"
        type="time"
        value={timeTo}
        onChange={(e) => setTimeTo(e.target.value)}
        className="pl-10 w-full"
        aria-label="Uhrzeit bis"
      />
    </div>
  </div>
  <div className="flex items-end basis-auto shrink-0">
    <Button onClick={handleSearch} className="whitespace-nowrap">Suchen</Button>
  </div>
</section>

        {/* Results Table */}
        <Card className="max-w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Testergebnisse ({testResults.length})</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant={selectedCount > 0 ? "default" : "secondary"}
                    disabled={selectedCount === 0}
                    className={selectedCount > 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    UPDATE ({selectedCount})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tests aktualisieren?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Möchten Sie dieses Tests wirklich aktualisieren?
                      <div className="mt-4">
                        <strong>Ausgewählte Tests:</strong>
                        <ul className="mt-2 space-y-1">
                          {selectedTests.map((test) => (
                            <li key={test.id} className="text-sm">
                              • {test.test} ({test.barcode})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUpdateConfirm}>
                      Aktualisieren
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className="max-w-full">
            <div className="overflow-x-auto">
              <Table className="min-w-[150vw]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead>PID_ID</TableHead>
                    <TableHead>Einheit</TableHead>
                    <TableHead>Gerät</TableHead>
                    <TableHead>Ja</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.test}</TableCell>
                      <TableCell>{result.barcode}</TableCell>
                      <TableCell>{result.pidId}</TableCell>
                      <TableCell>{result.einheit}</TableCell>
                      <TableCell>{result.geraet}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(result.id)}
                          className={result.status === "Update" ? "bg-green-100 border-green-500 text-green-700 hover:bg-green-200" : ""}
                        >
                          {result.status === "Update" ? "✓" : "Ja"}
                        </Button>
                      </TableCell>
                      <TableCell>{getStatusBadge(result.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Update;