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
 * Machined chamfers and concave ball raceway groove produce an authentic
 * precision-ground chrome steel bearing cross section.
 */
export function ringProfile(
  innerRadius: number,
  outerRadius: number,
  halfWidth: number,
  chamfer = 0.045,
  raceway?: 'inner' | 'outer'
): THREE.Vector2[] {
  const c = Math.min(chamfer, halfWidth * 0.5, (outerRadius - innerRadius) * 0.32);
  const pts: THREE.Vector2[] = [];

  // Bottom face: inner chamfer to outer chamfer
  pts.push(new THREE.Vector2(innerRadius + c, -halfWidth));
  pts.push(new THREE.Vector2(outerRadius - c, -halfWidth));
  pts.push(new THREE.Vector2(outerRadius, -halfWidth + c));

  // Outer cylindrical surface (concave raceway if inner ring)
  if (raceway === 'outer') {
    const depth = Math.min(0.034, (outerRadius - innerRadius) * 0.22);
    pts.push(new THREE.Vector2(outerRadius, -0.12));
    pts.push(new THREE.Vector2(outerRadius - depth * 0.7, -0.07));
    pts.push(new THREE.Vector2(outerRadius - depth, 0));
    pts.push(new THREE.Vector2(outerRadius - depth * 0.7, 0.07));
    pts.push(new THREE.Vector2(outerRadius, 0.12));
  }

  // Top outer chamfer & top face
  pts.push(new THREE.Vector2(outerRadius, halfWidth - c));
  pts.push(new THREE.Vector2(outerRadius - c, halfWidth));
  pts.push(new THREE.Vector2(innerRadius + c, halfWidth));
  pts.push(new THREE.Vector2(innerRadius, halfWidth - c));

  // Inner cylindrical surface (concave raceway if outer ring)
  if (raceway === 'inner') {
    const depth = Math.min(0.034, (outerRadius - innerRadius) * 0.22);
    pts.push(new THREE.Vector2(innerRadius, 0.12));
    pts.push(new THREE.Vector2(innerRadius + depth * 0.7, 0.07));
    pts.push(new THREE.Vector2(innerRadius + depth, 0));
    pts.push(new THREE.Vector2(innerRadius + depth * 0.7, -0.07));
    pts.push(new THREE.Vector2(innerRadius, -0.12));
  }

  // Bottom inner chamfer
  pts.push(new THREE.Vector2(innerRadius, -halfWidth + c));
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