import * as THREE from 'three';

export function disposeScene(scene: THREE.Object3D): void {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = (mesh as unknown as {material?: THREE.Material | THREE.Material[];}).material;
    if (Array.isArray(material)) material.forEach((m) => m.dispose());else
    if (material) material.dispose();
  });
  scene.clear();
}

/** Dark industrial lighting rig: white key from above, yellow rim accents. */
export function createIndustrialLights(shadows: boolean): THREE.Group {
  const group = new THREE.Group();

  group.add(new THREE.AmbientLight('#cfd6e0', 0.55));

  const key = new THREE.SpotLight('#ffffff', 90, 26, 0.58, 0.92);
  key.position.set(0, 7.5, 2.4);
  key.castShadow = shadows;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0004;
  group.add(key);
  group.add(key.target);

  const rim = new THREE.PointLight('#FFF58A', 28, 16);
  rim.position.set(-4.2, 0.6, -2.4);
  group.add(rim);

  const warm = new THREE.PointLight('#D9CC4D', 14, 14);
  warm.position.set(4.4, -1.2, 1.6);
  group.add(warm);

  const fill = new THREE.PointLight('#D7D7D7', 10, 14);
  fill.position.set(1.6, 2.4, 4.4);
  group.add(fill);

  return group;
}
