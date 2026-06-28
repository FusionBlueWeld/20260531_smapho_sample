/* Source: episodes/ep08/ch08/effect.js */

/* 第八章の演出。 */
(function () {

  // ── 王都の使者、金獅子の紋章：荘厳ぶった、ゆっくり舞う金箔(きんぱく) ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: -10 - Math.random() * 30,
      r: 0.8 + Math.random() * 2.2,
      vx: -0.06 + Math.random() * 0.16, vy: 0.1 + Math.random() * 0.28,
      base: 0.08 + Math.random() * 0.22,
      spin: Math.random() * Math.PI, dspin: -0.04 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('royal-gold', {
    bg: 'radial-gradient(ellipse at 50% 18%, rgba(255,215,120,.12) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #45350f 0%, #2c220a 55%, #1c1607 100%), #130f07',
    step(ps, { W, H }) {
      if (ps.length < 44 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.18; p.y += p.vy; p.spin += p.dspin; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.x, p.y); ctx.rotate(p.spin);
      ctx.fillStyle = '#ffd56a';
      ctx.fillRect(-p.r, -p.r * 0.35, p.r * 2, p.r * 0.7);
      ctx.restore();
    },
  });

})();
