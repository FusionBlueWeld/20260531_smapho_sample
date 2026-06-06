/* 第五章の演出。 */
(function () {

  // ── 第五章：静寂と雨。まっすぐ落ちる銀の雨脚と、結晶の淡い青白い燐光 ──
  function spawnRain() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: -20 - Math.random() * H,
      len: 10 + Math.random() * 22,
      vy: 6 + Math.random() * 5, vx: -0.4 - Math.random() * 0.5,
      base: 0.1 + Math.random() * 0.22, rain: true,
    };
  }
  function spawnHalo() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 0.06, vy: -0.05 - Math.random() * 0.06,
      base: 0.15 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.018,
      rain: false,
    };
  }
  registerEffect('silent-rain', {
    bg: 'radial-gradient(ellipse at 50% 75%, rgba(110,180,220,.05) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 40%, #131820 0%, #0c0f15 60%, #06080c 100%), #04060a',
    step(ps, { H }) {
      if (ps.length < 90) {
        if (Math.random() < 0.85) ps.push(spawnRain());
        if (Math.random() < 0.25) ps.push(spawnHalo());
      }
      ps = ps.filter(p => p.rain ? p.y < H + 30 : p.y > -20);
      ps.forEach(p => {
        if (p.rain) { p.y += p.vy; p.x += p.vx; }
        else { p.x += p.drift; p.y += p.vy; p.phase += p.freq; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.rain) {
        ctx.globalAlpha = p.base;
        ctx.strokeStyle = '#aacbe0'; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 1.4, p.y + p.len); ctx.stroke();
      } else {
        const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#9fdcff';
        ctx.shadowColor = '#9fdcff'; ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
