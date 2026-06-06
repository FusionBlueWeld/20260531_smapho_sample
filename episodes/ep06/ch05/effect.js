/* 第五章の演出。 */
(function () {

  // ── 修羅：狂気の斬撃。視界を斜めに走る、赤い血飛沫と剣閃 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H * 0.6,
      r: 0.8 + Math.random() * 2.0,
      vx: -1.2 - Math.random() * 1.8, vy: 0.8 + Math.random() * 1.6,
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.03 + Math.random() * 0.05,
      life: 0,
    };
  }
  registerEffect('frenzy', {
    bg: 'radial-gradient(ellipse at 50% 45%, rgba(170,20,20,.16) 0%, transparent 50%), '
      + 'linear-gradient(160deg, #2e1212 0%, #1c0a0a 55%, #100505 100%), #0a0303',
    step(ps, { W, H }) {
      if (ps.length < 56 && Math.random() < 0.75) ps.push(spawn());
      ps = ps.filter(p => p.x > -30 && p.y < H + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; p.life++; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = '#c83232';
      ctx.lineWidth = p.r;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 2.5, p.y - p.vy * 2.5);
      ctx.stroke();
      ctx.restore();
    },
  });

})();
