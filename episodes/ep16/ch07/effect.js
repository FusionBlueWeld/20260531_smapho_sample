/* 第七章の演出 — デバッグ戦闘。高速で交錯する青白い軌跡と、弾ける火花。 */
(function () {

  // ── 高速で走る疾走線と、衝突で弾ける白い火花 ──
  function spawnLine() {
    const W = window.innerWidth, H = window.innerHeight;
    const dir = Math.random() < 0.5 ? -1 : 1;
    return {
      kind: 'line',
      x: dir < 0 ? W + 40 + Math.random() * 70 : -40 - Math.random() * 70,
      y: Math.random() * H,
      len: 40 + Math.random() * 100,
      vx: dir * (10 + Math.random() * 9),
      a: 0.06 + Math.random() * 0.16, w: 0.7 + Math.random() * 1.4,
    };
  }
  function spawnSpark() {
    const W = window.innerWidth, H = window.innerHeight;
    return { kind: 'spark', x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 1.8, a: 0.3 + Math.random() * 0.3 };
  }
  registerEffect('debug-combat', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(90,190,220,.12) 0%, transparent 56%), '
      + 'linear-gradient(170deg, #0c1f2a 0%, #07141d 55%, #040b12 100%), #02070c',
    step(ps, { W, H }) {
      if (ps.length < 70 && Math.random() < 0.82) ps.push(spawnLine());
      if (Math.random() < 0.12) ps.push(spawnSpark());
      ps = ps.filter(p => p.kind === 'spark' ? p.a > 0.02 : (p.x > -180 && p.x < W + 180));
      ps.forEach(p => { if (p.kind === 'spark') p.a *= 0.88; else p.x += p.vx; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      if (p.kind === 'spark') {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = '#eaf8ff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.globalAlpha = p.a;
        ctx.strokeStyle = '#86d2ec';
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + (p.vx < 0 ? p.len : -p.len), p.y);
        ctx.stroke();
      }
      ctx.restore();
    },
  });

})();
