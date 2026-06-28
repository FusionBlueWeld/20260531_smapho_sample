/* Source: episodes/ep09/ch11/effect.js */

/* 第十一章の演出 — 崩壊。無数の特異点が荒れ狂い、空間がねじれる。 */
(function () {

  // ── 崩れゆく空間。速く不規則に飛び交う、冷たい星のような特異点 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 2.4,
      vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
      base: 0.1 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.06,
      col: Math.random() > 0.55 ? '#cdd8ff' : (Math.random() > 0.4 ? '#b58cff' : '#7fa8ff'),
    };
  }
  registerEffect('collapse', {
    bg: 'radial-gradient(ellipse at 50% 48%, rgba(150,140,255,.16) 0%, rgba(60,40,120,.08) 26%, transparent 56%), '
      + 'linear-gradient(150deg, #1a1236 0%, #0e0a26 50%, #060414 100%), #040210',
    step(ps, { W, H }) {
      if (ps.length < 70 && Math.random() < 0.7) ps.push(spawn());
      ps = ps.filter(p => p.x > -30 && p.x < W + 30 && p.y > -30 && p.y < H + 30);
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.phase += p.freq;
        p.vx += (Math.random() - 0.5) * 0.1; p.vy += (Math.random() - 0.5) * 0.1;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
