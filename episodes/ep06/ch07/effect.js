/* 第七章の演出。 */
(function () {

  // ── 友の死、止まった刻：木洩れ日の中を、音もなく舞い落ちる蒼白(そうはく)の光 ──
  function spawn() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -10,
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.08, vy: 0.12 + Math.random() * 0.22,
      base: 0.06 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.003 + Math.random() * 0.008,
    };
  }
  registerEffect('requiem', {
    bg: 'radial-gradient(ellipse at 48% 32%, rgba(170,190,210,.08) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #1c222a 0%, #141921 55%, #0c0f15 100%), #090b10',
    step(ps, { W, H }) {
      if (ps.length < 40 && Math.random() < 0.42) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.07; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#cdd8e2';
      ctx.shadowColor = 'rgba(205,216,226,.5)'; ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
