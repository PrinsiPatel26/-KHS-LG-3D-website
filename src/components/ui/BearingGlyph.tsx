import { cn } from '../../utils/cn';

/**
 * Precision vector bearing used in cards and lists.
 * Styled with authentic chrome steel, 3D spherical ball speculars,
 * and machined brass retainer detailing.
 */
export function BearingGlyph({
  className,
  rollers = 12,
  shape = 'ball'
}: {
  className?: string;
  rollers?: number;
  shape?: 'ball' | 'roller' | 'linear';
}) {
  const items = new Array(rollers).fill(0).map((_, i) => {
    const a = (i / rollers) * Math.PI * 2;
    return { a, x: 100 + Math.cos(a) * 66, y: 100 + Math.sin(a) * 66, deg: (a * 180) / Math.PI };
  });

  return (
    <svg viewBox="0 0 200 200" className={cn('h-full w-full', className)} aria-hidden>
      <defs>
        {/* Precision ground chrome steel gradient */}
        <linearGradient id="glyph-chrome-ring" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="14%" stopColor="#dce5ef" />
          <stop offset="32%" stopColor="#7c8f9f" />
          <stop offset="48%" stopColor="#f8fafc" />
          <stop offset="68%" stopColor="#56697a" />
          <stop offset="84%" stopColor="#e2eaf2" />
          <stop offset="100%" stopColor="#303e4d" />
        </linearGradient>

        {/* 3D spherical chrome ball gradient */}
        <radialGradient id="glyph-ball-metal" cx="32%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="26%" stopColor="#f1f5f9" />
          <stop offset="58%" stopColor="#94a3b8" />
          <stop offset="86%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>

        {/* CNC machined brass retainer cage */}
        <linearGradient id="glyph-brass-cage" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fae58c" />
          <stop offset="35%" stopColor="#cf9b2b" />
          <stop offset="65%" stopColor="#fdeea0" />
          <stop offset="100%" stopColor="#8f6614" />
        </linearGradient>
      </defs>

      {/* Outer raceway casing */}
      <circle cx="100" cy="100" r="94" fill="none" stroke="#FFF58A" strokeWidth="0.4" strokeDasharray="2 8" className="bearing-spin-reverse" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="url(#glyph-chrome-ring)" strokeWidth="16" />
      <circle cx="100" cy="100" r="93.5" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.6" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#161e26" strokeWidth="1.2" />

      {/* Inner raceway casing */}
      <circle cx="100" cy="100" r="54" fill="none" stroke="#161e26" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="48" fill="none" stroke="url(#glyph-chrome-ring)" strokeWidth="14" />
      <circle cx="100" cy="100" r="41.5" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.5" />
      <circle cx="100" cy="100" r="41" fill="#050505" />

      {/* Rolling elements and brass retainer cage */}
      <g className="bearing-spin">
        {/* Brass cage retainer ring */}
        <circle cx="100" cy="100" r="66" fill="none" stroke="url(#glyph-brass-cage)" strokeWidth="1.4" opacity="0.85" />

        {items.map(({ x, y, deg }, i) =>
          shape === 'ball' ? (
            <g key={i}>
              <circle cx={x} cy={y} r="8.2" fill="url(#glyph-ball-metal)" />
              <circle cx={x} cy={y} r="8.2" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" />
            </g>
          ) : (
            <rect
              key={i}
              x={x - (shape === 'linear' ? 3 : 5)}
              y={y - 9}
              width={shape === 'linear' ? 6 : 10}
              height="18"
              rx="2"
              fill="url(#glyph-chrome-ring)"
              stroke="#ffffff"
              strokeWidth="0.4"
              transform={`rotate(${deg} ${x} ${y})`}
            />
          )
        )}
      </g>
    </svg>
  );
}