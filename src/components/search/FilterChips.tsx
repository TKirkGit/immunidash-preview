import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface ChipItem {
  key: string;
  label: string;
  onRemove: () => void;
}

interface FilterChipsProps {
  chips: ChipItem[];
}

export default function FilterChips({ chips }: FilterChipsProps) {
  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <Badge key={chip.key} variant="secondary" className="flex items-center gap-2">
          {chip.label}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={chip.onRemove}
            aria-label={`Filter ${chip.label} entfernen`}
            className="h-5 w-5"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
}
