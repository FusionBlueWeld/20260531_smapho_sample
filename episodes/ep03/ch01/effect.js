/* Source: episodes/ep03/ch01/effect.js */

/* 第一章の演出。registerEffect(name, { bg, step, draw }) でエンジンに登録する。 */
(function () {

  // ── 第一章：ガラスの聖域。降りそそぐ光の粒子と、青白い装置の燐光 ──
  function spawnGlow() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H * 0.7,
      r: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.15, vy: 0.12 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.02,
      base: 0.18 + Math.random() * 0.4, gold: Math.random() > 0.55,
    };
  }
  registerEffect('sanctum-glass', {
    bg: 'linear-gradient(115deg, rgba(180,210,240,.05) 0%, transparent 35%, rgba(150,200,240,.04) 70%, transparent 100%), '
      + 'radial-gradient(ellipse at 50% 18%, rgba(232,200,110,.10) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #14233a 0%, #0d1a2c 60%, #070e1a 100%), #060b15',
    step(ps, { H }) {
      if (ps.length < 64 && Math.random() < 0.5) ps.push(spawnGlow());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.gold ? '#e8d28a' : '#a8d4f0';
      ctx.shadowColor = p.gold ? '#e8d28a' : '#a8d4f0'; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep03/ch02/effect.js */

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
