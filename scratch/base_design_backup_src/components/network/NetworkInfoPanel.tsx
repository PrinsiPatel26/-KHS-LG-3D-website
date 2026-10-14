type NetworkInfoPanelProps = {
  title: string;
  subtitle: string;
  detailLabel: string;
  detailValue: string;
  description: string;
  accentLabel?: string;
};

export function NetworkInfoPanel({ title, subtitle, detailLabel, detailValue, description, accentLabel }: NetworkInfoPanelProps) {
  return (
    <aside className="rounded-[20px] border border-ink-700 bg-ink-950/90 p-6 shadow-[0_0_0_1px_rgba(255,245,138,0.04)] lg:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-ink-700 pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">{detailLabel}</p>
          <h3 className="mt-2 font-display text-2xl uppercase text-steel-50">{title}</h3>
        </div>
        {accentLabel && (
          <span className="rounded-full border border-signal/40 bg-signal/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-signal">
            {accentLabel}
          </span>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel-500">{subtitle}</p>
        <p className="font-display text-xl uppercase text-steel-50">{detailValue}</p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-steel-400">{description}</p>
    </aside>
  );
}
