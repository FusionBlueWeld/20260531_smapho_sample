/* Source: episodes/ep09/ch05/effect.js */

/* 第五章の演出 — 位相的欠陥。中心へ吸い込まれる赤い不穏な明滅。 */
(function () {

  // ── 画面中央の一点へ、ゆっくり引き寄せられていく粒（破れの予兆）──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.max(W, H) * (0.4 + Math.random() * 0.3);
    return {
      cx: W * 0.5, cy: H * 0.42,
      x: W * 0.5 + Math.cos(ang) * rad,
      y: H * 0.42 + Math.sin(ang) * rad,
      r: 0.7 + Math.random() * 1.6,
      pull: 0.0018 + Math.random() * 0.003,
      base: 0.08 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.03,
      col: Math.random() > 0.45 ? '#e0607a' : '#b06cff',
    };
  }
  registerEffect('topological-flaw', {
    bg: 'radial-gradient(circle at 50% 42%, rgba(220,80,110,.16) 0%, rgba(120,40,90,.06) 20%, transparent 46%), '
      + 'linear-gradient(170deg, #1c1226 0%, #110a1a 55%, #08060e 100%), #060409',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawn());
      ps.forEach(p => {
        p.x += (p.cx - p.x) * p.pull; p.y += (p.cy - p.y) * p.pull; p.phase += p.freq;
      });
      ps = ps.filter(p => Math.hypot(p.x - p.cx, p.y - p.cy) > 6);
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
