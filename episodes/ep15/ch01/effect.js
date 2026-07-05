/* Source: episodes/ep15/ch01/effect.js */

/* 第一章の演出 — 熱気こもる体育館。汗と熱が立ちのぼる、橙色のゆらぎ。 */
(function () {

  // ── 床から立ちのぼる、汗と熱気の微粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 16 + Math.random() * 30,
      r: 0.7 + Math.random() * 1.7,
      vx: -0.08 + Math.random() * 0.16, vy: -(0.18 + Math.random() * 0.5),
      base: 0.08 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('court-heat', {
    bg: 'radial-gradient(ellipse at 50% 16%, rgba(255,190,110,.12) 0%, transparent 55%), '
      + 'linear-gradient(172deg, #2e1d10 0%, #1f140b 55%, #150d07 100%), #0d0804',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.45) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.07; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffc070';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep15/ch02/effect.js */

/* 第二章の演出 — ゾーンの覚醒。コートを切り裂く、冷たい青の疾走線。 */
(function () {

  // ── 高速で横に走る、影のような残像（スピードライン）──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: W + 40 + Math.random() * 60, y: Math.random() * H,
      len: 30 + Math.random() * 70,
      vx: -(7 + Math.random() * 6),
      a: 0.05 + Math.random() * 0.14, w: 0.6 + Math.random() * 1.2,
    };
  }
  registerEffect('zone-speed', {
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(80,170,230,.10) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #0c1a28 0%, #08111c 55%, #050a12 100%), #03060c',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.x > -120);
      ps.forEach(p => { p.x += p.vx; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.strokeStyle = '#7ec8f0';
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.len, p.y);
      ctx.stroke();
      ctx.restore();
    },
  });

})();


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
