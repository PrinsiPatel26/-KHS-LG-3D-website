import * as THREE from 'three';

/**
 * High-definition procedural studio environment map.
 * Generates calibrated photographic softboxes, razor-sharp specular strips,
 * warm accent panels and ambient floor bounce so bearing chrome and ground steel
 * glisten with true specular realism under PMREM reflection mapping.
 */
function buildEnvTexture(): THREE.Texture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Studio ambient background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, '#1c1f26');
    bg.addColorStop(0.3, '#101318');
    bg.addColorStop(0.65, '#07090c');
    bg.addColorStop(1, '#020304');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // 2. Main Key Overhead Softbox (large diffused white panel)
    const keySoftbox = ctx.createRadialGradient(
      width * 0.32, height * 0.22, 10,
      width * 0.32, height * 0.22, width * 0.22
    );
    keySoftbox.addColorStop(0, '#ffffff');
    keySoftbox.addColorStop(0.28, '#f4f8fc');
    keySoftbox.addColorStop(0.68, 'rgba(190, 212, 238, 0.55)');
    keySoftbox.addColorStop(1, 'rgba(190, 212, 238, 0)');
    ctx.fillStyle = keySoftbox;
    ctx.fillRect(width * 0.1, 0, width * 0.44, height * 0.44);

    // 3. Secondary Rim Bank (cool white/slate)
    const fillSoftbox = ctx.createRadialGradient(
      width * 0.72, height * 0.3, 10,
      width * 0.72, height * 0.3, width * 0.18
    );
    fillSoftbox.addColorStop(0, '#eaf2fe');
    fillSoftbox.addColorStop(0.4, 'rgba(210, 228, 252, 0.7)');
    fillSoftbox.addColorStop(1, 'rgba(110, 140, 180, 0)');
    ctx.fillStyle = fillSoftbox;
    ctx.fillRect(width * 0.54, height * 0.1, width * 0.36, height * 0.4);

    // 4. Razor-Sharp Strip Lights (creates chrome specular glints on cylinders and balls)
    const strip1 = ctx.createLinearGradient(width * 0.16, 0, width * 0.2, 0);
    strip1.addColorStop(0, 'rgba(255, 255, 255, 0)');
    strip1.addColorStop(0.5, '#ffffff');
    strip1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = strip1;
    ctx.fillRect(width * 0.16, height * 0.12, width * 0.04, height * 0.55);

    const strip2 = ctx.createLinearGradient(width * 0.52, 0, width * 0.55, 0);
    strip2.addColorStop(0, 'rgba(255, 255, 255, 0)');
    strip2.addColorStop(0.5, '#ffffff');
    strip2.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = strip2;
    ctx.fillRect(width * 0.52, height * 0.18, width * 0.03, height * 0.48);

    // Overhead horizon highlight line
    const topStrip = ctx.createLinearGradient(0, height * 0.03, 0, height * 0.08);
    topStrip.addColorStop(0, '#ffffff');
    topStrip.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = topStrip;
    ctx.fillRect(width * 0.12, height * 0.02, width * 0.76, height * 0.06);

    // 5. Warm Amber Accent Softbox (enriches brass retainer and gives chrome depth)
    const warmBox = ctx.createRadialGradient(
      width * 0.88, height * 0.42, 5,
      width * 0.88, height * 0.42, width * 0.1
    );
    warmBox.addColorStop(0, '#fff4cc');
    warmBox.addColorStop(0.45, 'rgba(235, 185, 80, 0.6)');
    warmBox.addColorStop(1, 'rgba(217, 160, 40, 0)');
    ctx.fillStyle = warmBox;
    ctx.fillRect(width * 0.78, height * 0.32, width * 0.2, height * 0.22);

    // 6. Floor Bounce / Ground Horizon Reflectance
    const floorBounce = ctx.createLinearGradient(0, height * 0.7, 0, height);
    floorBounce.addColorStop(0, 'rgba(20, 25, 32, 0)');
    floorBounce.addColorStop(0.4, 'rgba(60, 75, 95, 0.45)');
    floorBounce.addColorStop(0.8, 'rgba(32, 40, 52, 0.5)');
    floorBounce.addColorStop(1, 'rgba(10, 14, 18, 0.7)');
    ctx.fillStyle = floorBounce;
    ctx.fillRect(0, height * 0.7, width, height * 0.3);
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