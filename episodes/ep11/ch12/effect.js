/* 第十二章の演出 — 穏やかな夜空の星と、足もとに灯る、ぬくもりの残り火。 */
(function () {

  // ── 静かに瞬く星 ────────────────────────────────────────
  function spawnStar() {
    return {
      star: true,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.75,
      r: 0.4 + Math.random() * 1.2,
      base: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      freq: 0.006 + Math.random() * 0.016,
      warm: Math.random() > 0.8,
    };
  }
  // ── 下のほうで揺れる、暖かな灯りの粒 ────────────────────
  function spawnGlow() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.7 + Math.random() * H * 0.3,
      r: 1 + Math.random() * 2,
      vy: -0.05 - Math.random() * 0.1,
      base: 0.12 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      freq: 0.01 + Math.random() * 0.018,
    };
  }
  registerEffect('night-hearthstars', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(220,140,70,.20) 0%, rgba(130,70,35,.08) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 45%, #0e0c1a 0%, #080714 60%, #040310 100%), #050410',
    step(ps, { H }) {
      while (ps.filter(p => p.star).length < 48) ps.push(spawnStar());
      while (ps.filter(p => !p.star).length < 16) ps.push(spawnGlow());
      ps.forEach(p => {
        if (!p.star) {
          p.x += Math.sin(p.phase) * 0.08; p.phase += p.freq; p.y += p.vy;
          if (p.y < H * 0.6) { p.y = H + 4; p.x = Math.random() * window.innerWidth; }
        }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.star) {
        const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = p.warm ? '#ffd8a0' : '#e8eeff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.6);
        g.addColorStop(0, '#ffcf8a'); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
