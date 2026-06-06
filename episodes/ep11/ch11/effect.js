/* 第十一章の演出 — 冷える夜の、あたたかな炉ばたのような、ほのかなぬくもり。 */
(function () {

  // ── 暖色の光がやわらかく明滅する、ぬくもりの粒 ────────────
  function spawnEmber() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.4 + Math.random() * H * 0.6,
      r: 1 + Math.random() * 2.4,
      vy: -0.08 - Math.random() * 0.16,
      vx: (Math.random() - 0.5) * 0.12,
      base: 0.14 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2,
      freq: 0.008 + Math.random() * 0.016,
    };
  }
  registerEffect('hearth-warm', {
    bg: 'radial-gradient(ellipse at 50% 90%, rgba(230,140,70,.20) 0%, rgba(150,80,40,.08) 36%, transparent 62%), '
      + 'radial-gradient(ellipse at 50% 50%, #221a12 0%, #15100a 62%, #0d0906 100%), #120d08',
    step(ps, { H }) {
      while (ps.length < 30) ps.push(spawnEmber());
      ps.forEach(p => {
        p.phase += p.freq;
        p.x += p.vx + Math.sin(p.phase) * 0.1;
        p.y += p.vy;
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * window.innerWidth; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.4);
      g.addColorStop(0, '#ffcf8a'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
