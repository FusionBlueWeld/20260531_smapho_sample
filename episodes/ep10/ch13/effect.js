/* 終章の演出 — 夕陽とハリーの計略。茜色に沈む、静かなきらめき。 */
(function () {

  // ── 茜色の夕暮れ。ゆっくり漂う、温かくも意味深な光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.7,
      vx: -0.04 + Math.random() * 0.1, vy: -(0.01 + Math.random() * 0.05),
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.012,
      col: Math.random() > 0.4 ? '#ffb070' : '#ff8a5c',
    };
  }
  registerEffect('sunset-scheme', {
    bg: 'radial-gradient(ellipse at 78% 30%, rgba(255,150,80,.16) 0%, transparent 52%), '
      + 'linear-gradient(170deg, #3a2418 0%, #2a1810 55%, #190e0a 100%), #110806',
    step(ps, { H }) {
      if (ps.length < 40 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
