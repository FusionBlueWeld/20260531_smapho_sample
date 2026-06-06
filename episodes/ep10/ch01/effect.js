/* 第一章の演出 — 朝の量販店。ガラス越しの陽光に舞う、明るいホコリ。 */
(function () {

  // ── 開店前のフロア。差し込む朝陽の中をきらきら漂うチリ ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      vx: -0.06 + Math.random() * 0.16, vy: 0.01 + Math.random() * 0.05,
      base: 0.08 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.003 + Math.random() * 0.008,
    };
  }
  registerEffect('store-morning', {
    bg: 'radial-gradient(ellipse at 22% 12%, rgba(255,235,170,.16) 0%, transparent 50%), '
      + 'linear-gradient(165deg, #3a3322 0%, #2a2618 55%, #1c1a12 100%), #141008',
    step(ps, { W, H }) {
      if (ps.length < 46 && Math.random() < 0.42) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.07; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffe9b0';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
