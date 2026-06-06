/* 第二章の演出。 */
(function () {

  // ── 河原の一閃：月返しに起こる風。横へ薙ぐように流れる木の葉と緑風 ──
  function spawn() {
    const H = window.innerHeight;
    return {
      x: -15, y: Math.random() * H,
      r: 1.0 + Math.random() * 2.2,
      vx: 0.7 + Math.random() * 1.4, vy: (Math.random() - 0.5) * 0.4,
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.04,
      spin: Math.random() * Math.PI * 2, sv: (Math.random() - 0.5) * 0.2,
    };
  }
  registerEffect('wind-leaf', {
    bg: 'radial-gradient(ellipse at 50% 55%, rgba(150,180,120,.08) 0%, transparent 55%), '
      + 'linear-gradient(160deg, #2e3a2a 0%, #1f291b 55%, #161e12 100%), #121a0e',
    step(ps, { W, H }) {
      if (ps.length < 40 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.x < W + 25);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.5; p.phase += p.freq; p.spin += p.sv; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.x, p.y); ctx.rotate(p.spin);
      ctx.fillStyle = '#9ab070';
      ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.45, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
