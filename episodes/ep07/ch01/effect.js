/* Source: episodes/ep07/ch01/effect.js */

/* Effects from ep07/ch01. */
/* 第一章の演出。 */
(function () {

  // ── 祭りを待つ谷、昼下がり：色布と花粉が暖かな光の中を漂う ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    const cols = ['#e8d49a', '#d8a0b0', '#a8d0b8', '#e6c070'];
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vx: -0.06 + Math.random() * 0.2, vy: -0.04 - Math.random() * 0.12,
      base: 0.08 + Math.random() * 0.22,
      col: cols[(Math.random() * cols.length) | 0],
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.012,
    };
  }
  registerEffect('festival-air', {
    bg: 'radial-gradient(ellipse at 70% 28%, rgba(230,200,120,.12) 0%, transparent 58%), '
      + 'linear-gradient(170deg, #4c4326 0%, #2f3320 55%, #1e2614 100%), #16190d',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.5) ps.push(spawn());
      ps = ps.filter(p => p.y > -20 && p.x > -20 && p.x < W + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();

/* Effects from ep07/ch02. */
/* 第二章の演出。 */
(function () {

  // ── 踏み鳴らす広場：地から噴き上がり、陽に金色(こんじき)に輝く土埃 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10 + Math.random() * 30,
      r: 0.6 + Math.random() * 2.2,
      vx: -0.1 + Math.random() * 0.2, vy: -0.25 - Math.random() * 0.55,
      base: 0.07 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.014,
    };
  }
  registerEffect('dance-dust', {
    bg: 'radial-gradient(ellipse at 50% 95%, rgba(235,190,90,.16) 0%, transparent 60%), '
      + 'linear-gradient(175deg, #5a4824 0%, #3a2c14 55%, #23190c 100%), #18110a',
    step(ps, { W, H }) {
      if (ps.length < 56 && Math.random() < 0.65) ps.push(spawn());
      ps = ps.filter(p => p.y > -30 && p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.18; p.y += p.vy; p.vy *= 0.992; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#e6c074';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep07/ch02/effect.js */

/* Effects from ep07/ch03. */
/* 第三章の演出。 */
(function () {

  // ── 疑いの揺らぎ：気だるい陽炎(かげろう)のように、まばらに昇る熱の粒 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.4 + Math.random() * H * 0.6,
      r: 0.5 + Math.random() * 1.4,
      vy: -0.04 - Math.random() * 0.1,
      base: 0.05 + Math.random() * 0.16,
      sway: 0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2, freq: 0.003 + Math.random() * 0.009,
    };
  }
  registerEffect('doubt-haze', {
    bg: 'radial-gradient(ellipse at 50% 65%, rgba(180,150,90,.07) 0%, transparent 60%), '
      + 'linear-gradient(180deg, #3a3322 0%, #261f14 55%, #1a150d 100%), #14100a',
    step(ps, { W, H }) {
      if (ps.length < 38 && Math.random() < 0.4) ps.push(spawn());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += Math.sin(p.phase) * p.sway; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c4a86e';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();

/* Effects from ep07/ch04. */
/* 第四章の演出（2種）。 */
(function () {

  // ── 欠けた月の川岸：水面に砕け、ゆるやかに流れる銀の光 ──
  function spawnRiver() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: -20, y: H * 0.5 + Math.random() * H * 0.5,
      r: 0.5 + Math.random() * 1.6,
      vx: 0.15 + Math.random() * 0.4, vy: -0.02 + Math.random() * 0.04,
      base: 0.06 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('moon-river', {
    bg: 'radial-gradient(ellipse at 30% 18%, rgba(170,190,220,.10) 0%, transparent 52%), '
      + 'linear-gradient(180deg, #1a2333 0%, #10161f 55%, #0a0d14 100%), #070a0f',
    step(ps, { W, H }) {
      if (ps.length < 46 && Math.random() < 0.55) ps.push(spawnRiver());
      ps = ps.filter(p => p.x < W + 20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.05; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c0d4ec';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 響かぬ祭り：動きを失い、宙に取り残された灰色の塵 ──
  function spawnHollow() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.5,
      vy: 0.01 + Math.random() * 0.04, vx: -0.02 + Math.random() * 0.04,
      base: 0.05 + Math.random() * 0.14,
      phase: Math.random() * Math.PI * 2, freq: 0.002 + Math.random() * 0.006,
    };
  }
  registerEffect('hollow-festival', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(120,120,130,.05) 0%, transparent 60%), '
      + 'linear-gradient(180deg, #2a2a2e 0%, #1b1b1f 55%, #131316 100%), #0e0e10',
    step(ps, { W, H }) {
      if (ps.length < 34 && Math.random() < 0.35) ps.push(spawnHollow());
      ps = ps.filter(p => p.y < H + 20 && p.y > -20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#9a9aa2';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
