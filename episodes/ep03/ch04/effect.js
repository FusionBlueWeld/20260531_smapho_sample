/* 第四章の演出。 */
(function () {

  // ── 第四章：バイオラボの夜。装置の青緑の燐光と、ゆらめく光合成の粒 ──
  function spawnSpore() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * (0.4 + Math.random() * 0.6),
      r: 0.7 + Math.random() * 1.8,
      vy: -(0.15 + Math.random() * 0.5), vx: (Math.random() - 0.5) * 0.2,
      swirl: Math.random() * Math.PI * 2, sw: 0.008 + Math.random() * 0.018,
      base: 0.18 + Math.random() * 0.42, life: 0, maxLife: 220 + Math.random() * 200,
    };
  }
  registerEffect('biolab-glow', {
    bg: 'radial-gradient(ellipse at 50% 46%, rgba(40,200,150,.12) 0%, rgba(20,120,90,.06) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 50%, #0a2018 0%, #061712 60%, #030c09 100%), #020805',
    step(ps, { H }) {
      if (ps.length < 56 && Math.random() < 0.5) ps.push(spawnSpore());
      ps = ps.filter(p => p.life < p.maxLife && p.y > -20);
      ps.forEach(p => {
        p.life++; p.swirl += p.sw;
        p.y += p.vy; p.x += p.vx + Math.sin(p.swirl) * 0.5;
      });
      return ps;
    },
    draw(ctx, p) {
      const fade = Math.min(p.life / 50, 1) * Math.min((p.maxLife - p.life) / 70, 1);
      ctx.save();
      ctx.globalAlpha = p.base * fade;
      ctx.fillStyle = '#5fe6b0';
      ctx.shadowColor = '#5fe6b0'; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
