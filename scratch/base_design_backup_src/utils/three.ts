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
  const c = Math.min(chamfer, halfWidth * 0.45, (outerRadius - innerRadius) * 0.28);
  const pts: THREE.Vector2[] = [];

  // Bottom face: inner chamfer to outer chamfer
  pts.push(new THREE.Vector2(innerRadius + c, -halfWidth));
  pts.push(new THREE.Vector2(outerRadius - c, -halfWidth));
  pts.push(new THREE.Vector2(outerRadius, -halfWidth + c));

  // Outer cylindrical surface (concave smooth raceway arc if inner ring)
  if (raceway === 'outer') {
    const yRim = 0.12;
    const depth = 0.035;
    const R = (yRim * yRim + depth * depth) / (2 * depth);
    const r0 = outerRadius - depth + R;
    pts.push(new THREE.Vector2(outerRadius, -yRim));
    const arcPoints = 12;
    for (let i = 1; i < arcPoints; i++) {
      const y = -yRim + (i / arcPoints) * (2 * yRim);
      const r = r0 - Math.sqrt(Math.max(0.0001, R * R - y * y));
      pts.push(new THREE.Vector2(r, y));
    }
    pts.push(new THREE.Vector2(outerRadius, yRim));
  }

  // Top outer chamfer & top face
  pts.push(new THREE.Vector2(outerRadius, halfWidth - c));
  pts.push(new THREE.Vector2(outerRadius - c, halfWidth));
  pts.push(new THREE.Vector2(innerRadius + c, halfWidth));
  pts.push(new THREE.Vector2(innerRadius, halfWidth - c));

  // Inner cylindrical surface (concave smooth raceway arc if outer ring)
  if (raceway === 'inner') {
    const yRim = 0.12;
    const depth = 0.035;
    const R = (yRim * yRim + depth * depth) / (2 * depth);
    const r0 = innerRadius + depth - R;
    pts.push(new THREE.Vector2(innerRadius, yRim));
    const arcPoints = 12;
    for (let i = 1; i < arcPoints; i++) {
      const y = yRim - (i / arcPoints) * (2 * yRim);
      const r = r0 + Math.sqrt(Math.max(0.0001, R * R - y * y));
      pts.push(new THREE.Vector2(r, y));
    }
    pts.push(new THREE.Vector2(innerRadius, -yRim));
  } else {
    // Smooth inner bore cylinder with axial subdivisions to avoid vertex interpolation artifacts
    pts.push(new THREE.Vector2(innerRadius, 0.12));
    pts.push(new THREE.Vector2(innerRadius, 0));
    pts.push(new THREE.Vector2(innerRadius, -0.12));
  }

  // Bottom inner chamfer
  pts.push(new THREE.Vector2(innerRadius, -halfWidth + c));
  pts.push(pts[0].clone());
  return pts;
}

export function latheGeometry(points: THREE.Vector2[], segments: number): THREE.LatheGeometry {
  // Built-in LatheGeometry normals are mathematically rotational-symmetric
  // and closed seamlessly across phi = 0 / 2*PI. Do not call computeVertexNormals().
  return new THREE.LatheGeometry(points, segments);
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