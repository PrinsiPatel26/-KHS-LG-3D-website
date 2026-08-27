
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
          <radialGradient id="metal" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#D7D7D7" />
            <stop offset="55%" stopColor="#8C8C8C" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#1A1A1A" strokeWidth="1" />
        <circle cx="100" cy="100" r="86" fill="url(#metal)" opacity="0.9" />
        <circle cx="100" cy="100" r="74" fill="#0B0B0B" />
        <circle cx="100" cy="100" r="58" fill="url(#metal)" opacity="0.85" />
        <circle cx="100" cy="100" r="42" fill="#050505" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#D9CC4D" strokeWidth="0.6" />
        {balls.map((b, i) =>
        <circle key={i} cx={b.x} cy={b.y} r="7.2" fill="url(#metal)" />
        )}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
            stroke="#FFF58A"
          strokeWidth="0.5"
          strokeDasharray="2 6" />
        
      </svg>
    </div>);

}