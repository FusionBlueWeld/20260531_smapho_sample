/* 第三章の演出。 */
(function () {

  // ── 第三章の１：被災地。更地に漂う細かな塵 ────────────────
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.3,
      vx: (Math.random() - 0.5) * 0.18, vy: -(0.05 + Math.random() * 0.18),
      base: 0.14 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.014,
    };
  }
  registerEffect('ruins-dust', {
    bg: 'radial-gradient(ellipse at 50% 18%, rgba(200,170,120,.12) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 60%, #2a2620 0%, #16130d 62%, #0c0a06 100%), #100d08',
    step(ps, { W, H }) {
      while (ps.length < 48) ps.push(spawnMote());
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) p.y = H + 5;
        if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a; ctx.fillStyle = '#d8c49a';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第三章の２：優しき団長。揺らめく蝋燭の光 ──────────────
  function spawnFlame() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: W * (0.1 + Math.random() * 0.8), y: H * (0.3 + Math.random() * 0.6),
      r: 8 + Math.random() * 16,
      base: 0.05 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2, freq: 0.03 + Math.random() * 0.05,
    };
  }
  registerEffect('candle-grief', {
    bg: 'radial-gradient(ellipse at 50% 70%, rgba(220,140,50,.16) 0%, rgba(120,60,18,.08) 32%, transparent 58%), '
      + 'radial-gradient(ellipse at 50% 46%, #1c140c 0%, #100a06 62%, #080503 100%), #0a0604',
    step(ps) {
      while (ps.length < 12) ps.push(spawnFlame());
      return ps;
    },
    draw(ctx, p, { t }) {
      const flick = 0.6 + 0.4 * Math.sin(t * p.freq + p.phase) + 0.1 * Math.sin(t * p.freq * 2.7);
      const a = p.base * flick;
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, '#ffcf80'); g.addColorStop(0.5, 'rgba(230,140,50,.5)'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第三章の３：裏の顔。暗く昇る赤い燠火 ──────────────────
  function spawnEmber() {
    return {
      x: Math.random() * window.innerWidth, y: window.innerHeight + 8,
      r: 0.7 + Math.random() * 1.6,
      vy: -(0.3 + Math.random() * 0.7), vx: (Math.random() - 0.5) * 0.3,
      base: 0.25 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.04,
    };
  }
  registerEffect('cult-embers', {
    bg: 'radial-gradient(ellipse at 50% 104%, rgba(170,30,25,.30) 0%, rgba(80,12,12,.14) 36%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 42%, #1c0c0c 0%, #0e0606 62%, #060303 100%), #080404',
    step(ps) {
      if (ps.length < 46 && Math.random() < 0.3) ps.push(spawnEmber());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.02 + p.phase) * 0.4; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#e8502c'; ctx.shadowColor = '#ff5530'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
