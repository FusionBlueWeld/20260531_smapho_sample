/* 第三章の演出 — ショータイム。ネオンのように瞬く自信の光。 */
(function () {

  // ── 「ショーの時間だ」。カラフルにちかちか瞬くネオンの粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const cols = ['#ff5a7a', '#ffd23f', '#4fd0e0', '#8affa0'];
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.9 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.12, vy: -(0.02 + Math.random() * 0.08),
      base: 0.1 + Math.random() * 0.32,
      col: cols[(Math.random() * cols.length) | 0],
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.05,
    };
  }
  registerEffect('showtime-glow', {
    bg: 'radial-gradient(ellipse at 50% 36%, rgba(255,180,90,.12) 0%, transparent 56%), '
      + 'linear-gradient(165deg, #3a2418 0%, #2a1a12 55%, #1a100a 100%), #120a06',
    step(ps, { H }) {
      if (ps.length < 48 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.35 + 0.65 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 9;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
