import { clamp } from '../../utils/three';

const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
const easeInOut = (value: number) => value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

/** Phase-driven cinematic values — one continuous shot from dark to hero. */
export const loaderCurves = {
  cameraZ(progress: number, outro: number) {
    const approach = 9 - range(progress, 0, 0.22) * 2.6 - range(progress, 0.22, 0.9) * 2.1;
    return approach + (0.5 - approach) * easeInOut(outro);
  },
  cameraY(progress: number, outro: number) {
    const y = 1.75 - range(progress, 0.1, 0.9) * 0.7;
    return y * (1 - easeInOut(outro));
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
