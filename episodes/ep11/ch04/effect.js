/* 第四章の演出 — 夜の室内。テレビの光がほのかに揺れる、くつろぎの薄明かり。 */
(function () {

  // ── 暗い部屋にゆっくり明滅する、画面の灯りのような光球 ────
  function spawnGlow() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.3 + Math.random() * H * 0.6,
      r: 30 + Math.random() * 70,
      base: 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      freq: 0.004 + Math.random() * 0.008,
      drift: (Math.random() - 0.5) * 0.08,
      hue: Math.random() > 0.5 ? '#7fb0d8' : '#d8b87f',
    };
  }
  registerEffect('cozy-dim', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(120,160,200,.07) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 60%, #18160f 0%, #100e09 64%, #090804 100%), #0c0a06',
    step(ps) {
      while (ps.length < 7) ps.push(spawnGlow());
      ps.forEach(p => { p.x += p.drift; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.hue); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
