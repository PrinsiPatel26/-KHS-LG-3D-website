import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * Mounts heavy 3D scenes only when they are close to the viewport so the
 * page never boots every WebGL context at once.
 */
export function useNearViewport<T extends HTMLElement = HTMLDivElement>(
rootMargin = '35% 0px')
: [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, near];
}