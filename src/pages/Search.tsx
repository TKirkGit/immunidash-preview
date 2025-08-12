import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, ChevronDown, ChevronUp } from "lucide-react";

const Search = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchResults] = useState([
    {
      pid: "P001234",
      vorname: "Max",
      nachname: "Mustermann",
      datum: "2024-01-15",
      testKuerzel: "BLU",
      geraeteId: "GER001",
      flag: "Normal",
      arztKuerzel: "Dr.M",
      material: "Blut"
    },
    {
      pid: "P001235",
      vorname: "Anna",
      nachname: "Schmidt",
      datum: "2024-01-14",
      testKuerzel: "URI",
      geraeteId: "GER002",
      flag: "Auffällig",
      arztKuerzel: "Dr.K",
      material: "Urin"
    },
    {
      pid: "P001236",
      vorname: "Peter",
      nachname: "Weber",
      datum: "2024-01-13",
      testKuerzel: "STU",
      geraeteId: "GER001",
      flag: "Normal",
      arztKuerzel: "Dr.M",
      material: "Stuhl"
    }
  ]);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6 space-y-6">
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
        <Card>
          <CardHeader>
            <CardTitle>Suchergebnisse</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PID</TableHead>
                  <TableHead>Vorname</TableHead>
                  <TableHead>Nachname</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Test-Kürzel</TableHead>
                  <TableHead>Geräte-ID</TableHead>
                  <TableHead>FLAG</TableHead>
                  <TableHead>Arztkürzel</TableHead>
                  <TableHead>Material</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.pid}</TableCell>
                    <TableCell>{result.vorname}</TableCell>
                    <TableCell>{result.nachname}</TableCell>
                    <TableCell>{result.datum}</TableCell>
                    <TableCell>{result.testKuerzel}</TableCell>
                    <TableCell>{result.geraeteId}</TableCell>
                    <TableCell>
                      <Badge variant={result.flag === "Normal" ? "secondary" : "destructive"}>
                        {result.flag}
                      </Badge>
                    </TableCell>
                    <TableCell>{result.arztKuerzel}</TableCell>
                    <TableCell>{result.material}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Search;