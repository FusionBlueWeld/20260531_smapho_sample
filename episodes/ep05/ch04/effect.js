/* 第四章の演出。 */
(function () {

  // ── 断ち切られた糸：絶望のように、冷たく降り落ちる灰青の粒 ──
  function spawn() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -10,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.1, vy: 0.4 + Math.random() * 0.7,
      base: 0.06 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('cold-letter', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(120,140,160,.05) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #1c2128 0%, #141820 60%, #0c0e13 100%), #0a0c10',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.1; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#9fb0c4';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
