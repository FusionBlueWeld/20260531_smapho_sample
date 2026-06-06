/* 第二章の演出 — 籠の中の薄明かり。格子の影と、ただよう塵。 */
(function () {

  // ── ゆっくり漂う塵と、ときおりよぎる格子の気配 ──────────
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1,
      base: 0.08 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      freq: 0.005 + Math.random() * 0.01,
    };
  }
  registerEffect('cage-dim', {
    bg: 'repeating-linear-gradient(90deg, transparent 0 46px, rgba(150,160,170,.05) 46px 48px), '
      + 'radial-gradient(ellipse at 50% 40%, rgba(150,170,180,.05) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #15161a 0%, #0d0e11 64%, #08090b 100%), #0b0c0f',
    step(ps, { W, H }) {
      while (ps.length < 34) ps.push(spawnMote());
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -4) p.x = W + 4; if (p.x > W + 4) p.x = -4;
        if (p.y < -4) p.y = H + 4; if (p.y > H + 4) p.y = -4;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c0c8cc';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
