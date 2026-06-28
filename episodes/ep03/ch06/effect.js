/* Source: episodes/ep03/ch09/effect.js */

/* 第九章の演出。 */
(function () {

  // ── 第九章：反撃の刃。冷たい鋼の縦線と、底から這い上がる赤い殺気 ──
  function spawnShard() {
    const W = window.innerWidth, H = window.innerHeight;
    const threat = Math.random() > 0.7;
    return {
      x: Math.random() * W, y: threat ? H + 10 : Math.random() * H,
      r: 0.6 + Math.random() * 1.4,
      vy: threat ? -(0.4 + Math.random() * 0.8) : (Math.random() - 0.5) * 0.05,
      drift: (Math.random() - 0.5) * 0.05,
      base: 0.12 + Math.random() * 0.32,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.025,
      threat, life: 0, maxLife: 160 + Math.random() * 140,
    };
  }
  registerEffect('counter-blade', {
    bg: 'repeating-linear-gradient(90deg, transparent 0, transparent 70px, rgba(150,170,200,.03) 70px, rgba(150,170,200,.03) 71px), '
      + 'radial-gradient(ellipse at 50% 106%, rgba(170,40,30,.16) 0%, rgba(90,20,15,.07) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 36%, #131820 0%, #0c1016 60%, #06080d 100%), #05070b',
    step(ps) {
      if (ps.length < 56 && Math.random() < 0.5) ps.push(spawnShard());
      ps = ps.filter(p => p.life < p.maxLife && p.y > -20);
      ps.forEach(p => { p.life++; p.y += p.vy; p.x += p.drift; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const fade = p.threat ? Math.min(p.life / 20, 1) * Math.min((p.maxLife - p.life) / 60, 1) : 1;
      const a = p.base * fade * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.threat ? '#e6553a' : '#9fb4d0';
      if (p.threat) { ctx.shadowColor = '#e6553a'; ctx.shadowBlur = 7; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
