/* 第十一章の演出。 */
(function () {

  // ── 第十一章の１・２：役員会議の攻防。垂れこめた嵐が、切れ間から光を落としはじめる ──
  function spawnFront() {
    const W = window.innerWidth, H = window.innerHeight;
    const ray = Math.random() > 0.7;
    return {
      x: ray ? Math.random() * W : -20,
      y: ray ? -10 : Math.random() * H,
      r: 0.8 + Math.random() * 1.8,
      vx: ray ? (Math.random() - 0.5) * 0.1 : 0.4 + Math.random() * 0.9,
      vy: ray ? 0.3 + Math.random() * 0.6 : (Math.random() - 0.5) * 0.18,
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
      ray,
    };
  }
  registerEffect('verdict-storm', {
    bg: 'linear-gradient(180deg, rgba(45,60,80,.10) 0%, transparent 38%), '
      + 'radial-gradient(ellipse at 50% 10%, rgba(230,210,150,.06) 0%, transparent 40%), '
      + 'radial-gradient(ellipse at 50% 30%, #161e28 0%, #0f151d 60%, #080b11 100%), #06090d',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.5) ps.push(spawnFront());
      ps = ps.filter(p => p.x < W + 30 && p.y < H + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.18; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      if (p.ray) {
        ctx.fillStyle = '#e6d496'; ctx.shadowColor = '#e6d496'; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = '#8194ad';
        ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 2.2, p.r, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

  // ── 第十一章の３：規定の代償。嵐が去った後の、静かな夜明けの光と微かな雨の名残 ──
  function spawnCalm() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.5,
      vy: 0.1 + Math.random() * 0.3, vx: (Math.random() - 0.5) * 0.06,
      base: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.016,
    };
  }
  registerEffect('verdict-calm', {
    bg: 'radial-gradient(ellipse at 50% 90%, rgba(220,180,110,.10) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 40%, #1a1d22 0%, #11141a 60%, #090c11 100%), #07090e',
    step(ps, { H }) {
      if (ps.length < 44 && Math.random() < 0.34) ps.push(spawnCalm());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#d8b87a';
      ctx.shadowColor = '#d8b87a'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
