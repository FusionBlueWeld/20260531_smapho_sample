/* 第五章の演出 — 存在の不確かさ。点が現れては消え、明滅して定まらない。 */
(function () {

  // ── 出現と消滅を繰り返す、確率の粒。実体が定まらない ────
  function spawnQ() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 2.2,
      base: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      freq: 0.02 + Math.random() * 0.06,
      jitter: 0.3 + Math.random() * 0.8,
    };
  }
  registerEffect('uncertain-flux', {
    bg: 'radial-gradient(ellipse at 50% 45%, rgba(120,200,190,.05) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #0e1316 0%, #080b0d 64%, #050607 100%), #070a0c',
    step(ps, { W, H }) {
      while (ps.length < 40) ps.push(spawnQ());
      ps.forEach(p => {
        p.x += (Math.random() - 0.5) * p.jitter;
        p.y += (Math.random() - 0.5) * p.jitter;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      // 確率振幅のように、明滅して実在感が定まらない
      const s = Math.sin(t * p.freq + p.phase);
      const a = p.base * Math.max(0, s) * Math.max(0, s);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#a8e6dc';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
