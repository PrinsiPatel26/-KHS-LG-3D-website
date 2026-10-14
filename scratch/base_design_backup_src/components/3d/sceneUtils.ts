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

/** Photographic studio lighting rig: high-intensity key, sharp chrome rim highlights, brass fill, and under-bore bounce. */
export function createIndustrialLights(shadows: boolean): THREE.Group {
  const group = new THREE.Group();

  group.add(new THREE.AmbientLight('#dce6f2', 0.65));

  const key = new THREE.SpotLight('#ffffff', 120, 32, 0.62, 0.88);
  key.position.set(0, 8.2, 3.2);
  key.castShadow = shadows;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = 0.0001;
  group.add(key);
  group.add(key.target);

  // Sharp cool rim light (catches outer bevel and chrome edges)
  const rim = new THREE.PointLight('#cde2fa', 48, 22);
  rim.position.set(-4.5, 2.5, -2.8);
  group.add(rim);

  // Front specular glint light
  const frontSpecular = new THREE.PointLight('#ffffff', 28, 16);
  frontSpecular.position.set(1.4, 2.4, 4.8);
  group.add(frontSpecular);

  // Warm industrial light to catch the golden brass cage
  const warm = new THREE.PointLight('#ffdf88', 22, 18);
  warm.position.set(4.2, -1.0, 1.8);
  group.add(warm);

  // Under-bore fill light so the inner steel ring isn't buried in shadows
  const underFill = new THREE.PointLight('#94a9bf', 18, 16);
  underFill.position.set(0, -4.5, 2.2);
  group.add(underFill);

  return group;
}
