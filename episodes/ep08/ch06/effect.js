/* Source: episodes/ep08/ch07/effect.js */

/* 第七章の演出。 */
(function () {

  // ── 村の夕暮れ、ちょっといい話風：あたたかな茜(あかね)色に漂う光の塵 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.7,
      vx: 0.03 + Math.random() * 0.16, vy: -0.02 - Math.random() * 0.08,
      base: 0.07 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.011,
    };
  }
  registerEffect('village-sunset', {
    bg: 'radial-gradient(ellipse at 28% 78%, rgba(255,170,90,.14) 0%, transparent 56%), '
      + 'linear-gradient(160deg, #5a3420 0%, #3a2114 50%, #2a1830 100%), #1a1018',
    step(ps, { W, H }) {
      if (ps.length < 46 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.1; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffc187';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
