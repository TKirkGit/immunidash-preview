import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search as SearchIcon, ChevronDown, ChevronUp, Download } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

// Download functions for search results
const downloadSearchResultsCSV = (results: any[]) => {
  if (results.length === 0) return;

  const csvHeaders = ['PID', 'Name', 'Barcode', 'Geschlecht', 'Anzahl Tests', 'Zeit', 'Test', 'Wert', 'Einheit', 'Gerät', 'Flag', 'Labnr', 'Barcodezusatz', 'Arztkürzel', 'Material', 'Nachname', 'Vorname'];
  const csvData = results.map(result => [
    result.pid, result.name, result.barcode, result.geschlecht, result.anzahlTests,
    result.zeit, result.test, result.wert, result.einheit, result.geraeteId,
    result.flag, result.labnr, result.barcodezusatz, result.arztKuerzel, result.material,
    result.nachname, result.vorname
  ]);

  const csvContent = [csvHeaders, ...csvData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `suchergebnisse.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadSearchResultsXLSX = (results: any[]) => {
  if (results.length === 0) return;

  // Import XLSX dynamically to avoid bundle size issues
  import('xlsx').then((XLSX) => {
    const worksheet = XLSX.utils.json_to_sheet(results.map(result => ({
      PID: result.pid,
      Name: result.name,
      Barcode: result.barcode,
      Geschlecht: result.geschlecht,
      'Anzahl Tests': result.anzahlTests,
      Zeit: result.zeit,
      Test: result.test,
      Wert: result.wert,
      Einheit: result.einheit,
      Gerät: result.geraeteId,
      Flag: result.flag,
      Labnr: result.labnr,
      Barcodezusatz: result.barcodezusatz,
      Arztkürzel: result.arztKuerzel,
      Material: result.material,
      Nachname: result.nachname,
      Vorname: result.vorname
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Suchergebnisse');
    XLSX.writeFile(workbook, `suchergebnisse.xlsx`);
  });
};

const Search = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchResults] = useState(() => {
    const base = [
      {
        pid: "P001234",
        vorname: "Max",
        nachname: "Mustermann",
        name: "Max Mustermann",
        barcode: "BC001234",
        geschlecht: "M",
        anzahlTests: 5,
        zeit: "2024-01-15 14:30",
        test: "Blutbild",
        wert: "12.5",
        einheit: "g/dl",
        geraeteId: "GER001",
        flag: "Normal",
        labnr: "L001",
        barcodezusatz: "A1",
        arztKuerzel: "Dr.M",
        material: "Blut"
      },
      {
        pid: "P001235",
        vorname: "Anna",
        nachname: "Schmidt",
        name: "Anna Schmidt",
        barcode: "BC001235",
        geschlecht: "W",
        anzahlTests: 3,
        zeit: "2024-01-14 10:15",
        test: "Urinanalyse",
        wert: "1.2",
        einheit: "mg/ml",
        geraeteId: "GER002",
        flag: "Auffällig",
        labnr: "L002",
        barcodezusatz: "B2",
        arztKuerzel: "Dr.K",
        material: "Urin"
      },
      {
        pid: "P001236",
        vorname: "Peter",
        nachname: "Weber",
        name: "Peter Weber",
        barcode: "BC001236",
        geschlecht: "M",
        anzahlTests: 2,
        zeit: "2024-01-13 16:45",
        test: "Stuhlanalyse",
        wert: "Negativ",
        einheit: "-",
        geraeteId: "GER001",
        flag: "Normal",
        labnr: "L003",
        barcodezusatz: "C3",
        arztKuerzel: "Dr.M",
        material: "Stuhl"
      }
    ];
    const more = Array.from({ length: 120 }, (_, i) => ({
      pid: `P${(1237 + i).toString().padStart(6, '0')}`,
      vorname: i % 2 === 0 ? "Julia" : "Lukas",
      nachname: i % 3 === 0 ? "Meyer" : "Klein",
      name: i % 2 === 0 ? `Julia ${i % 3 === 0 ? 'Meyer' : 'Klein'}` : `Lukas ${i % 3 === 0 ? 'Meyer' : 'Klein'}`,
      barcode: `BC${(1236 + i).toString().padStart(6, '0')}`,
      geschlecht: i % 2 === 0 ? "W" : "M",
      anzahlTests: (i % 7) + 1,
      zeit: `2024-02-${(i % 28) + 1} ${(8 + (i % 10)).toString().padStart(2,'0')}:${(i % 60).toString().padStart(2,'0')}`,
      test: i % 2 === 0 ? "CRP" : "Glukose",
      wert: (Math.random() * 20).toFixed(1),
      einheit: i % 2 === 0 ? "mg/L" : "mmol/L",
      geraeteId: i % 2 === 0 ? "GER003" : "GER004",
      flag: i % 5 === 0 ? "Auffällig" : "Normal",
      labnr: `L${(200 + i)}`,
      barcodezusatz: i % 4 === 0 ? "D4" : "E5",
      arztKuerzel: i % 2 === 0 ? "Dr.S" : "Dr.T",
      material: i % 2 === 0 ? "Blut" : "Serum"
    }));
    return [...base, ...more];
  });

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
        <PageHeader title="Suche" description="Durchsuchen Sie Patientendaten und Testergebnisse." />

        {/* Search Forms */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SearchIcon className="h-5 w-5" />
                Suche nach Barcode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Barcode eingeben..." 
                    className="text-lg h-12"
                  />
                </div>
                <Button size="lg">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Suchen
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between mb-4">
                      <span className="flex items-center gap-2">
                        <SearchIcon className="h-4 w-4" />
                        Erweiterte Suche
                      </span>
                      {isAdvancedOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="datumVon">DATUM VON</Label>
                        <Input
                          id="datumVon"
                          type="date"
                          placeholder="Datum Von"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="datumBis">DATUM BIS</Label>
                        <Input
                          id="datumBis"
                          type="date"
                          placeholder="Datum Bis"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="vorname"
                          placeholder="Vorname"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="nachname"
                          placeholder="Nachname"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="pid"
                          placeholder="Patienten-ID"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="testKuerzel"
                          placeholder="Test-Kürzel"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="geraeteId"
                          placeholder="Geräte-ID"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="flag"
                          placeholder="FLAG"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="arztKuerzel"
                          placeholder="Arztkürzel"
                        />
                      </div>
                      
                      <div>
                        <Input
                          id="material"
                          placeholder="Material"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button>
                        <SearchIcon className="h-4 w-4 mr-2" />
                        Erweiterte Suche
                      </Button>
                      <Button variant="outline">
                        Zurücksetzen
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card className="max-w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Suchergebnisse</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border shadow-md z-50">
                  <DropdownMenuItem onClick={() => downloadSearchResultsCSV(searchResults)}>
                    .csv
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadSearchResultsXLSX(searchResults)}>
                    .xlsx
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="max-w-full">
            <Tabs defaultValue="kompakt" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="kompakt">Kompakt</TabsTrigger>
                <TabsTrigger value="erweitert">Erweitert</TabsTrigger>
              </TabsList>
              
              <TabsContent value="kompakt">
                <div className="overflow-x-auto max-w-full">
                  <Table className="min-w-[150vw]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>PID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Barcode</TableHead>
                        <TableHead>Geschlecht</TableHead>
                        <TableHead>Anzahl Tests</TableHead>
                        <TableHead>Zeit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{result.pid}</TableCell>
                          <TableCell>{result.name}</TableCell>
                          <TableCell>{result.barcode}</TableCell>
                          <TableCell>{result.geschlecht}</TableCell>
                          <TableCell>{result.anzahlTests}</TableCell>
                          <TableCell>{result.zeit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="erweitert">
                <div className="overflow-x-auto max-w-full">
                  <Table className="min-w-[150vw]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>PID</TableHead>
                        <TableHead>Barcode</TableHead>
                        <TableHead>Test</TableHead>
                        <TableHead>Wert</TableHead>
                        <TableHead>Einheit</TableHead>
                        <TableHead>Zeit</TableHead>
                        <TableHead>Gerät</TableHead>
                        <TableHead>Flag</TableHead>
                        <TableHead>Labnr</TableHead>
                        <TableHead>Barcodezusatz</TableHead>
                        <TableHead>Arzt</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Nachname</TableHead>
                        <TableHead>Vorname</TableHead>
                        <TableHead>Geschlecht</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{result.pid}</TableCell>
                          <TableCell>{result.barcode}</TableCell>
                          <TableCell>{result.test}</TableCell>
                          <TableCell>{result.wert}</TableCell>
                          <TableCell>{result.einheit}</TableCell>
                          <TableCell>{result.zeit}</TableCell>
                          <TableCell>{result.geraeteId}</TableCell>
                          <TableCell>
                            <Badge variant={result.flag === "Normal" ? "secondary" : "destructive"}>
                              {result.flag}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.labnr}</TableCell>
                          <TableCell>{result.barcodezusatz}</TableCell>
                          <TableCell>{result.arztKuerzel}</TableCell>
                          <TableCell>{result.material}</TableCell>
                          <TableCell>{result.nachname}</TableCell>
                          <TableCell>{result.vorname}</TableCell>
                          <TableCell>{result.geschlecht}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Search;