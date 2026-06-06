/* 第六章の演出。 */
(function () {

  // ── 第六章の１：休憩室の昼。やわらかな緑の燐光（バイオラボ夜とは別の静けさ）──
  function spawnDrift() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.12, vy: -(0.03 + Math.random() * 0.1),
      base: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.016,
    };
  }
  registerEffect('biolab-night', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(60,180,140,.08) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 46%, #0c1c18 0%, #081310 60%, #040b09 100%), #030806',
    step(ps, { H }) {
      if (ps.length < 48 && Math.random() < 0.34) ps.push(spawnDrift());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#6fd8ac';
      ctx.shadowColor = '#6fd8ac'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第六章の２：終わらない夜。コードの行が静かに流れ落ちる、青い設計図の光 ──
  function spawnLine() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W,
      y: -Math.random() * window.innerHeight,
      w: 12 + Math.random() * 60,
      speed: 0.4 + Math.random() * 1.3,
      base: 0.08 + Math.random() * 0.2,
    };
  }
  registerEffect('midnight-blueprint', {
    bg: 'repeating-linear-gradient(0deg, transparent 0, transparent 33px, rgba(70,130,200,.04) 33px, rgba(70,130,200,.04) 34px), '
      + 'radial-gradient(ellipse at 50% 50%, #0a1422 0%, #060d18 62%, #03070f 100%), #02060c',
    step(ps, { H }) {
      if (ps.length < 40 && Math.random() < 0.4) ps.push(spawnLine());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.speed; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.strokeStyle = '#5a9be0'; ctx.lineWidth = 1;
      ctx.shadowColor = '#5a9be0'; ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.w, p.y); ctx.stroke();
      ctx.restore();
    },
  });

})();
