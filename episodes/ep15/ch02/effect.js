/* Source: episodes/ep15/ch02/effect.js */

/* 第二章の演出 — ゾーンの覚醒。コートを切り裂く、冷たい青の疾走線。 */
(function () {

  // ── 高速で横に走る、影のような残像（スピードライン）──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: W + 40 + Math.random() * 60, y: Math.random() * H,
      len: 30 + Math.random() * 70,
      vx: -(7 + Math.random() * 6),
      a: 0.05 + Math.random() * 0.14, w: 0.6 + Math.random() * 1.2,
    };
  }
  registerEffect('zone-speed', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(80,170,230,.10) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #0c1a28 0%, #08111c 55%, #050a12 100%), #03060c',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.x > -120);
      ps.forEach(p => { p.x += p.vx; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.strokeStyle = '#7ec8f0';
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.len, p.y);
      ctx.stroke();
      ctx.restore();
    },
  });

})();
