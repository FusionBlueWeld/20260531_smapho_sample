/* 第四章の演出。 */
(function () {

  // ── 謎の天才扱い：村人の「うおおお！」に合わせて弾(はじ)ける金の星屑(ほしくず) ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.3 + Math.random() * H * 0.7,
      r: 0.6 + Math.random() * 1.9,
      vx: -0.08 + Math.random() * 0.16, vy: -0.05 - Math.random() * 0.14,
      base: 0.1 + Math.random() * 0.26,
      twk: 0.02 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.05,
    };
  }
  registerEffect('genius-sparkle', {
    bg: 'radial-gradient(ellipse at 50% 70%, rgba(255,210,110,.12) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #4a3a18 0%, #2f2510 55%, #1d1709 100%), #141009',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.1; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      // チカチカ瞬く星
      const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = p.base * tw;
      ctx.fillStyle = '#ffd869';
      ctx.shadowColor = '#ffcf4a'; ctx.shadowBlur = 5;
      const r = p.r;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - r * 1.8); ctx.lineTo(p.x + r * 0.5, p.y - r * 0.5);
      ctx.lineTo(p.x + r * 1.8, p.y); ctx.lineTo(p.x + r * 0.5, p.y + r * 0.5);
      ctx.lineTo(p.x, p.y + r * 1.8); ctx.lineTo(p.x - r * 0.5, p.y + r * 0.5);
      ctx.lineTo(p.x - r * 1.8, p.y); ctx.lineTo(p.x - r * 0.5, p.y - r * 0.5);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    },
  });

})();
