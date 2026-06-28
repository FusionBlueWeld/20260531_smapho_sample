/* Source: episodes/ep09/ch08/effect.js */

/* 第八章の演出 — 超曲面の開花。美しく回る星座と、淡い揺らぎ。 */
(function () {

  // ── 曲面の上に咲く特異点の星。ゆるやかに脈打ち、漂う ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.1,
      base: 0.1 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.02,
      col: Math.random() > 0.5 ? '#cfe0ff' : '#b8a6ff',
    };
  }
  registerEffect('surface-bloom', {
    bg: 'radial-gradient(ellipse at 50% 44%, rgba(140,160,255,.14) 0%, rgba(90,80,180,.06) 30%, transparent 60%), '
      + 'linear-gradient(170deg, #181a32 0%, #101126 55%, #08081a 100%), #060512',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.x > -20 && p.x < W + 20 && p.y > -20 && p.y < H + 20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 9;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
