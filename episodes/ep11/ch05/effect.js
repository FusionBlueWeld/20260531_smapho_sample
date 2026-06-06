/* 第五章の演出 — 朝のキッチン。明るい光と、ほかほかと立ちのぼる湯気。 */
(function () {

  // ── ゆらゆらと立ちのぼる、あたたかな湯気 ──────────────────
  function spawnSteam() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: W * (0.2 + Math.random() * 0.6), y: H + 10,
      r: 8 + Math.random() * 16,
      vy: -0.3 - Math.random() * 0.5,
      base: 0.06 + Math.random() * 0.08,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.015 + Math.random() * 0.02,
      grow: 0.04 + Math.random() * 0.05,
    };
  }
  registerEffect('morning-kitchen', {
    bg: 'radial-gradient(ellipse at 70% 8%, rgba(255,235,180,.20) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #2c2818 0%, #1e1a10 62%, #14100a 100%), #1a160e',
    step(ps) {
      if (ps.length < 16 && Math.random() < 0.3) ps.push(spawnSteam());
      ps = ps.filter(p => p.y > -p.r && p.base > 0.005);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        p.r += p.grow;
        p.base *= 0.992;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, '#fff6e2'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
