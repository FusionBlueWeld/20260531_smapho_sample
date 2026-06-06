/* 第八章の演出 — 引越しの段ボールから舞う、乾いた埃。少し落ち着かない空気。 */
(function () {

  // ── 段ボールの埃が、ふわりと宙に舞う ────────────────────
  function spawnDust() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.18,
      base: 0.1 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      freq: 0.006 + Math.random() * 0.012,
    };
  }
  registerEffect('dusty-boxes', {
    bg: 'radial-gradient(ellipse at 50% 10%, rgba(210,180,130,.10) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #2a2418 0%, #1c1810 64%, #12100a 100%), #18140d',
    step(ps, { W, H }) {
      while (ps.length < 40) ps.push(spawnDust());
      ps.forEach(p => {
        p.phase += p.freq;
        p.x += p.vx + Math.sin(p.phase) * 0.12;
        p.y += p.vy + Math.cos(p.phase * 0.8) * 0.1;
        if (p.x < -6) p.x = W + 6; if (p.x > W + 6) p.x = -6;
        if (p.y < -6) p.y = H + 6; if (p.y > H + 6) p.y = -6;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#d8c4a0';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
