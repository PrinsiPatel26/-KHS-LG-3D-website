import { cn } from '../../utils/cn';

/**
 * Lightweight vector bearing used in cards and lists. Keeps the bearing
 * visual language everywhere without spawning extra WebGL contexts.
 */
export function BearingGlyph({
  className,
  rollers = 12,
  shape = 'ball'




}: {className?: string;rollers?: number;shape?: 'ball' | 'roller' | 'linear';}) {
  const items = new Array(rollers).fill(0).map((_, i) => {
    const a = i / rollers * Math.PI * 2;
    return { a, x: 100 + Math.cos(a) * 66, y: 100 + Math.sin(a) * 66, deg: a * 180 / Math.PI };
  });

  return (
    <svg viewBox="0 0 200 200" className={cn('h-full w-full', className)} aria-hidden>
      <defs>
        <linearGradient id="glyph-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D7D7D7" />
          <stop offset="45%" stopColor="#8C8C8C" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="94" fill="none" stroke="#FFF58A" strokeWidth="0.4" strokeDasharray="2 8" className="bearing-spin-reverse" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="url(#glyph-metal)" strokeWidth="16" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#050505" strokeWidth="1" opacity="0.6" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="url(#glyph-metal)" strokeWidth="16" />
      <circle cx="100" cy="100" r="42" fill="#050505" />

      <g className="bearing-spin">
        {items.map(({ x, y, deg }, i) =>
        shape === 'ball' ?
        <circle key={i} cx={x} cy={y} r="8" fill="url(#glyph-metal)" /> :

        <rect
          key={i}
          x={x - (shape === 'linear' ? 3 : 5)}
          y={y - 9}
          width={shape === 'linear' ? 6 : 10}
          height="18"
          rx="2"
          fill="url(#glyph-metal)"
          transform={`rotate(${deg} ${x} ${y})`} />


        )}
        <circle cx="100" cy="100" r="66" fill="none" stroke="#D9CC4D" strokeWidth="0.8" opacity="0.7" />
      </g>
    </svg>);

}