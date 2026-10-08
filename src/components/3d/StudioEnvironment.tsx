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

    // 4. Feathered Strip Lights (creates chrome specular glints without harsh horizontal cutoff edges)
    const s1X = width * 0.18;
    const s1Y = height * 0.36;
    const s1W = width * 0.025;
    const s1H = height * 0.26;
    ctx.save();
    ctx.translate(s1X, s1Y);
    ctx.scale(s1W / s1H, 1);
    const rad1 = ctx.createRadialGradient(0, 0, 0, 0, 0, s1H);
    rad1.addColorStop(0, '#ffffff');
    rad1.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
    rad1.addColorStop(0.65, 'rgba(220, 235, 255, 0.2)');
    rad1.addColorStop(1, 'rgba(220, 235, 255, 0)');
    ctx.fillStyle = rad1;
    ctx.beginPath();
    ctx.arc(0, 0, s1H, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const s2X = width * 0.53;
    const s2Y = height * 0.40;
    const s2W = width * 0.02;
    const s2H = height * 0.22;
    ctx.save();
    ctx.translate(s2X, s2Y);
    ctx.scale(s2W / s2H, 1);
    const rad2 = ctx.createRadialGradient(0, 0, 0, 0, 0, s2H);
    rad2.addColorStop(0, '#ffffff');
    rad2.addColorStop(0.25, 'rgba(255, 255, 255, 0.8)');
    rad2.addColorStop(0.65, 'rgba(220, 235, 255, 0.18)');
    rad2.addColorStop(1, 'rgba(220, 235, 255, 0)');
    ctx.fillStyle = rad2;
    ctx.beginPath();
    ctx.arc(0, 0, s2H, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

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

    // 6. Smooth Floor Bounce (continuous gradient with no sharp boundary)
    const floorBounce = ctx.createLinearGradient(0, height * 0.5, 0, height);
    floorBounce.addColorStop(0, 'rgba(0, 0, 0, 0)');
    floorBounce.addColorStop(0.4, 'rgba(45, 60, 80, 0.25)');
    floorBounce.addColorStop(0.8, 'rgba(25, 32, 42, 0.4)');
    floorBounce.addColorStop(1, 'rgba(8, 11, 15, 0.6)');
    ctx.fillStyle = floorBounce;
    ctx.fillRect(0, height * 0.5, width, height * 0.5);
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