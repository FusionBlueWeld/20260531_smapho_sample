/* 第十章の演出 — 雨上がりの夕暮れの庭。淡い靄(もや)と、ちらつく宵の光。 */
(function () {

  // ── 雨上がりの庭に立ちこめる、ほのかな靄 ────────────────
  function spawnHaze() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.5 + Math.random() * H * 0.5,
      r: 40 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.15,
      base: 0.03 + Math.random() * 0.045,
      phase: Math.random() * Math.PI * 2,
      freq: 0.003 + Math.random() * 0.006,
    };
  }
  function spawnSpark() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      spark: true,
      x: Math.random() * W, y: Math.random() * H * 0.8,
      r: 0.5 + Math.random() * 1.2,
      base: 0.15 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      freq: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('dusk-garden', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(180,120,90,.22) 0%, rgba(110,70,60,.1) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 45%, #221c20 0%, #16121a 60%, #0e0b12 100%), #130f16',
    step(ps, { W }) {
      while (ps.filter(p => !p.spark).length < 6) ps.push(spawnHaze());
      while (ps.filter(p => p.spark).length < 22) ps.push(spawnSpark());
      ps.forEach(p => {
        if (!p.spark) { p.x += p.vx; if (p.x < -p.r) p.x = W + p.r; if (p.x > W + p.r) p.x = -p.r; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.spark) {
        const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffe0b0';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        const a = p.base * (0.6 + 0.4 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, '#9aa0b0'); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
