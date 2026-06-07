/* 第二章の演出 — 夜の滑走路。宇宙船の光を受けて舞う、夜気の粒。 */
(function () {

  // ── 投光器に照らされた夜。ゆらゆらと立ちのぼる微光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 20 + Math.random() * 40,
      r: 0.6 + Math.random() * 1.5,
      vx: -0.1 + Math.random() * 0.2, vy: -(0.2 + Math.random() * 0.5),
      base: 0.1 + Math.random() * 0.22,
      green: Math.random() < 0.4,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('runway-night', {
    bg: 'radial-gradient(ellipse at 50% 70%, rgba(120,200,180,.10) 0%, transparent 55%), '
      + 'linear-gradient(175deg, #10202a 0%, #0a141c 55%, #060b11 100%), #04080c',
    step(ps, { W, H }) {
      if (ps.length < 56 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.06; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.green ? '#9ff0c8' : '#dfeaf2';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
