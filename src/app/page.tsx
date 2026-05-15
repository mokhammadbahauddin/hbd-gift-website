'use client';
import { useEffect, useState } from 'react';
import './home.css';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // --- PERFORMANCE SPRITE CACHE ---
    const Sprites: any = {
      pine: null,
      sakura: null,
      grass: null,
      initialized: false
    };

    const initSprites = (ctx: CanvasRenderingContext2D) => {
      if (Sprites.initialized) return;
      const createCache = (w: number, h: number, drawFn: Function) => {
        const can = document.createElement('canvas');
        can.width = w; can.height = h;
        drawFn(can.getContext('2d'));
        return can;
      };
      Sprites.pine = createCache(100, 200, (c: any) => {
        c.fillStyle = "#1A3A36"; c.fillRect(46, 160, 8, 40);
        c.beginPath(); c.moveTo(50, 40); c.lineTo(20, 140); c.lineTo(80, 140); c.fill();
        c.beginPath(); c.moveTo(50, 90); c.lineTo(10, 180); c.lineTo(90, 180); c.fill();
      });
      Sprites.sakura = createCache(150, 200, (c: any) => {
        c.fillStyle = "#6D524C"; c.fillRect(71, 150, 8, 50);
        c.fillStyle = "#4CAF50"; c.beginPath(); c.arc(75, 100, 50, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(45, 110, 40, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(105, 110, 40, 0, Math.PI * 2); c.fill();
      });
      Sprites.grass = createCache(20, 30, (c: any) => {
        c.strokeStyle = "#8BC34A"; c.lineWidth = 2;
        c.beginPath(); c.moveTo(10, 30); c.quadraticCurveTo(5, 15, 10, 5); c.stroke();
      });
      Sprites.initialized = true;
    };

    // --- UTILS & CONSTANTS ---
    const PHOTO_ASSETS = [
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.09.jpeg",
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.10 (1).jpeg",
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.10 (2).jpeg",
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.10 (3).jpeg",
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.10.jpeg",
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.11.jpeg",
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.12 (1).jpeg",
      "/images/memories/WhatsApp Image 2026-05-15 at 14.41.12.jpeg"
    ];

    const FALLBACK_PHOTOS = [
      "https://images.unsplash.com/photo-1518837697219-3230a7d558d4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516589174184-c6858b16ecb0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800"
    ];

    // --- UTILS & CONSTANTS ---
    const WORLD_LENGTH = 15000; 
    const LYRICS_DATA = [
      { time: 2.0, text: "Oh oh..." },
      { time: 27.0, text: "Kan ku arungi tujuh laut samudra" },
      { time: 32.0, text: "Kan ku daki pegunungan himalaya" },
      { time: 40.0, text: "Apapun kan ku lakukan tuk dirimu sayang" },
      { time: 45.0, text: "Oh penjaga hatiku oh..." },
      { time: 51.5, text: "Karna bersamamu semua terasa indah" },
      { time: 58.0, text: "Gundah gulana hatiku pun hancur sirna" },
      { time: 64.0, text: "Janji ku tak kan ku lepas..." },
      { time: 67.0, text: "Wahai kau bidadariku dari surga" },
      { time: 72.0, text: "Tuk selamanya..." },
      { time: 78.5, text: "Tuk selamanya..." },
      { time: 84.0, text: "Tuk selamanya..." }
    ];

    const PALETTES = {
      ocean: { skyT: "#001F3F", skyB: "#0077BE", sun: "#FFF9D2", mount: "#005B96", groundT: "#003366", groundB: "#001F3F", type: 'ocean' },
      himalaya: { skyT: "#E1F5FE", skyB: "#B3E5FC", sun: "#FFFFFF", mount: "#FFFFFF", groundT: "#FFFFFF", groundB: "#E0E0E0", type: 'snow' },
      morning: { skyT: "#87CEFA", skyB: "#FFE4B5", sun: "#FFF9D2", mount: "#50C878", groundT: "#8BC34A", groundB: "#D2B48C" },
      afternoon: { skyT: "#4A90E2", skyB: "#E0F6FF", sun: "#FFFFFF", mount: "#2E8B57", groundT: "#689F38", groundB: "#C19A6B" },
      sunset: { skyT: "#1A237E", skyB: "#FF8A65", sun: "#FFD54F", mount: "#1B5E20", groundT: "#558B2F", groundB: "#A07855" },
      night: { skyT: "#0A1128", skyB: "#1C2A48", sun: "#E2E8F0", mount: "#062A08", groundT: "#2B3A2C", groundB: "#3E2723" }
    };

    const PHOTO_TITLES = ["Senyummu", "Kenangan", "Bersamamu", "Sempurna", "Tak Terlupakan", "Kisah Kita", "Selamanya", "Cinta"];

    const Utils = {
      lerp: (s: number, e: number, a: number) => (1 - a) * s + a * e,
      clamp: (v: number, min: number, max: number) => Math.min(Math.max(v, min), max),
      rand: (min: number, max: number) => Math.random() * (max - min) + min,
      shuffle: (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      hexToRgb: (color: string) => {
        if (!color) return { r: 0, g: 0, b: 0 };
        if (color.startsWith('rgb')) {
          const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          return m ? { r: parseInt(m[1], 10), g: parseInt(m[2], 10), b: parseInt(m[3], 10) } : { r: 0, g: 0, b: 0 };
        }
        const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 0, b: 0 };
      },
      lerpColor: (h1: string, h2: string, f: number) => {
        const c1 = Utils.hexToRgb(h1), c2 = Utils.hexToRgb(h2);
        const r = Math.round(Utils.lerp(c1.r, c2.r, f));
        const g = Math.round(Utils.lerp(c1.g, c2.g, f));
        const b = Math.round(Utils.lerp(c1.b, c2.b, f));
        return `rgb(${r},${g},${b})`;
      }
    };

    class Cat {
      type: string;
      x: number;
      y: number;
      facing: number;
      walkCycle: number;
      breatheCycle: number;
      tailCycle: number;
      state: string;
      colorMain: string;
      colorShadow: string;
      colorBelly: string;
      colorScarf: string;
      hasBlush: boolean;

      constructor(type = 'male') {
        this.type = type;
        this.x = type === 'male' ? 200 : WORLD_LENGTH; // NPC tepat di akhir dunia
        this.y = 0;
        this.facing = type === 'male' ? 1 : -1;
        this.walkCycle = 0;
        this.breatheCycle = 0;
        this.tailCycle = 0;
        this.state = 'idle';
        if (type === 'male') {
          this.colorMain = "#FF9F1C";   // Rich Orange
          this.colorShadow = "#E56B1F"; // Dark Orange
          this.colorBelly = "#FFE8D6";  // Cream
          this.colorScarf = "#2EC4B6";  // Teal Scarf
          this.hasBlush = true;
        } else {
          this.colorMain = "#FDFFFC";   // Pure White
          this.colorShadow = "#F1D3D9"; // Soft Pink Shadow
          this.colorBelly = "#FFFFFF";  // Bright White
          this.colorScarf = "#F07167";  // Coral Ribbon
          this.hasBlush = true;
        }
      }
      update(isWalking = false, speedScale = 1.0) {
        this.breatheCycle += 0.05;
        if (isWalking) {
          this.state = 'walking';
          // SYNC: Kaki melangkah sesuai kecepatan gerak (anti-gliding)
          this.walkCycle += 0.16 * speedScale;
        } else {
          this.state = 'idle';
          this.walkCycle = Utils.lerp(this.walkCycle, 0, 0.1);
        }
      }
      draw(ctx: CanvasRenderingContext2D, cameraX: number, groundY: number, isPortrait: boolean, palette?: any, progress: number = 0) {
        const screenX = this.x - cameraX;
        if (screenX < -300 || screenX > ctx.canvas.width + 300) return;
        
        ctx.save();
        
        // 0. RAFT (if in ocean phase)
        if (palette && palette.type === 'ocean') {
          ctx.save();
          // Position raft at the base of the cat
          ctx.translate(screenX, groundY);
          const rw = 120, rh = 16;
          ctx.fillStyle = "#5D4037"; // Dark wood
          ctx.fillRect(-rw/2, -8, rw, rh);
          // Plank details
          ctx.strokeStyle = "#3E2723";
          ctx.lineWidth = 2;
          for(let i=-2; i<=2; i++) {
            ctx.beginPath(); ctx.moveTo(i * 22, -8); ctx.lineTo(i * 22, 8); ctx.stroke();
          }
          // Slight bobbing for the raft
          ctx.restore();
        }

        // 1. CLIMBING EFFECT (Himalaya Phase: 0.35 - 0.7)
        let yOffset = 0;
        let rotationOffset = 0;
        
        if (progress >= 0.35 && progress < 0.7) {
           // Simulate effort/climbing tilt: vertical bounce and slight forward lean
           yOffset = Math.sin(this.walkCycle * 2) * 6 - 8;
           rotationOffset = -0.12; 
        }

        ctx.translate(screenX, groundY + yOffset);
        if (rotationOffset) ctx.rotate(rotationOffset);

        const baseScale = isPortrait ? 0.8 : 1.1;

        const isMoving = this.state === 'walking';
        const cycle = this.walkCycle;
        const bCycle = this.breatheCycle;

        // Advanced Rigged Animation Logic (Squash, Stretch, Bounce, Tilt)
        const bounce = isMoving ? Math.abs(Math.sin(cycle)) * -14 : Math.sin(bCycle) * 2;
        const bodyRotate = isMoving ? Math.sin(cycle) * 0.05 : Math.sin(bCycle * 0.5) * 0.02;
        const stretch = isMoving ? 1 + Math.abs(Math.cos(cycle)) * 0.04 : 1 + Math.sin(bCycle) * 0.02;
        const squash = isMoving ? 1 - Math.abs(Math.cos(cycle)) * 0.04 : 1 - Math.sin(bCycle) * 0.02;

        ctx.scale(this.facing * baseScale, baseScale);

        // 2. Dynamic Ground Shadow (Only if not in ocean)
        if (!palette || palette.type !== 'ocean') {
          ctx.fillStyle = "rgba(27, 43, 30, 0.15)";
          ctx.beginPath();
          const shadowWidth = isMoving ? 24 + Math.abs(Math.sin(cycle)) * 5 : 26;
          ctx.ellipse(-3, 0, shadowWidth, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Lift body space up from ground
        ctx.translate(0, bounce - 22);
        ctx.rotate(bodyRotate);
        ctx.scale(stretch, squash);

        // 2. TAIL (Thick Volumetric Curved Tail)
        const tailTime = isMoving ? cycle * 0.8 : bCycle;
        const tailX = -22;
        const tailY = -5;
        const tailBendX = tailX - 25 + Math.sin(tailTime) * 12;
        const tailBendY = tailY - 15 + Math.cos(tailTime) * 8;

        ctx.strokeStyle = this.colorShadow; // Outline/Shadow layer for depth
        ctx.lineWidth = 14;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.quadraticCurveTo(tailBendX - 10, tailBendY - 10, tailBendX, tailBendY); ctx.stroke();

        ctx.strokeStyle = this.colorMain; // Core tail layer
        ctx.lineWidth = 10;
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.quadraticCurveTo(tailBendX - 10, tailBendY - 10, tailBendX, tailBendY); ctx.stroke();

        // 3. LEGS (Thick 2D Rigged style instead of thin rubber hoses)
        const legSwing1 = Math.sin(cycle) * 14;
        const legLift1 = Math.max(0, Math.cos(cycle) * 12);
        const legSwing2 = Math.sin(cycle + Math.PI) * 14;
        const legLift2 = Math.max(0, Math.cos(cycle + Math.PI) * 12);

        const drawLeg = (baseX: number, baseY: number, swing: number, lift: number, isBack: boolean) => {
          ctx.save();
          // A procedural segmented leg
          const footX = baseX + swing;
          const footY = 22 - lift; // 22 is distance to reach the ground from hoisted body center

          ctx.lineWidth = 11;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = isBack ? this.colorShadow : this.colorMain;

          ctx.beginPath();
          ctx.moveTo(baseX, baseY);
          // Bending knee
          const kneeX = baseX + swing * 0.5 + (lift > 0 ? 5 : 0);
          const kneeY = baseY + 8 - lift * 0.5;
          ctx.quadraticCurveTo(kneeX, kneeY, footX, footY);
          ctx.stroke();

          // Little paw highlight on foreground legs when lifted
          if (!isBack && lift > 0) {
            ctx.fillStyle = this.colorBelly;
            ctx.beginPath(); ctx.arc(footX + 2, footY, 3.5, 0, Math.PI * 2); ctx.fill();
          }
          ctx.restore();
        };

        // Draw Back Legs (Shadowed)
        drawLeg(-14, 5, legSwing2, legLift2, true); // Back Left
        drawLeg(12, 5, legSwing1, legLift1, true);  // Back Right

        // 4. BODY (Longer Bean Shape)
        ctx.fillStyle = this.colorMain;
        ctx.beginPath();
        // Smooth bezier peanut body
        ctx.moveTo(-22, -8);
        ctx.bezierCurveTo(-22, -24, 16, -26, 22, -10); // Back and neck
        ctx.bezierCurveTo(28, 6, 19, 18, 0, 18);       // Chest and front belly
        ctx.bezierCurveTo(-15, 18, -26, 10, -22, -8);  // Bottom belly to butt
        ctx.fill();

        // Underbelly Highlight
        ctx.fillStyle = this.colorBelly;
        ctx.beginPath();
        ctx.ellipse(2, 6, 15, 9, -Math.PI * 0.05, 0, Math.PI * 2);
        ctx.fill();

        // Draw Front Legs (Lit)
        drawLeg(-14, 5, legSwing1, legLift1, false); // Front Left
        drawLeg(12, 5, legSwing2, legLift2, false);  // Front Right

        // 5. HEAD & NECK
        const headDelay = isMoving ? Math.sin(cycle - 0.5) * 2 : Math.sin(bCycle - 0.5) * 1;
        ctx.translate(18, -22 + headDelay);
        const headRotate = isMoving ? Math.cos(cycle) * 0.05 : 0;
        ctx.rotate(headRotate);

        // 3D Ears with Inner Depth
        const earWiggle = isMoving ? Math.cos(cycle * 2) * 0.05 : 0;
        const drawEar = (side: string) => {
          ctx.save();
          const ex = side === 'left' ? -8 : 6;
          ctx.translate(ex, -8);
          ctx.rotate(side === 'left' ? -0.2 - earWiggle : 0.2 + earWiggle);

          // Outer earF
          ctx.fillStyle = this.colorMain;
          ctx.beginPath(); ctx.moveTo(-6, 2); ctx.quadraticCurveTo(0, -16, 6, 2); ctx.fill();
          // Inner shadowed ear hole
          ctx.fillStyle = this.colorShadow;
          ctx.beginPath(); ctx.moveTo(-3, 1); ctx.quadraticCurveTo(0, -11, 4, 1); ctx.fill();
          // Micro fluff highlight
          ctx.fillStyle = "#FFD1D9";
          ctx.beginPath(); ctx.moveTo(-1, 1); ctx.quadraticCurveTo(0, -7, 2, 1); ctx.fill();
          ctx.restore();
        };
        drawEar('left');
        drawEar('right');

        // Head Base (Squashed circle for chubby cheeks)
        ctx.fillStyle = this.colorMain;
        ctx.beginPath();
        ctx.ellipse(0, 0, 16, 13.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cheek Tuft Fluffs
        ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-19, 2); ctx.lineTo(-13, 4); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-13, 4); ctx.lineTo(-17, 6); ctx.lineTo(-11, 8); ctx.fill();

        // Distinct Snout/Muzzle
        ctx.fillStyle = this.colorBelly;
        ctx.beginPath(); ctx.ellipse(8, 3, 7, 5.5, 0, 0, Math.PI * 2); ctx.fill();

        // Cute Nose
        ctx.fillStyle = "#FF758F";
        ctx.beginPath(); ctx.ellipse(12, 1, 3, 2, 0, 0, Math.PI * 2); ctx.fill();

        // Expressive Eyes (Blink logic + stylized vector eyes)
        ctx.fillStyle = "#2D3142";
        const isBlinking = (Date.now() % 3500) < 150;
        if (isBlinking) {
          ctx.lineWidth = 2.5; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(3, -2); ctx.quadraticCurveTo(5, 0, 7, -2); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(11, -2); ctx.quadraticCurveTo(13, 0, 15, -2); ctx.stroke();
        } else {
          ctx.beginPath(); ctx.ellipse(5, -2, 2.5, 4, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(13, -2, 2.5, 4, 0, 0, Math.PI * 2); ctx.fill();

          // Standard eyes without extra catchlights
        }

        // Soft Blush
        if (this.hasBlush) {
          ctx.fillStyle = "rgba(255, 117, 143, 0.4)";
          ctx.beginPath(); ctx.ellipse(2, 6, 3, 2, -Math.PI * 0.1, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(12, 6, 4, 2.5, Math.PI * 0.1, 0, Math.PI * 2); ctx.fill();
        }

        // 6. ROSE IN MOUTH (Romantic Accessory)
        const stemSwing = isMoving ? Math.sin(cycle * 2) * 2 : Math.sin(bCycle) * 1;

        ctx.save();
        ctx.translate(14, 4); // Anchor to the mouth

        // Draw Rose Stem
        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(8, 2 + stemSwing, 22, 4 + stemSwing * 2);
        ctx.stroke();

        // Small Leaf
        ctx.fillStyle = "#388E3C";
        ctx.beginPath(); ctx.ellipse(8, 4 + stemSwing, 4, 2, Math.PI / 6, 0, Math.PI * 2); ctx.fill();

        // Rose Flower
        ctx.translate(22, 4 + stemSwing * 2);
        const roseRot = isMoving ? Math.sin(cycle * 2) * 0.1 : 0;
        ctx.rotate(roseRot);

        ctx.fillStyle = "#FF69B4"; // Pink Rose
        ctx.beginPath();
        ctx.arc(0, -3, 4, 0, Math.PI * 2);
        ctx.arc(-3, 1, 4, 0, Math.PI * 2);
        ctx.arc(3, 1, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#D81B60"; // Inner depth
        ctx.beginPath(); ctx.arc(0, -1, 3, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#FFB7C5"; // Highlight
        ctx.beginPath(); ctx.ellipse(0, -2, 1.5, 0.8, 0, 0, Math.PI * 2); ctx.fill();

        ctx.restore(); // Return from rose

        ctx.restore(); // Return to world 
      }
    }

    class Environment {
      engine: Engine;
      hills: any[] = [];
      clouds: any[] = [];
      stars: any[] = [];
      constructor(engine: Engine) {
        this.engine = engine;
        this.generateTopology();
      }
      generateTopology() {
        let x = -500;
        while (x < WORLD_LENGTH + 2000) {
          this.hills.push({
            x: x, w: Utils.rand(1000, 2500), h: Utils.rand(200, 600),
            layer: Math.floor(Utils.rand(1, 4)), peakOffset: Utils.rand(0.35, 0.65)
          });
          x += Utils.rand(300, 600);
        }
        // PERFORMANCE BOOST: Sort once during generation, not in draw loop
        this.hills.sort((a, b) => b.layer - a.layer);

        for (let i = 0; i < 35; i++) {
          this.clouds.push({
            x: Utils.rand(-200, WORLD_LENGTH + 1000), y: Utils.rand(20, 280),
            s: Utils.rand(0.4, 1.3), v: Utils.rand(0.05, 0.25),
            type: Math.floor(Utils.rand(1, 4)), layer: Math.random() > 0.6 ? 1 : 2
          });
        }
        this.clouds.sort((a, b) => b.layer - a.layer);

        for (let i = 0; i < 200; i++) {
          this.stars.push({ x: Math.random(), y: Math.random() * 0.7, size: Math.random() * 1.2, twinkle: Math.random() * Math.PI * 2 });
        }
      }
      update() {
        this.clouds.forEach(c => c.x -= c.v);
        this.stars.forEach(s => s.twinkle += 0.02);
      }

      drawCloudShape(ctx: CanvasRenderingContext2D, type: number) {
        ctx.beginPath();
        if (type === 1) {
          ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.arc(25, -20, 28, 0, Math.PI * 2);
          ctx.arc(55, -5, 25, 0, Math.PI * 2); ctx.arc(80, 10, 18, 0, Math.PI * 2);
          ctx.arc(-20, 10, 18, 0, Math.PI * 2);
          if ((ctx as any).roundRect) (ctx as any).roundRect(-20, -5, 100, 35, 20);
          else ctx.fillRect(-20, -5, 100, 35);
        } else if (type === 2) {
          ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.arc(35, -8, 22, 0, Math.PI * 2);
          ctx.arc(70, 0, 18, 0, Math.PI * 2); ctx.arc(105, 8, 12, 0, Math.PI * 2);
          if ((ctx as any).roundRect) (ctx as any).roundRect(-5, -5, 110, 25, 15);
          else ctx.fillRect(-5, -5, 110, 25);
        } else {
          ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.arc(30, -15, 28, 0, Math.PI * 2);
          ctx.arc(60, 2, 20, 0, Math.PI * 2);
          if ((ctx as any).roundRect) (ctx as any).roundRect(-10, -5, 70, 28, 20);
          else ctx.fillRect(-10, -5, 70, 28);
        }
        ctx.fill();
      }

      draw(ctx: CanvasRenderingContext2D, cameraX: number, progress: number, palette: any, groundY: number) {
        const { width, height } = ctx.canvas;
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.8);
        skyGrad.addColorStop(0, palette.skyT);
        skyGrad.addColorStop(1, palette.skyB);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        const isOcean = palette.type === 'ocean';
        const isSnow = palette.type === 'snow';

        if (progress > 0.2 || isOcean) {
          ctx.save();
          const starFade = isOcean ? 0.6 : Utils.clamp((progress - 0.2) * 2.5, 0, 1);
          ctx.fillStyle = "#FFF";
          this.stars.forEach(s => {
            const alpha = 0.2 + Math.sin(s.twinkle) * 0.8;
            ctx.globalAlpha = alpha * starFade;
            ctx.beginPath(); ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2); ctx.fill();
          });
          ctx.restore();
        }

        const isPortrait = this.engine.isPortrait;
        const orbitRadius = isPortrait ? width * 0.75 : width * 0.45;
        const centerX = width * 0.5;
        const centerY = isPortrait ? height * 0.75 : height * 0.9;
        const angle = Math.PI - (progress * Math.PI);
        const objX = centerX + Math.cos(angle) * orbitRadius;
        const objY = centerY - Math.sin(angle) * orbitRadius;

        ctx.save();
        const isNight = progress > 0.8 || isOcean;
        const bodyRadius = isNight ? 45 : 65;
        ctx.fillStyle = palette.sun;
        ctx.beginPath(); ctx.arc(objX, objY, bodyRadius, 0, Math.PI * 2); ctx.fill();
        const glowGrad = ctx.createRadialGradient(objX, objY, bodyRadius, objX, objY, bodyRadius * 3);
        glowGrad.addColorStop(0, isNight ? "rgba(255, 234, 238, 0.4)" : "rgba(255, 255, 255, 0.4)");
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath(); ctx.arc(objX, objY, bodyRadius * 3, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        this.clouds.forEach(c => {
          const parallaxMultiplier = c.layer === 1 ? 0.08 : 0.03;
          const screenX = c.x - (cameraX * parallaxMultiplier);
          if (screenX < -250 || screenX > width + 250) return;
          ctx.save();
          ctx.translate(screenX, c.y);
          const scaleMod = c.layer === 1 ? c.s : c.s * 0.6;
          ctx.scale(scaleMod, scaleMod);
          const baseAlpha = isNight ? 0.15 : 0.8;
          const cloudAlpha = c.layer === 1 ? baseAlpha : baseAlpha * 0.5;
          ctx.fillStyle = isNight ? "rgba(27, 43, 30, 0.2)" : "rgba(27, 43, 30, 0.08)";
          ctx.save(); ctx.translate(0, 8); this.drawCloudShape(ctx, c.type); ctx.restore();
          ctx.fillStyle = `rgba(255, 255, 255, ${cloudAlpha})`;
          this.drawCloudShape(ctx, c.type);
          ctx.restore();
        });

        ctx.save();
        this.hills.forEach(m => {
          let parallax = m.layer === 3 ? 0.05 : (m.layer === 2 ? 0.15 : 0.3);
          const screenX = m.x - (cameraX * parallax);
          if (screenX < -m.w || screenX > width + m.w) return;
          
          if (isOcean) {
            ctx.fillStyle = palette.mount;
            ctx.beginPath();
            ctx.moveTo(screenX, groundY);
            const waveH = m.h * 0.2;
            const time = Date.now() * 0.001;
            ctx.quadraticCurveTo(screenX + m.w/2, groundY - waveH + Math.sin(time + m.x * 0.01) * 15, screenX + m.w, groundY);
            ctx.fill();
          } else {
            const depthFactor = m.layer / 3;
            const baseColor = isSnow ? "#FFFFFF" : Utils.lerpColor(palette.mount, palette.skyB, depthFactor * 0.4);
            const shadowColor = isSnow ? "#CFD8DC" : Utils.lerpColor(baseColor, "#0D2110", progress > 0.6 ? 0.4 : 0.15);
            
            const peakX = screenX + m.w * m.peakOffset;
            const peakY = groundY - m.h;

            const hillGrad = ctx.createLinearGradient(peakX, peakY, peakX, groundY);
            hillGrad.addColorStop(0, baseColor);
            hillGrad.addColorStop(1, Utils.lerpColor(baseColor, palette.groundT, 0.2));
            ctx.fillStyle = hillGrad;

            ctx.beginPath();
            ctx.moveTo(screenX, groundY);
            ctx.quadraticCurveTo(screenX + m.w * 0.2, groundY - m.h * 0.3, peakX, peakY);
            ctx.quadraticCurveTo(screenX + m.w * 0.8, groundY - m.h * 0.3, screenX + m.w, groundY);
            ctx.fill();

            ctx.fillStyle = shadowColor;
            ctx.beginPath();
            ctx.moveTo(peakX, peakY);
            ctx.quadraticCurveTo(peakX + m.w * 0.2, peakY + m.h * 0.5, screenX + m.w, groundY);
            ctx.lineTo(peakX, groundY);
            ctx.fill();
          }
        });
        ctx.restore();

        ctx.fillStyle = Utils.lerpColor(palette.groundT, palette.skyB, 0.12);
        ctx.beginPath(); ctx.moveTo(0, height);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX * 0.8;
          const wy = (groundY - 18) + Math.sin(wx * 0.002 + (isOcean ? Date.now()*0.002 : 0)) * 20 + Math.cos(wx * 0.005) * 10;
          ctx.lineTo(i, wy);
        }
        ctx.lineTo(width + 80, height); ctx.fill();

        ctx.fillStyle = Utils.lerpColor(palette.groundT, "#1A2E1D", 0.04);
        ctx.beginPath(); ctx.moveTo(0, height);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX * 0.9;
          const wy = (groundY - 6) + Math.sin(wx * 0.003 + (isOcean ? Date.now()*0.003 : 0)) * 15 + Math.cos(wx * 0.007) * 8;
          ctx.lineTo(i, wy);
        }
        ctx.lineTo(width + 80, height); ctx.fill();

        const groundGrad = ctx.createLinearGradient(0, groundY, 0, height);
        groundGrad.addColorStop(0, palette.groundT); groundGrad.addColorStop(1, palette.groundB);
        ctx.fillStyle = groundGrad; ctx.fillRect(0, groundY, width, height - groundY);

        ctx.fillStyle = (progress > 0.6 || isOcean) ? "rgba(255,255,255,0.08)" : "rgba(255, 255, 255, 0.15)";
        ctx.beginPath(); ctx.moveTo(0, groundY);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX; const wy = groundY + Math.sin(wx * 0.004 + (isOcean ? Date.now()*0.004 : 0)) * 8; ctx.lineTo(i, wy);
        }
        for (let i = width + 80; i >= -40; i -= 40) {
          const wx = i + cameraX; const wy = groundY + 30 + Math.sin(wx * 0.004) * 20; ctx.lineTo(i, wy);
        }
        ctx.fill();

        ctx.fillStyle = Utils.lerpColor(palette.groundB, "#1A2E1D", 0.08);
        ctx.beginPath(); ctx.moveTo(0, height);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX * 1.2;
          const wy = groundY + 70 + Math.sin(wx * 0.002) * 30;
          ctx.lineTo(i, wy);
        }
        ctx.lineTo(width + 80, height); ctx.fill();
      }
    }

    class FloraManager {
      engine: Engine;
      trees: any[] = [];
      petals: any[] = [];
      grasses: any[] = [];
      flowers: any[] = [];
      stones: any[] = [];
      magicFlowers: any[] = [];
      climaxParticles: any[] = [];

      constructor(engine: Engine) {
        this.engine = engine;
        this.generateFlora();
      }
      
      triggerClimax(intensity: number) {
        const mobileScale = this.engine.isPortrait ? 0.4 : 1.0;
        if (Math.random() < intensity * mobileScale) {
          this.climaxParticles.push({
            x: Math.random() * this.engine.width,
            y: -50,
            vx: Utils.rand(-2, 2),
            vy: Utils.rand(3, 6),
            size: Utils.rand(6, 14),
            rot: Math.random() * Math.PI * 2,
            rotV: Utils.rand(-0.1, 0.1),
            type: Math.random() > 0.4 ? 'sakura' : 'heart',
            color: Math.random() > 0.5 ? "#FFB7C5" : "#FF69B4"
          });
        }
      }

      spawnMagicFlower(screenX: number, screenY: number) {
        const worldX = screenX + (this.engine.cameraX * 1.0);
        this.magicFlowers.push({
          x: worldX,
          y: screenY,
          size: 0,
          targetSize: Utils.rand(15, 25),
          rotation: Math.random() * Math.PI,
          color: `hsl(${Utils.rand(330, 360)}, 80%, 70%)`,
          life: 1.0,
          bloomSpeed: 0.05
        });
      }

      generateFlora() {
        let x = -500;
        const LAYERS = [0.8, 0.9, 1.0, 1.2];
        while (x < WORLD_LENGTH + 1000) {
          const clusterSize = Math.floor(Utils.rand(1, 4));
          for (let i = 0; i < clusterSize; i++) {
            const z = LAYERS[Math.floor(Math.random() * LAYERS.length)];
            this.trees.push({
              x: x + Utils.rand(-100, 100),
              scale: Utils.rand(0.6, 1.2) * (z * 0.8),
              z: z,
              type: Math.random() > 0.4 ? 'sakura' : 'pine',
              swayOffset: Math.random() * Math.PI * 2
            });
          }
          x += Utils.rand(200, 500);
        }

        for (let i = 0; i < 600; i++) {
          this.grasses.push({
            x: Utils.rand(-500, WORLD_LENGTH + 1500),
            z: LAYERS[Math.floor(Math.random() * LAYERS.length)],
            h: Utils.rand(8, 18),
            sway: Math.random() * Math.PI * 2
          });
        }
        
        const FLOWER_COLORS = ['pink', 'white', 'yellow', 'purple'];
        for (let i = 0; i < 300; i++) {
          this.flowers.push({
            x: Utils.rand(-500, WORLD_LENGTH + 1500),
            z: LAYERS[Math.floor(Math.random() * LAYERS.length)],
            type: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
            sway: Math.random() * Math.PI * 2
          });
        }

        for (let i = 0; i < 50; i++) {
          this.stones.push({
            x: Utils.rand(-500, WORLD_LENGTH + 1500),
            z: LAYERS[Math.floor(Math.random() * LAYERS.length)],
            s: Utils.rand(3, 10)
          });
        }

        this.trees.sort((a, b) => b.z - a.z);
        this.grasses.sort((a, b) => b.z - a.z);
        this.flowers.sort((a, b) => b.z - a.z);
        this.stones.sort((a, b) => b.z - a.z);
      }
      update() {
        if (Math.random() < 0.25) {
          this.petals.push({
            x: this.engine.cameraX + Math.random() * this.engine.width * 1.5,
            y: -50, vx: Utils.rand(-2.5, -0.5), vy: Utils.rand(1, 2.5),
            size: Utils.rand(3, 6), osc: Math.random() * 10, rot: Math.random() * Math.PI
          });
        }
        for (let i = this.petals.length - 1; i >= 0; i--) {
          let p = this.petals[i];
          p.x += p.vx; p.y += p.vy; p.osc += 0.03; p.rot += 0.05; p.x += Math.sin(p.osc) * 1.2;
          if (p.y > this.engine.height || p.x < this.engine.cameraX - 100) this.petals.splice(i, 1);
        }

        for (let i = this.magicFlowers.length - 1; i >= 0; i--) {
          let f = this.magicFlowers[i];
          if (f.size < f.targetSize) f.size += f.bloomSpeed * f.targetSize;
          f.life -= 0.005;
          if (f.life <= 0) this.magicFlowers.splice(i, 1);
        }

        for (let i = this.climaxParticles.length - 1; i >= 0; i--) {
          let p = this.climaxParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotV;
          if (p.y > this.engine.height + 20) this.climaxParticles.splice(i, 1);
        }
      }
      drawLayer(ctx: CanvasRenderingContext2D, cameraX: number, palette: any, minZ: number, maxZ: number, groundY: number) {
        const wind = Date.now() * 0.002;
        const isNight = palette.skyT === "#0A1128" || palette.type === 'ocean';
        const isOcean = palette.type === 'ocean';
        const isSnow = palette.type === 'snow';

        if (maxZ >= 3.0) {
          this.climaxParticles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = isSnow ? "#FFF" : p.color;
            
            if (p.type === 'heart') {
              const s = p.size * 0.6;
              ctx.beginPath();
              ctx.moveTo(0, s);
              ctx.bezierCurveTo(s, -s, s*2, s, 0, s*2.5);
              ctx.bezierCurveTo(-s*2, s, -s, -s, 0, s);
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          });
        }

        if (minZ <= 1.0 && maxZ >= 1.0 && !isOcean) {
          this.magicFlowers.forEach(f => {
            const screenX = f.x - cameraX;
            if (screenX < -50 || screenX > this.engine.width + 50) return;
            ctx.save();
            ctx.translate(screenX, f.y);
            ctx.rotate(f.rotation);
            ctx.globalAlpha = f.life;
            ctx.fillStyle = f.color;
            for (let i = 0; i < 5; i++) {
              ctx.rotate((Math.PI * 2) / 5);
              ctx.beginPath();
              ctx.ellipse(f.size * 0.6, 0, f.size, f.size * 0.4, 0, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.fillStyle = "#FFD1D9";
            ctx.beginPath(); ctx.arc(0, 0, f.size * 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
          });
        }

        const drawElement = (arr: any[], drawFn: any) => {
          for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            if (el.z < minZ || el.z > maxZ) return;
            const screenX = el.x - (cameraX * el.z);
            if (screenX < -150 || screenX > this.engine.width + 150) continue;
            const wx = el.x;
            let yPos = groundY;
            if (el.z === 0.8) yPos = (groundY - 18) + Math.sin(wx * 0.002 + (isOcean ? Date.now()*0.002 : 0)) * 20 + Math.cos(wx * 0.005) * 10;
            else if (el.z === 0.9) yPos = (groundY - 6) + Math.sin(wx * 0.003 + (isOcean ? Date.now()*0.003 : 0)) * 15 + Math.cos(wx * 0.007) * 8;
            else if (el.z === 1.2) yPos = groundY + 70 + Math.sin(wx * 0.002) * 30;
            drawFn(el, screenX, yPos);
          }
        };

        if (!isOcean) {
          ctx.fillStyle = isSnow ? "#B0BEC5" : (isNight ? "#31232c" : "#a88e99");
          drawElement(this.stones, (el: any, x: number, y: number) => {
            ctx.beginPath();
            ctx.moveTo(x - el.s * 2, y);
            ctx.quadraticCurveTo(x - el.s, y - el.s, x, y - el.s * 1.2);
            ctx.quadraticCurveTo(x + el.s * 1.5, y - el.s * 0.8, x + el.s * 2, y);
            ctx.fill();
          });

          if (!isSnow) {
            drawElement(this.grasses, (el: any, x: number, y: number) => {
              if (!Sprites.grass) return;
              const sway = Math.sin(wind + el.sway) * 5;
              ctx.drawImage(Sprites.grass, x + sway - 10, y - 30, 20, 30 * (el.h / 15));
            });

            drawElement(this.flowers, (el: any, x: number, y: number) => {
              const sway = Math.sin(wind + el.sway) * 4;
              ctx.strokeStyle = "#7CB342";
              ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + sway * 0.5, y - 8, x + sway, y - 14); ctx.stroke();
              ctx.save();
              ctx.translate(x + sway, y - 14);
              ctx.fillStyle = el.type === 'pink' ? (isNight ? "#8B5A2B" : "#FF9800") : (isNight ? "#9E939B" : "#FFFFFF");
              for (let i = 0; i < 4; i++) {
                ctx.rotate(Math.PI / 2);
                ctx.beginPath(); ctx.ellipse(2, 0, 3, 2, 0, 0, Math.PI * 2); ctx.fill();
              }
              ctx.fillStyle = isNight ? "#8B7F39" : "#FFCA28";
              ctx.beginPath(); ctx.arc(0, 0, 1.5, 0, Math.PI * 2); ctx.fill();
              ctx.restore();
            });
          }

          drawElement(this.trees, (t: any, x: number, y: number) => {
            if (isSnow && t.type !== 'pine') return;
            const sway = Math.sin(wind * 0.5 + t.swayOffset) * 0.03;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(sway);
            ctx.scale(t.scale, t.scale);
            if (t.z < 0.9) ctx.globalAlpha = 0.6 + (t.z - 0.7) * 2.0;
            if (t.type === 'pine') {
              if (Sprites.pine) ctx.drawImage(Sprites.pine, -50, -200);
              if (isSnow) {
                 ctx.fillStyle = "rgba(255,255,255,0.8)";
                 ctx.beginPath(); ctx.moveTo(-30, -140); ctx.lineTo(0, -180); ctx.lineTo(30, -140); ctx.fill();
              }
            } else {
              if (Sprites.sakura) ctx.drawImage(Sprites.sakura, -75, -200);
            }
            ctx.restore();
            ctx.fillStyle = "rgba(27, 43, 30, 0.15)";
            ctx.beginPath(); ctx.ellipse(x, y, 15, 4, 0, 0, Math.PI * 2); ctx.fill();
          });
        }

        if (maxZ > 1.0) {
          ctx.fillStyle = isSnow ? "#FFFFFF" : (isNight ? "rgba(168, 32, 48, 0.6)" : "rgba(230, 57, 70, 0.8)");
          this.petals.forEach(p => {
            ctx.save();
            ctx.translate(p.x - cameraX * 1.1, p.y);
            ctx.rotate(p.rot);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }
      }
    }

    class StoryManager {
      engine: Engine;
      lyricEl: HTMLElement | null;
      photos: any[] = [];
      constructor(engine: Engine) {
        this.engine = engine;
        this.lyricEl = document.getElementById('current-lyric');
        this.setupPhotos();
      }
      setupPhotos() {
        const step = (WORLD_LENGTH - 6000) / PHOTO_ASSETS.length;
        PHOTO_ASSETS.forEach((url, i) => {
          const img = new Image(); 
          img.src = url;
          const photoObj: any = { 
            x: 4000 + (i * step), 
            y: this.engine.height * 0.35, 
            rot: Utils.rand(-10, 10), 
            img: img, 
            swing: Math.random() * Math.PI,
            cache: null 
          };
          
          img.onload = () => {
            const fw = 280, fh = fw * 1.25;
            const can = document.createElement('canvas');
            can.width = fw + 20; can.height = fh + 20; // Room for shadow
            const c = can.getContext('2d');
            if (c) {
              c.translate(10, 5);
              // Shadow
              c.fillStyle = "rgba(0,0,0,0.15)";
              c.fillRect(5, 10, fw, fh);
              // Frame
              c.fillStyle = "#fffcfc";
              c.fillRect(0, 0, fw, fh);
              // Tape
              c.fillStyle = "rgba(129, 199, 132, 0.6)";
              c.fillRect(fw/2 - 25, -10, 50, 15);
              // Photo
              const iw = fw * 0.9, ih = fh - (fw * 0.3);
              c.drawImage(img, (fw-iw)/2, 15, iw, ih);
              // Sepia
              c.fillStyle = "rgba(255, 180, 100, 0.15)";
              c.fillRect((fw-iw)/2, 15, iw, ih);
            }
            photoObj.cache = can;
          };

          img.onerror = () => {
            img.src = FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length];
          };
          this.photos.push(photoObj);
        });
      }
      update(playerX: number) {
        const audio = document.getElementById('bgm') as HTMLAudioElement;
        const currentTime = audio ? audio.currentTime : 0;
        let currentText = "";
        
        for (let i = 0; i < LYRICS_DATA.length; i++) {
          if (currentTime >= LYRICS_DATA[i].time) {
            currentText = LYRICS_DATA[i].text;
          } else {
            break;
          }
        }

        if (this.lyricEl && this.lyricEl.innerText !== currentText) {
          this.lyricEl.innerText = currentText;
          if (currentText && currentText !== "...") this.lyricEl.classList.add('visible');
          else this.lyricEl.classList.remove('visible');
        }
        this.photos.forEach(p => p.swing += 0.02);
      }
      drawPhotos(ctx: CanvasRenderingContext2D, cameraX: number) {
        this.photos.forEach(p => {
          const screenX = p.x - (cameraX * 0.7);
          const mw = this.engine.isPortrait ? this.engine.width * 0.8 : 350;
          const fw = Math.min(280, mw);
          const fh = fw * 1.25;
          const sy = (this.engine.height * 0.38) + Math.sin(p.swing) * 15;
          if (screenX < -fw || screenX > this.engine.width + fw) return;
          
          ctx.save();
          ctx.translate(screenX, sy);
          ctx.rotate(p.rot * Math.PI / 180);

          if (p.cache) {
            ctx.drawImage(p.cache, -fw/2 - 10, -fh/2 - 5, fw + 20, fh + 20);
          } else {
            // Fallback while loading
            ctx.fillStyle = "#fff"; ctx.fillRect(-fw/2, -fh/2, fw, fh);
          }

          // Heart heartbeat remains dynamic
          const hbScale = 1 + Math.sin(Date.now() / 300) * 0.1;
          ctx.fillStyle = "#4CAF50"; ctx.font = "24px Arial"; ctx.textAlign = "center";
          ctx.save();
          ctx.translate(0, fh / 2 - 20);
          ctx.scale(hbScale, hbScale);
          ctx.fillText("💕", 0, 0);
          ctx.restore();

          ctx.restore();
        });
      }
    }

    class Engine {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      isRunning: boolean = false;
      isEnded: boolean = false;
      isWalking: boolean = false;
      isCutscene: boolean = false;
      cameraX: number = 0;
      progress: number = 0;
      partnerName: string = "itaa";
      width: number = 0;
      height: number = 0;
      isPortrait: boolean = false;
      player: Cat;
      npc: Cat;
      env: Environment;
      flora: FloraManager;
      story: StoryManager;
      endTimer: any = null;
      
      // PRECISION CLOCK STATE
      lastAudioTime: number = 0;
      lastSyncTime: number = 0;
      preciseTime: number = 0;

      constructor() {
        this.canvas = document.getElementById('worldCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        initSprites(this.ctx);
        this.player = new Cat('male');
        this.npc = new Cat('female');
        this.env = new Environment(this);
        this.flora = new FloraManager(this);
        this.story = new StoryManager(this);
        this.init();
      }
      init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.bindEvents();
      }
      resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.isPortrait = this.height > this.width;
      }
      bindEvents() {
        const startBtn = document.getElementById('btn-start');
        if (startBtn) startBtn.onclick = () => {
          this.partnerName = "liaa";
          
          // --- SYNCHRONOUS CLOCK RESET FIX ---
          this.lastAudioTime = 0;
          this.lastSyncTime = performance.now();
          this.preciseTime = 0;
          this.progress = 0;
          this.isEnded = false;
          this.isCutscene = false;
          
          const splash = document.getElementById('splash-screen');
          if (splash) splash.style.opacity = '0';
          setTimeout(() => { if (splash) splash.style.display = 'none'; }, 2000);
          
          const audio = document.getElementById('bgm') as HTMLAudioElement;
          if (audio) {
            audio.volume = 0; // Start at zero for fade in
            audio.currentTime = 0; // Start from beginning for the new song
            audio.play().then(() => {
              this.lastAudioTime = audio.currentTime;
              this.lastSyncTime = performance.now();
              // Fade In Logic: Increase volume to 1.0 over 2 seconds
              const fadeIn = setInterval(() => {
                if (audio.volume < 0.95) {
                  audio.volume += 0.05;
                } else {
                  audio.volume = 1.0;
                  clearInterval(fadeIn);
                }
              }, 100);
              console.log("Audio playing with fade-in from start");
            }).catch((err) => {
              console.warn("Audio play failed, retrying on interaction...", err);
              const retryPlay = () => {
                audio.volume = 1.0;
                audio.currentTime = 0;
                audio.play();
                window.removeEventListener('click', retryPlay);
              };
              window.addEventListener('click', retryPlay);
            });
          }
          
          if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
          }
        };

        // Trigger Bunga Saat Klik/Tap
        const handleInteraction = (e: any) => {
          if (!this.isRunning || this.isEnded) return;
          // MOBILE FIX: Use touches[0] if it's a touch event
          const touch = e.touches ? e.touches[0] : e;
          const x = touch.clientX;
          const y = touch.clientY;
          if (x !== undefined && y !== undefined) {
            this.flora.spawnMagicFlower(x, y);
          }
        };

        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction, { passive: false });

        const createParticle = (x: number, y: number) => {
          if (!this.isRunning || this.isEnded) return;
          const pt = document.createElement('div');
          pt.className = 'magic-particle';
          const size = Utils.rand(6, 12);
          pt.style.width = `${size}px`;
          pt.style.height = `${size}px`;
          pt.style.left = `${x - size / 2}px`;
          pt.style.top = `${y - size / 2}px`;
          pt.style.zIndex = "9999"; // Ensure it's on top
          document.getElementById('game-container')?.appendChild(pt);
          setTimeout(() => pt.remove(), 1000);
        };

        let lastParticleTime = 0;
        const handlePointerMove = (e: any) => {
          const now = Date.now();
          if (now - lastParticleTime > 50) {
            const touch = e.touches ? e.touches[0] : e;
            const x = touch.clientX;
            const y = touch.clientY;
            if (x !== undefined && y !== undefined) {
              createParticle(x, y);
              lastParticleTime = now;
            }
          }
        };

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: false });

        // --- Sparkle Trail Logic ---
        const handleSparkle = (e: any) => {
          if (this.isRunning) return; // Only on splash screen
          const touch = e.touches ? e.touches[0] : e;
          const x = touch.clientX;
          const y = touch.clientY;
          
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle-trail';
          sparkle.innerHTML = ['✨', '⭐', '💫', '🌸', '💖'][Math.floor(Math.random() * 5)];
          sparkle.style.left = `${x}px`;
          sparkle.style.top = `${y}px`;
          sparkle.style.color = `hsl(${Utils.rand(330, 360)}, 100%, 70%)`;
          document.body.appendChild(sparkle);
          setTimeout(() => sparkle.remove(), 800);
        };
        window.addEventListener('mousemove', handleSparkle);
        window.addEventListener('touchstart', handleSparkle);

        // TAB FOCUS FIX: Re-sync animation when returning to the tab
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            const audio = document.getElementById('bgm') as HTMLAudioElement;
            if (audio && !audio.paused) {
              this.lastAudioTime = audio.currentTime;
              this.lastSyncTime = performance.now();
              console.log("Tab focused: Animation re-synced with audio clock.");
            }
          }
        });
      }
      getPalette() {
        const p = this.progress;
        let c1: any, c2: any, f: number;
        
        const OCEAN_END = 0.3;
        const HIMALAYA_START = 0.4;
        const HIMALAYA_END = 0.6;
        const PRESENT_START = 0.7;

        if (p < OCEAN_END) { 
          c1 = PALETTES.ocean; c2 = PALETTES.ocean; f = 0; 
        } else if (p < HIMALAYA_START) {
          c1 = PALETTES.ocean; c2 = PALETTES.himalaya; f = (p - OCEAN_END) / (HIMALAYA_START - OCEAN_END);
        } else if (p < HIMALAYA_END) {
          c1 = PALETTES.himalaya; c2 = PALETTES.himalaya; f = 0;
        } else if (p < PRESENT_START) {
          c1 = PALETTES.himalaya; c2 = PALETTES.afternoon; f = (p - HIMALAYA_END) / (PRESENT_START - HIMALAYA_END);
        } else if (p < 0.85) {
          c1 = PALETTES.afternoon; c2 = PALETTES.sunset; f = (p - PRESENT_START) / 0.15;
        } else {
          c1 = PALETTES.sunset; c2 = PALETTES.night; f = (p - 0.85) / 0.15;
        }

        const pal: any = {};
        for (let key in c1) {
          if (key === 'type') pal[key] = f < 0.5 ? c1[key] : c2[key];
          else pal[key] = Utils.lerpColor(c1[key], c2[key], f);
        }
        return pal;
      }
      update() {
        if (!this.isRunning || this.isEnded) return;

        const audio = document.getElementById('bgm') as HTMLAudioElement;
        if (audio && !audio.paused) {
          if (audio.currentTime !== this.lastAudioTime) {
            this.lastAudioTime = audio.currentTime;
            this.lastSyncTime = performance.now();
          }
          const dt = Math.max(0, (performance.now() - this.lastSyncTime) / 1000);
          this.preciseTime = this.lastAudioTime + dt;

          const startTime = 0;
          const totalDuration = audio.duration || 75; // Approx duration
          
          const oldX = this.player.x;
          this.progress = Utils.clamp((this.preciseTime - startTime) / (totalDuration - startTime - 3.5), 0, 1);
          
          const stopDist = this.isPortrait ? 120 : 60; 
          const targetX = this.progress * WORLD_LENGTH;
          this.player.x = Math.min(targetX, WORLD_LENGTH - stopDist);
          
          const deltaX = Math.abs(this.player.x - oldX);
          
          if (this.progress > 0.6) {
            const intensity = Utils.clamp((this.progress - 0.6) / 0.4, 0.1, 0.8);
            this.flora.triggerClimax(intensity);
          }

          if (this.progress >= 0.98 && !this.isCutscene) {
            this.isCutscene = true;
          }

          if (this.isCutscene) {
            this.player.update(false); 
            this.canvas.style.filter = "brightness(0.3) saturate(1.2)";
            if (!this.endTimer) {
              const goodbyeText = document.getElementById('goodbye-text');
              if (goodbyeText) {
                goodbyeText.style.opacity = '1';
                goodbyeText.style.transform = "translate(-50%, -60%) scale(1.1)";
              }
              this.endTimer = setTimeout(() => {
                if (goodbyeText) goodbyeText.style.opacity = '0';
                setTimeout(() => this.showEndScreen(), 2000);
              }, 4000);
            }
          } else {
            const isOcean = this.progress < 0.35;
            const isWalking = !isOcean && deltaX > 0.01;
            this.player.update(isWalking, 1.2); 
          }
        }
        
        const camOffset = this.isPortrait ? 0.5 : 0.3;
        const targetCamX = Math.max(0, this.player.x - this.width * camOffset);
        this.cameraX = Utils.lerp(this.cameraX, targetCamX, 0.12);
        this.env.update();
        this.flora.update();
        this.story.update(this.preciseTime); 
        this.npc.update(false);
      }
      
      getCurrentGroundY() {
        const p = this.progress;
        const baseGY = this.height * (this.isPortrait ? 0.8 : 0.85);
        const peakGY = this.height * 0.45; // Elevation peak
        
        if (p < 0.3) return baseGY;
        if (p < 0.5) { // Climbing phase
          const f = (p - 0.3) / 0.2;
          return Utils.lerp(baseGY, peakGY, f);
        }
        if (p < 0.7) { // Descending phase
          const f = (p - 0.5) / 0.2;
          return Utils.lerp(peakGY, baseGY, f);
        }
        return baseGY;
      }

      draw() {
        const palette = this.getPalette();
        const gy = this.getCurrentGroundY();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.env.draw(this.ctx, this.cameraX, this.progress, palette, gy);
        this.flora.drawLayer(this.ctx, this.cameraX, palette, 0.0, 1.0, gy);
        this.story.drawPhotos(this.ctx, this.cameraX);
        this.npc.draw(this.ctx, this.cameraX, gy, this.isPortrait, palette);
        this.player.draw(this.ctx, this.cameraX, gy, this.isPortrait, palette, this.progress);
        this.flora.drawLayer(this.ctx, this.cameraX, palette, 1.0001, 3.0, gy);
      }
      showEndScreen() {
        this.isEnded = true;
        this.canvas.style.opacity = '0';
        
        // Stop/Fade out music when parallax ends
        const audio = document.getElementById('bgm') as HTMLAudioElement;
        if (audio) {
          const fadeOut = setInterval(() => {
            if (audio.volume > 0.05) {
              audio.volume -= 0.05;
            } else {
              audio.pause();
              clearInterval(fadeOut);
            }
          }, 100);
        }

        const endScreen = document.getElementById('end-screen');
        if (endScreen) endScreen.classList.add('visible');

        const envContainer = document.getElementById('envelope-container');
        const envElement = document.getElementById('envelope');
        const hint = document.querySelector('.envelope-hint') as HTMLElement;
        const celebration = document.getElementById('celebration-content');
        const gallery = document.getElementById('final-gallery');
        const cakeContainer = document.getElementById('cake-container');
        const wishTerminal = document.getElementById('wish-terminal');
        const wishBtn = document.getElementById('wish-btn');
        const wishInput = document.getElementById('wish-input') as HTMLInputElement;
        const cakeHint = document.getElementById('cake-hint');

        let envelopeOpened = false;

        if (envContainer) envContainer.onclick = () => {
          if (envelopeOpened) return;
          envelopeOpened = true;
          envElement?.classList.add('open');
          if (hint) hint.style.opacity = '0';

          setTimeout(() => {
            if (envContainer) {
              envContainer.style.opacity = '0';
              envContainer.style.transform = 'scale(0.9)';
            }
            setTimeout(() => {
              if (envContainer) envContainer.style.display = 'none';
              if (cakeContainer) {
                cakeContainer.style.display = 'flex';
                void cakeContainer.offsetWidth;
                cakeContainer.style.opacity = '1';
                
                // Show Wish Terminal after cake appears
                setTimeout(() => {
                  if (wishTerminal) wishTerminal.style.display = 'flex';
                  if (cakeHint) cakeHint.style.display = 'none';
                }, 1000);
              }
            }, 1000);
          }, 4500);
        };

        let wishSent = false;
        let cakeBlown = false;

        const handleCakeBlow = () => {
          if (!wishSent || cakeBlown) return;
          cakeBlown = true;
          cakeFlame?.classList.add('out');
          
          if (cakeHint) {
            const finalWish = wishInput.value.trim() || "Bahagia selamanya";
            cakeHint.innerText = `Permohonanmu: "${finalWish}" sedang terbang ke langit... ✨`;
            cakeHint.style.color = "var(--primary-color)";
          }

          setTimeout(() => {
            if (cakeContainer) cakeContainer.style.opacity = '0';
            if (interactiveCake) interactiveCake.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
              if (cakeContainer) cakeContainer.style.display = 'none';
              
              // SHOW GIFT BOX INSTEAD OF GALLERY IMMEDIATELY
              if (giftReveal) {
                giftReveal.style.display = 'flex';
                void giftReveal.offsetWidth;
                giftReveal.style.opacity = '1';
              }
            }, 1000);
          }, 4000);
        };

        // Microphone Listener for Blowing
        const startMicListener = () => {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
          
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
              const analyser = audioContext.createAnalyser();
              const microphone = audioContext.createMediaStreamSource(stream);
              
              analyser.fftSize = 256;
              const bufferLength = analyser.frequencyBinCount;
              const dataArray = new Uint8Array(bufferLength);
              microphone.connect(analyser);

              const checkBlowing = () => {
                if (cakeBlown) {
                  stream.getTracks().forEach(track => track.stop());
                  audioContext.close();
                  return;
                }
                
                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                  sum += dataArray[i];
                }
                const average = sum / bufferLength;

                if (average > 70) { // Loudness threshold for blowing
                  handleCakeBlow();
                } else {
                  requestAnimationFrame(checkBlowing);
                }
              };
              
              requestAnimationFrame(checkBlowing);
            })
            .catch(err => {
              console.warn("Microphone access denied or error:", err);
            });
        };

        if (wishBtn) wishBtn.onclick = (e) => {
          e.stopPropagation();
          if (wishSent) return;
          wishSent = true;

          // --- SEND DATA TO FORMSPREE ---
          const wishValue = wishInput?.value || "Bahagia selamanya";
          fetch('https://formspree.io/f/meenbvzd', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              penerima: "Liaa",
              permohonan: wishValue,
              timestamp: new Date().toLocaleString('id-ID')
            })
          }).catch(err => console.error("Formspree Error:", err));
          
          if (wishTerminal) {
            wishTerminal.style.opacity = '0';
            wishTerminal.style.transform = 'translateY(-20px)';
            setTimeout(() => {
              wishTerminal.style.display = 'none';
              if (cakeHint) {
                cakeHint.style.display = 'block';
                cakeHint.innerText = "Sekarang, tiup lilinnya... 🎂";
              }
              // Start mic listener after wish is sent
              startMicListener();
            }, 500);
          }
        };

        const cakeFlame = document.getElementById('cake-flame');
        const interactiveCake = document.getElementById('interactive-cake');
        const giftReveal = document.getElementById('gift-reveal-container');
        const giftBox = document.querySelector('.gift-box') as HTMLElement;
        const specialReveal = document.getElementById('special-reveal');

        if (cakeContainer) cakeContainer.onclick = () => {
          handleCakeBlow();
        };

        if (giftBox) giftBox.onclick = () => {
          giftBox.classList.add('open');
          
          setTimeout(() => {
            // HIDE GIFT CONTAINER SO IT DOESN'T BLOCK
            if (giftReveal) giftReveal.style.display = 'none';

            if (specialReveal) {
              specialReveal.style.display = 'flex';
              void specialReveal.offsetWidth;
              specialReveal.classList.add('active');
            }

            // After viewing special reveal for 7 seconds, show the full gallery
            setTimeout(() => {
              if (specialReveal) {
                specialReveal.style.opacity = '0';
                specialReveal.style.transform = 'scale(1.1)'; // Fade away effect
              }
              
              setTimeout(() => {
                if (specialReveal) specialReveal.style.display = 'none';
                
                // Show Celebration Content
                if (celebration) {
                  celebration.style.display = 'flex';
                  void celebration.offsetWidth;
                  celebration.style.opacity = '1';
                }
                
                // POPULATE GALLERY
                if (gallery && gallery.children.length === 0) {
                  PHOTO_ASSETS.forEach((url, i) => {
                    const div = document.createElement('div');
                    div.className = 'polaroid-final';
                    div.innerHTML = `<img src="${url}"><p style="font-family:var(--font-sans); font-weight:700; font-size: 1.5rem; text-align:center; margin-top:15px; color:#E63946;">❤️</p>`;
                    div.style.transform = `translateY(50px)`;
                    div.style.opacity = "0";
                    gallery.appendChild(div);
                    setTimeout(() => {
                      div.style.opacity = "1";
                      div.style.transform = `translateY(0)`;
                    }, 600 + (i * 150));
                  });
                }
              }, 1500);
          }, 7000);
        }, 1500);
      };

      // IMPLEMENT RESTART LOGIC
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
          restartBtn.onclick = () => {
            // 1. Reset Engine State
            this.isRunning = false;
            this.isEnded = false;
            this.isCutscene = false;
            this.progress = 0;
            this.preciseTime = 0;
            this.lastAudioTime = 0;
            this.player.x = 200;
            this.cameraX = 0;
            
            if (this.endTimer) {
              clearTimeout(this.endTimer);
              this.endTimer = null;
            }

            // 2. Stop Audio
            const audio = document.getElementById('bgm') as HTMLAudioElement;
            if (audio) {
              audio.pause();
              audio.currentTime = 0;
            }

            // 3. Reset UI Layers
            const endScreen = document.getElementById('end-screen');
            if (endScreen) {
              endScreen.classList.remove('visible');
              endScreen.style.opacity = '';
            }
            
            const celebration = document.getElementById('celebration-content');
            if (celebration) {
              celebration.style.display = 'none';
              celebration.style.opacity = '0';
            }
            
            const gallery = document.getElementById('final-gallery');
            if (gallery) gallery.innerHTML = '';
            
            const envelopeContainer = document.getElementById('envelope-container');
            if (envelopeContainer) {
              envelopeContainer.style.display = '';
              envelopeContainer.style.opacity = '';
              envelopeContainer.style.transform = '';
            }
            
            const envelope = document.getElementById('envelope');
            if (envelope) envelope.classList.remove('open');
            
            const hint = document.querySelector('.envelope-hint') as HTMLElement;
            if (hint) hint.style.opacity = '';
            
            const cakeContainer = document.getElementById('cake-container');
            if (cakeContainer) {
              cakeContainer.style.display = '';
              cakeContainer.style.opacity = '';
            }
            
            const interactiveCake = document.getElementById('interactive-cake');
            if (interactiveCake) interactiveCake.style.transform = '';
            
            const cakeFlame = document.getElementById('cake-flame');
            if (cakeFlame) cakeFlame.classList.remove('out');
            
            const wishTerminal = document.getElementById('wish-terminal');
            if (wishTerminal) {
              wishTerminal.style.display = '';
              wishTerminal.style.opacity = '';
              wishTerminal.style.transform = '';
            }
            
            const wishInput = document.getElementById('wish-input') as HTMLInputElement;
            if (wishInput) wishInput.value = '';
            
            const cakeHint = document.getElementById('cake-hint');
            if (cakeHint) {
              cakeHint.style.display = '';
              cakeHint.innerText = "Tiup lilinnya (Bisa tiup di mic juga!) 🎂";
              cakeHint.style.color = "";
            }
            
            const giftReveal = document.getElementById('gift-reveal-container');
            if (giftReveal) {
              giftReveal.style.display = '';
              giftReveal.style.opacity = '';
            }
            
            const giftBox = document.querySelector('.gift-box');
            if (giftBox) giftBox.classList.remove('open');
            
            const specialReveal = document.getElementById('special-reveal');
            if (specialReveal) {
              specialReveal.style.display = '';
              specialReveal.style.opacity = '';
              specialReveal.style.transform = '';
              specialReveal.classList.remove('active');
            }

            // 4. Reset Canvas and show Splash
            this.canvas.style.opacity = '1';
            this.canvas.style.filter = "none";
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.draw(); // Redraw initial frame
            
            const splash = document.getElementById('splash-screen');
            if (splash) {
              splash.style.display = 'flex';
              setTimeout(() => {
                splash.style.opacity = '1';
              }, 50);
            }
          };
        }
      }
      loop() {
        this.update();
        this.draw();
        if (this.isRunning) requestAnimationFrame(() => this.loop());
      }
    }

    new Engine();

  }, [mounted]);

  if (!mounted) {
    return <div style={{ background: '#11140b', height: '100vh', width: '100vw' }} />;
  }

  return (
    <div id="game-container">
      <audio id="bgm" preload="auto">
        <source src="/audio/penjaga hati.mp3" type="audio/mpeg" />
      </audio>
      <canvas id="worldCanvas"></canvas>
      <div id="ui-layer">
        <div id="lyric-container">
          <div id="current-lyric" className="lyric-text"></div>
        </div>
      </div>
      <div id="goodbye-text">HBD Bidadariku</div>
      <div id="splash-screen">
        {/* --- Falling Particles --- */}
        <div className="particle-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="falling-p" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 4}s`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              {Math.random() > 0.5 ? '🌸' : '💖'}
            </div>
          ))}
        </div>

        {/* --- Date Stamp --- */}
        <div className="date-stamp">
          16 Mei
          <span>Special Day for You✨</span>
        </div>

        <div className="splash-heart-wrapper">
          <div className="cute-heart"></div>
        </div>
        <h1 className="splash-title">Happy Birthday Liaa</h1>
        <p className="splash-subtitle">Ini adalah sebuah animasi mengenai seekor kucing yang menyebrangi 7 laut samudra dan mendaki gunung himalaya untuk menemui sang kekasih.</p>
        
        <div className="start-btn-wrapper" style={{ position: 'relative' }}>
          <button className="start-btn btn-bouncing" id="btn-start">
            Mulai Perjalanan
            {/* --- Cat Mascot --- */}
            <span className="cat-mascot">🐱</span>
          </button>
          <div className="btn-glow"></div>
        </div>

        {/* --- Sound Hint --- */}
        <div className="sound-hint">
          Pstt... Nyalakan suaramu ya! 🎧
        </div>

        <div className="splash-footer"></div>
      </div>
      <div id="end-screen">
        {/* --- Falling Particles for End Screen --- */}
        <div className="particle-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="falling-p" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 4}s`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              {Math.random() > 0.5 ? '🌸' : '💖'}
            </div>
          ))}
        </div>
        <div id="envelope-container">
          <div className="envelope" id="envelope">
            <div className="flap"></div>
            <div className="pocket"></div>
            <div className="letter">
              <p className="letter-text">Selamat Ulang Tahun yang ke 19...</p>
            </div>
          </div>
          <p className="envelope-hint">Ketuk untuk membuka...</p>
        </div>
        <div id="cake-container">
          <div className="cake" id="interactive-cake">
            <div className="cake-plate"></div>
            <div className="cake-base">
              <div className="cake-icing"></div>
            </div>
            <div className="cake-candle"></div>
            <div className="cake-flame" id="cake-flame"></div>
            <div className="smoke"></div>
          </div>
          <div id="wish-terminal">
            <p className="wish-prompt">Tuliskan satu keinginanmu...</p>
            <input type="text" id="wish-input" placeholder="Permohonanku hari ini adalah..." maxLength={100} />
            <button id="wish-btn">Kirim Permohonan</button>
          </div>
          <p className="cake-hint" id="cake-hint">Tiup lilinnya (Bisa tiup di mic juga!) 🎂</p>
        </div>

        {/* --- GIFT BOX REVEAL --- */}
        <div id="gift-reveal-container">
          <div className="gift-box">
            <div className="gift-lid"></div>
            <div className="gift-ribbon-v"></div>
            <div className="gift-ribbon-h"></div>
          </div>
          <p className="cake-hint" style={{ marginTop: '80px' }}>Ada kejutan untukmu... (Ketuk kadonya) 🎁</p>
        </div>

        {/* --- SPECIAL MEMORY REVEAL --- */}
        <div id="special-reveal">
          <img src={encodeURI("/images/present/hadiah.jpeg")} className="special-photo" alt="Special Memory" />
          <div className="special-msg">
            Happy Birthday cantik, Semoga sehat selalu dan Semoga tambah tinggi 5 centi 😊
          </div>
        </div>

        <div id="celebration-content" style={{ display: 'none', opacity: 0, transition: 'opacity 2s ease', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h1 className="end-title">Happy Birthday</h1>
          <p className="end-message">Untuk bidadariku yang turun ke bumi 19 tahun lalu. Terima kasih telah membawa cahaya dan warna dalam hidupku. Semoga semesta mengabulkan semua mimpi yang kamu tiupkan hari ini.</p>
          <div className="gallery-container" id="final-gallery"></div>
          <button id="restart-btn" className="start-btn" style={{ marginTop: '40px', width: '250px' }}>Ulangi Perjalanan</button>
        </div>
      </div>
    </div>
  );
}
