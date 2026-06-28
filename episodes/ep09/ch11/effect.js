/* Source: episodes/ep09/ch13/effect.js */

/* 終章の演出 — 夜明け前の名残。静かな闇に、消えきらない微かな光。 */
(function () {

  // ── 引いていく干渉の残響。まばらに、名残のように明滅する粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.06, vy: -(0.01 + Math.random() * 0.04),
      base: 0.06 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.012,
      col: Math.random() > 0.7 ? '#b8a6ff' : '#9fb0d8',
    };
  }
  registerEffect('dawn-residue', {
    bg: 'radial-gradient(ellipse at 60% 22%, rgba(120,140,200,.09) 0%, transparent 52%), '
      + 'linear-gradient(175deg, #171a2a 0%, #11131f 55%, #0a0b12 100%), #080910',
    step(ps, { H }) {
      if (ps.length < 36 && Math.random() < 0.34) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
