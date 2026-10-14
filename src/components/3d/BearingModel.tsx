import * as THREE from 'three';
import { clamp, damp, latheGeometry, ringProfile } from '../../utils/three';

export type RollerShape = 'ball' | 'cylinder' | 'taper' | 'linear';
export type Quality = 'low' | 'medium' | 'high';

export interface BearingState {
  /** 0 = assembled, 1 = fully exploded along the bearing axis. */
  explode: number;
  /** 0 = idle, 1 = inspection scan travelling across the rings. */
  scan: number;
  /** Target rotation speed in rad/s — eased with mechanical inertia. */
  spin: number;
  pointer?: { x: number; y: number };
  reduced?: boolean;
}

export interface BearingRig {
  group: THREE.Group;
  update: (state: BearingState, delta: number) => void;
  dispose: () => void;
}

const DIMS = {
  outer: { inner: 1.24, outer: 1.62 },
  inner: { inner: 0.62, outer: 0.96 },
  ballRadius: 0.14,
  pitch: 1.1,
  halfWidth: 0.3,
  chamfer: 0.042
};

function segmentsFor(quality: Quality) {
  if (quality === 'low') return { lathe: 64, sphere: 16, torus: 32, rollers: 11 };
  if (quality === 'medium') return { lathe: 96, sphere: 24, torus: 48, rollers: 13 };
  return { lathe: 144, sphere: 36, torus: 72, rollers: 15 };
}

function rollerGeometry(shape: RollerShape, segments: number): THREE.BufferGeometry {
  if (shape === 'ball') {
    return new THREE.SphereGeometry(DIMS.ballRadius, segments, Math.max(8, Math.round(segments / 2)));
  }
  if (shape === 'linear') {
    return new THREE.CapsuleGeometry(
      DIMS.ballRadius * 0.7,
      0.3,
      4,
      Math.max(8, Math.round(segments / 2))
    );
  }
  const topRadius = shape === 'taper' ? DIMS.ballRadius * 0.72 : DIMS.ballRadius;
  return new THREE.CylinderGeometry(topRadius, DIMS.ballRadius, 0.34, Math.max(10, segments));
}

/**
 * Procedural texture for the Outer Ring flat face:
 * - 2048x2048 resolution
 * - Luminous silver steel tone (#98a8bb to #b8c6d6) that pops clearly off dark backgrounds
 * - High-contrast concentric diamond-turned lathe micro-grooves
 * - 4-lobe radial anisotropic sheen (bow-tie highlight across circular lathe grain)
 * - Deep chamfer step shadows (#12161f)
 * - Laser-etched "KHS-LG" brand marking curved at 12 o'clock, which rotates WITH the outer ring!
 */
