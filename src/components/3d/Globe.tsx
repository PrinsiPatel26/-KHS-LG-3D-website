import { useCallback } from 'react';
import * as THREE from 'three';
import { geoEquirectangular, geoPath } from 'd3-geo';
import worldTopology from 'world-atlas/countries-110m.json';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import { StageContext, StageHandle, ThreeStage } from './SceneCanvas';
import { createIndustrialLights } from './sceneUtils';
import { createStudioEnvironment } from './StudioEnvironment';
import { markets } from '../../data/company';
import { latLonToVector3 } from '../../utils/three';

const RADIUS = 1.45;
const HOME = markets.find((m) => m.country === 'India');

function createEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d canvas context');

  // Deep rich ocean background with subtle blue gradients
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#09152b');
  oceanGrad.addColorStop(0.5, '#0b1d3a');
  oceanGrad.addColorStop(1, '#09152b');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // D3 equirectangular projection perfectly mapped to Three.js UV space
  const projection = geoEquirectangular()
    .translate([width / 2, height / 2])
    .scale(width / (2 * Math.PI));

  const path = geoPath(projection, ctx);
  const worldGeoJson = feature(worldTopology as unknown as Topology, 'countries');

  // Continent land masses - vibrant, distinct, unmistakable earth terrain
  ctx.fillStyle = '#1c4a35'; // Rich deep emerald/earthy green
  ctx.beginPath();
  path(worldGeoJson);
  ctx.fill();

  // Coastline glow / halo for vivid continent separation
  ctx.strokeStyle = '#52b788';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  path(worldGeoJson);
  ctx.stroke();

  // Individual country borders - clearly displayed with crisp gold-amber outlines
  ctx.strokeStyle = 'rgba(245, 196, 0, 0.75)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  path(worldGeoJson);
  ctx.stroke();

  // Soft radiant top-layer warmth
  ctx.fillStyle = 'rgba(245, 196, 0, 0.08)';
  ctx.beginPath();
  path(worldGeoJson);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createLogoBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background rounded industrial badge
  ctx.fillStyle = 'rgba(10, 14, 22, 0.92)';
  ctx.strokeStyle = '#F5C400';
  ctx.lineWidth = 3.5;
  const r = 20;
  const x = 6, y = 6, w = 244, h = 108;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Glow line accent
  ctx.strokeStyle = 'rgba(245, 196, 0, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(20, 68);
  ctx.lineTo(236, 68);
  ctx.stroke();

  // "KHS-LG" brand text
  ctx.fillStyle = '#F5C400';
  ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('KHS-LG', 128, 40);

  // Subtitle "HQ / INDIA"
  ctx.fillStyle = '#E2E8F0';
  ctx.font = 'bold 15px "SF Mono", Monaco, Consolas, monospace';
  ctx.fillText('HQ • INDIA', 128, 88);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

