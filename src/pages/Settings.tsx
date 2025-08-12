import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SettingsData {
  placeholderPatient: string;
  placeholderTest: string;
  placeholderDevice: string;
  advancedPlaceholders: boolean;
}

const STORAGE_KEY = "app:settings";

export default function Settings() {
  const { toast } = useToast();
  const [data, setData] = useState<SettingsData>({
    placeholderPatient: "Max Mustermann",
    placeholderTest: "CRP",
    placeholderDevice: "Gerät A",
    advancedPlaceholders: false,
  });

  // Load persisted settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...data, ...JSON.parse(raw) });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SEO: title, meta description, canonical
  const meta = useMemo(
    () => ({
      title: "Einstellungen | Platzhalter verwalten",
      description: "Einstellungen für Platzhalter: Patient, Test, Gerät. Verwalten Sie Ihre App-Placeholders.",
      canonical: `${window.location.origin}/settings`,
    }),
    []
  );

  useEffect(() => {
    document.title = meta.title;
    const ensureMeta = (name: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      return el;
    };

    const desc = ensureMeta("description");
    desc.setAttribute("content", meta.description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", meta.canonical);
  }, [meta]);

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      toast({ title: "Gespeichert", description: "Ihre Einstellungen wurden gespeichert." });
    } catch {
      toast({ title: "Fehler", description: "Konnte Einstellungen nicht speichern.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader
          title="Einstellungen"
          description="Verwalten Sie Platzhalter für Demonstrationsdaten."
        />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Platzhalter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="placeholderPatient">Patient</Label>
                <Input
                  id="placeholderPatient"
                  value={data.placeholderPatient}
                  onChange={(e) => setData((d) => ({ ...d, placeholderPatient: e.target.value }))}
                  placeholder="z. B. Max Mustermann"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeholderTest">Test</Label>
                <Input
                  id="placeholderTest"
                  value={data.placeholderTest}
                  onChange={(e) => setData((d) => ({ ...d, placeholderTest: e.target.value }))}
                  placeholder="z. B. CRP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeholderDevice">Gerät</Label>
                <Input
                  id="placeholderDevice"
                  value={data.placeholderDevice}
                  onChange={(e) => setData((d) => ({ ...d, placeholderDevice: e.target.value }))}
                  placeholder="z. B. Gerät A"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Erweiterte Optionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="advancedPlaceholders">Erweiterte Platzhalter</Label>
                  <p className="text-sm text-muted-foreground">Aktiviert zusätzliche Dummy-Felder.</p>
                </div>
                <Switch
                  id="advancedPlaceholders"
                  checked={data.advancedPlaceholders}
                  onCheckedChange={(v) => setData((d) => ({ ...d, advancedPlaceholders: v }))}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSave}>Speichern</Button>
                <Button variant="secondary" onClick={() => {
                  const defaults: SettingsData = {
                    placeholderPatient: "Max Mustermann",
                    placeholderTest: "CRP",
                    placeholderDevice: "Gerät A",
                    advancedPlaceholders: false,
                  };
                  setData(defaults);
                  toast({ title: "Zurückgesetzt", description: "Standardwerte wiederhergestellt." });
                }}>Zurücksetzen</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
