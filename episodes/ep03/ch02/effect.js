/* 第二章の演出。 */
(function () {

  // ── 第二章：古びた工場。薄暗い空気に漂う埃と、斜光に舞う塵 ──
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.3,
      vx: -(0.05 + Math.random() * 0.18), vy: (Math.random() - 0.5) * 0.12,
      base: 0.1 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.016,
    };
  }
  registerEffect('factory-dust', {
    bg: 'linear-gradient(100deg, rgba(200,170,110,.06) 0%, transparent 28%), '
      + 'radial-gradient(ellipse at 64% 32%, rgba(180,150,90,.07) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 60%, #1d1c18 0%, #131210 62%, #0b0a08 100%), #0a0908',
    step(ps, { W }) {
      if (ps.length < 50 && Math.random() < 0.4) ps.push(spawnMote());
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.05; p.phase += p.freq;
        if (p.x < -5) { p.x = W + 5; p.y = Math.random() * window.innerHeight; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c9b487';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
