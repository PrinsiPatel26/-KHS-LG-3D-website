import React, { useCallback, useRef, useEffect } from 'react';
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

// Radius tuned with camera FOV to guarantee the entire sphere, arcs and beacons
// fit cleanly in the viewport with comfortable margins (NO top or bottom cut-off).
const RADIUS = 1.45;
const ORIGINAL_TILT_X = 0.20; // Default natural aesthetic tilt
const HOME = markets.find((m) => m.country === 'India');

/**
 * Generates high-definition, realistic industrial slate earth texture.
 * Muted metallic slate terrain, dark oceanic gradient, and subtle gold coastlines.
 */
function createEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d canvas context');

  // Deep industrial oceanic background (charcoal slate gradient)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0a1017');
  oceanGrad.addColorStop(0.5, '#0f1722');
  oceanGrad.addColorStop(1, '#0a1017');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle graticule grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += width / 18) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 9) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // D3 equirectangular projection mapped to Three.js UV space
  const projection = geoEquirectangular()
    .translate([width / 2, height / 2])
    .scale(width / (2 * Math.PI));

  const path = geoPath(projection, ctx);
  const worldGeoJson = feature(worldTopology as unknown as Topology, 'countries');

  // Muted, realistic industrial slate landmasses
  ctx.fillStyle = '#1c2836';
  ctx.beginPath();
  path(worldGeoJson);
  ctx.fill();

  // Country borders - delicate slate separation
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.25)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  path(worldGeoJson);
  ctx.stroke();

  // Coastlines - refined subtle KHS-LG amber-gold outline
  ctx.strokeStyle = 'rgba(245, 196, 0, 0.45)';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  path(worldGeoJson);
  ctx.stroke();

  // Soft atmospheric continent glow
  ctx.fillStyle = 'rgba(245, 196, 0, 0.04)';
  ctx.beginPath();
  path(worldGeoJson);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates precision industrial badge for India Global Supply Origin.
 */
function createLogoBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 280;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background rounded industrial plate
  ctx.fillStyle = 'rgba(10, 14, 22, 0.94)';
  ctx.strokeStyle = '#F5C400';
  ctx.lineWidth = 3;
  const r = 14;
  const x = 5, y = 5, w = 270, h = 110;
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

  // Gold accent divider
  ctx.strokeStyle = 'rgba(245, 196, 0, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(20, 68);
  ctx.lineTo(260, 68);
  ctx.stroke();

  // "KHS-LG — INDIA"
  ctx.fillStyle = '#F5C400';
  ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('KHS-LG — INDIA', 140, 40);

  // "Global Supply Origin"
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Global Supply Origin', 140, 90);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export interface GlobeProps {
  className?: string;
  hoveredCountry?: string | null;
  onHoverCountry?: (country: string | null) => void;
}

/**
 * Realistic industrial slate globe:
 * - 360° movable via mouse/touch drag
 * - When user hovers a country, smoothly rotates to highlight that country directly in the CENTER
 * - When moving automatically horizontally, restores original tilt & horizontal position
 * - Completely unclipped (fits fully inside viewport without top/bottom cropping)
 */
