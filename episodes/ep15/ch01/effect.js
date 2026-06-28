/* Source: episodes/ep15/ch01/effect.js */

/* 第一章の演出 — 熱気こもる体育館。汗と熱が立ちのぼる、橙色のゆらぎ。 */
(function () {

  // ── 床から立ちのぼる、汗と熱気の微粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 16 + Math.random() * 30,
      r: 0.7 + Math.random() * 1.7,
      vx: -0.08 + Math.random() * 0.16, vy: -(0.18 + Math.random() * 0.5),
      base: 0.08 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('court-heat', {
    bg: 'radial-gradient(ellipse at 50% 16%, rgba(255,190,110,.12) 0%, transparent 55%), '
      + 'linear-gradient(172deg, #2e1d10 0%, #1f140b 55%, #150d07 100%), #0d0804',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.45) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.07; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffc070';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
