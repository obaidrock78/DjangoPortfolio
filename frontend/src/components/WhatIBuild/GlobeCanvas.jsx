import { useRef, useEffect } from 'react';

/* ─── colour map ─────────────────────────── */
const COLORS = {
  gold:    '#D4AF5A',
  teal:    '#4EEADE',
  violet:  '#A585C4',
  indigo:  '#7B8FEE',
  emerald: '#45DE99',
};

/* ─── draw a rounded rect (canvas helper) ── */
const roundRect = (ctx, x, y, w, h, r) => {
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
};

/* ─── component ─────────────────────────── */
const GlobeCanvas = ({ pillars = [] }) => {
  const canvasRef  = useRef(null);
  const pillarsRef = useRef(pillars);
  useEffect(() => { pillarsRef.current = pillars; }, [pillars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;

    /* size to parent — honour device pixel ratio for crisp text */
    let cssW = 560, cssH = 560;
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr  = window.devicePixelRatio || 1;
      cssW = rect.width  || 560;
      cssH = rect.height || 560;
      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width  = cssW + 'px';
      canvas.style.height = cssH + 'px';
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    /* ── static particles ── */
    const makeParticles = () =>
      Array.from({ length: 55 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * Math.PI * 2,
        sp: (Math.random() * 0.15 + 0.04) * (Math.random() < 0.5 ? 1 : -1),
        alpha: Math.random() * 0.18 + 0.04,
      }));
    const particles = makeParticles();

    /* ── orbit definitions (built per-frame from pillars) ── */
    //  r      = fraction of half-dim
    //  yScale = vertical squish (depth illusion)
    //  tilt   = rotation angle of the orbit plane
    //  speed  = radians / frame
    const ORBIT_DEFS = [
      { r: 0.22, yScale: 0.38, tilt:  0.20, speed:  0.0009 },
      { r: 0.34, yScale: 0.30, tilt: -0.50, speed: -0.0007 },
      { r: 0.46, yScale: 0.42, tilt:  0.80, speed:  0.0006 },
      { r: 0.58, yScale: 0.26, tilt: -0.25, speed: -0.0005 },
      { r: 0.70, yScale: 0.36, tilt:  0.55, speed:  0.0004 },
    ];

    /* phase state — one per orbit */
    const phases = ORBIT_DEFS.map((_, i) => (i / ORBIT_DEFS.length) * Math.PI * 2);

    /* ── helpers ── */
    const orbitPoint = (cx, cy, half, def, phase) => {
      const rx   = def.r * half;
      const ry   = rx * def.yScale;
      const cosT = Math.cos(def.tilt);
      const sinT = Math.sin(def.tilt);
      const ex   = Math.cos(phase) * rx;
      const ey   = Math.sin(phase) * ry;
      return {
        x: cx + ex * cosT - ey * sinT,
        y: cy + ex * sinT + ey * cosT,
      };
    };

    /* ─── draw loop ─── */
    const draw = () => {
      const W    = cssW;
      const H    = cssH;
      const cx   = W * 0.44;   /* shift centre left — labels reach right edge naturally */
      const cy   = H / 2;
      const half = Math.min(W, H) / 2;
      const now  = performance.now() * 0.001;

      ctx.clearRect(0, 0, W, H);

      /* drifting background particles */
      for (const p of particles) {
        p.a += p.sp * 0.002;
        const px = (p.x * W + Math.cos(p.a) * 18) % W;
        const py = (p.y * H + Math.sin(p.a) * 12) % H;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,90,${p.alpha.toFixed(3)})`;
        ctx.fill();
      }

      /* central breathing core */
      const breathe = 0.85 + Math.sin(now * 0.7) * 0.15;
      const coreR   = half * 0.055 * breathe;
      [
        { stop: 0, a: 0.55 },
        { stop: 0.45, a: 0.18 },
        { stop: 1, a: 0 },
      ].reduce((g, s) => { g.addColorStop(s.stop, `rgba(212,175,90,${s.a})`); return g; },
        ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 5));
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 5);
      cg.addColorStop(0,    'rgba(212,175,90,0.55)');
      cg.addColorStop(0.45, 'rgba(212,175,90,0.14)');
      cg.addColorStop(1,    'rgba(212,175,90,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 5, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212,175,90,0.90)';
      ctx.fill();

      /* orbit ring paths + nodes */
      const pls = pillarsRef.current;
      ORBIT_DEFS.forEach((def, i) => {
        if (i >= pls.length) return;
        phases[i] += def.speed;

        const rx   = def.r * half;
        const ry   = rx * def.yScale;
        const cosT = Math.cos(def.tilt);
        const sinT = Math.sin(def.tilt);
        const col  = COLORS[pls[i].color] || '#D4AF5A';
        const label = pls[i].label.toUpperCase();

        /* draw orbit ellipse */
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(def.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = col + '28';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        /* node position */
        const ex = Math.cos(phases[i]) * rx;
        const ey = Math.sin(phases[i]) * ry;
        const nx = cx + ex * cosT - ey * sinT;
        const ny = cy + ex * sinT + ey * cosT;

        /* dashed thread from center to node */
        ctx.save();
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = col + '22';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        /* node glow */
        const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, 16);
        ng.addColorStop(0, col + 'BB');
        ng.addColorStop(1, col + '00');
        ctx.beginPath();
        ctx.arc(nx, ny, 16, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();

        /* node core dot */
        ctx.beginPath();
        ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();

        /* label pill — positioned to stay within canvas */
        ctx.font = '500 10px "DM Mono", monospace';
        const textW  = ctx.measureText(label).width;
        const pillW  = textW + 24;
        const pillH  = 22;
        const pad    = 10;   // min distance from canvas edge
        const onRight = nx + 20 + pillW < W - pad;
        const pillX  = onRight ? nx + 14 : nx - 14 - pillW;
        const pillY  = ny - pillH / 2;

        /* clamp vertically */
        const clampedPillY = Math.max(pad, Math.min(H - pad - pillH, pillY));

        /* pill background */
        roundRect(ctx, pillX, clampedPillY, pillW, pillH, 5);
        ctx.fillStyle = 'rgba(13,21,33,0.88)';
        ctx.fill();
        ctx.strokeStyle = col + '55';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        /* pill dot */
        ctx.beginPath();
        ctx.arc(pillX + 9, clampedPillY + pillH / 2, 3, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();

        /* pill text */
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'left';
        ctx.fillStyle    = 'rgba(224,228,238,0.92)';
        ctx.fillText(label, pillX + 18, clampedPillY + pillH / 2 + 0.5);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="wib-globe-canvas" />;
};

export default GlobeCanvas;
