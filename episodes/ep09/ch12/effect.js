/* 第十二章の演出 — 特異点の収束と爆発。中心へ集まり、白く弾ける。 */
(function () {

  // ── すべての特異点が中心の一点へ吸い寄せられ、強烈に明滅する ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.max(W, H) * (0.3 + Math.random() * 0.4);
    return {
      cx: W * 0.5, cy: H * 0.46,
      x: W * 0.5 + Math.cos(ang) * rad,
      y: H * 0.46 + Math.sin(ang) * rad,
      r: 0.8 + Math.random() * 2.0,
      pull: 0.01 + Math.random() * 0.02,
      base: 0.12 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.05,
      col: Math.random() > 0.5 ? '#ffffff' : '#cfe0ff',
    };
  }
  registerEffect('singularity-burst', {
    bg: 'radial-gradient(circle at 50% 46%, rgba(255,255,255,.2) 0%, rgba(160,170,255,.1) 12%, transparent 40%), '
      + 'linear-gradient(160deg, #14122e 0%, #0a0820 52%, #050310 100%), #03020c',
    step(ps, { W, H }) {
      if (ps.length < 64 && Math.random() < 0.65) ps.push(spawn());
      ps.forEach(p => {
        p.x += (p.cx - p.x) * p.pull; p.y += (p.cy - p.y) * p.pull; p.phase += p.freq;
      });
      ps = ps.filter(p => Math.hypot(p.x - p.cx, p.y - p.cy) > 3);
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = '#dfe6ff'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
