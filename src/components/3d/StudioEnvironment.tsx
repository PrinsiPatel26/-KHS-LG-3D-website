import * as THREE from 'three';

/**
 * Procedural studio environment. A tiny painted equirectangular map (dark
 * shell, one white softbox strip, one yellow industrial strip) is converted to
 * a PMREM cube map so the steel reflects real light without any HDR download.
 */
function buildEnvTexture(): THREE.Texture {
  const width = 256;
  const height = 128;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const base = ctx.createLinearGradient(0, 0, 0, height);
    base.addColorStop(0, '#242424');
    base.addColorStop(0.45, '#0d0d0d');
    base.addColorStop(1, '#050505');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    // Overhead white softbox
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(width * 0.18, 0, width * 0.3, height * 0.14);
    ctx.fillStyle = '#8e8e8e';
    ctx.fillRect(width * 0.62, height * 0.04, width * 0.16, height * 0.08);

    // Yellow industrial work light
    ctx.fillStyle = '#FFF58A';
    ctx.fillRect(0, height * 0.36, width * 0.12, height * 0.1);
    ctx.fillStyle = '#D9CC4D';
    ctx.fillRect(width * 0.8, height * 0.42, width * 0.1, height * 0.06);

    // Faint floor bounce
    ctx.fillStyle = 'rgba(120,120,120,0.18)';
    ctx.fillRect(0, height * 0.88, width, height * 0.12);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export interface StudioEnvironment {
  texture: THREE.Texture;
  dispose: () => void;
}

export function createStudioEnvironment(renderer: THREE.WebGLRenderer): StudioEnvironment {
  const source = buildEnvTexture();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromEquirectangular(source);
  pmrem.dispose();
  source.dispose();

  return {
    texture: target.texture,
    dispose: () => target.dispose()
  };
}