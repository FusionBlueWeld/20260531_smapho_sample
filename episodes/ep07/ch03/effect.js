/* 第三章の演出。 */
(function () {

  // ── 疑いの揺らぎ：気だるい陽炎(かげろう)のように、まばらに昇る熱の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.4 + Math.random() * H * 0.6,
      r: 0.5 + Math.random() * 1.4,
      vy: -0.04 - Math.random() * 0.1,
      base: 0.05 + Math.random() * 0.16,
      sway: 0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2, freq: 0.003 + Math.random() * 0.009,
    };
  }
  registerEffect('doubt-haze', {
    bg: 'radial-gradient(ellipse at 50% 65%, rgba(180,150,90,.07) 0%, transparent 60%), '
      + 'linear-gradient(180deg, #3a3322 0%, #261f14 55%, #1a150d 100%), #14100a',
    step(ps, { W, H }) {
      if (ps.length < 38 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += Math.sin(p.phase) * p.sway; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c4a86e';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
