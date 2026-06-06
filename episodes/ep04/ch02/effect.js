/* 第二章の演出。 */
(function () {

  // ── 第二章：神殿の門。立ちこめる黒い霧と、闇に灯る赤い目の燐光 ──
  function spawnMist() {
    const W = window.innerWidth, H = window.innerHeight;
    const ember = Math.random() > 0.82;
    return {
      x: Math.random() * W, y: H * 0.4 + Math.random() * H * 0.6,
      r: ember ? (0.7 + Math.random() * 1.4) : (6 + Math.random() * 14),
      vx: (Math.random() - 0.5) * 0.12, vy: -0.04 - Math.random() * 0.12,
      base: ember ? (0.2 + Math.random() * 0.35) : (0.05 + Math.random() * 0.1),
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.014,
      ember,
    };
  }
  registerEffect('temple-mist', {
    bg: 'radial-gradient(ellipse at 50% 80%, rgba(120,30,30,.05) 0%, transparent 42%), '
      + 'radial-gradient(ellipse at 50% 45%, #16151a 0%, #0e0d12 60%, #070609 100%), #050406',
    step(ps, { H }) {
      if (ps.length < 56 && Math.random() < 0.55) ps.push(spawnMist());
      ps = ps.filter(p => p.y > -30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      if (p.ember) {
        ctx.fillStyle = '#c0392b';
        ctx.shadowColor = '#e0533a'; ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#1c1b22';
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
