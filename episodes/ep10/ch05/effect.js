/* 第五章の演出 — 突然のポップミュージック。弾ける音符のような光。 */
(function () {

  // ── 爆音ポップス！ ぴょんぴょん跳ねるカラフルな音符の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const cols = ['#ff6b9d', '#ffd23f', '#5ad1ff', '#9cff7a', '#c08bff'];
    return {
      x: Math.random() * W, y: H + 10,
      r: 1.2 + Math.random() * 2.6,
      vx: (Math.random() - 0.5) * 0.5, vy: -(0.6 + Math.random() * 1.4),
      base: 0.14 + Math.random() * 0.36,
      col: cols[(Math.random() * cols.length) | 0],
      phase: Math.random() * Math.PI * 2, freq: 0.04 + Math.random() * 0.08,
      bob: 14 + Math.random() * 24,
    };
  }
  registerEffect('pop-music-burst', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(255,120,180,.14) 0%, rgba(120,90,200,.07) 36%, transparent 62%), '
      + 'linear-gradient(150deg, #2a1830 0%, #1e1228 55%, #120a18 100%), #0c0612',
    step(ps, { H }) {
      if (ps.length < 56 && Math.random() < 0.62) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.abs(Math.sin(t * p.freq + p.phase)));
      const x = p.x + Math.sin(t * p.freq * 1.5 + p.phase) * p.bob;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
