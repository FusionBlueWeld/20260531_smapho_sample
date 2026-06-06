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
