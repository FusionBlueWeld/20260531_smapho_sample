/* 第二章の演出 — 取り込んだ洗濯物から舞う、やわらかな綿ぼこり。 */
(function () {

  // ── ふわふわと宙を漂う白い綿毛・繊維 ──────────────────────
  function spawnFluff() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 1.4 + Math.random() * 3.2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.08 - Math.random() * 0.22,
      base: 0.16 + Math.random() * 0.28,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('fluff-drift', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(255,240,210,.12) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #232014 0%, #16140c 64%, #0e0c06 100%), #14110a',
    step(ps, { W, H }) {
      while (ps.length < 30) ps.push(spawnFluff());
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += p.vx + Math.sin(p.sway) * 0.4;
        p.y += p.vy;
        if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.fillStyle = '#fdf6ea';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = p.base * 0.4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 1.9, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
