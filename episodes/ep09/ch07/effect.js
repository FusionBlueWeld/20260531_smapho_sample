/* 第七章の演出 — コーディング。緑のコードが縦に降る、端末の光。 */
(function () {

  // ── ターミナルの文字列のように、上から下へ流れ落ちる緑の点列 ──
  function spawn() {
    const W = window.innerWidth;
    return {
      x: Math.floor(Math.random() * (W / 14)) * 14 + 7,
      y: -10,
      r: 0.8 + Math.random() * 1.2,
      v: 1.2 + Math.random() * 2.4,
      base: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.04 + Math.random() * 0.08,
    };
  }
  registerEffect('sim-code', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(60,160,110,.08) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #0d1612 0%, #0a110e 55%, #060a08 100%), #040705',
    step(ps, { H }) {
      if (ps.length < 56 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.v; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#6fe6a0';
      ctx.shadowColor = '#6fe6a0'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
