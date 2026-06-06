/* 第十章の演出 — 高次元の海。色彩がとろけ合う多幸感の漂流。 */
(function () {

  // ── 音が色になる共感覚。虹色の粒がゆっくりと漂い、明滅する ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 1.0 + Math.random() * 2.6,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.14,
      base: 0.08 + Math.random() * 0.3,
      hue: Math.random() * 360,
      hueV: -0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.02,
    };
  }
  registerEffect('hyperdrift', {
    bg: 'radial-gradient(ellipse at 30% 30%, rgba(150,90,200,.12) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 72% 66%, rgba(80,150,200,.12) 0%, transparent 52%), '
      + 'linear-gradient(150deg, #1c1438 0%, #121030 45%, #0a0820 100%), #07061a',
    step(ps, { W, H }) {
      if (ps.length < 56 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.x > -30 && p.x < W + 30 && p.y > -30 && p.y < H + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.hue += p.hueV; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      const col = `hsl(${(p.hue % 360 + 360) % 360}, 75%, 70%)`;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = col;
      ctx.shadowColor = col; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
