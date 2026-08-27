import { useEffect, useRef, useState } from 'react';
import { useIsTouch, useReducedMotion } from '../../hooks/useEnvironment';

type CursorMode = 'default' | 'ring' | 'drag' | 'open';

const LABEL: Record<CursorMode, string> = {
  default: '',
  ring: '',
  drag: 'DRAG',
  open: 'OPEN'
};

/** Desktop-only precision cursor. Disabled on touch devices. */
export function CustomCursor() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);
  const [wideEnough, setWideEnough] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setWideEnough(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setWideEnough(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const enabled = !touch && !reduced && wideEnough;

  useEffect(() => {
    if (!enabled) return;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const hit = target?.closest('[data-cursor]') as HTMLElement | null;
      const attr = hit?.dataset.cursor as CursorMode | undefined;
      if (attr) setMode(attr);else
      if (target?.closest('a,button,input,textarea,select')) setMode('ring');else
      setMode('default');
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current)
      ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove);
    document.documentElement.style.cursor = 'none';
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = '';
    };
  }, [enabled]);

  if (!enabled) return null;

  const expanded = mode !== 'default';
  const label = LABEL[mode];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-steel-50"
        style={{ opacity: visible && !expanded ? 1 : 0, transition: 'opacity 150ms linear' }} />
      
      <div
        ref={ring}
        className="absolute flex items-center justify-center rounded-full border border-signal font-mono text-[8px] uppercase tracking-tech text-signal"
        style={{
          width: expanded ? label ? 62 : 34 : 22,
          height: expanded ? label ? 62 : 34 : 22,
          marginLeft: expanded ? label ? -31 : -17 : -11,
          marginTop: expanded ? label ? -31 : -17 : -11,
          opacity: visible ? expanded ? 1 : 0.35 : 0,
          transition:
          'width 200ms cubic-bezier(0.23,1,0.32,1), height 200ms cubic-bezier(0.23,1,0.32,1), margin 200ms cubic-bezier(0.23,1,0.32,1), opacity 160ms linear'
        }}>
        
        {label}
      </div>
    </div>);

}