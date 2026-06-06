/* 第一章の演出。 */
(function () {

  // ── 放課後の教室、陰キャの定位置：窓の光に舞う、気だるいホコリ ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.4,
      vx: -0.04 + Math.random() * 0.12, vy: 0.01 + Math.random() * 0.05,
      base: 0.05 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2, freq: 0.002 + Math.random() * 0.007,
    };
  }
  registerEffect('classroom-gloom', {
    bg: 'radial-gradient(ellipse at 80% 25%, rgba(200,190,160,.08) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #3a382f 0%, #28261f 55%, #1b1a15 100%), #131210',
    step(ps, { W, H }) {
      if (ps.length < 40 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.08; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#cfc6ad';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