function createBrandedOuterRingTexture(): THREE.CanvasTexture {
  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2; // 1024
  // Ratio corresponding to face width: inner = 1.24 + chamfer, outer = 1.62 - chamfer
  const innerR = outerR * ((DIMS.outer.inner + DIMS.chamfer) / (DIMS.outer.outer - DIMS.chamfer)); // ~832

  // 1. Base luminous silver bearing steel tone (high visibility against dark pages)
  const faceGrad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
  faceGrad.addColorStop(0.0, '#98a8bc');
  faceGrad.addColorStop(0.5, '#b0c0d2');
  faceGrad.addColorStop(1.0, '#96a6ba');
  ctx.fillStyle = faceGrad;
  ctx.fillRect(0, 0, size, size);

  // 2. 4-lobe radial anisotropic sheen (brilliant silver highlight lobes)
  const lobes = [
    Math.PI * 0.25,
    Math.PI * 0.75,
    Math.PI * 1.25,
    Math.PI * 1.75
  ];
  lobes.forEach((angle) => {
    const lobeGrad = ctx.createRadialGradient(
      cx + Math.cos(angle) * (outerR * 0.65),
      cy + Math.sin(angle) * (outerR * 0.65),
      35,
      cx,
      cy,
      outerR
    );
    lobeGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.55)');
    lobeGrad.addColorStop(0.45, 'rgba(235, 245, 255, 0.26)');
    lobeGrad.addColorStop(1.0, 'rgba(150, 170, 195, 0)');
    ctx.fillStyle = lobeGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. High-contrast concentric lathe micro-rings (diamond-turned circular grinding grain)
  for (let r = Math.floor(innerR); r <= Math.ceil(outerR); r += 1.3) {
    const isLight = Math.random() > 0.48;
    const val = isLight ? Math.floor(210 + Math.random() * 45) : Math.floor(100 + Math.random() * 45);
    const alpha = isLight ? 0.38 + Math.random() * 0.30 : 0.35 + Math.random() * 0.30;
    ctx.strokeStyle = `rgba(${val}, ${val + 3}, ${val + 7}, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 4. Inner and outer chamfer step shadows
  const innerShadow = ctx.createRadialGradient(cx, cy, innerR, cx, cy, innerR + 14);
  innerShadow.addColorStop(0.0, 'rgba(15, 20, 28, 0.85)');
  innerShadow.addColorStop(0.35, 'rgba(15, 20, 28, 0.40)');
  innerShadow.addColorStop(1.0, 'rgba(15, 20, 28, 0)');
  ctx.fillStyle = innerShadow;
  ctx.beginPath();
  ctx.arc(cx, cy, innerR + 14, 0, Math.PI * 2);
  ctx.fill();

  const outerShadow = ctx.createRadialGradient(cx, cy, outerR - 14, cx, cy, outerR);
  outerShadow.addColorStop(0.0, 'rgba(15, 20, 28, 0)');
  outerShadow.addColorStop(0.65, 'rgba(15, 20, 28, 0.40)');
  outerShadow.addColorStop(1.0, 'rgba(15, 20, 28, 0.85)');
  ctx.fillStyle = outerShadow;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fill();

  // 5. Laser-etched "KHS-LG" brand marking curved at 12 o'clock
  const textRadius = (innerR + outerR) * 0.5;
  const brand = 'KHS-LG';
  const chars = brand.split('');
  const span = 0.24; // total arc span in radians (~13.7 degrees)
  const step = span / (chars.length - 1);

  ctx.font = 'bold 84px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.save();
  for (let i = 0; i < chars.length; i++) {
    const theta = (i - (chars.length - 1) / 2) * step;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(theta);
    ctx.translate(0, -textRadius);

    // Subtle laser bevel highlight underneath
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(chars[i], 0, 1.5);

    // Deep laser-etched dark steel mark
    ctx.fillStyle = '#0a0d14';
    ctx.fillText(chars[i], 0, 0);

    ctx.restore();
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural texture for the Inner Ring flat face:
 * Matches outer ring's luminous precision-ground silver finish.
 */
function createInnerRingFaceTexture(): THREE.CanvasTexture {
  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2; // 1024
  // Ratio corresponding to inner face: inner = 0.62 + chamfer, outer = 0.96 - chamfer
  const innerR = outerR * ((DIMS.inner.inner + DIMS.chamfer) / (DIMS.inner.outer - DIMS.chamfer)); // ~738

  // 1. Base luminous silver bearing steel tone
  const faceGrad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
  faceGrad.addColorStop(0.0, '#98a8bc');
  faceGrad.addColorStop(0.5, '#b0c0d2');
  faceGrad.addColorStop(1.0, '#96a6ba');
  ctx.fillStyle = faceGrad;
  ctx.fillRect(0, 0, size, size);

  // 2. 4-lobe radial anisotropic sheen
  const lobes = [
    Math.PI * 0.25,
    Math.PI * 0.75,
    Math.PI * 1.25,
    Math.PI * 1.75
  ];
  lobes.forEach((angle) => {
    const lobeGrad = ctx.createRadialGradient(
      cx + Math.cos(angle) * (outerR * 0.65),
      cy + Math.sin(angle) * (outerR * 0.65),
      35,
      cx,
      cy,
      outerR
    );
    lobeGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.55)');
    lobeGrad.addColorStop(0.45, 'rgba(235, 245, 255, 0.26)');
    lobeGrad.addColorStop(1.0, 'rgba(150, 170, 195, 0)');
    ctx.fillStyle = lobeGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. High-contrast concentric lathe micro-rings
  for (let r = Math.floor(innerR); r <= Math.ceil(outerR); r += 1.3) {
    const isLight = Math.random() > 0.48;
    const val = isLight ? Math.floor(210 + Math.random() * 45) : Math.floor(100 + Math.random() * 45);
    const alpha = isLight ? 0.38 + Math.random() * 0.30 : 0.35 + Math.random() * 0.30;
    ctx.strokeStyle = `rgba(${val}, ${val + 3}, ${val + 7}, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 4. Inner and outer chamfer step shadows
  const innerShadow = ctx.createRadialGradient(cx, cy, innerR, cx, cy, innerR + 14);
  innerShadow.addColorStop(0.0, 'rgba(15, 20, 28, 0.85)');
  innerShadow.addColorStop(0.35, 'rgba(15, 20, 28, 0.40)');
  innerShadow.addColorStop(1.0, 'rgba(15, 20, 28, 0)');
  ctx.fillStyle = innerShadow;
  ctx.beginPath();
  ctx.arc(cx, cy, innerR + 14, 0, Math.PI * 2);
  ctx.fill();

  const outerShadow = ctx.createRadialGradient(cx, cy, outerR - 14, cx, cy, outerR);
  outerShadow.addColorStop(0.0, 'rgba(15, 20, 28, 0)');
  outerShadow.addColorStop(0.65, 'rgba(15, 20, 28, 0.40)');
  outerShadow.addColorStop(1.0, 'rgba(15, 20, 28, 0.85)');
  ctx.fillStyle = outerShadow;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Concentric bump map for physical specular micro-grooves on the ring faces.
 */
function createFaceBumpTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;
    for (let r = 180; r <= size / 2; r += 1.6) {
      const val = 100 + Math.floor(Math.random() * 55);
      ctx.strokeStyle = `rgb(${val}, ${val}, ${val})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/**
 * Subtle longitudinal turning bump map for cylindrical surfaces.
 */
function createSteelBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 2) {
      const val = 120 + Math.floor(Math.random() * 20);
      ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
      ctx.fillRect(0, y, 512, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 24);
  return tex;
}

/**
 * Procedural precision bearing: lathed outer and inner rings with creased normals,
 * anisotropic diamond-ground faces, laser-etched branding rotating with the outer ring,
 * superfinished chrome balls, and solid machined brass cage.
 */
export function createBearing({
  quality = 'high',
  rollerShape = 'ball',
  scale = 1,
  castShadow = false
}: {
  quality?: Quality;
  rollerShape?: RollerShape;
  scale?: number;
  castShadow?: boolean;
} = {}): BearingRig {
  const seg = segmentsFor(quality);
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  const track = <T extends THREE.BufferGeometry>(geo: T): T => {
    geometries.push(geo);
    return geo;
  };
  const trackMat = <T extends THREE.Material>(mat: T): T => {
    materials.push(mat);
    return mat;
  };
  const trackTex = <T extends THREE.Texture>(tex: T): T => {
    textures.push(tex);
    return tex;
  };

  const steelBumpTex = trackTex(createSteelBumpTexture());
  const faceBumpTex = trackTex(createFaceBumpTexture());
  const brandedOuterFaceTex = trackTex(createBrandedOuterRingTexture());
  const innerFaceTex = trackTex(createInnerRingFaceTexture());

  const root = new THREE.Group();
  root.scale.setScalar(scale);

  // Tilt group: fixed mechanical orientation (-90 deg around X to face camera)
  // No dragging effect, stably poised in 3D space
  const tilt = new THREE.Group();
  tilt.rotation.x = -Math.PI / 2;
  root.add(tilt);

  // Rotating group: outer ring, inner ring, cage, and balls all spin smoothly together,
  // ensuring the "KHS-LG" brand marking moves synchronously with the outer ring!
  const spinGroup = new THREE.Group();
  tilt.add(spinGroup);

  // Precision-ground chrome bearing steel material (AISI 52100 / GCr15)
  // Luminous silver-steel body tone that pops with high visibility against dark backgrounds
  const steelMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: '#b2c0d0',
      metalness: 0.98,
      roughness: 0.12,
      bumpMap: steelBumpTex,
      bumpScale: 0.0010,
      clearcoat: 0.50,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMapIntensity: 2.2,
      side: THREE.FrontSide
    })
  );

  // Outer ring flat face material with laser-etched "KHS-LG" and anisotropic lathe lines
  const brandedOuterFaceMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      map: brandedOuterFaceTex,
      bumpMap: faceBumpTex,
      bumpScale: 0.0022,
      color: '#ffffff',
      metalness: 0.96,
      roughness: 0.18,
      clearcoat: 0.40,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      envMapIntensity: 2.0,
      side: THREE.FrontSide
    })
  );

  // Inner ring flat face material with matching anisotropic lathe lines
  const innerFaceMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      map: innerFaceTex,
      bumpMap: faceBumpTex,
      bumpScale: 0.0022,
      color: '#ffffff',
      metalness: 0.96,
      roughness: 0.18,
      clearcoat: 0.40,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      envMapIntensity: 2.0,
      side: THREE.FrontSide
    })
  );

  // ==========================================
  // OUTER RING: Lathed cylinder + 45 deg chamfers + front/back face
  // Added to spinGroup so the KHS-LG brand marking moves with the outer ring!
  // ==========================================
  const outerGroup = new THREE.Group();
  const outerMesh = new THREE.Mesh(
    track(latheGeometry(ringProfile(DIMS.outer.inner, DIMS.outer.outer, DIMS.halfWidth, DIMS.chamfer, 'inner'), seg.lathe)),
    steelMat
  );
  outerMesh.castShadow = castShadow;
  outerMesh.receiveShadow = false;
  outerGroup.add(outerMesh);

  // Outer face geometry spanning flat surface (leaving 45 deg chamfers exposed)
  const outerFaceGeo = track(
    new THREE.RingGeometry(DIMS.outer.inner + DIMS.chamfer, DIMS.outer.outer - DIMS.chamfer, seg.lathe)
  );

  // Front face (facing camera at y = -halfWidth, with KHS-LG starting at 12 o'clock)
  const frontOuterFace = new THREE.Mesh(outerFaceGeo, brandedOuterFaceMat);
  frontOuterFace.position.y = -DIMS.halfWidth - 0.0006;
  frontOuterFace.rotation.x = Math.PI / 2;
  outerGroup.add(frontOuterFace);

  // Back face (facing away at y = +halfWidth)
  const backOuterFace = new THREE.Mesh(outerFaceGeo, brandedOuterFaceMat);
  backOuterFace.position.y = DIMS.halfWidth + 0.0006;
  backOuterFace.rotation.set(-Math.PI / 2, 0, Math.PI);
  outerGroup.add(backOuterFace);

  spinGroup.add(outerGroup);

  // ==========================================
  // INNER RING: Lathed cylinder + chamfers + front/back face
  // ==========================================
  const innerGroup = new THREE.Group();
  const innerMesh = new THREE.Mesh(
    track(latheGeometry(ringProfile(DIMS.inner.inner, DIMS.inner.outer, DIMS.halfWidth, DIMS.chamfer, 'outer'), seg.lathe)),
    steelMat
  );
  innerMesh.castShadow = castShadow;
  innerMesh.receiveShadow = false;
  innerGroup.add(innerMesh);

  // Inner face geometry spanning flat surface (leaving 45 deg chamfers exposed)
  const innerFaceGeo = track(
    new THREE.RingGeometry(DIMS.inner.inner + DIMS.chamfer, DIMS.inner.outer - DIMS.chamfer, seg.lathe)
  );

  // Front face (facing camera at y = -halfWidth)
  const frontInnerFace = new THREE.Mesh(innerFaceGeo, innerFaceMat);
  frontInnerFace.position.y = -DIMS.halfWidth - 0.0006;
  frontInnerFace.rotation.x = Math.PI / 2;
  innerGroup.add(frontInnerFace);

  // Back face (facing away at y = +halfWidth)
  const backInnerFace = new THREE.Mesh(innerFaceGeo, innerFaceMat);
  backInnerFace.position.y = DIMS.halfWidth + 0.0006;
  backInnerFace.rotation.set(-Math.PI / 2, 0, Math.PI);
  innerGroup.add(backInnerFace);

  spinGroup.add(innerGroup);

  // ==========================================
  // ROLLING ELEMENTS: Mirror-lapped Grade 10 chrome balls / rollers
  // ==========================================
  const rollersGroup = new THREE.Group();
  const rollerGeo = track(rollerGeometry(rollerShape, seg.sphere));
  const rollerMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 1.0,
      roughness: 0.015,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      reflectivity: 1.0,
      envMapIntensity: 2.8
    })
  );
  const angles: number[] = [];
  for (let i = 0; i < seg.rollers; i += 1) {
    const a = (i / seg.rollers) * Math.PI * 2;
    angles.push(a);
    const roller = new THREE.Mesh(rollerGeo, rollerMat);
    roller.position.set(Math.cos(a) * DIMS.pitch, 0, Math.sin(a) * DIMS.pitch);
    if (rollerShape === 'linear') roller.rotation.set(0, -a, Math.PI / 2);
    else if (rollerShape !== 'ball') roller.rotation.set(Math.PI / 2, 0, -a);
    roller.castShadow = castShadow;
    rollersGroup.add(roller);
  }
  spinGroup.add(rollersGroup);

  // ==========================================
  // CAGE: Solid CNC-machined brass retainer with pockets
  // ==========================================
  const cageGroup = new THREE.Group();
  const cageMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: '#dfa838',
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.35,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      envMapIntensity: 1.8
    })
  );
  // Sturdy brass rings
  const cageRingGeo = track(new THREE.TorusGeometry(DIMS.pitch, 0.032, 10, seg.torus));
  [-0.16, 0.16].forEach((y) => {
    const ring = new THREE.Mesh(cageRingGeo, cageMat);
    ring.position.y = y;
    ring.rotation.x = Math.PI / 2;
    cageGroup.add(ring);
  });
  // Solid pocket divider bridges
  const bridgeGeo = track(new THREE.BoxGeometry(0.046, 0.32, 0.07));
  angles.forEach((a) => {
    const midAngle = a + Math.PI / seg.rollers;
    const bridge = new THREE.Mesh(bridgeGeo, cageMat);
    bridge.position.set(Math.cos(midAngle) * DIMS.pitch, 0, Math.sin(midAngle) * DIMS.pitch);
    bridge.rotation.y = -midAngle;
    cageGroup.add(bridge);
  });
  spinGroup.add(cageGroup);

  // ==========================================
  // INSPECTION SCAN RING
  // ==========================================
  const scanMat = trackMat(
    new THREE.MeshBasicMaterial({
      color: '#FFF9B8',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  const scanMesh = new THREE.Mesh(
    track(new THREE.TorusGeometry(DIMS.outer.outer + 0.06, 0.012, 6, seg.torus)),
    scanMat
  );
  scanMesh.rotation.x = Math.PI / 2;
  scanMesh.visible = false;
  outerGroup.add(scanMesh);

  let speed = 0;
  let explodeSmooth = 0;

  return {
    group: root,
    update({ explode, scan, spin, reduced }, delta) {
      const e = clamp(explode);
      const s = clamp(scan);
      const targetSpin = reduced ? 0 : spin;

      // Mechanical inertia
      speed = damp(speed, targetSpin, 1.6, delta);
      explodeSmooth = damp(explodeSmooth, e, 5, delta);
      const ex = explodeSmooth;

      // Outer ring and the KHS-LG brand marking rotate together with the assembly!
      spinGroup.rotation.y += speed * delta;

      // Fixed 3D orientation — no dragging effect so user won't be able to move that 3D bearing
      tilt.rotation.x = -Math.PI / 2;
      tilt.rotation.z = 0;

      // Clean proportional linear explosion along the shaft axis on scroll
      outerGroup.position.y = ex * 1.15;
      outerGroup.scale.set(1, 1, 1);

      rollersGroup.position.y = ex * 0.42;
      rollersGroup.scale.setScalar(1);

      cageGroup.position.y = -ex * 0.35;
      cageGroup.scale.setScalar(1);

      innerGroup.position.y = -ex * 1.10;
      innerGroup.scale.set(1, 1, 1);

      scanMesh.visible = s > 0.01;
      if (scanMesh.visible) {
        const pulse = Math.sin(s * Math.PI);
        scanMesh.position.y = -0.85 + s * 1.7;
        scanMat.opacity = 0.85 * pulse;
        scanMesh.scale.setScalar(0.94 + pulse * 0.1);
      }
    },
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    }
  };
}