import * as THREE from 'three';

/** Faint industrial floor grid over a dark metallic plate. */
export function createEngineeringGrid({
  size = 34,
  divisions = 34,
  y = -1.85,
  opacity = 0.22,
  receiveShadow = false






}: {size?: number;divisions?: number;y?: number;opacity?: number;receiveShadow?: boolean;} = {}): THREE.Group {
  const group = new THREE.Group();
  group.position.y = y;

  const grid = new THREE.GridHelper(size, divisions, '#3a3a3a', '#1e1e1e');
  const gridMaterial = grid.material as THREE.Material;
  gridMaterial.transparent = true;
  gridMaterial.opacity = opacity;
  gridMaterial.depthWrite = false;
  group.add(grid);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(size / 2, 64),
    new THREE.MeshStandardMaterial({ color: '#080808', metalness: 0.6, roughness: 0.55 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.01;
  floor.receiveShadow = receiveShadow;
  group.add(floor);

  return group;
}