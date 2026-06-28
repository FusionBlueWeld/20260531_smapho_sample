/* Source: episodes/ep14/ch06/effect.js */

/* 第六章の演出 — 帰還のあと。静かな夜空に瞬く星と、消えゆく光の余韻。 */
(function () {

  // ── 宇宙船が去ったあとの夜空。ゆっくり瞬く星々 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H * 0.85,
      r: 0.5 + Math.random() * 1.4,
      base: 0.12 + Math.random() * 0.3,
      drift: -0.01 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2, freq: 0.003 + Math.random() * 0.009,
    };
  }
  registerEffect('night-afterglow', {
    bg: 'radial-gradient(ellipse at 60% 20%, rgba(120,170,220,.10) 0%, transparent 55%), '
      + 'linear-gradient(175deg, #0f1828 0%, #0a111c 55%, #060a12 100%), #04070d',
    step(ps, { W, H }) {
      if (ps.length < 64 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.x > -10 && p.x < W + 10);
      ps.forEach(p => { p.x += p.drift; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.3 + 0.7 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      ctx.fillStyle = '#dce8f6';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
