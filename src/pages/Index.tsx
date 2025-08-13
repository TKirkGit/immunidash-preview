import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TestResultsChart } from "@/components/dashboard/TestResultsChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentAppointments } from "@/components/dashboard/RecentAppointments";
import { DeviceUtilizationChart } from "@/components/dashboard/DeviceUtilizationChart";
import { RecentAnomalies } from "@/components/dashboard/RecentAnomalies";
import { StabilityExceeded } from "@/components/dashboard/StabilityExceeded";
import { FastestTestRun } from "@/components/dashboard/FastestTestRun";
import { SlowestTestRun } from "@/components/dashboard/SlowestTestRun";


import {
  Users, 
  TestTubes, 
  Clock, 
  TrendingUp
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <PageHeader title="Dashboard" description="Willkommen zurück! Hier ist ein Überblick über Ihre heutigen Aktivitäten." />

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <TestResultsChart />
          <RevenueChart />
          <div className="lg:col-span-2">
            <RecentAnomalies />
          </div>
          <StabilityExceeded />
          <FastestTestRun />
          <SlowestTestRun />
        </div>

      </main>
    </div>
  );
};

export default Index;
