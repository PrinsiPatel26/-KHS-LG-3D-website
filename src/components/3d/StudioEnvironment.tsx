import * as THREE from 'three';

/**
 * High-definition professional studio cyclorama environment map.
 * Grounded in industrial product photography standards for chrome steel bearings:
 * - High-contrast studio setup with deep charcoal horizon accents
 * - Brilliant overhead white softbox panels (#ffffff)
 * - Intense rim-lighting panels that catch the outer diameter and chamfers,
 *   ensuring the bearing pops out with high visibility against dark backgrounds
 * - Neutral silver ground bounce keeping the underside and bore brightly defined
 */
function buildEnvTexture(): THREE.Texture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Studio ambient background with subtle cool silver fill
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0.0, '#384456'); // High ceiling cool silver-slate
    bg.addColorStop(0.35, '#1e2532'); // Upper walls medium slate
    bg.addColorStop(0.48, '#0d1118'); // Horizon dark contrast accent
    bg.addColorStop(0.52, '#080c12'); // Crisp horizon dark edge for chrome reflection snap
    bg.addColorStop(0.68, '#242c3b'); // Lower cyclorama blend
    bg.addColorStop(0.88, '#3d4a5e'); // Studio ground bounce
    bg.addColorStop(1.0, '#4f5f76'); // Under-floor fill
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // 2. Primary Key Softbox (Overhead Front-Left) - Brilliant white diffusion panel
    const keyX = width * 0.30;
    const keyY = height * 0.16;
    const keyW = width * 0.32;
    const keyH = height * 0.30;
    const keyGrad = ctx.createRadialGradient(
      keyX + keyW * 0.5, keyY + keyH * 0.5, 25,
      keyX + keyW * 0.5, keyY + keyH * 0.5, keyW * 0.55
    );
    keyGrad.addColorStop(0.0, '#ffffff');
    keyGrad.addColorStop(0.50, '#ffffff');
    keyGrad.addColorStop(0.80, 'rgba(240, 248, 255, 0.85)');
    keyGrad.addColorStop(0.95, 'rgba(215, 232, 252, 0.35)');
    keyGrad.addColorStop(1.0, 'rgba(200, 225, 250, 0)');
    ctx.fillStyle = keyGrad;
    ctx.fillRect(keyX, keyY, keyW, keyH);

    // 3. High-Intensity Rim Light Panel (Top-Right) - Essential for outer diameter visibility
    const rimX = width * 0.70;
    const rimY = height * 0.18;
    const rimW = width * 0.26;
    const rimH = height * 0.32;
    const rimGrad = ctx.createRadialGradient(
      rimX + rimW * 0.5, rimY + rimH * 0.5, 20,
      rimX + rimW * 0.5, rimY + rimH * 0.5, rimW * 0.55
    );
    rimGrad.addColorStop(0.0, '#ffffff');
    rimGrad.addColorStop(0.50, '#ffffff');
    rimGrad.addColorStop(0.82, 'rgba(230, 242, 255, 0.75)');
    rimGrad.addColorStop(1.0, 'rgba(180, 210, 240, 0)');
    ctx.fillStyle = rimGrad;
    ctx.fillRect(rimX, rimY, rimW, rimH);

    // 4. Sharp specular vertical strip lights (crisp cylindrical mirror glints)
    const drawStrip = (cx: number, cy: number, w: number, h: number, intensity: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(w / h, 1);
      const rad = ctx.createRadialGradient(0, 0, 0, 0, 0, h);
      rad.addColorStop(0.0, '#ffffff');
      rad.addColorStop(0.30, `rgba(255, 255, 255, ${intensity})`);
      rad.addColorStop(0.65, `rgba(230, 242, 255, ${intensity * 0.45})`);
      rad.addColorStop(1.0, 'rgba(210, 230, 255, 0)');
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(0, 0, h, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawStrip(width * 0.16, height * 0.36, width * 0.020, height * 0.34, 1.0);
    drawStrip(width * 0.50, height * 0.32, width * 0.026, height * 0.38, 1.0);
    drawStrip(width * 0.86, height * 0.38, width * 0.018, height * 0.30, 1.0);

    // 5. Warm Brass Reflector (rich golden highlight on brass cage)
    const warmBox = ctx.createRadialGradient(
      width * 0.88, height * 0.42, 10,
      width * 0.88, height * 0.42, width * 0.14
    );
    warmBox.addColorStop(0.0, '#fff0b8');
    warmBox.addColorStop(0.45, 'rgba(245, 195, 75, 0.55)');
    warmBox.addColorStop(1.0, 'rgba(225, 170, 45, 0)');
    ctx.fillStyle = warmBox;
    ctx.fillRect(width * 0.74, height * 0.28, width * 0.26, height * 0.30);

    // 6. Silver Floor Bounce Strip (ensures bottom edges and inner bore gleam with clean silver)
    const floorBounce = ctx.createRadialGradient(
      width * 0.50, height * 0.76, 40,
      width * 0.50, height * 0.76, width * 0.36
    );
    floorBounce.addColorStop(0.0, '#8698b0');
    floorBounce.addColorStop(0.50, 'rgba(100, 120, 145, 0.55)');
    floorBounce.addColorStop(1.0, 'rgba(40, 52, 68, 0)');
    ctx.fillStyle = floorBounce;
    ctx.fillRect(width * 0.14, height * 0.56, width * 0.72, height * 0.40);
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