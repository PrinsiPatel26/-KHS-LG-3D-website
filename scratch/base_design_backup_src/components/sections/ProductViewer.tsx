import { useEffect, useRef, useState } from 'react';
import { RotateCwIcon, ZoomInIcon, RefreshCwIcon, LayersIcon } from 'lucide-react';
import { BearingScene } from '../3d/BearingScene';
import { RollerShape } from '../3d/BearingModel';
import { cn } from '../../utils/cn';
import { useIsTouch } from '../../hooks/useEnvironment';

const ZOOM_STEPS = [5.2, 4.2, 3.3];

/** Interactive product viewer: rotate, zoom, exploded view and reset. */
export function ProductViewer({
  rollerShape = 'ball',
  className



}: {rollerShape?: RollerShape;className?: string;}) {
  const pointer = useRef({ x: 0, y: 0 });
  const surface = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const [rotating, setRotating] = useState(true);
  const [zoom, setZoom] = useState(0);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const node = surface.current;
    if (!node || touch) return;
    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      pointer.current.x = (e.clientX - rect.left) / rect.width * 2 - 1;
      pointer.current.y = -((e.clientY - rect.top) / rect.height * 2 - 1);
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, [touch]);

  const reset = () => {
    setRotating(true);
    setZoom(0);
    setExploded(false);
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  const controls: {label: string;icon: typeof RotateCwIcon;active: boolean;onClick: () => void;}[] =
  [
  {
    label: 'Rotate',
    icon: RotateCwIcon,
    active: rotating,
    onClick: () => setRotating((v) => !v)
  },
  {
    label: 'Zoom',
    icon: ZoomInIcon,
    active: zoom > 0,
    onClick: () => setZoom((v) => (v + 1) % ZOOM_STEPS.length)
  },
  {
    label: 'Explode',
    icon: LayersIcon,
    active: exploded,
    onClick: () => setExploded((v) => !v)
  },
  { label: 'Reset', icon: RefreshCwIcon, active: false, onClick: reset }];


  return (
    <div className={cn('relative overflow-hidden border border-ink-700 bg-ink-950', className)}>
      <div className="industrial-grid absolute inset-0 opacity-30" aria-hidden />
      <div ref={surface} className="relative h-[46vh] w-full sm:h-[58vh] lg:h-[68vh]" data-cursor="drag">
        <BearingScene
          className="absolute inset-0"
          spin={rotating ? 0.4 : 0}
          explode={exploded ? 1 : 0}
          rings={exploded ? 1 : 0}
          cameraZ={ZOOM_STEPS[zoom]}
          cameraY={0.85}
          pointer={pointer}
          rollerShape={rollerShape}
          grid={false}
          particles={false} />
        
      </div>

      <div className="relative flex flex-wrap items-center gap-px border-t border-ink-700 bg-ink-700">
        {controls.map((control) =>
        <button
          key={control.label}
          type="button"
          onClick={control.onClick}
          aria-pressed={control.label === 'Reset' ? undefined : control.active}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 bg-ink-950 px-4 py-4 font-mono text-[10px] uppercase tracking-tech transition-colors duration-200 ease-precision hover:text-signal',
            control.active ? 'text-signal' : 'text-steel-500'
          )}>
          
            <control.icon className="h-3.5 w-3.5" aria-hidden />
            {control.label}
          </button>
        )}
      </div>
    </div>);

}