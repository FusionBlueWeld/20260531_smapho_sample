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
