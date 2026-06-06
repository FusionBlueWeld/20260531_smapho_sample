/* 第六章の演出。 */
(function () {

  // ── 雑木林の逃走：ぬかるみを蹴り、跳ね散る泥と、降りかかる小枝 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const fromBottom = Math.random() < 0.6;
    return fromBottom
      ? { x: Math.random() * W, y: H + 6, r: 0.6 + Math.random() * 1.6,
          vx: (Math.random() - 0.5) * 1.0, vy: -1.0 - Math.random() * 1.4,
          base: 0.08 + Math.random() * 0.22, g: 0.05 + Math.random() * 0.04,
          phase: Math.random() * Math.PI * 2, freq: 0.02, mud: true }
      : { x: Math.random() * W, y: -8, r: 0.5 + Math.random() * 1.3,
          vx: (Math.random() - 0.5) * 0.3, vy: 0.5 + Math.random() * 0.9,
          base: 0.06 + Math.random() * 0.2, g: 0,
          phase: Math.random() * Math.PI * 2, freq: 0.01, mud: false };
  }
  registerEffect('thicket-run', {
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(90,110,70,.07) 0%, transparent 55%), '
      + 'linear-gradient(170deg, #28301f 0%, #1a2014 55%, #101509 100%), #0c1006',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.7) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 30 && p.y > -30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.6 + 0.4 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.mud ? '#5a4a32' : '#7a8a5e';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
