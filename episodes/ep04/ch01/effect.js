/* Source: episodes/ep04/ch01/effect.js */

/* 第一章の演出。registerEffect(name, { bg, step, draw }) でエンジンに登録する。 */
(function () {

  // ── 第一章：灰の荒野。低く垂れこめた空の下、横へ流れていく灰の粒 ──
  function spawnAsh() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: -20, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vx: 0.25 + Math.random() * 0.7, vy: (Math.random() - 0.5) * 0.15,
      base: 0.05 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.016,
    };
  }
  registerEffect('ash-waste', {
    bg: 'linear-gradient(180deg, rgba(70,70,78,.10) 0%, transparent 45%), '
      + 'radial-gradient(ellipse at 50% 70%, #20222a 0%, #15171d 60%, #0c0d12 100%), #090a0e',
    step(ps, { W }) {
      if (ps.length < 58 && Math.random() < 0.55) ps.push(spawnAsh());
      ps = ps.filter(p => p.x < W + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.15; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#9a9aa2';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep04/ch02/effect.js */

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
