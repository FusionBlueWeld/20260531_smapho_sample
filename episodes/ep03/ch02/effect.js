/* Source: episodes/ep03/ch03/effect.js */

/* 第三章の演出。 */
(function () {

  // ── 第三章：特許の壁。冷たく張りつめた空気と、ガラスに走る霜の結晶 ──
  function spawnFrost() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.4,
      drift: (Math.random() - 0.5) * 0.06, vy: (Math.random() - 0.5) * 0.05,
      base: 0.14 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('patent-frost', {
    bg: 'repeating-linear-gradient(60deg, transparent 0, transparent 58px, rgba(150,180,210,.035) 58px, rgba(150,180,210,.035) 59px), '
      + 'radial-gradient(ellipse at 50% 30%, #16202c 0%, #0e161f 60%, #070c12 100%), #060a10',
    step(ps) {
      while (ps.length < 56) ps.push(spawnFrost());
      ps.forEach(p => { p.x += p.drift; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = '#bcd6ea'; ctx.lineWidth = 0.8;
      ctx.shadowColor = '#bcd6ea'; ctx.shadowBlur = 5;
      // 小さな六花（雪の結晶）状のきらめき
      for (let i = 0; i < 3; i++) {
        const ang = p.phase + i * Math.PI / 3;
        ctx.beginPath();
        ctx.moveTo(p.x - Math.cos(ang) * p.r * 2, p.y - Math.sin(ang) * p.r * 2);
        ctx.lineTo(p.x + Math.cos(ang) * p.r * 2, p.y + Math.sin(ang) * p.r * 2);
        ctx.stroke();
      }
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep03/ch04/effect.js */

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
