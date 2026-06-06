/* 第七章の演出。 */
(function () {

  // ── 第七章の１・２：役員会議室。低く垂れこめる嵐の予兆。重い灰青の気流 ──
  function spawnGust() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: -20, y: Math.random() * H,
      r: 0.8 + Math.random() * 2.0,
      vx: 0.4 + Math.random() * 1.0, vy: (Math.random() - 0.5) * 0.2,
      base: 0.08 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('boardroom-storm', {
    bg: 'linear-gradient(180deg, rgba(40,55,75,.10) 0%, transparent 40%), '
      + 'radial-gradient(ellipse at 50% 28%, #18202c 0%, #10161f 60%, #080c12 100%), #06090e',
    step(ps, { W }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawnGust());
      ps = ps.filter(p => p.x < W + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.2; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#7f93ad';
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 2.2, p.r, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第七章の３：所長の夜と、理沙の発見。冷たい闇に、緑の火種がひとつ瞬く ──
  function spawnEmberNode() {
    const W = window.innerWidth, H = window.innerHeight;
    const green = Math.random() > 0.78;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * (green ? 1.8 : 1.2),
      drift: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.06,
      base: (green ? 0.3 : 0.12) + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.02,
      green,
    };
  }
  registerEffect('director-night', {
    bg: 'radial-gradient(ellipse at 72% 70%, rgba(50,180,130,.06) 0%, transparent 38%), '
      + 'radial-gradient(ellipse at 50% 36%, #131a22 0%, #0c1118 60%, #06090d 100%), #04060a',
    step(ps) {
      while (ps.length < 54) ps.push(spawnEmberNode());
      ps.forEach(p => { p.x += p.drift; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.green ? '#5fe6b0' : '#5c6f88';
      if (p.green) { ctx.shadowColor = '#5fe6b0'; ctx.shadowBlur = 9; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
