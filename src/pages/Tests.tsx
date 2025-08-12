import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import PageHeader from "@/components/layout/PageHeader";

// Mock: Grunddaten für Messungen und Flags
const buildMockDailyData = (days: number) => {
  const out: { day: string; measurements: number }[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const label = `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;
    out.push({ day: label, measurements: Math.floor(40 + Math.random() * 80) });
  }
  return out;
};

const mockFlags = [
  { name: "Normal", key: "normal", value: 62 },
  { name: "Hoch", key: "hoch", value: 22 },
  { name: "Kritisch", key: "kritisch", value: 9 },
  { name: "Niedrig", key: "niedrig", value: 7 },
];

const FLAG_COLORS: Record<string, string> = {
  normal: "hsl(var(--primary))",
  hoch: "hsl(var(--secondary))",
  kritisch: "hsl(var(--destructive))",
  niedrig: "hsl(var(--muted))",
};

// Gerätevergleich (mock): Messungen pro Gerät für ausgewählten Test
const DEVICE_COMPARISON = [
  { device: "Gerät A", measurements: 340 },
  { device: "Gerät B", measurements: 290 },
  { device: "Gerät C", measurements: 380 },
  { device: "Gerät D", measurements: 260 },
];

// Mock-Datenbestand für Tests (simuliert serverseitige Suche)
const MOCK_TESTS = Array.from({ length: 120 }).map((_, i) => ({
  id: `T-${1000 + i}`,
  name: `Test ${i % 3 === 0 ? "CRP" : i % 3 === 1 ? "HbA1c" : "Vitamin D"}`,
  flag: ["Normal", "Hoch", "Kritisch", "Niedrig"][i % 4],
}));

const fakeServerSearch = async (query: string) => {
  await new Promise((r) => setTimeout(r, 300));
  if (!query) return [] as typeof MOCK_TESTS;
  const q = query.toLowerCase();
  return MOCK_TESTS.filter((t) => t.id.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)).slice(0, 20);
};

const Tests = () => {
  const [timeframe, setTimeframe] = useState<string>("7");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof MOCK_TESTS>([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await fakeServerSearch(query);
    setResults(res);
    setLoading(false);
    setRefreshKey((k) => k + 1);
  };

  // SEO: Title, Meta, Canonical
  useEffect(() => {
    document.title = "Tests Dashboard | GANZIMMUN";

    const desc = "Tests Dashboard mit Suche, Messungen pro Tag und Flag-Verteilung";
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
    canonical.setAttribute("href", `${window.location.origin}/tests`);
  }, []);

  // Daten für Diagramme basierend auf Zeitraum
  const dailyData = useMemo(() => buildMockDailyData(parseInt(timeframe, 10)), [timeframe, refreshKey]);
  const tatData = useMemo(
    () => dailyData.map((d) => ({ day: d.day, tat: 8 + Math.floor(Math.random() * 10) })),
    [dailyData]
  );
  // Simulierte serverseitige Suche (Debounce)
  useEffect(() => {
    let handle: number | undefined;
    setLoading(true);
    handle = window.setTimeout(async () => {
      const res = await fakeServerSearch(query);
      setResults(res);
      setLoading(false);
    }, 400);
    return () => {
      if (handle) window.clearTimeout(handle);
    };
  }, [query]);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        <PageHeader title="Tests Dashboard" description="Suchen, analysieren und überwachen Sie Labor‑Tests." />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="test-search">Suche nach Test</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="test-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Test nach Name oder ID suchen..."
                className="pl-10"
                aria-label="Tests suchen"
              />
            </div>
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
            <Button onClick={handleUpdate} className="w-full md:w-auto">Aktualisieren</Button>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Messungen pro Tag</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={dailyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => [v, "Messungen"]} />
                  <Bar dataKey="measurements" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Flag‑Verteilung</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={mockFlags}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                  >
                    {mockFlags.map((entry) => (
                      <Cell key={entry.key} fill={FLAG_COLORS[entry.key]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(v: number, n: string) => [v, n]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Zusätzliche Diagramme */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gerätevergleich für Test</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={DEVICE_COMPARISON}>
                  <XAxis dataKey="device" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => [v, "Messungen"]} />
                  <Bar dataKey="measurements" fill="hsl(var(--secondary))" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Turnaround Zeit für Test</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={tatData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => [`${v} Std`, "TAT"]} />
                  <Line type="monotone" dataKey="tat" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Tests;
