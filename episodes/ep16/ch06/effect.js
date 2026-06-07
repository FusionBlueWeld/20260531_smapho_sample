/* 第三章の演出 — 情報空間。立ちのぼる青緑のデータ片と、走るスキャンライン。 */
(function () {

  // ── 宙に浮かび上がる、小さな矩形のデータ片 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 14 + Math.random() * 30,
      w: 1.4 + Math.random() * 3.2, h: 0.8 + Math.random() * 1.6,
      vy: -(0.3 + Math.random() * 0.7), vx: -0.06 + Math.random() * 0.12,
      base: 0.1 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.012,
    };
  }
  registerEffect('data-space', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(70,200,200,.10) 0%, transparent 58%), '
      + 'repeating-linear-gradient(0deg, rgba(90,210,210,.03) 0 2px, transparent 2px 6px), '
      + 'linear-gradient(170deg, #0a262b 0%, #06181c 55%, #030f12 100%), #020a0c',
    step(ps, { W, H }) {
      if (ps.length < 64 && Math.random() < 0.65) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.35 + 0.65 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#5fe0d4';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.restore();
    },
  });

})();
