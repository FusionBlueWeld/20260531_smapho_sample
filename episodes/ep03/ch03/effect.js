/* 第三章の演出。 */
(function () {

  // ── 第三章：特許の壁。冷たく張りつめた空気と、ガラスに走る霜の結晶 ──
  function spawnFrost() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.4,
      drift: (Math.random() - 0.5) * 0.06, vy: (Math.random() - 0.5) * 0.05,
      base: 0.14 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('patent-frost', {
    bg: 'repeating-linear-gradient(60deg, transparent 0, transparent 58px, rgba(150,180,210,.035) 58px, rgba(150,180,210,.035) 59px), '
      + 'radial-gradient(ellipse at 50% 30%, #16202c 0%, #0e161f 60%, #070c12 100%), #060a10',
    step(ps) {
      while (ps.length < 56) ps.push(spawnFrost());
      ps.forEach(p => { p.x += p.drift; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = '#bcd6ea'; ctx.lineWidth = 0.8;
      ctx.shadowColor = '#bcd6ea'; ctx.shadowBlur = 5;
      // 小さな六花（雪の結晶）状のきらめき
      for (let i = 0; i < 3; i++) {
        const ang = p.phase + i * Math.PI / 3;
        ctx.beginPath();
        ctx.moveTo(p.x - Math.cos(ang) * p.r * 2, p.y - Math.sin(ang) * p.r * 2);
        ctx.lineTo(p.x + Math.cos(ang) * p.r * 2, p.y + Math.sin(ang) * p.r * 2);
        ctx.stroke();
      }
      ctx.restore();
    },
  });

})();
