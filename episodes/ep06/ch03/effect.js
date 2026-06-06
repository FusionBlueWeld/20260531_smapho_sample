/* 第三章の演出。 */
(function () {

  // ── 裏山の昼下がり：のどかな陽だまりに、ふわりと漂う花粉と綿毛 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.7,
      vx: (Math.random() - 0.3) * 0.3, vy: -0.04 - Math.random() * 0.12,
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('hill-nap', {
    bg: 'radial-gradient(ellipse at 50% 28%, rgba(230,210,120,.12) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #43492a 0%, #313619 55%, #23280f 100%), #1c2009',
    step(ps, { W, H }) {
      if (ps.length < 44 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.16; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#e4dca0';
      ctx.shadowColor = 'rgba(228,220,160,.5)'; ctx.shadowBlur = 3;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
