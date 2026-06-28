/* Source: episodes/ep10/ch12/effect.js */

/* 第十二章の演出 — 衝突回避センサー。すっと寄って、ぴたりと止まる光。 */
(function () {

  // ── 障害物の手前で減速して止まる、安心感のある青緑の光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: -10, y: Math.random() * H,
      tx: W * (0.6 + Math.random() * 0.28),
      r: 0.9 + Math.random() * 1.8,
      ease: 0.02 + Math.random() * 0.03,
      base: 0.1 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
      col: Math.random() > 0.5 ? '#6fe0c4' : '#8fd4ff',
    };
  }
  registerEffect('sensor-stop', {
    bg: 'radial-gradient(ellipse at 50% 42%, rgba(110,200,190,.1) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #16261f 0%, #101c17 55%, #0a120e 100%), #070d0a',
    step(ps) {
      if (ps.length < 38 && Math.random() < 0.4) ps.push(spawn());
      ps.forEach(p => { p.x += (p.tx - p.x) * p.ease; p.phase += p.freq; });
      ps = ps.filter(p => p.tx - p.x > 1.2 || Math.random() > 0.02);
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
