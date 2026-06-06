/* 第六章の演出 — 青白い燐光と、向こうに広がる暖かな楽園。
 * 二つの光が重なり合い、生と死の重ね合わせを思わせる。 */
(function () {

  // ── ふわりと浮遊する燐光の珠。青白と、ほのかな暖色が混じる ──
  function spawnOrb() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + Math.random() * 40,
      r: 2 + Math.random() * 5,
      vy: -0.15 - Math.random() * 0.3,
      base: 0.18 + Math.random() * 0.3,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.008 + Math.random() * 0.016,
      warm: Math.random() > 0.5,
    };
  }
  registerEffect('pale-paradise', {
    bg: 'radial-gradient(ellipse at 50% 90%, rgba(255,210,150,.16) 0%, rgba(200,150,90,.06) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 30%, rgba(130,210,220,.12) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #0e1820 0%, #0a1218 62%, #060c10 100%), #081016',
    step(ps, { H }) {
      while (ps.length < 30) ps.push(spawnOrb());
      ps = ps.filter(p => p.y > -10);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 0.5;
        p.y += p.vy;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * 0.01 + p.sway));
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.6);
      g.addColorStop(0, p.warm ? '#ffe2b0' : '#bfeef0');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
