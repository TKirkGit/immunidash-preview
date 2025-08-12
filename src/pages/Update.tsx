import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PageHeader from "@/components/layout/PageHeader";
import SearchFilters, { PresetValue, type DeviceOption } from "@/components/search/SearchFilters";
import FilterChips from "@/components/search/FilterChips";

const Update = () => {
const [query, setQuery] = useState("");
const [device, setDevice] = useState("");
const [preset, setPreset] = useState<PresetValue>("24h");
const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const deviceOptions: DeviceOption[] = [
  { value: "sysmex-xn-1000", label: "Sysmex XN-1000" },
  { value: "cobas-8000", label: "Cobas 8000" },
  { value: "architect-i2000sr", label: "Architect i2000SR" },
  { value: "vitros-5600", label: "Vitros 5600" },
];

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
  console.log("Suche ausgeführt mit:", { query, device, preset, from, to });
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

  // Active filter chips
  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  if (query) {
    chips.push({ key: "query", label: `Suche: ${query}`, onRemove: () => setQuery("") });
  }
  if (device) {
    const label = deviceOptions.find((d) => d.value === device)?.label ?? device;
    chips.push({ key: "device", label: `Gerät: ${label}`, onRemove: () => setDevice("") });
  }
  if (preset !== "custom") {
    const presetLabel = preset === "24h" ? "24h" : preset === "7d" ? "7 Tage" : "30 Tage";
    chips.push({ key: "preset", label: `Zeitraum: ${presetLabel}`, onRemove: () => setPreset("24h") });
  } else if (from || to) {
    const range = `${from || "?"} – ${to || "?"}`;
    chips.push({ key: "range", label: `Zeitraum: ${range}`, onRemove: () => { setFrom(""); setTo(""); setPreset("24h"); } });
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
        <PageHeader title="Update" description="Suchen und markieren Sie Testergebnisse zur Aktualisierung." />

<SearchFilters
  title="Suche"
  showQuery
  query={query}
  onQueryChange={setQuery}
  showDevice
  device={device}
  onDeviceChange={setDevice}
  preset={preset}
  onPresetChange={setPreset}
  from={from}
  to={to}
  onFromChange={setFrom}
  onToChange={setTo}
  onSubmit={handleSearch}
  onReset={() => {
    setQuery("");
    setDevice("");
    setPreset("24h");
    setFrom("");
    setTo("");
  }}
/>
<div>
  <FilterChips chips={chips} />
</div>

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
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead>PID_ID</TableHead>
                    <TableHead>Test</TableHead>
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
                      <TableCell>{result.test}</TableCell>
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