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

  // Deep rich ocean background
  ctx.fillStyle = '#080e1a';
  ctx.fillRect(0, 0, width, height);

  // Ocean latitude & longitude grid lines
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
  ctx.lineWidth = 1;

  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -150; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Equator highlight
  ctx.strokeStyle = 'rgba(255, 245, 138, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  // D3 equirectangular projection perfectly mapped to Three.js UV space
  const projection = geoEquirectangular()
    .translate([width / 2, height / 2])
    .scale(width / (2 * Math.PI));

  const path = geoPath(projection, ctx);
  const worldGeoJson = feature(worldTopology as unknown as Topology, 'countries');

  // Continent land masses
  ctx.fillStyle = '#1e2d42';
  ctx.beginPath();
  path(worldGeoJson);
  ctx.fill();

  // Country borders
  ctx.strokeStyle = '#385170';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  path(worldGeoJson);
  ctx.stroke();

  // Subtle land luminosity
  ctx.fillStyle = 'rgba(255, 245, 138, 0.05)';
  ctx.beginPath();
  path(worldGeoJson);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
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
      metalness: 0.3,
      roughness: 0.55
    });
    geometries.push(sphereGeo);
    materials.push(sphereMat);
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    const wireGeo = new THREE.SphereGeometry(RADIUS * 1.002, Math.round(seg / 2), Math.round(seg / 2));
    const wireMat = new THREE.MeshBasicMaterial({
      color: '#475569',
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    geometries.push(wireGeo);
    materials.push(wireMat);
    group.add(new THREE.Mesh(wireGeo, wireMat));

    const origin = latLonToVector3(HOME.lat, HOME.lon, RADIUS * 1.006);
    const arcMat = new THREE.LineBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.72
    });
    materials.push(arcMat);

    const nodeGeo = new THREE.SphereGeometry(0.024, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: '#FFF9B8' });
    const haloGeo = new THREE.SphereGeometry(0.052, 10, 10);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(nodeGeo, haloGeo);
    materials.push(nodeMat, haloMat);

    // India origin hub - slightly highlighted
    const hubNodeGeo = new THREE.SphereGeometry(0.038, 12, 12);
    const hubHaloGeo = new THREE.SphereGeometry(0.085, 12, 12);
    const hubHaloMat = new THREE.MeshBasicMaterial({
      color: '#FFF58A',
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(hubNodeGeo, hubHaloGeo);
    materials.push(hubHaloMat);

    markets.forEach((market) => {
      const isHome = market.country === HOME.country;
      const pos = latLonToVector3(market.lat, market.lon, RADIUS * 1.006);

      const node = new THREE.Mesh(isHome ? hubNodeGeo : nodeGeo, nodeMat);
      node.position.copy(pos);
      group.add(node);

      const halo = new THREE.Mesh(isHome ? hubHaloGeo : haloGeo, isHome ? hubHaloMat : haloMat);
      halo.position.copy(pos);
      group.add(halo);

      if (isHome) return;
      const mid = origin.
      clone().
      add(pos).
      multiplyScalar(0.5).
      normalize().
      multiplyScalar(RADIUS * 1.20);
      const curve = new THREE.QuadraticBezierCurve3(origin, mid, pos);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      geometries.push(arcGeo);
      group.add(new THREE.Line(arcGeo, arcMat));
    });

    return {
      update(delta) {
        if (ctx.reduced) return;
        group.rotation.y += delta * 0.22;
      },
      dispose() {
        env.dispose();
        earthTexture.dispose();
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