import { BearingScene } from '../3d/BearingScene';
import { useNearViewport } from '../../hooks/useNearViewport';
import { cn } from '../../utils/cn';

const CALLOUTS = ['DIMENSION', 'PROFILE', 'SURFACE', 'ROUNDNESS', 'TOLERANCE'];

export function QualityVisual({ mode = 'inspection', className }: { mode?: 'hero' | 'engineering' | 'inspection'; className?: string }) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const isEngineering = mode === 'engineering';
  const isInspection = mode === 'inspection';

  return (
    <div ref={ref} className={cn('relative min-h-[360px] overflow-hidden border border-ink-700 bg-ink-950 sm:min-h-[460px]', className)} aria-label={`${mode} bearing visual`}>
      <div className="industrial-grid absolute inset-0 opacity-30" aria-hidden />
      {near && <BearingScene className="absolute inset-0" spin={isEngineering ? 0.28 : 0.38} explode={isEngineering ? 0.48 : 0} scan={isInspection ? 0.7 : 0} rings={1} cameraZ={isEngineering ? 4.8 : 4.5} cameraY={0.75} grid={false} particles={false} fallbackLabel="Bearing visual loading" />}
      {isInspection && <div className="quality-scan-line absolute inset-x-8 top-1/2 h-px bg-signal/80 shadow-[0_0_18px_rgba(255,245,138,0.8)] sm:inset-x-16" aria-hidden />}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(5,5,5,0.82)_100%)]" aria-hidden />
      {isInspection && <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-x-5 gap-y-2 sm:inset-x-8 sm:grid-cols-5"><span className="col-span-2 font-mono text-[9px] uppercase tracking-tech text-signal sm:col-span-5">Inspection layer / live review</span>{CALLOUTS.map((label, index) => <span key={label} className={cn('font-mono text-[8px] uppercase tracking-tech text-steel-500', index === 0 && 'text-steel-300')}>{label}</span>)}</div>}
      {isEngineering && <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-tech text-signal sm:left-8 sm:top-8">Exploded assembly / technical review</div>}
      {mode === 'hero' && <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-tech text-steel-500 sm:bottom-8 sm:left-8">KHS-LG / precision bearing system</div>}
    </div>
  );
}
