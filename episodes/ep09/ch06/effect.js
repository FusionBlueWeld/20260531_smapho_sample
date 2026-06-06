/* 第六章の演出 — 決意の夜。落ち着いた青の闇に、ひとつふたつ瞬く点。 */
(function () {

  // ── 真夜中の机辺。ごくまばらに、静かに息づく光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.4,
      vx: -0.03 + Math.random() * 0.08, vy: -(0.01 + Math.random() * 0.04),
      base: 0.07 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('resolve-night', {
    bg: 'radial-gradient(ellipse at 62% 34%, rgba(110,140,200,.1) 0%, transparent 54%), '
      + 'linear-gradient(170deg, #161b2c 0%, #0f121e 55%, #080910 100%), #060710',
    step(ps, { H }) {
      if (ps.length < 38 && Math.random() < 0.36) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.05; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#9fb4dc';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
