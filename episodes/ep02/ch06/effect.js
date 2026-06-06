/* 第六章の演出。 */
(function () {

  // ── 第六章の１：勝利と平和。穏やかに漂うフロートシティの灯 ──
  function spawnLight() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * (0.1 + Math.random() * 0.7),
      r: 0.8 + Math.random() * 1.8,
      base: 0.25 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
      drift: 0.05 + Math.random() * 0.12, warm: Math.random() > 0.5,
    };
  }
  registerEffect('peace-float', {
    bg: 'radial-gradient(ellipse at 50% 14%, rgba(120,175,235,.16) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 78%, rgba(80,130,190,.10) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 46%, #16263e 0%, #0c1726 60%, #060c16 100%), #060b14',
    step(ps, { W }) {
      while (ps.length < 55) ps.push(spawnLight());
      ps.forEach(p => { p.x += p.drift; if (p.x > W + 5) p.x = -5; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.warm ? '#ffe0a8' : '#a8d0f8';
      ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第六章の２：太陽の消失。消えゆく星と、落下し崩れる砂 ──
  function spawnStar2() {
    return {
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: 0.4 + Math.random() * 1.3, base: 0.4 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
      dying: 0, dieAt: 80 + Math.random() * 400,
    };
  }
  function spawnFall() {
    return {
      x: Math.random() * window.innerWidth, y: -10,
      r: 0.6 + Math.random() * 1.5, vy: 1.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.4, alpha: 0.3 + Math.random() * 0.4,
    };
  }
  registerEffect('sun-vanish', {
    bg: 'radial-gradient(ellipse at 50% 50%, #0a0814 0%, #050410 60%, #020108 100%), #010006',
    step(ps, { H }) {
      while (ps.filter(p => p.kind !== 'fall').length < 70) { const s = spawnStar2(); s.kind = 'star'; ps.push(s); }
      if (Math.random() < 0.4) { const f = spawnFall(); f.kind = 'fall'; ps.push(f); }
      ps = ps.filter(p => p.kind === 'fall' ? p.y < H + 20 : p.dying < p.dieAt + 40);
      ps.forEach(p => {
        if (p.kind === 'fall') { p.y += p.vy; p.x += p.vx; }
        else p.dying++;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.kind === 'fall') {
        ctx.globalAlpha = p.alpha; ctx.fillStyle = '#b8bcd0';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        const death = p.dying < p.dieAt ? 1 : Math.max(0, 1 - (p.dying - p.dieAt) / 40);
        const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase)) * death;
        ctx.globalAlpha = a; ctx.fillStyle = '#e8eeff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
