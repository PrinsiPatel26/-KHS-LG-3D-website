import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BearingFallback } from './BearingFallback';
import { disposeScene } from './sceneUtils';
import { DeviceTier, useDeviceTier, useReducedMotion, useWebGLSupport } from '../../hooks/useEnvironment';

export interface StageContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  tier: DeviceTier;
  reduced: boolean;
  shadows: boolean;
}

export interface StageHandle {
  update?: (delta: number, elapsed: number) => void;
  dispose?: () => void;
}

export interface ThreeStageProps {
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  shadows?: boolean;
  fallbackLabel?: string;
  /** Builds the scene contents. Re-runs only when its identity changes. */
  setup: (ctx: StageContext) => StageHandle;
}

/**
 * Minimal Three.js stage: renderer, camera, resize handling, visibility-aware
 * render loop and a graceful WebGL fallback. Shared by every 3D section.
 */
export function ThreeStage({
  className,
  cameraPosition = [0, 1.1, 4.8],
  fov = 38,
  shadows = true,
  fallbackLabel,
  setup
}: ThreeStageProps) {
  const host = useRef<HTMLDivElement>(null);
  const webgl = useWebGLSupport();
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const cameraRef = useRef(cameraPosition);
  const fovRef = useRef(fov);
  cameraRef.current = cameraPosition;
  fovRef.current = fov;

  useEffect(() => {
    const container = host.current;
    if (!container || !webgl) return;

    const useShadows = shadows && tier === 'high';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fovRef.current, 1, 0.1, 120);
    camera.position.set(...cameraRef.current);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: tier !== 'low',
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    const maxDpr = tier === 'low' ? 1 : tier === 'medium' ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = useShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.fov = fovRef.current;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    const handle = setup({ scene, camera, renderer, tier, reduced, shadows: useShadows });

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let visible = true;
    let intersection: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersection = new IntersectionObserver(
        (entries) => {
          visible = entries.some((e) => e.isIntersecting);
        },
        { rootMargin: '10% 0px' }
      );
      intersection.observe(container);
    }

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const delta = Math.min(clock.getDelta(), 0.05);
      if (!visible || document.hidden) return;
      handle.update?.(delta, clock.elapsedTime);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection?.disconnect();
      handle.dispose?.();
      disposeScene(scene);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [setup, webgl, tier, reduced, shadows]);

  if (!webgl) {
    return (
      <div className={className}>
        <BearingFallback label={fallbackLabel} />
      </div>);

  }

  return <div ref={host} className={className} aria-hidden />;
}
