/* 第二章の演出。 */
(function () {

  // ── 賑わう市場：陽だまりに舞う、暖かな綿ぼこりと光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.3) * 0.4, vy: -0.18 - Math.random() * 0.35,
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.016,
      gold: Math.random() < 0.4,
    };
  }
  registerEffect('market-day', {
    bg: 'radial-gradient(ellipse at 50% 18%, rgba(255,225,150,.14) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #6a5230 0%, #4a3a22 55%, #322615 100%), #2a2012',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.18; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.gold ? '#f4d68a' : '#e8dcc0';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
