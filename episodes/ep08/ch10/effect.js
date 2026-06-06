/* 第十章の演出。 */
(function () {

  // ── 因縁(いんねん)の再会、酒場のざわめき：火花のように散ってすぐ消える小さな光 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      vx: -0.3 + Math.random() * 0.6, vy: -0.2 + Math.random() * 0.4,
      base: 0.08 + Math.random() * 0.22,
      life: 0, ttl: 40 + Math.random() * 50,
      hot: Math.random() < 0.5,
    };
  }
  registerEffect('rival-clash', {
    bg: 'radial-gradient(ellipse at 50% 55%, rgba(200,120,60,.08) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #3a2a1e 0%, #261a12 55%, #18100a 100%), #110b07',
    step(ps, { W, H }) {
      if (ps.length < 46 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.life < p.ttl);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy *= 0.97; p.life++; });
      return ps;
    },
    draw(ctx, p) {
      const k = 1 - p.life / p.ttl;
      ctx.save();
      ctx.globalAlpha = p.base * k;
      ctx.fillStyle = p.hot ? '#ffb24a' : '#ffe08a';
      ctx.shadowColor = '#ff9a3a'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * k, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
