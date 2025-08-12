import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search as SearchIcon, ChevronDown, ChevronUp } from "lucide-react";

export type PresetValue = "24h" | "7d" | "30d" | "custom";

export type DeviceOption = { value: string; label: string };

interface SearchFiltersProps {
  title?: string;
  // Query
  query?: string;
  onQueryChange?: (v: string) => void;
  showQuery?: boolean;
  queryPlaceholder?: string;
  // Device
  device?: string;
  onDeviceChange?: (v: string) => void;
  deviceOptions?: DeviceOption[];
  showDevice?: boolean;
  // Presets and date-time range
  preset?: PresetValue;
  onPresetChange?: (v: PresetValue) => void;
  from?: string; // datetime-local
  to?: string; // datetime-local
  onFromChange?: (v: string) => void;
  onToChange?: (v: string) => void;
  // Actions
  onSubmit?: () => void;
  onReset?: () => void;
  // Advanced section
  advancedTitle?: string;
  children?: React.ReactNode;
}

const defaultDevices: DeviceOption[] = [
  { value: "sysmex-xn-1000", label: "Sysmex XN-1000" },
  { value: "cobas-8000", label: "Cobas 8000" },
  { value: "architect-i2000sr", label: "Architect i2000SR" },
  { value: "vitros-5600", label: "Vitros 5600" },
];

export default function SearchFilters({
  title = "Filter",
  query,
  onQueryChange,
  showQuery = true,
  queryPlaceholder = "Suchbegriff eingeben...",
  device,
  onDeviceChange,
  deviceOptions = defaultDevices,
  showDevice = false,
  preset = "24h",
  onPresetChange,
  from,
  to,
  onFromChange,
  onToChange,
  onSubmit,
  onReset,
  advancedTitle = "Erweiterte Filter",
  children,
}: SearchFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SearchIcon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showQuery && (
            <div className="space-y-2">
              <Label htmlFor="query">Suchbegriff</Label>
              <Input
                id="query"
                placeholder={queryPlaceholder}
                value={query ?? ""}
                onChange={(e) => onQueryChange?.(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Zeitraum</Label>
            <ToggleGroup
              type="single"
              value={preset}
              onValueChange={(v) => v && onPresetChange?.(v as PresetValue)}
              className="justify-start"
            >
              <ToggleGroupItem value="24h">24h</ToggleGroupItem>
              <ToggleGroupItem value="7d">7 Tage</ToggleGroupItem>
              <ToggleGroupItem value="30d">30 Tage</ToggleGroupItem>
              <ToggleGroupItem value="custom">Benutzerdef.</ToggleGroupItem>
            </ToggleGroup>
          </div>

          {showDevice && (
            <div className="space-y-2">
              <Label htmlFor="device">Gerät</Label>
              <Select value={device} onValueChange={(v) => onDeviceChange?.(v)}>
                <SelectTrigger id="device">
                  <SelectValue placeholder="Gerät auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {deviceOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {preset === "custom" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="from">Von</Label>
                <Input
                  id="from"
                  type="datetime-local"
                  value={from ?? ""}
                  onChange={(e) => onFromChange?.(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">Bis</Label>
                <Input
                  id="to"
                  type="datetime-local"
                  value={to ?? ""}
                  onChange={(e) => onToChange?.(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {children && (
          <div className="border-t pt-4">
            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between mb-4">
                  <span className="flex items-center gap-2">
                    <SearchIcon className="h-4 w-4" />
                    {advancedTitle}
                  </span>
                  {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>{children}</CollapsibleContent>
            </Collapsible>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Button onClick={onSubmit} className="md:w-auto">
            <SearchIcon className="h-4 w-4 mr-2" />
            Suchen
          </Button>
          <Button variant="outline" onClick={onReset} className="md:w-auto">
            Zurücksetzen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
