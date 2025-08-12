import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/layout/PageHeader";
import WeeklyTestsDemo from "@/components/demos/WeeklyTestsDemo";
import DevicesOverviewDemo from "@/components/demos/DevicesOverviewDemo";

const CardDemo = () => {
  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 w-full overflow-x-hidden">
        <PageHeader title="Card Demos" description="Beispiele für CardBase (Tabelle/Diagramm)." />
        <section className="grid gap-6">
          {/* Demo 1: Wöchentliche Tests */}
          <WeeklyTestsDemo />

          {/* Demo 2: Geräteübersicht */}
          <DevicesOverviewDemo />
        </section>
      </main>
    </div>
  );
};

export default CardDemo;
