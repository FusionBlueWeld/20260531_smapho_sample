/* 第二章の演出。 */
(function () {

  // ── 第二章の１：怯える街。サイバーパンクの雨とネオンの滲み ──
  function spawnRain() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W * 1.1 - W * 0.05, y: -20,
      len: 12 + Math.random() * 22, vy: 7 + Math.random() * 6,
      alpha: 0.08 + Math.random() * 0.14, neon: Math.random() > 0.82,
    };
  }
  registerEffect('rain-neon', {
    bg: 'radial-gradient(ellipse at 22% 78%, rgba(60,200,220,.12) 0%, transparent 40%), '
      + 'radial-gradient(ellipse at 80% 70%, rgba(230,60,160,.12) 0%, transparent 42%), '
      + 'radial-gradient(ellipse at 50% 40%, #14182a 0%, #0b0e1c 60%, #060810 100%), #05060e',
    step(ps, { H }) {
      if (ps.length < 90 && Math.random() < 0.8) ps.push(spawnRain());
      ps = ps.filter(p => p.y < H + 30);
      ps.forEach(p => { p.y += p.vy; p.x -= 1.1; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = p.neon ? '#5ce0dc' : '#9fb4d8';
      ctx.lineWidth = p.neon ? 1.1 : 0.7;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 1.4, p.y + p.len); ctx.stroke();
      ctx.restore();
    },
  });

  // ── 第二章の２：調査チームの広報。走査線とノイズ信号 ──────
  function spawnPulse() {
    return {
      y: Math.random() * window.innerHeight,
      vy: 0.4 + Math.random() * 1.1,
      alpha: 0.05 + Math.random() * 0.1,
      h: 1 + Math.random() * 2,
    };
  }
  registerEffect('broadcast-scan', {
    bg: 'repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(120,180,255,.035) 3px, rgba(120,180,255,.035) 4px), '
      + 'radial-gradient(ellipse at 50% 45%, #0c1626 0%, #07101c 62%, #040810 100%), #050a12',
    step(ps, { H }) {
      if (ps.length < 14 && Math.random() < 0.2) ps.push(spawnPulse());
      ps = ps.filter(p => p.y < H + 10);
      ps.forEach(p => p.y += p.vy);
      return ps;
    },
    draw(ctx, p, { W }) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      const g = ctx.createLinearGradient(0, p.y, W, p.y);
      g.addColorStop(0, 'transparent'); g.addColorStop(0.5, '#88c0ff'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, p.y, W, p.h);
      ctx.restore();
    },
  });

})();
