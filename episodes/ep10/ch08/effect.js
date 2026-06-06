/* 第八章の演出 — コーヒー大噴水。茶色いしぶきが噴き上がり降りそそぐ。 */
(function () {

  // ── 噴き上がっては落ちてくる、熱々コーヒーのしぶき ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: W * (0.42 + Math.random() * 0.16),
      y: H * 0.62,
      r: 1.0 + Math.random() * 2.4,
      vx: (Math.random() - 0.5) * 3.2,
      vy: -(3 + Math.random() * 4),
      g: 0.12 + Math.random() * 0.08,
      base: 0.16 + Math.random() * 0.34,
      col: Math.random() > 0.3 ? '#7a4a28' : '#a06a3c',
    };
  }
  registerEffect('coffee-geyser', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(150,90,50,.14) 0%, transparent 52%), '
      + 'linear-gradient(170deg, #2a1c12 0%, #1f140d 55%, #140d08 100%), #0e0805',
    step(ps, { W, H }) {
      if (ps.length < 70 && Math.random() < 0.8) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.vy += p.g; p.x += p.vx; p.y += p.vy; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.fillStyle = p.col;
      ctx.shadowColor = '#5a3418'; ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
