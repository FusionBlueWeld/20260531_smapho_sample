/* 第五章の演出。 */
(function () {

  // ── 修道院の静寂：燭台と香煙のように、ゆらめき昇る暖かな小さな光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 8,
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.12, vy: -0.1 - Math.random() * 0.2,
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('cloister-hush', {
    bg: 'radial-gradient(ellipse at 50% 80%, rgba(230,190,110,.07) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 35%, #20232b 0%, #161922 60%, #0d0f15 100%), #0a0c11',
    step(ps, { W, H }) {
      if (ps.length < 44 && Math.random() < 0.45) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.14; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#e6c478';
      ctx.shadowColor = 'rgba(230,196,120,.6)'; ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
