import { useCallback } from 'react';
import * as THREE from 'three';
import { StageContext, StageHandle, ThreeStage } from './SceneCanvas';
import { createIndustrialLights } from './sceneUtils';
import { createStudioEnvironment } from './StudioEnvironment';
import { markets } from '../../data/company';
import { latLonToVector3 } from '../../utils/three';

const RADIUS = 1.35;
const HOME = markets.find((m) => m.country === 'India');

/** Sleek metallic slate globe with luminous yellow market nodes and export arcs. */
export function Globe({ className }: {className?: string;}) {
  const setup = useCallback((ctx: StageContext): StageHandle => {
    if (!HOME) throw new Error('India market data is required for the globe.');

    ctx.camera.lookAt(0, 0, 0);
    ctx.scene.add(createIndustrialLights(false));
    const env = createStudioEnvironment(ctx.renderer);
    ctx.scene.environment = env.texture;

    const seg = ctx.tier === 'low' ? 24 : ctx.tier === 'medium' ? 36 : 48;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const group = new THREE.Group();
    group.rotation.set(0.24, 0, 0.1);
    ctx.scene.add(group);

    const sphereGeo = new THREE.SphereGeometry(RADIUS, seg, seg);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: '#1e293b',
      metalness: 0.62,
      roughness: 0.35
    });
    geometries.push(sphereGeo);
    materials.push(sphereMat);
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    const wireGeo = new THREE.SphereGeometry(RADIUS * 1.002, Math.round(seg / 2), Math.round(seg / 2));
    const wireMat = new THREE.MeshBasicMaterial({
      color: '#3b4b62',
      wireframe: true,
      transparent: true,
      opacity: 0.42
    });
    geometries.push(wireGeo);
    materials.push(wireMat);
    group.add(new THREE.Mesh(wireGeo, wireMat));

    const origin = latLonToVector3(HOME.lat, HOME.lon, RADIUS * 1.006);
    const arcMat = new THREE.LineBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.72
    });
    materials.push(arcMat);

    const nodeGeo = new THREE.SphereGeometry(0.024, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: '#FFF9B8' });
    const haloGeo = new THREE.SphereGeometry(0.052, 10, 10);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(nodeGeo, haloGeo);
    materials.push(nodeMat, haloMat);

    // India origin hub - slightly highlighted
    const hubNodeGeo = new THREE.SphereGeometry(0.038, 12, 12);
    const hubHaloGeo = new THREE.SphereGeometry(0.085, 12, 12);
    const hubHaloMat = new THREE.MeshBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(hubNodeGeo, hubHaloGeo);
    materials.push(hubHaloMat);

    markets.forEach((market) => {
      const isHome = market.country === HOME.country;
      const pos = latLonToVector3(market.lat, market.lon, RADIUS * 1.006);

      const node = new THREE.Mesh(isHome ? hubNodeGeo : nodeGeo, nodeMat);
      node.position.copy(pos);
      group.add(node);

      const halo = new THREE.Mesh(isHome ? hubHaloGeo : haloGeo, isHome ? hubHaloMat : haloMat);
      halo.position.copy(pos);
      group.add(halo);

      if (isHome) return;
      const mid = origin.
      clone().
      add(pos).
      multiplyScalar(0.5).
      normalize().
      multiplyScalar(RADIUS * 1.28);
      const curve = new THREE.QuadraticBezierCurve3(origin, mid, pos);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      geometries.push(arcGeo);
      group.add(new THREE.Line(arcGeo, arcMat));
    });

    return {
      update(delta) {
        if (ctx.reduced) return;
        group.rotation.y += delta * 0.05;
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
      cameraPosition={[0, 0, 5.6]}
      fov={42}
      shadows={false}
      setup={setup}
      fallbackLabel="KHS-LG global export markets" />);


}