/* Source: episodes/ep05/ch11/effect.js */

/* 第十一章の演出。 */
(function () {

  // ── ブルージュの矜持：勝利のように、力強く立ち昇る黄金の火花 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 8,
      r: 0.7 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.24, vy: -0.2 - Math.random() * 0.5,
      base: 0.12 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.026,
    };
  }
  registerEffect('bruges-pride', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(250,210,120,.14) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #3a3050 0%, #2a2438 50%, #1a1626 100%), #14101e',
    step(ps, { W, H }) {
      if (ps.length < 66 && Math.random() < 0.72) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.2; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const tw = 0.5 + 0.5 * Math.sin(t * p.freq + p.phase);
      ctx.save();
      ctx.globalAlpha = p.base * tw;
      ctx.fillStyle = '#f8d770';
      ctx.shadowColor = 'rgba(248,215,112,.85)'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
