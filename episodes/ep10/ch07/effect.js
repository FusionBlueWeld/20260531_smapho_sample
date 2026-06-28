/* Source: episodes/ep10/ch10/effect.js */

/* 第十章の演出 — スクーター売り場。横に軽快に流れる光のライン。 */
(function () {

  // ── 颯爽(さっそう)としたスピード感。横切るように走る光の点 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const dir = Math.random() > 0.5 ? 1 : -1;
    return {
      dir,
      x: dir > 0 ? -10 : W + 10,
      y: Math.random() * H,
      r: 0.8 + Math.random() * 1.6,
      v: (1.0 + Math.random() * 2.2) * dir,
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.04,
      col: Math.random() > 0.5 ? '#7fe0c0' : '#9ad0ff',
    };
  }
  registerEffect('scooter-zone', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(110,200,180,.1) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #18261f 0%, #111c17 55%, #0a120e 100%), #070d0a',
    step(ps, { W }) {
      if (ps.length < 40 && Math.random() < 0.42) ps.push(spawn());
      ps = ps.filter(p => p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.v; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 2.4, p.r, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep10/ch11/effect.js */

/* 第十一章の演出 — 缶詰の山が崩壊。転がり弾ける缶のような粒。 */
(function () {

  // ── ガッシャーン！ 四方八方へ転がり跳ねる缶のかけら ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const cols = ['#e07a4a', '#d6c060', '#cf5a48', '#e0a850'];
    return {
      x: W * (0.4 + Math.random() * 0.2), y: H * 0.5,
      r: 1.2 + Math.random() * 2.6,
      vx: (Math.random() - 0.5) * 5,
      vy: -(1 + Math.random() * 3),
      g: 0.14 + Math.random() * 0.08,
      base: 0.18 + Math.random() * 0.34,
      col: cols[(Math.random() * cols.length) | 0],
      spin: Math.random() * Math.PI, sv: (Math.random() - 0.5) * 0.4,
    };
  }
  registerEffect('can-avalanche', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(210,140,80,.12) 0%, transparent 54%), '
      + 'linear-gradient(170deg, #2a2014 0%, #1f160d 55%, #140d08 100%), #0e0805',
    step(ps, { W, H }) {
      if (ps.length < 60 && Math.random() < 0.7) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.vy += p.g; p.x += p.vx; p.y += p.vy; p.spin += p.sv; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.translate(p.x, p.y); ctx.rotate(p.spin);
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 5;
      ctx.fillRect(-p.r, -p.r * 1.5, p.r * 2, p.r * 3);
      ctx.restore();
    },
  });

})();
