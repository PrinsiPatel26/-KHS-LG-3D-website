import * as THREE from 'three';

export interface ParticleField {
  points: THREE.Points;
  update: (delta: number, elapsed: number) => void;
  dispose: () => void;
}

/** Slow-drifting dust motes catching the yellow work light. */
export function createFloatingParticles({
  count = 220,
  radius = 8,
  color = '#FFF58A',
  paused = false





}: {count?: number;radius?: number;color?: string;paused?: boolean;} = {}): ParticleField {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * radius * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * radius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 1.4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size: 0.022,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);

  return {
    points,
    update(delta, elapsed) {
      if (paused) return;
      points.rotation.y += delta * 0.014;
      points.position.y = Math.sin(elapsed * 0.12) * 0.16;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    }
  };
}