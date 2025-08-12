import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const Geraete = () => {
  const [device, setDevice] = useState<string>("geraet-a");
  const [timeframe, setTimeframe] = useState<string>("7");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setLoading(false);
  };

  // SEO
  useEffect(() => {
    document.title = "Geräte Dashboard | GANZIMMUN";
    const desc = "Geräte Dashboard mit Geräteauswahl und Zeitraumfilter";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/geraete`);
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        <PageHeader title="Geräte" description="Wählen Sie ein Gerät und einen Zeitraum aus und aktualisieren Sie die Ansicht." />

        {/* Filter */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Gerät</Label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gerät auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geraet-a">Gerät A</SelectItem>
                <SelectItem value="geraet-b">Gerät B</SelectItem>
                <SelectItem value="geraet-c">Gerät C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
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

          <div className="flex items-end">
            <Button onClick={handleUpdate} className="w-full md:w-auto" disabled={loading}>
              {loading ? "Aktualisiere…" : "Aktualisieren"}
            </Button>
          </div>
        </section>

        {/* Placeholder Inhalt */}
        <section>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Auswahl</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gerät: <span className="font-medium text-foreground">{device.replace("geraet-", "Gerät ").toUpperCase()}</span> · Zeitraum: <span className="font-medium text-foreground">{timeframe} Tage</span>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Geraete;
