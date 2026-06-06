/* 第三章の演出 — 定理の設計図。淡い格子の上を走る幾何の光点。 */
(function () {

  // ── 方眼紙の上を、定規で引いた線のように規則正しく流れる光点 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const horiz = Math.random() > 0.5;
    return {
      horiz,
      x: horiz ? -10 : Math.random() * W,
      y: horiz ? Math.random() * H : -10,
      r: 0.7 + Math.random() * 1.2,
      v: 0.4 + Math.random() * 0.9,
      base: 0.1 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('theorem-grid', {
    bg: 'repeating-linear-gradient(0deg, rgba(150,180,255,.05) 0 1px, transparent 1px 34px), '
      + 'repeating-linear-gradient(90deg, rgba(150,180,255,.05) 0 1px, transparent 1px 34px), '
      + 'linear-gradient(165deg, #161a2c 0%, #0e1120 55%, #080a12 100%), #06070d',
    step(ps, { W, H }) {
      if (ps.length < 36 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.x < W + 20 && p.y < H + 20);
      ps.forEach(p => { if (p.horiz) p.x += p.v; else p.y += p.v; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#a7c4ff';
      ctx.shadowColor = '#a7c4ff'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
