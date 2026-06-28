/* Source: episodes/ep05/ch01/effect.js */

/* 第一章の演出。registerEffect(name, { bg, step, draw }) でエンジンに登録する。 */
(function () {

  // ── 墓標のような織布店：薄暗い店内に、ゆっくり漂う埃の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.18, vy: -0.04 - Math.random() * 0.12,
      base: 0.04 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.012,
    };
  }
  registerEffect('dust-mote', {
    bg: 'radial-gradient(ellipse at 40% 28%, rgba(150,140,120,.06) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 75%, #2a2722 0%, #1b1916 60%, #121008 100%), #0e0c08',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#cfc4a8';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep05/ch02/effect.js */

/* 第二章の演出。 */
(function () {

  // ── 賑わう市場：陽だまりに舞う、暖かな綿ぼこりと光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.3) * 0.4, vy: -0.18 - Math.random() * 0.35,
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.016,
      gold: Math.random() < 0.4,
    };
  }
  registerEffect('market-day', {
    bg: 'radial-gradient(ellipse at 50% 18%, rgba(255,225,150,.14) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #6a5230 0%, #4a3a22 55%, #322615 100%), #2a2012',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.18; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.gold ? '#f4d68a' : '#e8dcc0';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
