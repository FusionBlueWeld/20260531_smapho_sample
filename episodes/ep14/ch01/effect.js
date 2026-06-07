/* 第一章の演出 — 防衛省地下の会議室。冷たい闇に漂う、青白いチリ。 */
(function () {

  // ── 薄暗い地下空間。投影光の中をゆっくり漂う埃 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.4,
      vx: -0.05 + Math.random() * 0.1, vy: -0.02 + Math.random() * 0.05,
      base: 0.05 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2, freq: 0.002 + Math.random() * 0.006,
    };
  }
  registerEffect('war-room', {
    bg: 'radial-gradient(ellipse at 50% 18%, rgba(120,160,210,.10) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #1a2230 0%, #11161f 55%, #0a0d13 100%), #070a0f',
    step(ps, { W, H }) {
      if (ps.length < 40 && Math.random() < 0.35) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.y < H + 20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.05; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#a8c4e0';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
