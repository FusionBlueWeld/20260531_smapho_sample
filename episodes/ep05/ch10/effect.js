/* 第十章の演出。 */
(function () {

  // ── 発つ者、残る者：夜の決意。澄んだ夜気に、静かに昇る冷たい火花 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 8,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.12, vy: -0.14 - Math.random() * 0.26,
      base: 0.08 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.016,
      warm: Math.random() < 0.35,
    };
  }
  registerEffect('night-resolve', {
    bg: 'radial-gradient(ellipse at 50% 20%, rgba(120,150,200,.07) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #14213a 0%, #0d1424 60%, #070a13 100%), #05070d',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.13; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.warm ? '#e6c478' : '#a8c4e8';
      ctx.shadowColor = p.warm ? 'rgba(230,196,120,.6)' : 'rgba(168,196,232,.6)'; ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
