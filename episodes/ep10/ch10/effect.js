/* 第十章の演出 — スクーター売り場。横に軽快に流れる光のライン。 */
(function () {

  // ── 颯爽(さっそう)としたスピード感。横切るように走る光の点 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const dir = Math.random() > 0.5 ? 1 : -1;
    return {
      dir,
      x: dir > 0 ? -10 : W + 10,
      y: Math.random() * H,
      r: 0.8 + Math.random() * 1.6,
      v: (1.0 + Math.random() * 2.2) * dir,
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.04,
      col: Math.random() > 0.5 ? '#7fe0c0' : '#9ad0ff',
    };
  }
  registerEffect('scooter-zone', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(110,200,180,.1) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #18261f 0%, #111c17 55%, #0a120e 100%), #070d0a',
    step(ps, { W }) {
      if (ps.length < 40 && Math.random() < 0.42) ps.push(spawn());
      ps = ps.filter(p => p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.v; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 2.4, p.r, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
