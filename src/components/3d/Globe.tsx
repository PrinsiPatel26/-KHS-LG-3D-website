import { useCallback } from 'react';
import * as THREE from 'three';
import { StageContext, StageHandle, ThreeStage } from './SceneCanvas';
import { createIndustrialLights } from './sceneUtils';
import { createStudioEnvironment } from './StudioEnvironment';
import { markets } from '../../data/company';
import { latLonToVector3 } from '../../utils/three';

const RADIUS = 1.6;
const HOME = markets.find((m) => m.country === 'India');

/** Dark metallic globe with yellow market nodes and export arcs. */
export function Globe({ className }: {className?: string;}) {
  const setup = useCallback((ctx: StageContext): StageHandle => {
    if (!HOME) throw new Error('India market data is required for the globe.');

    ctx.scene.add(createIndustrialLights(false));
    const env = createStudioEnvironment(ctx.renderer);
    ctx.scene.environment = env.texture;

    const seg = ctx.tier === 'low' ? 20 : ctx.tier === 'medium' ? 32 : 48;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const group = new THREE.Group();
    group.rotation.set(0.28, 0, 0.12);
    ctx.scene.add(group);

    const sphereGeo = new THREE.SphereGeometry(RADIUS, seg, seg);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: '#0d0d0d',
      metalness: 0.85,
      roughness: 0.42
    });
    geometries.push(sphereGeo);
    materials.push(sphereMat);
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    const wireGeo = new THREE.SphereGeometry(RADIUS * 1.001, Math.round(seg / 2), Math.round(seg / 2));
    const wireMat = new THREE.MeshBasicMaterial({
      color: '#2c2c2c',
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    geometries.push(wireGeo);
    materials.push(wireMat);
    group.add(new THREE.Mesh(wireGeo, wireMat));

    const origin = latLonToVector3(HOME.lat, HOME.lon, RADIUS * 1.005);
    const arcMat = new THREE.LineBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.42
    });
    materials.push(arcMat);

    const nodeGeo = new THREE.SphereGeometry(0.022, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: '#FFF9B8' });
    const haloGeo = new THREE.SphereGeometry(0.05, 10, 10);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(nodeGeo, haloGeo);
    materials.push(nodeMat, haloMat);

    markets.forEach((market) => {
      const pos = latLonToVector3(market.lat, market.lon, RADIUS * 1.005);

      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      group.add(node);

      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      group.add(halo);

      if (market.country === HOME.country) return;
      const mid = origin.
      clone().
      add(pos).
      multiplyScalar(0.5).
      normalize().
      multiplyScalar(RADIUS * 1.42);
      const curve = new THREE.QuadraticBezierCurve3(origin, mid, pos);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      geometries.push(arcGeo);
      group.add(new THREE.Line(arcGeo, arcMat));
    });

    return {
      update(delta) {
        if (ctx.reduced) return;
        group.rotation.y += delta * 0.055;
      },
      dispose() {
        env.dispose();
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        ctx.scene.environment = null;
      }
    };
  }, []);

  return (
    <ThreeStage
      className={className}
      cameraPosition={[0, 0.4, 4.6]}
      fov={34}
      shadows={false}
      setup={setup}
      fallbackLabel="KHS-LG global export markets" />);


}