/* 第五章の演出 — 粉モン外交。温かな湯気に舞う、鰹節のような金色の薄片。 */
(function () {

  // ── ほかほかと立ちのぼる、お好み焼きの湯気と踊る薄片 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 16 + Math.random() * 30,
      r: 0.8 + Math.random() * 2.0,
      vx: -0.18 + Math.random() * 0.36, vy: -(0.25 + Math.random() * 0.6),
      base: 0.1 + Math.random() * 0.24,
      warm: Math.random() < 0.5,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.014,
    };
  }
  registerEffect('okonomi-haze', {
    bg: 'radial-gradient(ellipse at 50% 78%, rgba(255,200,120,.12) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #2a2113 0%, #1c160d 55%, #120d07 100%), #0c0905',
    step(ps, { W, H }) {
      if (ps.length < 58 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.warm ? '#ffcf8a' : '#e8b06a';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
