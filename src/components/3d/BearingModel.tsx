import * as THREE from 'three';
import { clamp, damp, latheGeometry, ringProfile } from '../../utils/three';

export type RollerShape = 'ball' | 'cylinder' | 'taper' | 'linear';
export type Quality = 'low' | 'medium' | 'high';

export interface BearingState {
  /** 0 = assembled, 1 = fully exploded along the bearing axis. */
  explode: number;
  /** 0 = idle, 1 = inspection scan travelling across the rings. */
  scan: number;
  /** Target rotation speed in rad/s — eased with mechanical inertia. */
  spin: number;
  pointer?: {x: number;y: number;};
  reduced?: boolean;
}

export interface BearingRig {
  group: THREE.Group;
  update: (state: BearingState, delta: number) => void;
  dispose: () => void;
}

const DIMS = {
  outer: { inner: 1.24, outer: 1.62 },
  inner: { inner: 0.62, outer: 0.96 },
  ballRadius: 0.14,
  pitch: 1.1,
  halfWidth: 0.3
};

function segmentsFor(quality: Quality) {
  if (quality === 'low') return { lathe: 40, sphere: 12, torus: 24, rollers: 9 };
  if (quality === 'medium') return { lathe: 64, sphere: 18, torus: 36, rollers: 12 };
  return { lathe: 112, sphere: 32, torus: 56, rollers: 15 };
}

function rollerGeometry(shape: RollerShape, segments: number): THREE.BufferGeometry {
  if (shape === 'ball') {
    return new THREE.SphereGeometry(DIMS.ballRadius, segments, Math.max(8, Math.round(segments / 2)));
  }
  if (shape === 'linear') {
    return new THREE.CapsuleGeometry(
      DIMS.ballRadius * 0.7,
      0.3,
      4,
      Math.max(8, Math.round(segments / 2))
    );
  }
  const topRadius = shape === 'taper' ? DIMS.ballRadius * 0.72 : DIMS.ballRadius;
  return new THREE.CylinderGeometry(topRadius, DIMS.ballRadius, 0.34, Math.max(10, segments));
}

/**
 * Procedural precision bearing: lathed outer and inner rings, rolling
 * elements, cage and a travelling inspection ring. No external model assets.
 */
