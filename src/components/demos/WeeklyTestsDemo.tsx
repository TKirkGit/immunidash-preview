import React, { useMemo, useState } from "react";
import CardBase, { CardMode } from "@/components/common/CardBase";
import { BarChart3 } from "lucide-react";

export default function WeeklyTestsDemo() {
  const [mode, setMode] = useState<CardMode>("table");

  // Placeholder data (replace with real data wiring)
  const rows = useMemo(
    () => [
      { week: "KW 01", tests: 120 },
      { week: "KW 02", tests: 98 },
      { week: "KW 03", tests: 143 },
      { week: "KW 04", tests: 110 },
    ],
    []
  );
  const columns = [
    { key: "week", label: "Woche" },
    { key: "tests", label: "Anzahl Tests" },
  ];

  // Sort stubs (client side): no implementation details
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const onSort = (key: string) => {
    setSort((s) => {
      const nextDir: "asc" | "desc" = !s || s.key !== key ? "asc" : (s.dir === "asc" ? "desc" : "asc");
      const next: { key: string; dir: "asc" | "desc" } = { key, dir: nextDir };
      console.log("sort changed", next);
      return next;
    });
  };

  const tableSlot = (
    <div role="table" aria-label="Wöchentliche Tests" className="demo-table" style={{ width: "100%" }}>
      <div role="rowgroup">
        <div role="row" className="demo-row demo-row--header">
          {columns.map((c) => (
            <button
              key={c.key}
              role="columnheader"
              className="demo-cell demo-cell--header"
              onClick={() => onSort(c.key)}
              aria-label={`Sortiere nach ${c.label}`}
            >
              <span>{c.label}</span>
              <span aria-hidden style={{ marginInlineStart: "0.25rem" }}>
                {sort?.key === c.key ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div role="rowgroup">
        {rows.map((r, idx) => (
          <div
            key={idx}
            role="row"
            className="demo-row"
            tabIndex={0}
            onClick={() => console.log("row click", r)}
          >
            <div role="cell" className="demo-cell">{r.week}</div>
            <div role="cell" className="demo-cell">{r.tests}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const chartSlot = (
    <div role="img" aria-label="Diagramm: Wöchentliche Tests" className="demo-chart" style={{ inlineSize: "100%", blockSize: "12rem" }}>
      {/* Replace with your chart library. This is a neutral placeholder. */}
      <div style={{ inlineSize: "100%", blockSize: "100%", display: "grid", placeItems: "center" }}>
        <span>Chart Placeholder</span>
      </div>
    </div>
  );

  return (
    <CardBase
      title="Wöchentliche Tests"
      subtitle="Letzte 4 Wochen"
      icon={<BarChart3 aria-hidden />}
      mode={mode}
      data={rows}
      columns={columns}
      callbacks={{
        onModeChange: (m) => setMode(m),
        onExport: (t) => console.log("export", t),
        onRefresh: () => console.log("refresh weekly tests"),
      }}
      tableSlot={tableSlot}
      chartSlot={chartSlot}
      lastUpdated={new Date().toLocaleString()}
    />
  );
}
