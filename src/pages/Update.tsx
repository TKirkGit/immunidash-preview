import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search as SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Update = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState({
    vonDatum: "",
    bisDatum: "",
    geraet: "",
    vonUhrzeit: "",
    bisUhrzeit: ""
  });
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

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
    console.log("Suche ausgeführt mit:", searchParams);
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

  const getSelectedTests = () => {
    return testResults.filter(result => result.status === "Update");
  };

  const handleBulkUpdate = () => {
    const selectedTests = getSelectedTests();
    toast({
      title: "Tests aktualisiert",
      description: `${selectedTests.length} Test(s) wurden erfolgreich aktualisiert.`,
    });
    setIsUpdateDialogOpen(false);
    
    // Reset selected tests back to "ausstehend"
    setTestResults(prev =>
      prev.map(result =>
        result.status === "Update" ? { ...result, status: "ausstehend" } : result
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Update</h1>
        </div>

        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle>Suchparameter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="vonDatum">Von Datum</Label>
                <Input
                  id="vonDatum"
                  type="date"
                  value={searchParams.vonDatum}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, vonDatum: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="bisDatum">Bis Datum</Label>
                <Input
                  id="bisDatum"
                  type="date"
                  value={searchParams.bisDatum}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, bisDatum: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="geraet">Gerät auswählen</Label>
                <Select value={searchParams.geraet} onValueChange={(value) => setSearchParams(prev => ({ ...prev, geraet: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gerät auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sysmex-xn-1000">Sysmex XN-1000</SelectItem>
                    <SelectItem value="cobas-8000">Cobas 8000</SelectItem>
                    <SelectItem value="architect-i2000sr">Architect i2000SR</SelectItem>
                    <SelectItem value="vitros-5600">Vitros 5600</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="vonUhrzeit">Von Uhrzeit</Label>
                <Input
                  id="vonUhrzeit"
                  type="time"
                  value={searchParams.vonUhrzeit}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, vonUhrzeit: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="bisUhrzeit">Bis Uhrzeit</Label>
                <Input
                  id="bisUhrzeit"
                  type="time"
                  value={searchParams.bisUhrzeit}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, bisUhrzeit: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full md:w-auto">
              <SearchIcon className="h-4 w-4 mr-2" />
              Suchen
            </Button>
          </CardContent>
        </Card>

        {/* Update Button */}
        {getSelectedTests().length > 0 && (
          <div className="flex justify-center">
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="lg">
                  Update ({getSelectedTests().length})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tests aktualisieren?</DialogTitle>
                  <DialogDescription>
                    Möchten Sie dieses Tests wirklich aktualisieren?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <h4 className="font-medium mb-3">Ausgewählte Tests:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {getSelectedTests().map((test) => (
                      <div key={test.id} className="flex justify-between items-center text-sm">
                        <span>{test.test}</span>
                        <span className="text-muted-foreground">({test.barcode})</span>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsUpdateDialogOpen(false)}
                  >
                    Abbrechen
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleBulkUpdate}
                  >
                    Aktualisieren
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Results Table */}
        <Card className="max-w-full">
          <CardHeader>
            <CardTitle>Testergebnisse ({testResults.length})</CardTitle>
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