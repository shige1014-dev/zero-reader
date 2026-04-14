"use client";

type FilterOption = {
  id: string;
  label: string;
};

type FilterBarProps = {
  filters: FilterOption[];
  activeFilter: string;
  onChange: (filterId: string) => void;
};

export function FilterBar({ filters, activeFilter, onChange }: FilterBarProps) {
  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <div className="flex min-w-max gap-2 px-1">
        {filters.map((filter) => {
          const active = filter.id === activeFilter;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm whitespace-nowrap transition ${
                active
                  ? "border-accent/35 bg-accent text-canvas"
                  : "border-border bg-black/15 text-textMuted hover:border-accent/25 hover:text-text"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
