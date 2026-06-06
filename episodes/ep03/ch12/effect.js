/* 第十二章の演出。 */
(function () {

  // ── 第十二章：若き日の番人。黄昏に沈む冷たい青と、ひとつだけ灯る郷愁の緑 ──
  function spawnDusk() {
    const W = window.innerWidth, H = window.innerHeight;
    const memory = Math.random() > 0.82;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * (memory ? 1.7 : 1.2),
      vy: -(0.03 + Math.random() * 0.12), drift: (Math.random() - 0.5) * 0.07,
      base: (memory ? 0.26 : 0.1) + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.014,
      memory,
    };
  }
  registerEffect('twilight-keeper', {
    bg: 'radial-gradient(ellipse at 50% 96%, rgba(180,120,70,.10) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 28% 30%, rgba(50,160,120,.05) 0%, transparent 36%), '
      + 'radial-gradient(ellipse at 50% 40%, #161a24 0%, #0f121b 60%, #080a11 100%), #06080d',
    step(ps, { H }) {
      if (ps.length < 50 && Math.random() < 0.36) ps.push(spawnDusk());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.drift; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.memory ? '#6fd8ac' : '#6a7c98';
      if (p.memory) { ctx.shadowColor = '#6fd8ac'; ctx.shadowBlur = 8; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
