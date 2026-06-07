/* 第三章の演出 — 川辺に激しさを増す雨。水面に生まれては消える波紋。 */
(function () {

  // ── 強く降りしきる雨と、ときおり水面に広がる波紋 ──
  function spawnRain() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      kind: 'rain',
      x: Math.random() * (W + 140) - 70, y: -20 - Math.random() * H,
      len: 12 + Math.random() * 24,
      vy: 4.2 + Math.random() * 3.6, vx: -0.9 - Math.random() * 0.6,
      a: 0.09 + Math.random() * 0.2, w: 0.6 + Math.random() * 1.0,
    };
  }
  function spawnRipple() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      kind: 'ripple',
      x: Math.random() * W, y: H * 0.55 + Math.random() * H * 0.45,
      r: 1, vr: 0.5 + Math.random() * 0.6, a: 0.22 + Math.random() * 0.12,
    };
  }
  registerEffect('rain-seine', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(120,150,185,.12) 0%, transparent 60%), '
      + 'linear-gradient(170deg, #2a3442 0%, #1a212c 50%, #11161e 100%), #0a0e13',
    step(ps, { W, H }) {
      if (ps.length < 120 && Math.random() < 0.95) ps.push(spawnRain());
      if (Math.random() < 0.10) ps.push(spawnRipple());
      ps = ps.filter(p =>
        p.kind === 'ripple' ? p.a > 0.01 : (p.y < H + 40 && p.x > -90));
      ps.forEach(p => {
        if (p.kind === 'ripple') { p.r += p.vr; p.a *= 0.965; }
        else { p.x += p.vx; p.y += p.vy; }
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      if (p.kind === 'ripple') {
        ctx.globalAlpha = p.a;
        ctx.strokeStyle = '#9fb4cb';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.globalAlpha = p.a;
        ctx.strokeStyle = '#bcccdc';
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.vx * (p.len / p.vy), p.y - p.len);
        ctx.stroke();
      }
      ctx.restore();
    },
  });

})();
