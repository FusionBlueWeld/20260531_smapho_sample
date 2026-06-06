/* 第九章の演出 — 新居のウッドデッキ。夕暮れの庭に舞う木の葉。 */
(function () {

  // ── 夕風に乗って、ゆっくり舞い落ちる木の葉 ──────────────
  function spawnLeaf() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -16,
      r: 4 + Math.random() * 5,
      vy: 0.4 + Math.random() * 0.7,
      base: 0.28 + Math.random() * 0.3,
      angle: Math.random() * Math.PI * 2,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.018 + Math.random() * 0.025,
      spin: (Math.random() - 0.5) * 0.05,
      hue: ['#e0a85a', '#d88a48', '#c8b060'][Math.floor(Math.random() * 3)],
    };
  }
  registerEffect('new-terrace', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(220,140,60,.30) 0%, rgba(150,80,30,.12) 32%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 45%, #2a2012 0%, #1c150c 60%, #120d07 100%), #17110a',
    step(ps, { H }) {
      if (ps.length < 16 && Math.random() < 0.12) ps.push(spawnLeaf());
      ps = ps.filter(p => p.y < H + 18);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 0.9;
        p.y += p.vy;
        p.angle += p.spin;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.globalAlpha = p.base;
      ctx.fillStyle = p.hue;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  });

})();
