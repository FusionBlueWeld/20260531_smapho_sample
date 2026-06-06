/* 第六章の演出 — 契約成立。拍手のように舞う、金色のきらめき。 */
(function () {

  // ── 大団円。ぱあっと舞い上がる金色の紙吹雪(かみふぶき)風の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.9 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.4, vy: -(0.3 + Math.random() * 0.8),
      base: 0.12 + Math.random() * 0.32,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.05,
      col: Math.random() > 0.35 ? '#ffd66a' : '#fff0c0',
      sw: 10 + Math.random() * 20,
    };
  }
  registerEffect('saved-applause', {
    bg: 'radial-gradient(ellipse at 50% 70%, rgba(255,205,110,.14) 0%, transparent 54%), '
      + 'linear-gradient(170deg, #2e2614 0%, #221c10 55%, #15110a 100%), #0f0b06',
    step(ps, { H }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      const x = p.x + Math.sin(t * p.freq + p.phase) * p.sw;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
