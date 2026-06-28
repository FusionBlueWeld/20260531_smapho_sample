/* Source: episodes/ep15/ch03/effect.js */

/* 第三章の演出 — シャドーソニック。加速する残像と、白く弾ける衝撃。 */
(function () {

  // ── より速く、より多く走る疾走線。時おり白い火花が弾ける ──
  function spawnLine() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      kind: 'line',
      x: W + 40 + Math.random() * 80, y: Math.random() * H,
      len: 50 + Math.random() * 110,
      vx: -(11 + Math.random() * 9),
      a: 0.06 + Math.random() * 0.18, w: 0.7 + Math.random() * 1.6,
    };
  }
  function spawnSpark() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      kind: 'spark', x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 1.6, a: 0.3 + Math.random() * 0.3,
    };
  }
  registerEffect('zone-burst', {
    bg: 'radial-gradient(ellipse at 50% 45%, rgba(90,180,240,.13) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #0d1d2e 0%, #08121f 55%, #050912 100%), #03060d',
    step(ps, { W, H }) {
      if (ps.length < 64 && Math.random() < 0.78) ps.push(spawnLine());
      if (Math.random() < 0.10) ps.push(spawnSpark());
      ps = ps.filter(p => p.kind === 'spark' ? p.a > 0.02 : p.x > -160);
      ps.forEach(p => { if (p.kind === 'spark') p.a *= 0.9; else p.x += p.vx; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      if (p.kind === 'spark') {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = '#eaf6ff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.globalAlpha = p.a;
        ctx.strokeStyle = '#8fd4f4';
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.len, p.y);
        ctx.stroke();
      }
      ctx.restore();
    },
  });

})();
