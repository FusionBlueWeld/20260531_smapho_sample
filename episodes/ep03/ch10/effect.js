/* 第十章の演出。 */
(function () {

  // ── 第十章：三十五パーセント。安定して昇り、灯り続ける緑と金の上昇光 ──
  function spawnAscend() {
    const W = window.innerWidth, H = window.innerHeight;
    const gold = Math.random() > 0.5;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.8 + Math.random() * 1.9,
      vy: -(0.4 + Math.random() * 0.9), vx: (Math.random() - 0.5) * 0.18,
      base: 0.2 + Math.random() * 0.42,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
      gold, life: 0, maxLife: 260 + Math.random() * 200,
    };
  }
  registerEffect('breakthrough-surge', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(90,230,176,.16) 0%, rgba(40,140,100,.07) 28%, transparent 54%), '
      + 'radial-gradient(ellipse at 50% 12%, rgba(236,200,120,.10) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 52%, #122019 0%, #0c1813 60%, #060d09 100%), #040a07',
    step(ps) {
      if (ps.length < 70 && Math.random() < 0.6) ps.push(spawnAscend());
      ps = ps.filter(p => p.life < p.maxLife && p.y > -20);
      ps.forEach(p => { p.life++; p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const fade = Math.min(p.life / 40, 1) * Math.min((p.maxLife - p.life) / 80, 1);
      const a = p.base * fade * (0.6 + 0.4 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.gold ? '#f0cc78' : '#5fe6b0';
      ctx.shadowColor = p.gold ? '#f0cc78' : '#5fe6b0'; ctx.shadowBlur = 9;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
