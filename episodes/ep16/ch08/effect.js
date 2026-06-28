/* Source: episodes/ep16/ch08/effect.js */

/* 第八章の演出 — 記憶の奔流。意識を駆け上がる、白金色のデータの奔流。 */
(function () {

  // ── 下から上へ猛烈に駆け上がる、解放されたログの粒子 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const gold = Math.random() < 0.4;
    return {
      x: Math.random() * W, y: H + 14 + Math.random() * 30,
      r: 0.7 + Math.random() * 1.9,
      vy: -(3.5 + Math.random() * 4.5), vx: -0.3 + Math.random() * 0.6,
      gold,
      a: 0.1 + Math.random() * 0.26,
    };
  }
  registerEffect('overflow-surge', {
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(220,210,160,.12) 0%, transparent 56%), '
      + 'linear-gradient(180deg, #1a2230 0%, #0f1620 55%, #080c12 100%), #04070c',
    step(ps, { W, H }) {
      if (ps.length < 110 && Math.random() < 0.95) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.gold ? '#f0e4a8' : '#dff0ff';
      ctx.shadowColor = p.gold ? '#f0e4a8' : '#cfe8ff';
      ctx.shadowBlur = 3;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
