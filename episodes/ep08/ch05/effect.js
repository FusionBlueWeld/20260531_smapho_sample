/* Source: episodes/ep08/ch06/effect.js */

/* 第六章の演出。 */
(function () {

  // ── 指パッチンのチート魔法：青白く爆(は)ぜる、無限(笑)の魔力火花 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vx: -0.15 + Math.random() * 0.3, vy: -0.1 + Math.random() * 0.2,
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.03 + Math.random() * 0.06,
    };
  }
  registerEffect('cheat-spark', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(80,160,255,.12) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #16243e 0%, #0d1626 55%, #070d18 100%), #050912',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.x > -20 && p.x < W + 20 && p.y > -20 && p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.15; p.y += p.vy + Math.cos(p.phase) * 0.1; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const fl = 0.25 + 0.75 * Math.abs(Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = p.base * fl;
      ctx.fillStyle = '#7ec0ff';
      ctx.shadowColor = '#4aa0ff'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
