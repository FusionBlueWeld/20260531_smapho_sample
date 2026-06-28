/* Source: episodes/ep13/ch02/effect.js */

/* 第二章の演出 — 凍てついた別れ。まばらに落ちる、冷たく青い雨。 */
(function () {

  // ── 数を絞った、冷ややかな雨。沈黙のように間遠に落ちる ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * (W + 100) - 50, y: -20 - Math.random() * H,
      len: 8 + Math.random() * 16,
      vy: 2.6 + Math.random() * 2.4, vx: -0.4 - Math.random() * 0.4,
      a: 0.06 + Math.random() * 0.14, w: 0.5 + Math.random() * 0.8,
    };
  }
  registerEffect('rain-cold', {
    bg: 'radial-gradient(ellipse at 70% 12%, rgba(130,160,195,.08) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #283140 0%, #19202a 55%, #10151c 100%), #0b0f14',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 40 && p.x > -70);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.strokeStyle = '#aebfd2';
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.vx * (p.len / p.vy), p.y - p.len);
      ctx.stroke();
      ctx.restore();
    },
  });

})();
