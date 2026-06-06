/* 第六章の演出。 */
(function () {

  // ── 第六章：雨上がり。静かに立ちのぼる、結晶の青白い灯のような光の粒 ──
  function spawnLantern() {
    const W = window.innerWidth, H = window.innerHeight;
    const warm = Math.random() > 0.7;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.7 + Math.random() * 1.9,
      drift: (Math.random() - 0.5) * 0.1, vy: -0.18 - Math.random() * 0.3,
      base: 0.16 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.007 + Math.random() * 0.018,
      warm,
    };
  }
  registerEffect('lantern-glow', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(150,210,240,.06) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 55%, #141a22 0%, #0e131a 60%, #070a0f 100%), #05080c',
    step(ps, {}) {
      if (ps.length < 52 && Math.random() < 0.5) ps.push(spawnLantern());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.drift + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.warm ? '#cfe2c0' : '#a6dcf2';
      ctx.shadowColor = p.warm ? '#cfe2c0' : '#a6dcf2'; ctx.shadowBlur = 9;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
