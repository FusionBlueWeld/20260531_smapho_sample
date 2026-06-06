/* 第九章の演出。 */
(function () {

  // ── 子爵の訪い：重く垂れこめる威圧。深紅と黒の中を、ゆっくり降りる粒 ──
  function spawn() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -10,
      r: 0.6 + Math.random() * 1.7,
      vx: (Math.random() - 0.5) * 0.1, vy: 0.18 + Math.random() * 0.4,
      base: 0.07 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('viscount-shade', {
    bg: 'radial-gradient(ellipse at 50% 25%, rgba(140,30,40,.10) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #2a1419 0%, #1a0c10 60%, #0e0608 100%), #0a0506',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.09; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#a85a5a';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
