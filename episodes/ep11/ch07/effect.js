/* 第七章の演出 — じゃれ遊びの羽根が、ふわりふわりと宙を舞う。 */
(function () {

  // ── ひらひらと不規則に舞い落ちる羽根 ────────────────────
  function spawnFeather() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -14,
      len: 9 + Math.random() * 10,
      vy: 0.35 + Math.random() * 0.6,
      base: 0.22 + Math.random() * 0.3,
      angle: Math.random() * Math.PI * 2,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.02 + Math.random() * 0.03,
      spin: (Math.random() - 0.5) * 0.04,
      warm: Math.random() > 0.6,
    };
  }
  registerEffect('feather-play', {
    bg: 'radial-gradient(ellipse at 50% 12%, rgba(255,225,180,.12) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #261f16 0%, #18130c 64%, #100c07 100%), #14100a',
    step(ps, { H }) {
      if (ps.length < 14 && Math.random() < 0.1) ps.push(spawnFeather());
      ps = ps.filter(p => p.y < H + 16);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 1.1;
        p.y += p.vy;
        p.angle += p.spin + Math.sin(p.sway) * 0.02;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.globalAlpha = p.base;
      ctx.fillStyle = p.warm ? '#f6e2b8' : '#eef0f4';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.len * 0.32, p.len, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = p.base * 0.5;
      ctx.strokeStyle = '#c8b890';
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(0, -p.len); ctx.lineTo(0, p.len); ctx.stroke();
      ctx.restore();
    },
  });

})();
