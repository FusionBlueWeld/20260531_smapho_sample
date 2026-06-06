/* 第四章の演出 — 無機質な箱の中。冷たく沈んだ闇に、わずかな金属の反射。 */
(function () {

  // ── ごくまれに、金属の縁がにぶく光る ──────────────────────
  function spawnGlint() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      len: 10 + Math.random() * 26,
      angle: (Math.random() - 0.5) * 0.5 + Math.PI * 0.25,
      base: 0.05 + Math.random() * 0.1,
      life: 0, maxLife: 120 + Math.random() * 160,
    };
  }
  registerEffect('plain-box', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(120,130,140,.04) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #101114 0%, #08090b 66%, #050506 100%), #070809',
    step(ps) {
      if (ps.length < 7 && Math.random() < 0.03) ps.push(spawnGlint());
      ps = ps.filter(p => p.life < p.maxLife);
      ps.forEach(p => p.life++);
      return ps;
    },
    draw(ctx, p) {
      const fade = Math.min(p.life / 40, 1) * Math.min((p.maxLife - p.life) / 40, 1);
      ctx.save();
      ctx.globalAlpha = p.base * fade;
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      const g = ctx.createLinearGradient(-p.len / 2, 0, p.len / 2, 0);
      g.addColorStop(0, 'transparent'); g.addColorStop(0.5, '#a8b4bc'); g.addColorStop(1, 'transparent');
      ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-p.len / 2, 0); ctx.lineTo(p.len / 2, 0); ctx.stroke();
      ctx.restore();
    },
  });

})();
