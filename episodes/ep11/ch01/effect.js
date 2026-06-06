/* 第一章の演出 — 窓辺の陽だまりに漂う埃（ほこり）。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。 */
(function () {

  // ── 窓から差す午前の陽と、その中を漂う埃の粒 ──────────────
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 0.18,
      rise: -0.05 - Math.random() * 0.12,
      base: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('sunbeam-motes', {
    bg: 'linear-gradient(115deg, rgba(255,220,140,.10) 0 30%, transparent 30% 100%), '
      + 'radial-gradient(ellipse at 78% 12%, rgba(255,210,120,.22) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #2a2415 0%, #1a160c 62%, #100d06 100%), #161208',
    step(ps, { H }) {
      while (ps.length < 46) ps.push(spawnMote());
      ps.forEach(p => {
        p.x += p.drift + Math.sin(p.y * 0.01 + p.phase) * 0.12;
        p.y += p.rise;
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * window.innerWidth; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffe6a8';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
