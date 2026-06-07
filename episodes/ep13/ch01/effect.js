/* 第一章の演出 — カフェの窓を流れる氷雨。灰色のヴェールに包まれた街。 */
(function () {

  // ── 窓ガラスを斜めに伝う、細い雨筋 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * (W + 120) - 60, y: -20 - Math.random() * H,
      len: 10 + Math.random() * 20,
      vy: 3.4 + Math.random() * 3.0, vx: -0.7 - Math.random() * 0.5,
      a: 0.08 + Math.random() * 0.18, w: 0.6 + Math.random() * 0.9,
    };
  }
  registerEffect('rain-window', {
    bg: 'radial-gradient(ellipse at 30% 8%, rgba(150,175,205,.10) 0%, transparent 55%), '
      + 'linear-gradient(165deg, #2c3543 0%, #1c232e 55%, #141a22 100%), #0e1218',
    step(ps, { W, H }) {
      if (ps.length < 90 && Math.random() < 0.85) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 40 && p.x > -80);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.strokeStyle = '#c4d2e0';
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.vx * (p.len / p.vy), p.y - p.len);
      ctx.stroke();
      ctx.restore();
    },
  });

})();
