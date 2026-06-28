/* Source: episodes/ep05/ch03/effect.js */

/* 第三章の演出。 */
(function () {

  // ── 嵐のような娘：織機から舞い上がる、勢いよく渦巻く糸くず ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const fromLeft = Math.random() < 0.5;
    return {
      x: fromLeft ? -15 : W + 15, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.5,
      vx: (fromLeft ? 1 : -1) * (0.5 + Math.random() * 1.0),
      vy: (Math.random() - 0.5) * 0.5,
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.04,
      swirl: 0.3 + Math.random() * 0.5,
    };
  }
  registerEffect('loom-lint', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(210,170,110,.08) 0%, transparent 55%), '
      + 'linear-gradient(160deg, #4a3826 0%, #322517 60%, #241a0f 100%), #1e160d',
    step(ps, { W, H }) {
      if (ps.length < 60 && Math.random() < 0.7) ps.push(spawn());
      ps = ps.filter(p => p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * p.swirl; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = '#e0cba0';
      ctx.lineWidth = p.r;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
      ctx.stroke();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep05/ch04/effect.js */

/* 第四章の演出。 */
(function () {

  // ── 断ち切られた糸：絶望のように、冷たく降り落ちる灰青の粒 ──
  function spawn() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -10,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.1, vy: 0.4 + Math.random() * 0.7,
      base: 0.06 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('cold-letter', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(120,140,160,.05) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #1c2128 0%, #141820 60%, #0c0e13 100%), #0a0c10',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.1; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#9fb0c4';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
