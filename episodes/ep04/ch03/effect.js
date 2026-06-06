/* 第三章の演出。 */
(function () {

  // ── 第三章：巨体の出現。脈打つ赤い瘴気と、下から立ちのぼる赤い火の粉 ──
  function spawnOmen() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.7 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.2, vy: -0.2 - Math.random() * 0.5,
      base: 0.18 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.025,
    };
  }
  registerEffect('crimson-omen', {
    bg: 'radial-gradient(ellipse at 50% 95%, rgba(150,25,25,.12) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 40%, #1a1014 0%, #100a0c 60%, #070405 100%), #050304',
    step(ps, {}) {
      if (ps.length < 60 && Math.random() < 0.6) ps.push(spawnOmen());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.18; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = Math.random() > 0.5 ? '#d23b2a' : '#e86a44';
      ctx.shadowColor = '#e0432c'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
