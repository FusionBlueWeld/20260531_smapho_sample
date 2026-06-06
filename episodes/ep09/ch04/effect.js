/* 第四章の演出 — 特異点の星座。臨界線上にそろう光の点。 */
(function () {

  // ── 一本の縦線(臨界線)のまわりに、零点のように静かに灯る星 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const onLine = Math.random() > 0.35;
    return {
      x: onLine ? W * 0.5 + (Math.random() - 0.5) * 16 : Math.random() * W,
      y: Math.random() * H,
      r: onLine ? 1.0 + Math.random() * 1.8 : 0.5 + Math.random() * 1.0,
      base: onLine ? 0.18 + Math.random() * 0.32 : 0.05 + Math.random() * 0.12,
      vy: -(0.01 + Math.random() * 0.05),
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.018,
      col: onLine ? '#bcd6ff' : '#7d86c0',
    };
  }
  registerEffect('zeta-constellation', {
    bg: 'linear-gradient(90deg, transparent 49.4%, rgba(160,190,255,.09) 50%, transparent 50.6%), '
      + 'radial-gradient(ellipse at 50% 40%, rgba(110,130,220,.1) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #141728 0%, #0d0f1e 55%, #07080f 100%), #050610',
    step(ps, { H }) {
      if (ps.length < 60 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
