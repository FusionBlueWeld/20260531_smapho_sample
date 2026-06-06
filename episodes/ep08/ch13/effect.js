/* 第十三章の演出。 */
(function () {

  // ── エピローグの星空：穏やかに瞬く星と、ときおり流れる一筋の光 ──
  function spawnStar() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      kind: 'star',
      x: Math.random() * W, y: Math.random() * H * 0.85,
      r: 0.5 + Math.random() * 1.6,
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.03,
    };
  }
  function spawnShoot() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      kind: 'shoot',
      x: W * (0.3 + Math.random() * 0.6), y: -10,
      vx: -3 - Math.random() * 2, vy: 3 + Math.random() * 2,
      len: 30 + Math.random() * 40,
      base: 0.5 + Math.random() * 0.4,
      life: 0, ttl: 40 + Math.random() * 20,
    };
  }
  registerEffect('starry-finale', {
    bg: 'radial-gradient(ellipse at 50% 95%, rgba(120,150,200,.08) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #16203a 0%, #0d1428 55%, #070a16 100%), #04060e',
    step(ps, { W, H }) {
      const stars = ps.filter(p => p.kind === 'star').length;
      if (stars < 70 && Math.random() < 0.5) ps.push(spawnStar());
      if (Math.random() < 0.012) ps.push(spawnShoot());
      ps = ps.filter(p => p.kind === 'star' ? true : (p.life < p.ttl && p.x > -80 && p.y < H + 40));
      ps.forEach(p => {
        if (p.kind === 'shoot') { p.x += p.vx; p.y += p.vy; p.life++; }
        else { p.phase += p.freq; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.kind === 'shoot') {
        const k = 1 - p.life / p.ttl;
        ctx.globalAlpha = p.base * k;
        ctx.strokeStyle = '#dfe9ff'; ctx.lineWidth = 1.4;
        ctx.shadowColor = '#bcd0ff'; ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx / Math.hypot(p.vx, p.vy) * p.len, p.y - p.vy / Math.hypot(p.vx, p.vy) * p.len);
        ctx.stroke();
      } else {
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = p.base * tw;
        ctx.fillStyle = '#e6eeff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
