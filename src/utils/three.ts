import * as THREE from 'three';

/** A number, or anything with a .get() — lets Framer MotionValues drive the 3D scene. */
export type NumSource = number | {get(): number;};

export function readNum(value: NumSource | undefined, fallback = 0): number {
  if (typeof value === 'number') return value;
  if (value && typeof value.get === 'function') return value.get();
  return fallback;
}

export function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/**
 * Closed 2D profile of a bearing ring, revolved by LatheGeometry.
 * Chamfered edges read as machined steel rather than a raw tube.
 */
export function ringProfile(
innerRadius: number,
outerRadius: number,
halfWidth: number,
chamfer = 0.045)
: THREE.Vector2[] {
  const c = Math.min(chamfer, halfWidth * 0.6, (outerRadius - innerRadius) * 0.35);
  const pts = [
  new THREE.Vector2(innerRadius + c, -halfWidth),
  new THREE.Vector2(outerRadius - c, -halfWidth),
  new THREE.Vector2(outerRadius, -halfWidth + c),
  new THREE.Vector2(outerRadius, halfWidth - c),
  new THREE.Vector2(outerRadius - c, halfWidth),
  new THREE.Vector2(innerRadius + c, halfWidth),
  new THREE.Vector2(innerRadius, halfWidth - c),
  new THREE.Vector2(innerRadius, -halfWidth + c)];

  pts.push(pts[0].clone());
  return pts;
}

export function latheGeometry(points: THREE.Vector2[], segments: number): THREE.LatheGeometry {
  const geo = new THREE.LatheGeometry(points, segments);
  geo.computeVertexNormals();
  return geo;
}

export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}