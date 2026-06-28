/* Source: episodes/ep10/ch01/effect.js */

/* 第一章の演出 — 朝の量販店。ガラス越しの陽光に舞う、明るいホコリ。 */
(function () {

  // ── 開店前のフロア。差し込む朝陽の中をきらきら漂うチリ ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      vx: -0.06 + Math.random() * 0.16, vy: 0.01 + Math.random() * 0.05,
      base: 0.08 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.003 + Math.random() * 0.008,
    };
  }
  registerEffect('store-morning', {
    bg: 'radial-gradient(ellipse at 22% 12%, rgba(255,235,170,.16) 0%, transparent 50%), '
      + 'linear-gradient(165deg, #3a3322 0%, #2a2618 55%, #1c1a12 100%), #141008',
    step(ps, { W, H }) {
      if (ps.length < 46 && Math.random() < 0.42) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.07; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffe9b0';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep10/ch02/effect.js */

/* 第二章の演出 — 店長の視線。スポットライトのような淡い光輪。 */
(function () {

  // ── 舞台を見守る視線。ゆっくり上る、落ち着いた光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.7 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.08, vy: -(0.05 + Math.random() * 0.12),
      base: 0.07 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('spotlight-grin', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(255,225,150,.14) 0%, transparent 44%), '
      + 'linear-gradient(170deg, #2d2818 0%, #211d12 55%, #15120b 100%), #0f0c06',
    step(ps, { H }) {
      if (ps.length < 36 && Math.random() < 0.36) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#f6d98a';
      ctx.shadowColor = '#f6d98a'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
