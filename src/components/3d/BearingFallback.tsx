
/**
 * Static SVG bearing shown when WebGL is unavailable. The site stays usable
 * and keeps the black / metallic / yellow identity.
 */
export function BearingFallback({ label = 'KHS-LG PRECISION BEARING' }: {label?: string;}) {
  const balls = new Array(14).fill(0).map((_, i) => {
    const a = i / 14 * Math.PI * 2;
    return { x: 100 + Math.cos(a) * 66, y: 100 + Math.sin(a) * 66 };
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={label}
        className="h-[min(70vh,70vw)] w-[min(70vh,70vw)]">
        
        <defs>
          <linearGradient id="fallback-chrome" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="15%" stopColor="#dce5ef" />
            <stop offset="32%" stopColor="#7c8f9f" />
            <stop offset="48%" stopColor="#f8fafc" />
            <stop offset="68%" stopColor="#56697a" />
            <stop offset="84%" stopColor="#e2eaf2" />
            <stop offset="100%" stopColor="#303e4d" />
          </linearGradient>
          <radialGradient id="fallback-ball-metal" cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#f1f5f9" />
            <stop offset="58%" stopColor="#94a3b8" />
            <stop offset="86%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
          <linearGradient id="fallback-brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fae58c" />
            <stop offset="35%" stopColor="#cf9b2b" />
            <stop offset="65%" stopColor="#fdeea0" />
            <stop offset="100%" stopColor="#8f6614" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="100" cy="100" r="92" fill="none" stroke="#1A1A1A" strokeWidth="1" />
        <circle cx="100" cy="100" r="86" fill="url(#fallback-chrome)" opacity="0.95" />
        <circle cx="100" cy="100" r="92.5" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
        <circle cx="100" cy="100" r="76" fill="#0B0B0B" />
        {/* Inner ring */}
        <circle cx="100" cy="100" r="56" fill="url(#fallback-chrome)" opacity="0.95" />
        <circle cx="100" cy="100" r="42" fill="#050505" />
        <circle cx="100" cy="100" r="42.5" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.5" />
        {/* Brass cage retainer */}
        <circle cx="100" cy="100" r="66" fill="none" stroke="url(#fallback-brass)" strokeWidth="1.2" opacity="0.85" />
        {balls.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r="7.4" fill="url(#fallback-ball-metal)" />
            <circle cx={b.x} cy={b.y} r="7.4" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.45" />
          </g>
        ))}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#FFF58A"
          strokeWidth="0.5"
          strokeDasharray="2 6"
        />
      </svg>
    </div>);

}