import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ChartTableMode = "chart" | "table";

interface ChartTableSwitchProps {
  mode?: ChartTableMode;
  onChange?: (mode: ChartTableMode) => void;
  ariaLabel?: string;
}

// Neutral, accessible segmented switch for Chart/Table
// No styling beyond existing design system components.
export function ChartTableSwitch({ mode = "chart", onChange, ariaLabel = "Ansicht umschalten" }: ChartTableSwitchProps) {
  const [value, setValue] = React.useState<ChartTableMode>(mode);

  React.useEffect(() => {
    setValue(mode);
  }, [mode]);

  const handleChange = (val: string) => {
    const next = (val === "table" ? "table" : "chart") as ChartTableMode;
    setValue(next);
    onChange?.(next);
  };

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={handleChange}
      aria-label={ariaLabel}
      className=""
    >
      <ToggleGroupItem value="chart" aria-label="Chart anzeigen">Chart</ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Tabelle anzeigen">Tabelle</ToggleGroupItem>
    </ToggleGroup>
  );
}

export default ChartTableSwitch;
