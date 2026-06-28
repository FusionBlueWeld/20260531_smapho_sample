/* Source: episodes/ep14/ch03/effect.js */

/* 第三章の演出 — 宇宙人のホログラム。宙に立ちのぼる、緑の光文字の粒。 */
(function () {

  // ── 翻訳デバイスから舞い上がる、ホログラムの緑の光片 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 16 + Math.random() * 30,
      r: 0.7 + Math.random() * 1.8,
      vx: -0.12 + Math.random() * 0.24, vy: -(0.3 + Math.random() * 0.7),
      base: 0.12 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.012,
    };
  }
  registerEffect('alien-hologram', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(80,230,170,.12) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #0d2a20 0%, #081a14 55%, #04100c 100%), #020a07',
    step(ps, { W, H }) {
      if (ps.length < 70 && Math.random() < 0.7) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.09; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.35 + 0.65 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#7dffc0';
      ctx.shadowColor = '#7dffc0';
      ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
