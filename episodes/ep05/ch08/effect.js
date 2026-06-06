/* 第八章の演出。 */
(function () {

  // ── 母の手：追憶のように、やわらかく昇る暖かな金の光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 8,
      r: 0.7 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.14, vy: -0.08 - Math.random() * 0.18,
      base: 0.1 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.009,
    };
  }
  registerEffect('mothers-light', {
    bg: 'radial-gradient(ellipse at 45% 40%, rgba(250,220,150,.12) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #46352010 0%, #2e2416 55%, #1f1810 100%), #181208',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.16; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#f4dca0';
      ctx.shadowColor = 'rgba(244,220,160,.7)'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
