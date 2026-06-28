/* Source: episodes/ep09/ch01/effect.js */

/* 第一章の演出 — 真夜中の研究室。時計の青白い光と、舞う埃。 */
(function () {

  // ── 蛍光灯の下、机のまわりにゆっくり漂う埃の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.5,
      vx: -0.05 + Math.random() * 0.12, vy: 0.01 + Math.random() * 0.05,
      base: 0.05 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2, freq: 0.002 + Math.random() * 0.007,
    };
  }
  registerEffect('midnight-desk', {
    bg: 'radial-gradient(ellipse at 72% 30%, rgba(120,150,210,.1) 0%, transparent 52%), '
      + 'linear-gradient(170deg, #1a1f30 0%, #12141f 55%, #0a0b12 100%), #07080d',
    step(ps, { W, H }) {
      if (ps.length < 42 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.08; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#aebbd6';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep09/ch02/effect.js */

/* 第二章の演出 — 着想の閃き。素数の火花が暗闇に明滅する。 */
(function () {

  // ── 素数のように、ぽつぽつと不規則な間隔で灯る火花 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.1, vy: -(0.02 + Math.random() * 0.1),
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.03,
      col: Math.random() > 0.5 ? '#9ad0ff' : '#c7b0ff',
    };
  }
  registerEffect('prime-spark', {
    bg: 'radial-gradient(ellipse at 50% 36%, rgba(120,140,230,.12) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #181a30 0%, #101122 55%, #08070f 100%), #060509',
    step(ps, { H }) {
      if (ps.length < 46 && Math.random() < 0.45) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
