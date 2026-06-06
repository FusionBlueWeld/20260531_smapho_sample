/* 第九章の演出 — 試飲は大好評。あたたかな歓声(かんせい)の金色の光。 */
(function () {

  // ── 美味しいコーヒーに沸く人だかり。ほっと温かい光の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.1, vy: -(0.03 + Math.random() * 0.1),
      base: 0.08 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.016,
      col: Math.random() > 0.4 ? '#e0b878' : '#caa05c',
    };
  }
  registerEffect('coffee-cheers', {
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(200,150,90,.12) 0%, transparent 54%), '
      + 'linear-gradient(170deg, #2c2316 0%, #211910 55%, #150f0a 100%), #100a06',
    step(ps, { H }) {
      if (ps.length < 44 && Math.random() < 0.44) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
