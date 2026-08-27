
export function LoadingProgress({ percent, status }: {percent: number;status: string;}) {
  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-6">
        <p className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
          KHS-LG / <span className="text-signal">{status}</span>
        </p>
        <p className="font-display text-2xl font-semibold leading-none text-steel-50 tabular-nums sm:text-3xl">
          {String(percent).padStart(2, '0')}
          <span className="text-signal">%</span>
        </p>
      </div>
      <div
        className="mt-3 h-px w-full bg-ink-700"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading KHS-LG precision system">
        
        <div
          className="h-px bg-signal transition-[width] duration-150 ease-linear"
          style={{ width: `${percent}%` }} />
        
      </div>
    </div>);

}