export function Globe({ className, hoveredCountry, onHoverCountry }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef<string | null>(hoveredCountry ?? null);

  // Floating name tag DOM refs for 60fps GPU-accelerated tracking
  const tagRef = useRef<HTMLDivElement>(null);
  const tagTitleRef = useRef<HTMLParagraphElement>(null);
  const tagSubRef = useRef<HTMLParagraphElement>(null);
  const tagIndicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    hoveredRef.current = hoveredCountry ?? null;
  }, [hoveredCountry]);

  const setup = useCallback((ctx: StageContext): StageHandle => {
    if (!HOME) throw new Error('India market data is required for the globe.');

    ctx.camera.lookAt(0, 0, 0);
    ctx.scene.add(createIndustrialLights(false));
    const env = createStudioEnvironment(ctx.renderer);
    ctx.scene.environment = env.texture;

    const seg = ctx.tier === 'low' ? 32 : ctx.tier === 'medium' ? 48 : 64;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // Use 'YXZ' rotation order so longitude (Y spin) and latitude (X tilt) decouple
    const group = new THREE.Group();
    group.rotation.order = 'YXZ';
    group.rotation.set(ORIGINAL_TILT_X, -Math.PI / 2, 0);
    ctx.scene.add(group);

    const earthTexture = createEarthTexture();
    const sphereGeo = new THREE.SphereGeometry(RADIUS, seg, seg);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      metalness: 0.18,
      roughness: 0.46
    });
    geometries.push(sphereGeo);
    materials.push(sphereMat);
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    const origin = latLonToVector3(HOME.lat, HOME.lon, RADIUS * 1.006);
    const originNorm = origin.clone().normalize();

    // Export Arc Material: warm metallic gold
    const arcMat = new THREE.LineBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.75
    });
    materials.push(arcMat);

    // Destination markers: Natural metallic steel core with subtle gold aura
    const destNodeGeo = new THREE.SphereGeometry(0.024, 12, 12);
    const destNodeMat = new THREE.MeshStandardMaterial({
      color: '#E2E8F0',
      metalness: 0.8,
      roughness: 0.25,
      emissive: '#F5C400',
      emissiveIntensity: 0.3
    });
    const destHaloGeo = new THREE.SphereGeometry(0.046, 12, 12);
    const destHaloMat = new THREE.MeshBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(destNodeGeo, destHaloGeo);
    materials.push(destNodeMat, destHaloMat);

    // India origin hub: Rich KHS-LG Gold beacon
    const hubNodeGeo = new THREE.SphereGeometry(0.042, 16, 16);
    const hubNodeMat = new THREE.MeshStandardMaterial({
      color: '#F5C400',
      metalness: 0.5,
      roughness: 0.2,
      emissive: '#F5C400',
      emissiveIntensity: 0.85
    });
    const hubHaloGeo = new THREE.SphereGeometry(0.095, 16, 16);
    const hubHaloMat = new THREE.MeshBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.65,
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
    badgeSprite.scale.set(0.28, 0.12, 1);
    const badgePos = origin.clone().normalize().multiplyScalar(RADIUS * 1.13);
    badgeSprite.position.copy(badgePos);
    group.add(badgeSprite);

    // Track market meshes for raycasting and dynamic front-facing focus
    const nodeItems: {
      market: (typeof markets)[0];
      node: THREE.Mesh;
      halo: THREE.Mesh;
      isHome: boolean;
    }[] = [];

    markets.forEach((market) => {
      const isHome = market.country === HOME.country;
      const pos = latLonToVector3(market.lat, market.lon, RADIUS * 1.006);

      const node = new THREE.Mesh(isHome ? hubNodeGeo : destNodeGeo, isHome ? hubNodeMat : destNodeMat);
      node.position.copy(pos);
      node.userData = { country: market.country, isHome, pos };
      group.add(node);

      const halo = new THREE.Mesh(isHome ? hubHaloGeo : destHaloGeo, isHome ? hubHaloMat : destHaloMat);
      halo.position.copy(pos);
      group.add(halo);

      nodeItems.push({ market, node, halo, isHome });

      if (isHome) return;

      // Vaulted great-circle arcs connecting India to all destinations
      const posNorm = pos.clone().normalize();
      const dot = THREE.MathUtils.clamp(originNorm.dot(posNorm), -1, 1);
      const angle = Math.acos(dot);
      const segments = 44;
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
        const arcHeight = Math.sin(t * Math.PI) * (0.12 + 0.24 * (angle / Math.PI));
        const r = RADIUS * 1.006 + arcHeight;
        points.push(v.multiplyScalar(r));
      }

      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      geometries.push(arcGeo);
      group.add(new THREE.Line(arcGeo, arcMat));
    });

    // 360-Degree Interactive Drag and Pointer Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const interactiveMeshes = nodeItems.map((item) => item.node);

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let hasMoved = false;

    const domElement = ctx.renderer.domElement;
    domElement.style.cursor = 'grab';

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      hasMoved = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      domElement.style.cursor = 'grabbing';
      try {
        domElement.setPointerCapture(e.pointerId);
      } catch {}
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = domElement.getBoundingClientRect();

      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          hasMoved = true;
        }
        dragStartX = e.clientX;
        dragStartY = e.clientY;

        // 360-degree free rotation
        group.rotation.y += (dx / rect.width) * Math.PI * 1.8;
        group.rotation.x = THREE.MathUtils.clamp(
          group.rotation.x + (dy / rect.height) * Math.PI * 1.2,
          -0.55,
          0.55
        );
        return;
      }

      // Pointer hover raycast for node selection
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, ctx.camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hitCountry = intersects[0].object.userData.country;
        hoveredRef.current = hitCountry;
        onHoverCountry?.(hitCountry);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      domElement.style.cursor = 'grab';
      try {
        domElement.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const handlePointerLeave = () => {
      if (!isDragging && !hoveredCountry) {
        hoveredRef.current = null;
        onHoverCountry?.(null);
      }
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointercancel', handlePointerUp);
    domElement.addEventListener('pointerleave', handlePointerLeave);

    const tempWorldPos = new THREE.Vector3();

    return {
      update(delta) {
        if (ctx.reduced) return;

        const currentHover = hoveredRef.current;
        const targetMarket = currentHover
          ? markets.find((m) => m.country.toLowerCase() === currentHover.toLowerCase())
          : null;

        if (!isDragging) {
          if (targetMarket) {
            // Target Y rotation to bring country longitude to center facing camera (+Z)
            const targetRotY = ((-targetMarket.lon - 90) * Math.PI) / 180;
            // Target X tilt to center country latitude on the front equator
            const targetRotX = THREE.MathUtils.clamp((targetMarket.lat * Math.PI) / 180, -0.38, 0.45);

            // Shortest angle rotation along Y axis
            const diffY = targetRotY - group.rotation.y;
            const shortestDiffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
            group.rotation.y += shortestDiffY * Math.min(delta * 4.8, 1);

            // Smooth tilt to center on X axis
            const diffX = targetRotX - group.rotation.x;
            group.rotation.x += diffX * Math.min(delta * 4.8, 1);
          } else {
            // "when the globe moves automatically horizontally, then it should have its original position."
            // Smoothly return X tilt to original position
            group.rotation.x += (ORIGINAL_TILT_X - group.rotation.x) * Math.min(delta * 2.5, 1);
            // Automatic horizontal continuous 360-degree rotation
            group.rotation.y += delta * 0.30;
          }
        }

        // Highlight active node in center & position dynamic floating name tag
        let activeFound = false;

        nodeItems.forEach((item) => {
          const isActive = Boolean(
            currentHover && item.market.country.toLowerCase() === currentHover.toLowerCase()
          );

          if (isActive) {
            item.node.scale.setScalar(1.85);
            item.halo.scale.setScalar(2.25);

            // Compute 3D world position
            item.node.getWorldPosition(tempWorldPos);

            // Point is in front of the camera if world Z > 0.1
            const isFacingCamera = tempWorldPos.z > 0.1;

            if (isFacingCamera && tagRef.current) {
              activeFound = true;
              const projected = tempWorldPos.clone().project(ctx.camera);
              const w = domElement.clientWidth;
              const h = domElement.clientHeight;
              const screenX = ((projected.x + 1) / 2) * w;
              const screenY = ((-projected.y + 1) / 2) * h;

              tagRef.current.style.opacity = '1';
              tagRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -100%) translateY(-14px)`;

              if (tagTitleRef.current) {
                tagTitleRef.current.textContent = item.isHome ? 'KHS-LG — INDIA' : item.market.country;
              }
              if (tagSubRef.current) {
                tagSubRef.current.textContent = item.isHome
                  ? 'Global Supply Origin'
                  : 'KHS-LG Export Destination';
              }
              if (tagIndicatorRef.current) {
                tagIndicatorRef.current.className = `h-2 w-2 rounded-full ${
                  item.isHome ? 'bg-signal animate-ping' : 'bg-signal'
                }`;
              }
            }
          } else {
            item.node.scale.setScalar(1.0);
            item.halo.scale.setScalar(1.0);
          }
        });

        if (!activeFound && tagRef.current) {
          tagRef.current.style.opacity = '0';
        }
      },
      dispose() {
        domElement.removeEventListener('pointerdown', handlePointerDown);
        domElement.removeEventListener('pointermove', handlePointerMove);
        domElement.removeEventListener('pointerup', handlePointerUp);
        domElement.removeEventListener('pointercancel', handlePointerUp);
        domElement.removeEventListener('pointerleave', handlePointerLeave);
        env.dispose();
        earthTexture.dispose();
        badgeTexture.dispose();
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        ctx.scene.environment = null;
      }
    };
  }, [hoveredCountry, onHoverCountry]);

  return (
    <div ref={containerRef} className={`relative select-none overflow-visible touch-none ${className || ''}`}>
      <ThreeStage
        className="h-full w-full"
        cameraPosition={[0, 0, 4.8]}
        fov={44}
        shadows={false}
        setup={setup}
        fallbackLabel="KHS-LG global export markets"
      />

      {/* Floating Dynamic Name Tag anchored directly to the focused country in the center */}
      <div
        ref={tagRef}
        className="pointer-events-none absolute left-0 top-0 z-30 transition-opacity duration-200 opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative rounded-md border border-signal bg-ink-950/95 px-3.5 py-2 shadow-[0_4px_24px_rgba(245,196,0,0.4)] backdrop-blur-md">
          {/* Connecting downward pointer triangle */}
          <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-signal bg-ink-950" />

          <div className="flex items-center gap-2">
            <span ref={tagIndicatorRef} className="h-2 w-2 rounded-full bg-signal" />
            <p ref={tagTitleRef} className="font-mono text-xs font-bold uppercase tracking-wider text-signal">
              COUNTRY
            </p>
          </div>
          <p ref={tagSubRef} className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-steel-300">
            KHS-LG Export Destination
          </p>
        </div>

        {/* Target Reticle Pinpoint on the Node in the Center */}
        <div className="absolute left-1/2 top-[14px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal animate-ping opacity-75" />
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_8px_#F5C400]" />
        </div>
      </div>
    </div>
  );
}