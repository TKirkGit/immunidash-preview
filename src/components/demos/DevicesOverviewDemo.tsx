import React, { useMemo, useState } from "react";
import CardBase, { CardMode } from "@/components/common/CardBase";
import { Cpu } from "lucide-react";

export default function DevicesOverviewDemo() {
  const [mode, setMode] = useState<CardMode>("chart");

  const devices = useMemo(
    () => [
      { id: "GER001", name: "Sysmex XN-1000", status: "OK" },
      { id: "GER002", name: "Cobas 8000", status: "WARTUNG" },
      { id: "GER003", name: "Architect i2000", status: "OK" },
    ],
    []
  );

  const tableSlot = (
    <div role="table" aria-label="Geräteübersicht" className="demo-table" style={{ width: "100%" }}>
      <div role="row" className="demo-row demo-row--header">
        <div role="columnheader" className="demo-cell demo-cell--header">Geräte-ID</div>
        <div role="columnheader" className="demo-cell demo-cell--header">Name</div>
        <div role="columnheader" className="demo-cell demo-cell--header">Status</div>
      </div>
      {devices.map((d, idx) => (
        <div key={d.id} role="row" className="demo-row" tabIndex={0} onClick={() => console.log("device row", d)}>
          <div role="cell" className="demo-cell">{d.id}</div>
          <div role="cell" className="demo-cell">{d.name}</div>
          <div role="cell" className="demo-cell">{d.status}</div>
        </div>
      ))}
    </div>
  );

  const chartSlot = (
    <div role="img" aria-label="Diagramm: Geräteübersicht" className="demo-chart" style={{ inlineSize: "100%", blockSize: "12rem" }}>
      {/* Placeholder for a chart with legend and reference lines coming from props */}
      <div style={{ inlineSize: "100%", blockSize: "100%", display: "grid", placeItems: "center" }}>
        <span>Chart Placeholder (Legend/ReferenceLines via Props)</span>
      </div>
    </div>
  );

  return (
    <CardBase
      title="Geräteübersicht"
      subtitle="Status der Geräte"
      icon={<Cpu aria-hidden />}
      mode={mode}
      data={devices}
      legend={true}
      referenceLines={[{ id: "threshold-1" }]}
      callbacks={{
        onModeChange: (m) => setMode(m),
        onExport: (t) => console.log("export", t),
        onRefresh: () => console.log("refresh devices"),
      }}
      tableSlot={tableSlot}
      chartSlot={chartSlot}
    />
  );
}
