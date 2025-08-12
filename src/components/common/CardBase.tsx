import React, { useEffect, useMemo, useState } from "react";

export type CardMode = "table" | "chart";

// NOTE: This component intentionally avoids fixed styles and external libs.
// Provide your own styles by targeting the classNames (card-base__*) or pass a wrapper.
// All callbacks are stubs – connect real logic in your app.

interface CardAction {
  id: string;
  label: string;
  ariaLabel?: string;
  onClick?: () => void;
}

interface CardBaseProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  mode: CardMode;
  data?: any;           // table OR chart data
  columns?: any;        // table columns (consumer-defined)
  series?: any;         // chart series (consumer-defined)
  metrics?: Array<{ id: string; label: React.ReactNode; value: React.ReactNode }>;
  legend?: boolean;     // chart: whether legend should be visible (toggle in UI)
  referenceLines?: any[]; // forward-only; CardBase does not interpret values
  actions?: CardAction[];
  i18n?: Record<string, string>;
  callbacks: {
    onModeChange?: (mode: CardMode) => void;
    onExport?: (type: "csv" | "png") => void;
    onRefresh?: () => void;
    onRowClick?: (row: any, index: number) => void;
    onPointClick?: (point: any, index: number) => void;
  };
  theme?: Record<string, string>; // semantic tokens only
  state?: "idle" | "loading" | "empty" | "error" | "noPermission";
  errorMessage?: string;
  lastUpdated?: string;
  footerLink?: { label: string; href?: string; onClick?: () => void };
  tableSlot?: React.ReactNode; // rendered when mode === "table"
  chartSlot?: React.ReactNode; // rendered when mode === "chart"
  className?: string;
  id?: string;
}

const defaultI18n: Record<string, string> = {
  table: "Tabelle",
  chart: "Diagramm",
  refresh: "Aktualisieren",
  exportCsv: "Export CSV",
  exportPng: "Export PNG",
  emptyTitle: "Keine Daten",
  emptyCta: "Zur Übersicht",
  errorTitle: "Ein Fehler ist aufgetreten",
  retry: "Erneut laden",
  noPermissionTitle: "Kein Zugriff",
  requestAccess: "Zugriff anfragen",
  legend: "Legende",
  lastUpdated: "Letzte Aktualisierung",
};

