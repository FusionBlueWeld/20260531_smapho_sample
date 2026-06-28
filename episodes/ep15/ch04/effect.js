/* Source: episodes/ep15/ch04/effect.js */

/* 第四章の演出 — 逆転のブザー。極限まで加速した残像が、時を引き裂く。 */
(function () {

  // ── 最高速の疾走線。終盤の張り詰めた一瞬を切り取る ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: W + 50 + Math.random() * 90, y: Math.random() * H,
      len: 70 + Math.random() * 150,
      vx: -(15 + Math.random() * 12),
      a: 0.07 + Math.random() * 0.2, w: 0.8 + Math.random() * 1.8,
    };
  }
  registerEffect('zone-final', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(110,190,245,.15) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #0e2032 0%, #091322 55%, #050913 100%), #02050d',
    step(ps, { W, H }) {
      if (ps.length < 78 && Math.random() < 0.9) ps.push(spawn());
      ps = ps.filter(p => p.x > -200);
      ps.forEach(p => { p.x += p.vx; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.strokeStyle = '#a6def8';
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.len, p.y);
      ctx.stroke();
      ctx.restore();
    },
  });

})();
