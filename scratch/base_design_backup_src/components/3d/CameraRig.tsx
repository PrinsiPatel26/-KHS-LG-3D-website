import * as THREE from 'three';
import { damp } from '../../utils/three';

export interface CameraTargets {
  z: number;
  y: number;
  pointer?: {x: number;y: number;};
  parallax?: number;
  lambda?: number;
}

export interface CameraRig {
  update: (targets: CameraTargets, delta: number) => void;
}

/** Moves the camera along the bearing axis and always looks at the centre. */
export function createCameraRig(camera: THREE.PerspectiveCamera): CameraRig {
  const target = new THREE.Vector3(0, 0, 0);

  return {
    update({ z, y, pointer, parallax = 0.32, lambda = 2.4 }, delta) {
      const px = (pointer?.x ?? 0) * parallax;
      const py = (pointer?.y ?? 0) * parallax * 0.6;
      camera.position.z = damp(camera.position.z, z, lambda, delta);
      camera.position.y = damp(camera.position.y, y + py, lambda, delta);
      camera.position.x = damp(camera.position.x, px, lambda, delta);
      camera.lookAt(target);
    }
  };
}