/* 第四章の演出。 */
(function () {

  // ── 第四章：戦闘。飛び散る黒い血の破片と、刃が放つ一瞬の白い煌めき ──
  function spawnShard() {
    const W = window.innerWidth, H = window.innerHeight;
    const glint = Math.random() > 0.86;
    const ang = Math.random() * Math.PI * 2;
    const sp = 1.0 + Math.random() * 2.4;
    return {
      x: W * (0.3 + Math.random() * 0.4), y: H * (0.35 + Math.random() * 0.4),
      r: glint ? (0.8 + Math.random() * 1.2) : (1.0 + Math.random() * 2.6),
      vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp * 0.7,
      life: 0, max: 24 + Math.random() * 30,
      base: glint ? 0.9 : (0.3 + Math.random() * 0.4),
      glint,
    };
  }
  registerEffect('battle-shards', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(120,20,20,.08) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 45%, #14100f 0%, #0c0807 60%, #060403 100%), #040202',
    step(ps, {}) {
      while (ps.length < 46) ps.push(spawnShard());
      ps = ps.filter(p => p.life < p.max);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life++; });
      return ps;
    },
    draw(ctx, p, {}) {
      const k = 1 - p.life / p.max;
      ctx.save();
      ctx.globalAlpha = p.base * k;
      if (p.glint) {
        ctx.fillStyle = '#eaf4ff';
        ctx.shadowColor = '#cfe6ff'; ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = '#141016';
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
