import { MutableRefObject, useMemo } from 'react';
import { BearingScene } from '../3d/BearingScene';
import { useDeviceTier } from '../../hooks/useEnvironment';
import { loaderCurves } from './loaderConfig';

export interface LoaderState {
  progress: number;
  outro: number;
}

export function LoaderScene({
  state,
  className



}: {state: MutableRefObject<LoaderState>;className?: string;}) {
  const tier = useDeviceTier();

  const sources = useMemo(() => {
    const s = state;
    return {
      explode: { get: () => loaderCurves.explode(s.current.progress) },
      scan: { get: () => loaderCurves.scan(s.current.progress) },
      rings: { get: () => loaderCurves.rings(s.current.progress, s.current.outro) },
      spin: { get: () => loaderCurves.spin(s.current.progress, s.current.outro) },
      camZ: { get: () => loaderCurves.cameraZ(s.current.progress, s.current.outro) },
      camY: { get: () => loaderCurves.cameraY(s.current.progress, s.current.outro) }
    };
  }, [state]);

  const bearingScale = tier === 'low' ? 0.78 : tier === 'medium' ? 0.88 : 1;

  return (
    <BearingScene
      className={className}
      explode={sources.explode}
      scan={sources.scan}
      rings={sources.rings}
      spin={sources.spin}
      cameraZ={sources.camZ}
      cameraY={sources.camY}
      scale={bearingScale}
      fov={36}
      initialCamera={[0, 1.75, 9]}
      cameraLambda={5.2}
      fallbackLabel="KHS-LG precision bearing" />);


}