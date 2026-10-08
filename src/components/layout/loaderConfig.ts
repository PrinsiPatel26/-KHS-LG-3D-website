import { clamp } from '../../utils/three';

const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
const easeInOut = (value: number) => value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

/** Phase-driven cinematic values — one continuous shot from dark to hero. */
export const loaderCurves = {
  cameraZ(progress: number, outro: number) {
    const approach = 5.4 - range(progress, 0, 0.5) * 0.8;
    return approach - outro * 0.3;
  },
  cameraY(progress: number, outro: number) {
    return 0.25 * (1 - range(progress, 0, 0.5)) * (1 - outro);
  },
  explode(progress: number) {
    return range(progress, 0.55, 0.8) * (1 - range(progress, 0.88, 0.99));
  },
  scan(progress: number) {
    return range(progress, 0.34, 0.62) * (1 - range(progress, 0.62, 0.7));
  },
  rings(progress: number, outro: number) {
    return range(progress, 0.28, 0.46) * (1 - range(outro, 0.55, 1));
  },
  spin(progress: number, outro: number) {
    return 0.26 + range(progress, 0.15, 1) * 1.15 + outro * 1.1;
  }
};
