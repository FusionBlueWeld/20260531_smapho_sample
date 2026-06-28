/* Source: episodes/ep05/ch12/effect.js */

/* 第十二章の演出。 */
(function () {

  // ── 織りは、続く：茜色の夕暮れに、穏やかに漂う金色の光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.9,
      vx: 0.06 + Math.random() * 0.22, vy: -0.05 - Math.random() * 0.12,
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('golden-dusk', {
    bg: 'radial-gradient(ellipse at 70% 32%, rgba(255,200,120,.16) 0%, transparent 55%), '
      + 'linear-gradient(160deg, #5a3420 0%, #3e2416 55%, #281609 100%), #1f1208',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.x < W + 20 && p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.1; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#f6cf86';
      ctx.shadowColor = 'rgba(246,207,134,.7)'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
