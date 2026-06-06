/* 第十二章の演出。 */
(function () {

  // ── 魔王城・玉座の間：紫の稲妻めいた残光と、立ちのぼる赤い火の粉 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const ember = Math.random() < 0.55;
    return {
      x: Math.random() * W, y: ember ? H + 10 + Math.random() * 30 : Math.random() * H,
      r: 0.6 + Math.random() * 2.0,
      vx: -0.12 + Math.random() * 0.24, vy: ember ? -0.25 - Math.random() * 0.5 : -0.02 + Math.random() * 0.04,
      base: 0.08 + Math.random() * 0.24,
      ember,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.05,
    };
  }
  registerEffect('maou-battle', {
    bg: 'radial-gradient(ellipse at 50% 35%, rgba(150,70,200,.12) 0%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 100%, rgba(220,80,50,.12) 0%, transparent 50%), '
      + 'linear-gradient(180deg, #241430 0%, #160c1e 55%, #0c0712 100%), #070409',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.15; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const fl = 0.3 + 0.7 * Math.abs(Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = p.base * fl;
      ctx.fillStyle = p.ember ? '#ff7a44' : '#c285ff';
      ctx.shadowColor = p.ember ? '#ff6030' : '#a050e0'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
