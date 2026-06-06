/* 第一章の演出。 */
(function () {

  // ── 祭りを待つ谷、昼下がり：色布と花粉が暖かな光の中を漂う ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const cols = ['#e8d49a', '#d8a0b0', '#a8d0b8', '#e6c070'];
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vx: -0.06 + Math.random() * 0.2, vy: -0.04 - Math.random() * 0.12,
      base: 0.08 + Math.random() * 0.22,
      col: cols[(Math.random() * cols.length) | 0],
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.012,
    };
  }
  registerEffect('festival-air', {
    bg: 'radial-gradient(ellipse at 70% 28%, rgba(230,200,120,.12) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #4c4326 0%, #2f3320 55%, #1e2614 100%), #16190d',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
