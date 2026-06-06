/* 第二章の演出。 */
(function () {

  // ── 土砂降りの帰り道、そして暗転：斜めに流れ落ちる雨脚 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * (W + 120) - 60, y: -20 - Math.random() * 40,
      len: 8 + Math.random() * 18,
      vx: 1.1 + Math.random() * 0.8, vy: 7 + Math.random() * 6,
      base: 0.08 + Math.random() * 0.18,
    };
  }
  registerEffect('rainy-doom', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(150,160,180,.06) 0%, transparent 60%), '
      + 'linear-gradient(180deg, #232831 0%, #161a20 55%, #0d1014 100%), #090b0e',
    step(ps, { W, H }) {
      if (ps.length < 70 && Math.random() < 0.85) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 30 && p.x < W + 60);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.strokeStyle = '#aebccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * (p.len / p.vy), p.y - p.len);
      ctx.stroke();
      ctx.restore();
    },
  });

})();
