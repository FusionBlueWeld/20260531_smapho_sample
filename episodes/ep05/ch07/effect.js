/* 第七章の演出。 */
(function () {

  // ── 黄金を追う影：金の輝きに、忍び寄る冷たい影。下降する暗い粒と、まばらな金 ──
  function spawn() {
    const W = window.innerWidth;
    const cold = Math.random() < 0.7;
    return {
      x: Math.random() * W, y: -10,
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.16, vy: 0.25 + Math.random() * 0.5,
      base: 0.06 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.013,
      cold,
    };
  }
  registerEffect('watching-shadow', {
    bg: 'radial-gradient(ellipse at 50% 55%, rgba(240,200,110,.05) 0%, transparent 45%), '
      + 'linear-gradient(180deg, #221d20 0%, #16131a 60%, #0c0a10 100%), #08070b',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      if (p.cold) { ctx.fillStyle = '#5a5560'; }
      else { ctx.fillStyle = '#e6c478'; ctx.shadowColor = 'rgba(230,196,120,.5)'; ctx.shadowBlur = 4; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
