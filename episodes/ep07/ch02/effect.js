/* 第二章の演出。 */
(function () {

  // ── 踏み鳴らす広場：地から噴き上がり、陽に金色(こんじき)に輝く土埃 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10 + Math.random() * 30,
      r: 0.6 + Math.random() * 2.2,
      vx: -0.1 + Math.random() * 0.2, vy: -0.25 - Math.random() * 0.55,
      base: 0.07 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.014,
    };
  }
  registerEffect('dance-dust', {
    bg: 'radial-gradient(ellipse at 50% 95%, rgba(235,190,90,.16) 0%, transparent 60%), '
      + 'linear-gradient(175deg, #5a4824 0%, #3a2c14 55%, #23190c 100%), #18110a',
    step(ps, { W, H }) {
      if (ps.length < 56 && Math.random() < 0.65) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.18; p.y += p.vy; p.vy *= 0.992; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#e6c074';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
