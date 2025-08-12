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
import { Search as SearchIcon, ChevronDown, ChevronUp } from "lucide-react";

const Search = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchResults] = useState([
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
  ]);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Suche</h1>
            <p className="text-muted-foreground">Durchsuchen Sie Patientendaten und Testergebnisse.</p>
          </div>
        </div>

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
            <CardTitle>Suchergebnisse</CardTitle>
          </CardHeader>
          <CardContent className="max-w-full">
            <Tabs defaultValue="kompakt" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="kompakt">Kompakt</TabsTrigger>
                <TabsTrigger value="erweitert">Erweitert</TabsTrigger>
              </TabsList>
              
              <TabsContent value="kompakt">
                <div className="overflow-x-auto max-w-full">
                  <Table className="min-w-max">
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
                  <Table className="min-w-max">
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