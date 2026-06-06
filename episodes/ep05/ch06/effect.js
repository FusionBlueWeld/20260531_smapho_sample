/* 第六章の演出。 */
(function () {

  // ── 黄金の布：内側から滲み出すように、きらめき昇る金の粒（この物語の象徴） ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 8,
      r: 0.6 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.2, vy: -0.12 - Math.random() * 0.3,
      base: 0.12 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.012 + Math.random() * 0.03,
    };
  }
  registerEffect('golden-weave', {
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(245,205,110,.14) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #4a3416 0%, #321f0c 55%, #241608 100%), #1c1206',
    step(ps, { W, H }) {
      if (ps.length < 64 && Math.random() < 0.7) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.2; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const tw = 0.5 + 0.5 * Math.sin(t * p.freq + p.phase);
      ctx.save();
      ctx.globalAlpha = p.base * tw;
      ctx.fillStyle = '#f7d77e';
      ctx.shadowColor = 'rgba(247,215,126,.8)'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
