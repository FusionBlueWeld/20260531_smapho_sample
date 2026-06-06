/* 第四章の演出 — テレビ売り場。並ぶ大画面の青白い光。 */
(function () {

  // ── ずらりと並んだテレビの画面光。点滅しながら静かに流れる ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 1.0 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.06,
      base: 0.08 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.04,
      col: Math.random() > 0.5 ? '#7fd0ff' : '#cfe6ff',
    };
  }
  registerEffect('tv-wall', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(110,170,230,.12) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #1c2430 0%, #141a24 55%, #0c1018 100%), #080b10',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.46) ps.push(spawn());
      ps = ps.filter(p => p.x > -20 && p.x < W + 20 && p.y > -20 && p.y < H + 20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
