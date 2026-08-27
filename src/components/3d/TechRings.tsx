import * as THREE from 'three';
import { clamp, damp } from '../../utils/three';
import { Quality } from './BearingModel';

export interface TechRingLayer {
  group: THREE.Group;
  update: (active: number, delta: number) => void;
  dispose: () => void;
}

/**
 * Yellow measurement rings and radial tick marks — the precision-inspection
 * layer around the bearing. Intentionally thin and sparse.
 */
export function createTechRings(quality: Quality = 'high'): TechRingLayer {
  const group = new THREE.Group();
  group.visible = false;

  const tickCount = quality === 'low' ? 24 : quality === 'medium' ? 40 : 64;
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.MeshBasicMaterial[] = [];

  const makeMaterial = (base: number) => {
    const mat = new THREE.MeshBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    mat.userData.base = base;
    materials.push(mat);
    return mat;
  };

  const spinner = new THREE.Group();
  group.add(spinner);

  const outerRing = new THREE.TorusGeometry(2.1, 0.006, 4, 96);
  const haloRing = new THREE.TorusGeometry(2.42, 0.004, 4, 96);
  geometries.push(outerRing, haloRing);
  spinner.add(new THREE.Mesh(outerRing, makeMaterial(0.7)));
  spinner.add(new THREE.Mesh(haloRing, makeMaterial(0.35)));

  const longTick = new THREE.BoxGeometry(0.14, 0.006, 0.006);
  const shortTick = new THREE.BoxGeometry(0.06, 0.006, 0.006);
  geometries.push(longTick, shortTick);
  const longMat = makeMaterial(0.8);
  const shortMat = makeMaterial(0.3);

  for (let i = 0; i < tickCount; i += 1) {
    const a = i / tickCount * Math.PI * 2;
    const long = i % 4 === 0;
    const tick = new THREE.Mesh(long ? longTick : shortTick, long ? longMat : shortMat);
    tick.position.set(Math.cos(a) * 2.26, Math.sin(a) * 2.26, 0);
    tick.rotation.z = a;
    spinner.add(tick);
  }

  const arc = new THREE.TorusGeometry(1.86, 0.005, 4, 96, Math.PI * 0.6);
  geometries.push(arc);
  const arcMesh = new THREE.Mesh(arc, makeMaterial(0.85));
  arcMesh.rotation.z = Math.PI / 4;
  group.add(arcMesh);

  let shown = 0;

  return {
    group,
    update(active, delta) {
      const target = clamp(active);
      shown = damp(shown, target, 4, delta);
      group.visible = shown > 0.01;
      if (!group.visible) return;
      group.scale.setScalar(0.88 + shown * 0.12);
      spinner.rotation.z += delta * 0.16;
      materials.forEach((mat) => {
        mat.opacity = (mat.userData.base as number) * shown;
      });
    },
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    }
  };
}