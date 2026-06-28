/* Source: episodes/ep08/ch02/effect.js */

/* 第二章の演出。 */
(function () {

  // ── 土砂降りの帰り道、そして暗転：斜めに流れ落ちる雨脚 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * (W + 120) - 60, y: -20 - Math.random() * 40,
      len: 8 + Math.random() * 18,
      vx: 1.1 + Math.random() * 0.8, vy: 7 + Math.random() * 6,
      base: 0.08 + Math.random() * 0.18,
    };
  }
  registerEffect('rainy-doom', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(150,160,180,.06) 0%, transparent 60%), '
      + 'linear-gradient(180deg, #232831 0%, #161a20 55%, #0d1014 100%), #090b0e',
    step(ps, { W, H }) {
      if (ps.length < 70 && Math.random() < 0.85) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 30 && p.x < W + 60);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.strokeStyle = '#aebccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * (p.len / p.vy), p.y - p.len);
      ctx.stroke();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep08/ch03/effect.js */

/* 第三章の演出。 */
(function () {

  // ── ザ・異世界の森：木洩(こも)れ日にきらめく、緑がかった光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vx: -0.05 + Math.random() * 0.14, vy: -0.02 - Math.random() * 0.08,
      base: 0.08 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.013,
    };
  }
  registerEffect('isekai-forest', {
    bg: 'radial-gradient(ellipse at 65% 22%, rgba(180,230,150,.12) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #2c4424 0%, #1a2c16 55%, #11200d 100%), #0c1709',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#bce89a';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
