/* 第五章の演出。 */
(function () {

  // ── 第五章の１：本社CTO応接室。重厚で張りつめた、琥珀色の静謐 ──
  function spawnAmber() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.6,
      vy: -(0.04 + Math.random() * 0.14), vx: (Math.random() - 0.5) * 0.08,
      base: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.007 + Math.random() * 0.015,
    };
  }
  registerEffect('hq-appeal', {
    bg: 'radial-gradient(ellipse at 50% 80%, rgba(200,150,70,.10) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 35%, #241c12 0%, #17110a 62%, #0d0905 100%), #0a0705',
    step(ps, { H }) {
      if (ps.length < 46 && Math.random() < 0.34) ps.push(spawnAmber());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#d6a85a';
      ctx.shadowColor = '#d6a85a'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第五章の２：所長の激怒。沸き立つ赤い燠火と、舞い上がる火の粉 ──
  function spawnSpark() {
    return {
      x: Math.random() * window.innerWidth, y: window.innerHeight + 10,
      r: 0.7 + Math.random() * 1.5,
      vy: -(0.5 + Math.random() * 1.1), vx: (Math.random() - 0.5) * 0.5,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.04,
      base: 0.25 + Math.random() * 0.45, life: 0, maxLife: 120 + Math.random() * 120,
    };
  }
  registerEffect('director-rage', {
    bg: 'radial-gradient(ellipse at 50% 104%, rgba(200,50,30,.30) 0%, rgba(110,25,15,.14) 32%, transparent 58%), '
      + 'radial-gradient(ellipse at 50% 42%, #1f100c 0%, #140807 60%, #0a0403 100%), #080302',
    step(ps) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawnSpark());
      ps = ps.filter(p => p.life < p.maxLife && p.y > -20);
      ps.forEach(p => { p.life++; p.y += p.vy; p.x += p.vx; p.vy += 0.004; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const fade = Math.min(p.life / 20, 1) * Math.min((p.maxLife - p.life) / 50, 1);
      const a = p.base * fade * (0.6 + 0.4 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = Math.random() > 0.5 ? '#ff7a3c' : '#e64422';
      ctx.shadowColor = '#ff5a2a'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
