/* 第四章の演出（2種）。 */
(function () {

  // ── 欠けた月の川岸：水面に砕け、ゆるやかに流れる銀の光 ──
  function spawnRiver() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: -20, y: H * 0.5 + Math.random() * H * 0.5,
      r: 0.5 + Math.random() * 1.6,
      vx: 0.15 + Math.random() * 0.4, vy: -0.02 + Math.random() * 0.04,
      base: 0.06 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('moon-river', {
    bg: 'radial-gradient(ellipse at 30% 18%, rgba(170,190,220,.10) 0%, transparent 52%), '
      + 'linear-gradient(180deg, #1a2333 0%, #10161f 55%, #0a0d14 100%), #070a0f',
    step(ps, { W, H }) {
      if (ps.length < 46 && Math.random() < 0.55) ps.push(spawnRiver());
      ps = ps.filter(p => p.x < W + 20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.05; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c0d4ec';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 響かぬ祭り：動きを失い、宙に取り残された灰色の塵 ──
  function spawnHollow() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.5,
      vy: 0.01 + Math.random() * 0.04, vx: -0.02 + Math.random() * 0.04,
      base: 0.05 + Math.random() * 0.14,
      phase: Math.random() * Math.PI * 2, freq: 0.002 + Math.random() * 0.006,
    };
  }
  registerEffect('hollow-festival', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(120,120,130,.05) 0%, transparent 60%), '
      + 'linear-gradient(180deg, #2a2a2e 0%, #1b1b1f 55%, #131316 100%), #0e0e10',
    step(ps, { W, H }) {
      if (ps.length < 34 && Math.random() < 0.35) ps.push(spawnHollow());
      ps = ps.filter(p => p.y < H + 20 && p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#9a9aa2';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
