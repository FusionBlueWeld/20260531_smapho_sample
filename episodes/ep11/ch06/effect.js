/* 第六章の演出 — 窓ガラスを流れ落ちる雨だれ。 */
(function () {

  // ── ガラスを伝って落ちる雨粒。たまに膨らみ、つっと走る ────
  function spawnDrop() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -10,
      r: 1.2 + Math.random() * 2.4,
      vy: 0,
      accel: 0.02 + Math.random() * 0.05,
      maxv: 1.2 + Math.random() * 2.6,
      base: 0.1 + Math.random() * 0.18,
      wait: Math.random() * 120,
    };
  }
  registerEffect('rain-window', {
    bg: 'radial-gradient(ellipse at 50% 0%, rgba(150,180,210,.08) 0%, transparent 45%), '
      + 'radial-gradient(ellipse at 50% 55%, #161c24 0%, #0e1218 64%, #080b10 100%), #0c1016',
    step(ps, { H }) {
      if (ps.length < 38 && Math.random() < 0.4) ps.push(spawnDrop());
      ps = ps.filter(p => p.y < H + 12);
      ps.forEach(p => {
        if (p.wait > 0) { p.wait--; return; }
        p.vy = Math.min(p.vy + p.accel, p.maxv);
        p.y += p.vy;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.strokeStyle = '#bcd4ec';
      ctx.lineWidth = p.r;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y - p.vy * 3 - p.r);
      ctx.stroke();
      ctx.globalAlpha = p.base * 1.4;
      ctx.fillStyle = '#d4e6f8';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.9, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
