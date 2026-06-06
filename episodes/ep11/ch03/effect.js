/* 第三章の演出 — 庭にそよぐ風と、舞い上がる花粉や小さな花びら。 */
(function () {

  // ── 陽光の庭を漂う花粉・小さな種子 ────────────────────────
  function spawnSeed() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 1 + Math.random() * 2.2,
      vx: 0.2 + Math.random() * 0.6,
      vy: -0.15 - Math.random() * 0.35,
      base: 0.2 + Math.random() * 0.3,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.012 + Math.random() * 0.022,
      warm: Math.random() > 0.5,
    };
  }
  registerEffect('garden-breeze', {
    bg: 'radial-gradient(ellipse at 30% 10%, rgba(180,230,140,.14) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 80% 20%, rgba(255,225,120,.16) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 60%, #1f2c14 0%, #14200c 62%, #0c1406 100%), #121c0a',
    step(ps, { W }) {
      if (ps.length < 34 && Math.random() < 0.5) ps.push(spawnSeed());
      ps = ps.filter(p => p.y > -12 && p.x < W + 12);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += p.vx + Math.sin(p.sway) * 0.5;
        p.y += p.vy + Math.cos(p.sway * 0.7) * 0.2;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.fillStyle = p.warm ? '#fff0b0' : '#d8f0a8';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