export function createBearing({
  quality = 'high',
  rollerShape = 'ball',
  scale = 1,
  castShadow = false





}: {quality?: Quality;rollerShape?: RollerShape;scale?: number;castShadow?: boolean;} = {}): BearingRig {
  const seg = segmentsFor(quality);
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const track = <T extends THREE.BufferGeometry,>(geo: T): T => {
    geometries.push(geo);
    return geo;
  };
  const trackMat = <T extends THREE.Material,>(mat: T): T => {
    materials.push(mat);
    return mat;
  };

  const root = new THREE.Group();
  root.scale.setScalar(scale);

  const tilt = new THREE.Group();
  tilt.rotation.x = -Math.PI / 2;
  root.add(tilt);

  const spinGroup = new THREE.Group();
  tilt.add(spinGroup);

  // Outer ring: precision-ground chrome steel (AISI 52100) with internal raceway
  const outerGroup = new THREE.Group();
  const outerMesh = new THREE.Mesh(
    track(latheGeometry(ringProfile(DIMS.outer.inner, DIMS.outer.outer, DIMS.halfWidth, 0.045, 'inner'), seg.lathe)),
    trackMat(
      new THREE.MeshPhysicalMaterial({
        color: '#e6ebf2',
        metalness: 1.0,
        roughness: 0.13,
        clearcoat: 0.45,
        clearcoatRoughness: 0.06,
        reflectivity: 1.0,
        envMapIntensity: 1.55,
        side: THREE.DoubleSide
      })
    )
  );
  outerMesh.castShadow = castShadow;
  outerMesh.receiveShadow = castShadow;
  outerGroup.add(outerMesh);
  spinGroup.add(outerGroup);

  // Inner ring: precision-ground chrome steel with external raceway
  const innerGroup = new THREE.Group();
  const innerMesh = new THREE.Mesh(
    track(latheGeometry(ringProfile(DIMS.inner.inner, DIMS.inner.outer, DIMS.halfWidth, 0.045, 'outer'), seg.lathe)),
    trackMat(
      new THREE.MeshPhysicalMaterial({
        color: '#dfe4ec',
        metalness: 1.0,
        roughness: 0.14,
        clearcoat: 0.45,
        clearcoatRoughness: 0.06,
        reflectivity: 1.0,
        envMapIntensity: 1.55,
        side: THREE.DoubleSide
      })
    )
  );
  innerMesh.castShadow = castShadow;
  innerMesh.receiveShadow = castShadow;
  innerGroup.add(innerMesh);
  spinGroup.add(innerGroup);

  // Rolling elements: mirror-lapped superfinished chrome balls / rollers
  const rollersGroup = new THREE.Group();
  const rollerGeo = track(rollerGeometry(rollerShape, seg.sphere));
  const rollerMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 1.0,
      roughness: 0.035,
      clearcoat: 0.85,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
      envMapIntensity: 1.95
    })
  );
  const angles: number[] = [];
  for (let i = 0; i < seg.rollers; i += 1) {
    const a = (i / seg.rollers) * Math.PI * 2;
    angles.push(a);
    const roller = new THREE.Mesh(rollerGeo, rollerMat);
    roller.position.set(Math.cos(a) * DIMS.pitch, 0, Math.sin(a) * DIMS.pitch);
    if (rollerShape === 'linear') roller.rotation.set(0, -a, Math.PI / 2);
    else if (rollerShape !== 'ball') roller.rotation.set(Math.PI / 2, 0, -a);
    roller.castShadow = castShadow;
    rollersGroup.add(roller);
  }
  spinGroup.add(rollersGroup);

  // Cage: CNC-machined solid brass/bronze retainer with pocket dividers
  const cageGroup = new THREE.Group();
  const cageMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: '#dfba56',
      metalness: 0.98,
      roughness: 0.22,
      clearcoat: 0.28,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      envMapIntensity: 1.4
    })
  );
  const cageRingGeo = track(new THREE.TorusGeometry(DIMS.pitch, 0.026, 8, seg.torus));
  [-0.16, 0.16].forEach((y) => {
    const ring = new THREE.Mesh(cageRingGeo, cageMat);
    ring.position.y = y;
    ring.rotation.x = Math.PI / 2;
    cageGroup.add(ring);
  });
  const bridgeGeo = track(new THREE.BoxGeometry(0.038, 0.32, 0.06));
  angles.forEach((a) => {
    // Dividers sit midway between rolling elements to form the retainer pockets
    const midAngle = a + Math.PI / seg.rollers;
    const bridge = new THREE.Mesh(bridgeGeo, cageMat);
    bridge.position.set(Math.cos(midAngle) * DIMS.pitch, 0, Math.sin(midAngle) * DIMS.pitch);
    bridge.rotation.y = -midAngle;
    cageGroup.add(bridge);
  });
  spinGroup.add(cageGroup);

  // Inspection scan ring
  const scanMat = trackMat(
    new THREE.MeshBasicMaterial({
      color: '#FFF9B8',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  const scanMesh = new THREE.Mesh(
    track(new THREE.TorusGeometry(DIMS.outer.outer + 0.06, 0.012, 6, seg.torus)),
    scanMat
  );
  scanMesh.rotation.x = Math.PI / 2;
  scanMesh.visible = false;
  spinGroup.add(scanMesh);

  let speed = 0;
  let explodeSmooth = 0;

  return {
    group: root,
    update({ explode, scan, spin, pointer, reduced }, delta) {
      const e = clamp(explode);
      const s = clamp(scan);
      const targetSpin = reduced ? 0 : spin;

      // Mechanical inertia: the bearing takes time to reach speed and to stop.
      speed = damp(speed, targetSpin, 1.6, delta);
      explodeSmooth = damp(explodeSmooth, e, 5, delta);
      const ex = explodeSmooth;

      spinGroup.rotation.y += speed * delta;

      const k = reduced ? 0 : 1;
      tilt.rotation.x = damp(
        tilt.rotation.x,
        -Math.PI / 2 + (pointer?.y ?? 0) * 0.14 * k,
        2.2,
        delta
      );
      tilt.rotation.z = damp(tilt.rotation.z, (pointer?.x ?? 0) * 0.16 * k, 2.2, delta);

      outerGroup.position.y = ex * 0.95;
      const outerScale = 1 + ex * 0.06;
      outerGroup.scale.set(outerScale, 1, outerScale);

      innerGroup.position.y = -ex * 0.95;

      cageGroup.position.y = ex * 0.42;
      cageGroup.rotation.y = ex * 0.25;

      rollersGroup.position.y = -ex * 0.36;
      rollersGroup.scale.setScalar(1 + ex * 0.18);

      scanMesh.visible = s > 0.01;
      if (scanMesh.visible) {
        const pulse = Math.sin(s * Math.PI);
        scanMesh.position.y = -0.85 + s * 1.7;
        scanMat.opacity = 0.85 * pulse;
        scanMesh.scale.setScalar(0.94 + pulse * 0.1);
      }
    },
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    }
  };
}