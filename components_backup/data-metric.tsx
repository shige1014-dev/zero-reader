type DataMetricProps = {
  label: string;
  value: string;
  subtext: string;
};

export function DataMetric({ label, value, subtext }: DataMetricProps) {
  return (
    <div className="rounded-[1.35rem] border border-border bg-surface p-4 shadow-glow">
      <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-textMuted">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl tracking-[-0.04em] text-text">
        {value}
      </p>
      <p className="mt-2 text-sm text-textMuted">{subtext}</p>
    </div>
  );
}
