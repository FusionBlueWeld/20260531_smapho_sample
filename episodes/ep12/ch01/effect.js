/* 第一章の演出 — 薄暗い実験室。計器のかすかな点滅と冷たい光。 */
(function () {

  // ── 暗がりにぽつぽつと灯る、計器のインジケータ ──────────
  function spawnBlink() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 1.6,
      base: 0.12 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
      freq: 0.01 + Math.random() * 0.04,
      green: Math.random() > 0.45,
    };
  }
  registerEffect('dim-lab', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(120,180,180,.07) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #14181c 0%, #0c0f12 64%, #07090b 100%), #0a0c0e',
    step(ps) {
      while (ps.length < 30) ps.push(spawnBlink());
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.3 + 0.7 * Math.pow(Math.max(0, Math.sin(t * p.freq + p.phase)), 3));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.green ? '#7fe0c0' : '#d88080';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = a * 0.4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
