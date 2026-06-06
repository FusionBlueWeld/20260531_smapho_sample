/* 第九章の演出。 */
(function () {

  // ── 旅立ち、陽の昇る方へ：青く澄んだ朝空を、前へ前へと流れゆく光と風 ──
  function spawn() {
    const H = window.innerHeight;
    return {
      x: -15, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vx: 0.5 + Math.random() * 1.1, vy: (Math.random() - 0.5) * 0.25,
      base: 0.08 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.016,
    };
  }
  registerEffect('journey-wind', {
    bg: 'radial-gradient(ellipse at 75% 25%, rgba(255,235,180,.14) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #3a516e 0%, #2a3c54 50%, #1d2c40 100%), #16223a',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.x < W + 25);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.18; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#f3ecc8';
      ctx.shadowColor = 'rgba(243,236,200,.7)'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
