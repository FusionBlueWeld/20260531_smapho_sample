/* Source: episodes/ep08/ch05/effect.js */

/* 第五章の演出。 */
(function () {

  // ── 「アあーぱッ！」やけどコメディ：地から弾ける、赤くポップな熱の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 8 + Math.random() * 24,
      r: 1.0 + Math.random() * 2.4,
      vx: -0.2 + Math.random() * 0.4, vy: -0.5 - Math.random() * 0.9,
      base: 0.1 + Math.random() * 0.25,
      life: 0, ttl: 60 + Math.random() * 60,
      phase: Math.random() * Math.PI * 2, freq: 0.04 + Math.random() * 0.08,
    };
  }
  registerEffect('ouch-heat', {
    bg: 'radial-gradient(ellipse at 50% 92%, rgba(230,110,70,.14) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #4a2a1c 0%, #301810 55%, #1d0f09 100%), #140a06',
    step(ps, { W, H }) {
      if (ps.length < 44 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.life < p.ttl && p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.25; p.y += p.vy; p.vy *= 0.985; p.phase += p.freq; p.life++; });
      return ps;
    },
    draw(ctx, p) {
      const k = 1 - p.life / p.ttl;
      ctx.save();
      ctx.globalAlpha = p.base * k;
      ctx.fillStyle = p.r > 2 ? '#ff8a4a' : '#ffc24a';
      ctx.shadowColor = '#ff7034'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.6 + 0.4 * k), 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