/** Sleek metallic slate globe with luminous yellow market nodes and export arcs. */
export function Globe({ className }: {className?: string;}) {
  const setup = useCallback((ctx: StageContext): StageHandle => {
    if (!HOME) throw new Error('India market data is required for the globe.');

    ctx.camera.lookAt(0, 0, 0);
    ctx.scene.add(createIndustrialLights(false));
    const env = createStudioEnvironment(ctx.renderer);
    ctx.scene.environment = env.texture;

    const seg = ctx.tier === 'low' ? 32 : ctx.tier === 'medium' ? 48 : 64;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const group = new THREE.Group();
    group.rotation.set(0.24, 0, 0.1);
    ctx.scene.add(group);

    const earthTexture = createEarthTexture();
    const sphereGeo = new THREE.SphereGeometry(RADIUS, seg, seg);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      metalness: 0.15,
      roughness: 0.42
    });
    geometries.push(sphereGeo);
    materials.push(sphereMat);
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    const origin = latLonToVector3(HOME.lat, HOME.lon, RADIUS * 1.006);
    const originNorm = origin.clone().normalize();

    const arcMat = new THREE.LineBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.85
    });
    materials.push(arcMat);

    // Destination markers: High-contrast electric cyan
    const destNodeGeo = new THREE.SphereGeometry(0.024, 10, 10);
    const destNodeMat = new THREE.MeshBasicMaterial({ color: '#00E5FF' });
    const destHaloGeo = new THREE.SphereGeometry(0.052, 10, 10);
    const destHaloMat = new THREE.MeshBasicMaterial({
      color: '#00E5FF',
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(destNodeGeo, destHaloGeo);
    materials.push(destNodeMat, destHaloMat);

    // India origin hub: Yellow with pulsing aura & KHS-LG logo badge
    const hubNodeGeo = new THREE.SphereGeometry(0.042, 14, 14);
    const hubNodeMat = new THREE.MeshBasicMaterial({ color: '#F5C400' });
    const hubHaloGeo = new THREE.SphereGeometry(0.095, 14, 14);
    const hubHaloMat = new THREE.MeshBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(hubNodeGeo, hubHaloGeo);
    materials.push(hubNodeMat, hubHaloMat);

    // Logo badge hovering over India
    const badgeTexture = createLogoBadgeTexture();
    const badgeMat = new THREE.SpriteMaterial({
      map: badgeTexture,
      transparent: true,
      depthWrite: false
    });
    materials.push(badgeMat);
    const badgeSprite = new THREE.Sprite(badgeMat);
    badgeSprite.scale.set(0.24, 0.12, 1);
    const badgePos = origin.clone().normalize().multiplyScalar(RADIUS * 1.15);
    badgeSprite.position.copy(badgePos);
    group.add(badgeSprite);

    markets.forEach((market) => {
      const isHome = market.country === HOME.country;
      const pos = latLonToVector3(market.lat, market.lon, RADIUS * 1.006);

      const node = new THREE.Mesh(isHome ? hubNodeGeo : destNodeGeo, isHome ? hubNodeMat : destNodeMat);
      node.position.copy(pos);
      group.add(node);

      const halo = new THREE.Mesh(isHome ? hubHaloGeo : destHaloGeo, isHome ? hubHaloMat : destHaloMat);
      halo.position.copy(pos);
      group.add(halo);

      if (isHome) return;

      // True spherical great-circle arc elevated smoothly above the globe
      const posNorm = pos.clone().normalize();
      const dot = THREE.MathUtils.clamp(originNorm.dot(posNorm), -1, 1);
      const angle = Math.acos(dot);
      const segments = 48;
      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        let v: THREE.Vector3;
        if (angle < 0.001) {
          v = originNorm.clone();
        } else {
          const sinTotal = Math.sin(angle);
          const w1 = Math.sin((1 - t) * angle) / sinTotal;
          const w2 = Math.sin(t * angle) / sinTotal;
          v = originNorm.clone().multiplyScalar(w1).add(posNorm.clone().multiplyScalar(w2)).normalize();
        }
        // Elevation vaulting gracefully above the earth
        const arcHeight = Math.sin(t * Math.PI) * (0.16 + 0.36 * (angle / Math.PI));
        const r = RADIUS * 1.006 + arcHeight;
        points.push(v.multiplyScalar(r));
      }

      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      geometries.push(arcGeo);
      group.add(new THREE.Line(arcGeo, arcMat));
    });

    return {
      update(delta) {
        if (ctx.reduced) return;
        group.rotation.y += delta * 0.52; // Faster, smooth realistic rotation
      },
      dispose() {
        env.dispose();
        earthTexture.dispose();
        badgeTexture.dispose();
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        ctx.scene.environment = null;
      }
    };
  }, []);

  return (
    <ThreeStage
      className={className}
      cameraPosition={[0, 0, 4.8]}
      fov={42}
      shadows={false}
      setup={setup}
      fallbackLabel="KHS-LG global export markets" />);


}