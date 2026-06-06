/* 第三章の演出。 */
(function () {

  // ── ザ・異世界の森：木洩(こも)れ日にきらめく、緑がかった光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vx: -0.05 + Math.random() * 0.14, vy: -0.02 - Math.random() * 0.08,
      base: 0.08 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.013,
    };
  }
  registerEffect('isekai-forest', {
    bg: 'radial-gradient(ellipse at 65% 22%, rgba(180,230,150,.12) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #2c4424 0%, #1a2c16 55%, #11200d 100%), #0c1709',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#bce89a';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
