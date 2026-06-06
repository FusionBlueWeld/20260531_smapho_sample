/* 第二章の演出 — 店長の視線。スポットライトのような淡い光輪。 */
(function () {

  // ── 舞台を見守る視線。ゆっくり上る、落ち着いた光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.7 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.08, vy: -(0.05 + Math.random() * 0.12),
      base: 0.07 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('spotlight-grin', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(255,225,150,.14) 0%, transparent 44%), '
      + 'linear-gradient(170deg, #2d2818 0%, #211d12 55%, #15120b 100%), #0f0c06',
    step(ps, { H }) {
      if (ps.length < 36 && Math.random() < 0.36) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#f6d98a';
      ctx.shadowColor = '#f6d98a'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
