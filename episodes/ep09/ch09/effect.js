/* 第九章の演出 — 空間の歪み。波打つように左右へ揺れる光の格子。 */
(function () {

  // ── うねる壁。横方向に正弦波で揺れながら浮遊する粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x0: Math.random() * W, y: Math.random() * H,
      amp: 8 + Math.random() * 30,
      r: 0.7 + Math.random() * 1.6,
      vy: -(0.03 + Math.random() * 0.12),
      base: 0.08 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.012 + Math.random() * 0.03,
      col: Math.random() > 0.5 ? '#a6b6ff' : '#c89cff',
    };
  }
  registerEffect('space-warp', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(120,120,220,.12) 0%, transparent 60%), '
      + 'linear-gradient(170deg, #181430 0%, #100e24 55%, #080614 100%), #050410',
    step(ps, { H }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      const x = p.x0 + Math.sin(t * p.freq * 2 + p.phase) * p.amp;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
