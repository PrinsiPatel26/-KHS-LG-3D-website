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
  const modeRef = useRef<CursorMode>('default');
  const visibleRef = useRef(false);
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
    modeRef.current = 'default';
    visibleRef.current = false;
    setMode('default');
    setVisible(false);
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    const originalCursor = document.documentElement.style.cursor;
    let cursorHidden = false;
    let raf = 0;

    function render() {
      const dx = pos.x - ringPos.x;
      const dy = pos.y - ringPos.y;
      const settled = Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25;
      if (settled) {
        ringPos.x = pos.x;
        ringPos.y = pos.y;
      } else {
        ringPos.x += dx * 0.28;
        ringPos.y += dy * 0.28;
      }
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = settled ? 0 : requestAnimationFrame(render);
    }

    const onMove = (e: PointerEvent) => {
      if (!cursorHidden) {
        cursorHidden = true;
        document.documentElement.style.cursor = 'none';
      }
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      const target = e.target instanceof Element ? e.target : null;
      const hit = target?.closest('[data-cursor]') as HTMLElement | null;
      const attr = hit?.dataset.cursor as CursorMode | undefined;
      const nextMode: CursorMode = attr ?? (target?.closest('a,button,input,textarea,select,[role="button"]') ? 'ring' : 'default');
      if (nextMode !== modeRef.current) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }
      if (!raf) raf = requestAnimationFrame(render);
    };

    const hide = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      setVisible(false);
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerout', onPointerOut);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', hide);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = originalCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  const expanded = mode !== 'default';
  const label = LABEL[mode];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-cursor">
      <div
        ref={dot}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full border border-ink-950 bg-signal shadow-[0_0_4px_rgba(0,0,0,0.7)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: expanded ? 'scale(0.6)' : 'scale(1)',
          transition: 'opacity 150ms linear, transform 180ms ease'
        }} />
      
      <div
        ref={ring}
        className="absolute flex items-center justify-center rounded-full border border-signal font-mono text-[8px] uppercase tracking-tech text-signal shadow-[0_0_6px_rgba(0,0,0,0.35)]"
        style={{
          width: expanded ? label ? 64 : 36 : 24,
          height: expanded ? label ? 64 : 36 : 24,
          marginLeft: expanded ? label ? -32 : -18 : -12,
          marginTop: expanded ? label ? -32 : -18 : -12,
          backgroundColor: expanded ? 'rgba(255, 245, 138, 0.12)' : 'rgba(0, 0, 0, 0.08)',
          opacity: visible ? (expanded ? 1 : 0.65) : 0,
          transition:
          'width 200ms cubic-bezier(0.23,1,0.32,1), height 200ms cubic-bezier(0.23,1,0.32,1), margin 200ms cubic-bezier(0.23,1,0.32,1), opacity 160ms linear, background-color 200ms ease'
        }}>
        
        {label}
      </div>
    </div>);

}