export default function CardBase(props: CardBaseProps) {
  const {
    title,
    subtitle,
    icon,
    mode,
    data,
    columns,
    series,
    metrics,
    legend,
    referenceLines,
    actions,
    i18n: i18nProp,
    callbacks,
    theme,
    state = "idle",
    errorMessage,
    lastUpdated,
    footerLink,
    tableSlot,
    chartSlot,
    className,
    id,
  } = props;

  const i18n = useMemo(() => ({ ...defaultI18n, ...(i18nProp || {}) }), [i18nProp]);

  const [currentMode, setCurrentMode] = useState<CardMode>(mode);
  useEffect(() => setCurrentMode(mode), [mode]);

  const [legendVisible, setLegendVisible] = useState<boolean>(!!legend);
  useEffect(() => setLegendVisible(!!legend), [legend]);

  const handleModeChange = (next: CardMode) => {
    setCurrentMode(next);
    callbacks?.onModeChange?.(next);
  };

  const handleExport = (type: "csv" | "png") => {
    callbacks?.onExport?.(type);
  };

  const handleRefresh = () => callbacks?.onRefresh?.();

  // derive data attributes from theme tokens (no concrete values here)
  const themeAttrs = Object.fromEntries(
    Object.entries(theme || {}).map(([k, v]) => [
      `data-${k.replace(/\./g, "-")}`,
      String(v),
    ])
  );

  return (
    <section
      id={id}
      className={["card-base", className].filter(Boolean).join(" ")}
      aria-label={title}
      {...themeAttrs}
      style={{ maxWidth: "100%" }}
    >
      {/* Header */}
      <header className="card-base__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--spacing-sm, 0.5rem)" }}>
        <div className="card-base__title-group" style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm, 0.5rem)" }}>
          {icon ? <span className="card-base__icon" aria-hidden>{icon}</span> : null}
          <div className="card-base__heading" style={{ display: "grid" }}>
            <h2 className="card-base__title" style={{ margin: 0 }}>{title}</h2>
            {subtitle ? (
              <p className="card-base__subtitle" style={{ margin: 0 }}>{subtitle}</p>
            ) : null}
          </div>
          {Array.isArray(metrics) && metrics.length > 0 ? (
            <ul className="card-base__metrics" aria-label="Metrics" style={{ display: "flex", gap: "var(--spacing-sm, 0.5rem)", margin: 0, padding: 0, listStyle: "none" }}>
              {metrics.map((m) => (
                <li key={m.id} className="card-base__metric-item">
                  <span className="card-base__metric-label">{m.label}</span>{" "}
                  <strong className="card-base__metric-value">{m.value}</strong>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="card-base__actions" style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm, 0.5rem)" }}>
          {/* Mode switch */}
          <div role="group" aria-label="Mode switch" className="card-base__mode-switch" style={{ display: "inline-flex" }}>
            <button
              type="button"
              aria-label={i18n.table}
              aria-pressed={currentMode === "table"}
              onClick={() => handleModeChange("table")}
              className="card-base__btn card-base__btn--mode"
            >
              {i18n.table}
            </button>
            <button
              type="button"
              aria-label={i18n.chart}
              aria-pressed={currentMode === "chart"}
              onClick={() => handleModeChange("chart")}
              className="card-base__btn card-base__btn--mode"
            >
              {i18n.chart}
            </button>
          </div>

          {/* Chart-only: legend toggle (UI only) */}
          {currentMode === "chart" && typeof legend !== "undefined" ? (
            <label className="card-base__legend-toggle" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <input
                type="checkbox"
                aria-label={i18n.legend}
                checked={legendVisible}
                onChange={() => setLegendVisible((v) => !v)}
              />
              <span>{i18n.legend}</span>
            </label>
          ) : null}

          {/* Default actions */}
          <button type="button" className="card-base__btn" aria-label={i18n.refresh} onClick={handleRefresh}>
            {i18n.refresh}
          </button>
          <div className="card-base__export" role="group" aria-label="Export">
            <button type="button" className="card-base__btn" aria-label={i18n.exportCsv} onClick={() => handleExport("csv")}>
              CSV
            </button>
            <button type="button" className="card-base__btn" aria-label={i18n.exportPng} onClick={() => handleExport("png")}>
              PNG
            </button>
          </div>

          {/* Custom actions */}
          {Array.isArray(actions) && actions.map((a) => (
            <button
              key={a.id}
              type="button"
              className="card-base__btn"
              aria-label={a.ariaLabel || a.label}
              onClick={a.onClick}
            >
              {a.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="card-base__content" style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
        {state === "loading" && (
          <div role="status" aria-busy="true" className="card-base__loading" style={{ padding: "var(--spacing-md, 1rem)" }}>
            {/* Skeleton placeholder – replace with your own */}
            <div className="card-base__skeleton" style={{ height: "2lh" }} />
          </div>
        )}

        {state === "error" && (
          <div className="card-base__error" style={{ padding: "var(--spacing-md, 1rem)" }}>
            <p style={{ margin: 0 }}>{i18n.errorTitle}{errorMessage ? `: ${errorMessage}` : ""}</p>
            <div style={{ marginTop: "var(--spacing-sm, 0.5rem)" }}>
              <button type="button" className="card-base__btn" onClick={handleRefresh}>
                {i18n.retry}
              </button>
            </div>
          </div>
        )}

        {state === "noPermission" && (
          <div className="card-base__no-permission" style={{ padding: "var(--spacing-md, 1rem)" }}>
            <p style={{ margin: 0 }}>{i18n.noPermissionTitle}</p>
            <div style={{ marginTop: "var(--spacing-sm, 0.5rem)" }}>
              <button type="button" className="card-base__btn" onClick={handleRefresh}>
                {i18n.requestAccess}
              </button>
            </div>
          </div>
        )}

        {state === "empty" && (
          <div className="card-base__empty" style={{ padding: "var(--spacing-md, 1rem)" }}>
            <p style={{ margin: 0 }}>{i18n.emptyTitle}</p>
            <div style={{ marginTop: "var(--spacing-sm, 0.5rem)" }}>
              <button type="button" className="card-base__btn" onClick={handleRefresh}>
                {i18n.emptyCta}
              </button>
            </div>
          </div>
        )}

        {state === "idle" && (
          <div className="card-base__body" style={{ minHeight: "1lh" }}>
            {currentMode === "table" ? (
              tableSlot || <div className="card-base__placeholder" aria-live="polite">{i18n.table}</div>
            ) : (
              <div>
                {chartSlot || <div className="card-base__placeholder" aria-live="polite">{i18n.chart}</div>}
                {/* Consumers may read legendVisible/referenceLines via context or own props */}
                {/* Legend visible: {String(legendVisible)} | Reference lines provided: {Array.isArray(referenceLines)} */}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {(lastUpdated || footerLink) && (
        <footer className="card-base__footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--spacing-sm, 0.5rem)", paddingTop: "var(--spacing-sm, 0.5rem)" }}>
          <div className="card-base__status">
            {lastUpdated ? (
              <small aria-live="polite">
                {i18n.lastUpdated}: {lastUpdated}
              </small>
            ) : null}
          </div>
          {footerLink ? (
            footerLink.href ? (
              <a className="card-base__link" href={footerLink.href} onClick={footerLink.onClick}>
                {footerLink.label}
              </a>
            ) : (
              <button type="button" className="card-base__btn" onClick={footerLink.onClick}>
                {footerLink.label}
              </button>
            )
          ) : null}
        </footer>
      )}
    </section>
  );
}
