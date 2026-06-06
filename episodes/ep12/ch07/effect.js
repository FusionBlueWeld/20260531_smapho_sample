/* 第七章の演出 — 蓋が開き、光が差し込む「収束」。
 * 中心へ向かって光条が集まり、すべてが一点に折りたたまれてゆく。 */
(function () {

  function spawnRay() {
    const a = Math.random() * Math.PI * 2;
    return {
      angle: a,
      dist: 0.4 + Math.random() * 0.7,   // 中心からの相対距離(0..1)
      width: 0.04 + Math.random() * 0.07,
      base: 0.05 + Math.random() * 0.12,
      speed: 0.0006 + Math.random() * 0.0014,
      phase: Math.random() * Math.PI * 2,
    };
  }
  registerEffect('collapse-light', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(255,250,235,.14) 0%, rgba(220,225,230,.05) 22%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #14161a 0%, #0b0d10 64%, #07080a 100%), #0a0c0e',
    step(ps) {
      while (ps.length < 16) ps.push(spawnRay());
      ps.forEach(p => {
        p.dist -= p.speed * 60;          // ゆっくり中心へ収束
        if (p.dist < 0.05) { p.dist = 0.4 + Math.random() * 0.7; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const W = window.innerWidth, H = window.innerHeight;
      const cx = W * 0.5, cy = H * 0.3;
      const shimmer = 0.5 + 0.5 * Math.sin(t * 0.01 + p.phase);
      const r = Math.max(W, H);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.base * shimmer * Math.min(1, p.dist + 0.2);
      const inner = r * 0.05, outer = r * p.dist;
      const g = ctx.createLinearGradient(0, inner, 0, outer);
      g.addColorStop(0, '#fff8ec'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      const w = r * p.width;
      ctx.beginPath();
      ctx.moveTo(-w * 0.2, inner); ctx.lineTo(w * 0.2, inner);
      ctx.lineTo(w, outer); ctx.lineTo(-w, outer);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    },
  });

})();
