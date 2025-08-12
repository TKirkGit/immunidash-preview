import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TestResultsChart } from "@/components/dashboard/TestResultsChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentAppointments } from "@/components/dashboard/RecentAppointments";
import { 
  Users, 
  TestTubes, 
  Clock, 
  TrendingUp,
  Bell,
  Search,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Willkommen zurück! Hier ist ein Überblick über Ihre heutigen Aktivitäten.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Suchen..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Patienten heute"
            value={247}
            change="+12% zur Vorwoche"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Tests durchgeführt"
            value={89}
            change="+8% zur Vorwoche"
            changeType="positive"
            icon={TestTubes}
          />
          <StatsCard
            title="Wartende Ergebnisse"
            value={23}
            change="-5% zur Vorwoche"
            changeType="negative"
            icon={Clock}
          />
          <StatsCard
            title="Effizienz"
            value="94%"
            change="+2% zur Vorwoche"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TestResultsChart />
          <RevenueChart />
          <RecentAppointments />
        </div>

      </main>
    </div>
  );
};

export default Index;
