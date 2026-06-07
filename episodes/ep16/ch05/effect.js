/* 第四章の演出 — 侵食。明滅し、ジッターする粒子。時おり走る赤い異常。 */
(function () {

  // ── 不規則に明滅・ジッターする、世界の綻び ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const bad = Math.random() < 0.18;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      bad,
      base: 0.06 + Math.random() * 0.2,
      life: 40 + Math.random() * 120,
      jx: 0, jy: 0,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.06,
    };
  }
  registerEffect('glitch-creep', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(120,180,180,.07) 0%, transparent 55%), '
      + 'linear-gradient(172deg, #141d22 0%, #0d161b 55%, #0a1014 100%), #060a0d',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.life > 0);
      ps.forEach(p => {
        p.life--;
        p.phase += p.freq;
        if (Math.random() < 0.25) { p.jx = -3 + Math.random() * 6; p.jy = -3 + Math.random() * 6; }
      });
      return ps;
    },
    draw(ctx, p) {
      const flick = Math.random() < 0.6 ? 1 : 0.15;
      const a = p.base * flick * Math.min(1, p.life / 30);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.bad ? '#e0584c' : '#a8c4c2';
      ctx.fillRect(p.x + p.jx, p.y + p.jy, p.r * 1.6, p.r * 1.6);
      ctx.restore();
    },
  });

})();
