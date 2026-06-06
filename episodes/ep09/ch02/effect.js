/* 第二章の演出 — 着想の閃き。素数の火花が暗闇に明滅する。 */
(function () {

  // ── 素数のように、ぽつぽつと不規則な間隔で灯る火花 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.1, vy: -(0.02 + Math.random() * 0.1),
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.03,
      col: Math.random() > 0.5 ? '#9ad0ff' : '#c7b0ff',
    };
  }
  registerEffect('prime-spark', {
    bg: 'radial-gradient(ellipse at 50% 36%, rgba(120,140,230,.12) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #181a30 0%, #101122 55%, #08070f 100%), #060509',
    step(ps, { H }) {
      if (ps.length < 46 && Math.random() < 0.45) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
