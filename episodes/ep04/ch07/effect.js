/* 第七章の演出。 */
(function () {

  // ── 第七章：灰の夜明け。斜めに差す淡い光条と、北へ流れていく青い光の種 ──
  function spawnSeed() {
    const W = window.innerWidth, H = window.innerHeight;
    const ray = Math.random() > 0.7;
    if (ray) {
      return {
        ray: true,
        x: Math.random() * W, y: -10,
        len: 60 + Math.random() * 120,
        vy: 0.3 + Math.random() * 0.5, vx: 0.12 + Math.random() * 0.2,
        base: 0.03 + Math.random() * 0.07,
      };
    }
    return {
      ray: false,
      x: -10, y: H * (0.2 + Math.random() * 0.6),
      r: 0.7 + Math.random() * 1.6,
      vx: 0.3 + Math.random() * 0.7, vy: -0.05 - Math.random() * 0.1,
      base: 0.18 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.018,
    };
  }
  registerEffect('ashen-dawn', {
    bg: 'linear-gradient(115deg, rgba(170,210,235,.05) 0%, transparent 40%), '
      + 'radial-gradient(ellipse at 70% 18%, rgba(150,200,235,.10) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 60%, #1a2029 0%, #11151c 60%, #0a0d12 100%), #080a0e',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.5) ps.push(spawnSeed());
      ps = ps.filter(p => p.ray ? p.y < H + 30 : p.x < W + 30);
      ps.forEach(p => {
        if (p.ray) { p.y += p.vy; p.x += p.vx; }
        else { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.1; p.phase += p.freq; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.ray) {
        ctx.globalAlpha = p.base;
        const g = ctx.createLinearGradient(p.x, p.y, p.x + p.vx * 30, p.y + p.len);
        g.addColorStop(0, 'rgba(190,220,245,0)');
        g.addColorStop(0.5, 'rgba(190,220,245,0.9)');
        g.addColorStop(1, 'rgba(190,220,245,0)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 30, p.y + p.len); ctx.stroke();
      } else {
        const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#a6dcf2';
        ctx.shadowColor = '#a6dcf2'; ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
