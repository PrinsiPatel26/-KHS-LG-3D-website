import * as THREE from 'three';

export function disposeScene(scene: THREE.Object3D): void {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = (mesh as unknown as { material?: THREE.Material | THREE.Material[] }).material;
    if (Array.isArray(material)) material.forEach((m) => m.dispose());
    else if (material) material.dispose();
  });
  scene.clear();
}

/** Photographic studio lighting rig: key spotlight, outer rim silhouette, brass fill, and under-bore bounce. */
export function createIndustrialLights(shadows: boolean): THREE.Group {
  const group = new THREE.Group();

  // Cool metallic ambient fill ensuring bearing body is luminous silver and never blends into black background
  group.add(new THREE.AmbientLight('#889cb2', 0.45));

  // Primary directional key light for crisp specular glints across chamfers and rollers
  const dirKey = new THREE.DirectionalLight('#ffffff', 2.2);
  dirKey.position.set(2.4, 4.8, 3.8);
  dirKey.castShadow = shadows;
  if (shadows) {
    dirKey.shadow.mapSize.set(1024, 1024);
    dirKey.shadow.bias = -0.0001;
  }
  group.add(dirKey);

  // Dedicated Outer Rim Silhouette Light (positioned behind/above to create a bright silver edge glow separating bearing from dark page)
  const rimBack = new THREE.DirectionalLight('#dceaff', 2.0);
  rimBack.position.set(-3.5, 3.0, -3.5);
  group.add(rimBack);

  // Overhead studio key spotlight
  const key = new THREE.SpotLight('#ffffff', 45, 32, 0.65, 0.85);
  key.position.set(0, 8.2, 3.2);
  key.castShadow = shadows;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0001;
  group.add(key);
  group.add(key.target);

  // Sharp cool rim point light
  const rim = new THREE.PointLight('#a8ccee', 22, 22);
  rim.position.set(-4.8, 2.8, -2.5);
  group.add(rim);

  // Front specular glint light for face and balls
  const frontSpecular = new THREE.PointLight('#ffffff', 18, 18);
  frontSpecular.position.set(1.5, 2.2, 4.8);
  group.add(frontSpecular);

  // Warm industrial light to catch the golden brass cage
  const warm = new THREE.PointLight('#e8b238', 14, 18);
  warm.position.set(4.2, -0.8, 2.0);
  group.add(warm);

  // Under-bore fill light so the inner steel ring and raceway remain clearly defined
  const underFill = new THREE.PointLight('#688098', 12, 16);
  underFill.position.set(0, -4.0, 2.2);
  group.add(underFill);

  return group;
}
