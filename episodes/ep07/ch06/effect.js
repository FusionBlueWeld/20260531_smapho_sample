/* 第六章の演出。 */
(function () {

  // ── 鉛色の空、生贄の刻(とき)：枯れ木を裂く風に流れる、横なぐりの塵 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: -20, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.8,
      vx: 0.4 + Math.random() * 0.9, vy: -0.05 + Math.random() * 0.1,
      base: 0.05 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('grey-offering', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(150,150,158,.05) 0%, transparent 58%), '
      + 'linear-gradient(180deg, #34343a 0%, #232328 55%, #16161a 100%), #0f0f12',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.x < W + 20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.08; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#aeaeb6';
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 1.8, p.r * 0.6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
