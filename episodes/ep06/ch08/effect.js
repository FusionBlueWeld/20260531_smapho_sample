/* 第八章の演出。 */
(function () {

  // ── 神棚の前、夜明け：闇の中を、静かに昇る決意の小さな光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 8,
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.1, vy: -0.08 - Math.random() * 0.18,
      base: 0.07 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('dawn-vow', {
    bg: 'radial-gradient(ellipse at 50% 22%, rgba(220,200,150,.10) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #2a2a2e 0%, #1a1a20 55%, #101014 100%), #0b0b0f',
    step(ps, { W, H }) {
      if (ps.length < 44 && Math.random() < 0.48) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#e0ce9c';
      ctx.shadowColor = 'rgba(224,206,156,.6)'; ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
