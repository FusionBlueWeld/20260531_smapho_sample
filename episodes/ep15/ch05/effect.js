/* Source: episodes/ep15/ch05/effect.js */

/* 第五章の演出 — 試合のあと。音の消えたコートに、ゆっくり沈む灰色の塵。 */
(function () {

  // ── 時の止まったような静寂。力なく漂い落ちる粒子 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: -20 - Math.random() * H,
      r: 0.6 + Math.random() * 1.5,
      vy: 0.15 + Math.random() * 0.4, vx: -0.05 + Math.random() * 0.1,
      base: 0.06 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2, freq: 0.002 + Math.random() * 0.006,
    };
  }
  registerEffect('buzzer-silence', {
    bg: 'radial-gradient(ellipse at 50% 12%, rgba(180,195,210,.08) 0%, transparent 55%), '
      + 'linear-gradient(172deg, #1a1e24 0%, #12151b 55%, #0b0d12 100%), #07090d',
    step(ps, { W, H }) {
      if (ps.length < 44 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20 && p.x > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.04; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#b8c2cf';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
