/* 第十一章の演出。 */
(function () {

  // ── お約束の温泉回：ゆらゆら立ちのぼる、もったり湯けむり ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 20 + Math.random() * 40,
      r: 14 + Math.random() * 30,
      vx: -0.15 + Math.random() * 0.3, vy: -0.25 - Math.random() * 0.4,
      base: 0.04 + Math.random() * 0.07,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.009,
    };
  }
  registerEffect('hotspring-steam', {
    bg: 'radial-gradient(ellipse at 50% 95%, rgba(230,220,235,.08) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #2e3236 0%, #20262a 55%, #161b1e 100%), #101417',
    step(ps, { W, H }) {
      if (ps.length < 30 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.y > -60);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.5; p.y += p.vy; p.r += 0.06; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, 'rgba(235,232,240,1)');
      g.addColorStop(1, 'rgba(235,232,240,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
