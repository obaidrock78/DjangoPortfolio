import { useRef, useEffect } from 'react';

/* ─── helpers ──────────────────────────────────────────────── */

// Spherical → cartesian
const toXYZ = (lat, lon) => ({
  x: Math.cos(lat) * Math.cos(lon),
  y: Math.sin(lat),
  z: Math.cos(lat) * Math.sin(lon),
});

// SLERP on unit sphere → lat/lon at t
const slerpLatLon = (() => {
  const slerp = (p1, p2, t) => {
    const dot = Math.max(-1, Math.min(1, p1.x*p2.x + p1.y*p2.y + p1.z*p2.z));
    const omega = Math.acos(dot);
    if (omega < 1e-6) return { ...p1 };
    const s = 1 / Math.sin(omega);
    const a = Math.sin((1 - t) * omega) * s;
    const b = Math.sin(t * omega) * s;
    return { x: a*p1.x + b*p2.x, y: a*p1.y + b*p2.y, z: a*p1.z + b*p2.z };
  };
  return (c1, c2, t) => {
    const p = slerp(toXYZ(c1.lat, c1.lon), toXYZ(c2.lat, c2.lon), t);
    return { lat: Math.asin(Math.max(-1, Math.min(1, p.y))), lon: Math.atan2(p.z, p.x) };
  };
})();

// Orthographic project lat/lon → screen (with Y-axis rotation)
const project = (lat, lon, rot, cx, cy, R) => {
  const x3 = Math.cos(lat) * Math.sin(lon + rot);
  const y3 = Math.sin(lat);
  const z3 = Math.cos(lat) * Math.cos(lon + rot);
  return { x: cx + x3 * R, y: cy - y3 * R, z: z3, vis: z3 > -0.05 };
};

/* ─── static data ───────────────────────────────────────────── */

// Major world cities (lat/lon degrees → radians)
const CITIES_DEG = [
  { label: 'New York',   lat:  40.7, lon:  -74.0 },
  { label: 'London',     lat:  51.5, lon:   -0.1 },
  { label: 'Tokyo',      lat:  35.7, lon:  139.7 },
  { label: 'Singapore',  lat:   1.3, lon:  103.8 },
  { label: 'Paris',      lat:  48.8, lon:    2.4 },
  { label: 'Dubai',      lat:  25.2, lon:   55.3 },
  { label: 'Sydney',     lat: -33.9, lon:  151.2 },
  { label: 'São Paulo',  lat: -23.5, lon:  -46.6 },
  { label: 'Delhi',      lat:  28.6, lon:   77.2 },
  { label: 'Shanghai',   lat:  31.2, lon:  121.5 },
  { label: 'Lagos',      lat:   6.5, lon:    3.4 },
  { label: 'Moscow',     lat:  55.7, lon:   37.6 },
].map(c => ({ ...c, lat: c.lat * Math.PI / 180, lon: c.lon * Math.PI / 180 }));

const EDGES = [
  [0,1],[1,2],[2,3],[3,5],[5,8],[8,9],
  [0,7],[1,4],[4,11],[2,6],[3,9],[6,3],
  [10,1],[10,5],[0,4],[11,2],[7,10],[5,6],
];

// Orbit rings: tilt (rad), initial phase, angular speed, radial scale, rgba-prefix
const RINGS = [
  { tilt: 0.45,  phase: 0,    speed:  0.0045, rScale: 1.30, col: '201,166,85',  sz: 3.5 },
  { tilt: -0.70, phase: 2.1,  speed: -0.0032, rScale: 1.55, col: '69,227,211',  sz: 3.0 },
  { tilt: 1.15,  phase: 4.2,  speed:  0.0055, rScale: 1.78, col: '147,117,181', sz: 2.5 },
];

/* ─── component ─────────────────────────────────────────────── */

const GlobeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    /* size canvas to its CSS container */
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width  = rect.width  || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    /* ── globe dot lattice ── */
    const globeDots = [];
    for (let latDeg = -80; latDeg <= 80; latDeg += 10) {
      const latRad = latDeg * Math.PI / 180;
      const count  = Math.max(4, Math.round(36 * Math.cos(latRad)));
      for (let i = 0; i < count; i++) {
        globeDots.push({ lat: latRad, lon: (i / count) * 2 * Math.PI - Math.PI });
      }
    }

    /* ── packets along each edge ── */
    const packets = EDGES.flatMap(([a, b]) =>
      Array.from({ length: 2 }, (_, k) => ({
        from: a, to: b,
        t:     (k * 0.5 + Math.random() * 0.4) % 1,
        speed: 0.0018 + Math.random() * 0.0022,
        trail: [],
      }))
    );

    /* ── ring state (mutable) ── */
    const ringState = RINGS.map(r => ({ ...r }));

    let rot = 0;

    /* ─────────────── draw ─────────────── */
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W * 0.5;
      const cy = H * 0.5;
      const R  = Math.min(W, H) * 0.32;

      ctx.clearRect(0, 0, W, H);
      rot += 0.0025;

      /* ── globe dot lattice ── */
      for (const d of globeDots) {
        const p = project(d.lat, d.lon, rot, cx, cy, R);
        if (!p.vis) continue;
        const alpha = 0.05 + p.z * 0.22;
        const size  = 0.6 + p.z * 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,166,85,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      /* ── latitude / longitude wire rings (very subtle) ── */
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        const latRad = latDeg * Math.PI / 180;
        const rr   = R * Math.cos(latRad);
        const yOff = -R * Math.sin(latRad);
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOff, rr, rr * 0.12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,166,85,0.06)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      /* ── great-circle arcs ── */
      for (const [a, b] of EDGES) {
        const c1 = CITIES_DEG[a];
        const c2 = CITIES_DEG[b];
        const STEPS = 50;
        ctx.beginPath();
        let penDown = false;
        for (let i = 0; i <= STEPS; i++) {
          const mid = slerpLatLon(c1, c2, i / STEPS);
          const p   = project(mid.lat, mid.lon, rot, cx, cy, R);
          if (!p.vis) { penDown = false; continue; }
          if (!penDown) { ctx.moveTo(p.x, p.y); penDown = true; }
          else            ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(69,227,211,0.10)';
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }

      /* ── city nodes ── */
      for (const c of CITIES_DEG) {
        const p = project(c.lat, c.lon, rot, cx, cy, R);
        if (!p.vis) continue;
        const alpha = 0.35 + p.z * 0.55;

        // glow halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        g.addColorStop(0, `rgba(69,227,211,${(alpha * 0.55).toFixed(3)})`);
        g.addColorStop(1, 'rgba(69,227,211,0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();

        // core
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(69,227,211,${alpha.toFixed(3)})`; ctx.fill();
      }

      /* ── packets + trails ── */
      for (const pkt of packets) {
        pkt.t += pkt.speed;
        if (pkt.t > 1) pkt.t -= 1;

        const c1  = CITIES_DEG[pkt.from];
        const c2  = CITIES_DEG[pkt.to];
        const pos = slerpLatLon(c1, c2, pkt.t);
        const p   = project(pos.lat, pos.lon, rot, cx, cy, R);

        // record trail
        pkt.trail.unshift({ x: p.x, y: p.y, vis: p.vis });
        if (pkt.trail.length > 18) pkt.trail.pop();

        if (!p.vis) continue;

        // draw trail
        for (let i = 1; i < pkt.trail.length; i++) {
          const prev = pkt.trail[i];
          if (!prev.vis) break;
          const a = (1 - i / pkt.trail.length) * 0.55;
          ctx.beginPath();
          ctx.moveTo(pkt.trail[i - 1].x, pkt.trail[i - 1].y);
          ctx.lineTo(prev.x, prev.y);
          ctx.strokeStyle = `rgba(201,166,85,${a.toFixed(3)})`;
          ctx.lineWidth = 1.5 - i * 0.07;
          ctx.stroke();
        }

        // glow
        const gg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
        gg.addColorStop(0, 'rgba(201,166,85,0.90)');
        gg.addColorStop(1, 'rgba(201,166,85,0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = gg; ctx.fill();

        // core dot
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#E8C97A'; ctx.fill();
      }

      /* ── orbit rings + satellites ── */
      for (const ring of ringState) {
        ring.phase += ring.speed;
        const rx = R * ring.rScale;
        const ry = rx * 0.28;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt * 0.4);

        // ring ellipse
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.col},0.09)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // satellite position on ellipse
        const sx = Math.cos(ring.phase) * rx;
        const sy = Math.sin(ring.phase) * ry;

        // glow halo
        const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
        sg.addColorStop(0, `rgba(${ring.col},0.65)`);
        sg.addColorStop(1, `rgba(${ring.col},0)`);
        ctx.beginPath(); ctx.arc(sx, sy, 12, 0, Math.PI * 2);
        ctx.fillStyle = sg; ctx.fill();

        // satellite core
        ctx.beginPath(); ctx.arc(sx, sy, ring.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ring.col},1)`; ctx.fill();

        // short comet tail
        const tailLen = 5;
        for (let k = 1; k <= tailLen; k++) {
          const tp = ring.phase - ring.speed * k * 4;
          const tx = Math.cos(tp) * rx;
          const ty = Math.sin(tp) * ry;
          ctx.beginPath(); ctx.arc(tx, ty, ring.sz * (1 - k / (tailLen + 1)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ring.col},${((tailLen + 1 - k) / (tailLen + 1) * 0.45).toFixed(3)})`;
          ctx.fill();
        }

        ctx.restore();
      }

      /* ── soft radial vignette to blend with section bg ── */
      const vig = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.9);
      vig.addColorStop(0, 'rgba(6,11,20,0)');
      vig.addColorStop(1, 'rgba(6,11,20,0.88)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="wib-globe-canvas" />;
};

export default GlobeCanvas;
