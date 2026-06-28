/* Source: episodes/ep08/ch09/effect.js */

/* 第九章の演出。 */
(function () {

  // ── 王城・謁見の間：シャンデリアの下、きらきら降りそそぐ祝祭(しゅくさい)の紙吹雪(かみふぶき) ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const cols = ['#ffd66a', '#ff9ec0', '#9ed2ff', '#c8ffb0'];
    return {
      x: Math.random() * W, y: -10 - Math.random() * 30,
      r: 1.0 + Math.random() * 2.0,
      vx: -0.2 + Math.random() * 0.4, vy: 0.25 + Math.random() * 0.45,
      base: 0.1 + Math.random() * 0.24,
      col: cols[(Math.random() * cols.length) | 0],
      spin: Math.random() * Math.PI, dspin: -0.08 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('capital-glitz', {
    bg: 'radial-gradient(ellipse at 50% 10%, rgba(255,225,150,.12) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #3a2f44 0%, #251d30 55%, #18121f 100%), #110b16',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.4; p.y += p.vy; p.spin += p.dspin; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.x, p.y); ctx.rotate(p.spin);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
      ctx.restore();
    },
  });

})();
