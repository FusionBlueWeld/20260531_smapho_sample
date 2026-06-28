/* Source: episodes/ep16/ch09/effect.js */

/* 第一章の演出 — 深夜のファストフード店。冷たい蛍光灯に漂う、無音の塵。 */
(function () {

  // ── 漂白されたような白い光の下、ゆっくり漂う微粒子 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.3,
      vx: -0.04 + Math.random() * 0.08, vy: -0.03 + Math.random() * 0.06,
      base: 0.05 + Math.random() * 0.14,
      phase: Math.random() * Math.PI * 2, freq: 0.002 + Math.random() * 0.005,
    };
  }
  registerEffect('midnight-diner', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(170,210,210,.10) 0%, transparent 55%), '
      + 'linear-gradient(172deg, #16242a 0%, #0e1a1f 55%, #0a1216 100%), #060c10',
    step(ps, { W, H }) {
      if (ps.length < 38 && Math.random() < 0.32) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.y < H + 20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.04; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#bfe0de';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
