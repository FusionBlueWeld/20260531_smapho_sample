/* Source: episodes/ep11/ch01/effect.js */

/* 第一章の演出 — 窓辺の陽だまりに漂う埃（ほこり）。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。 */
(function () {

  // ── 窓から差す午前の陽と、その中を漂う埃の粒 ──────────────
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 0.18,
      rise: -0.05 - Math.random() * 0.12,
      base: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('sunbeam-motes', {
    bg: 'linear-gradient(115deg, rgba(255,220,140,.10) 0 30%, transparent 30% 100%), '
      + 'radial-gradient(ellipse at 78% 12%, rgba(255,210,120,.22) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #2a2415 0%, #1a160c 62%, #100d06 100%), #161208',
    step(ps, { H }) {
      while (ps.length < 46) ps.push(spawnMote());
      ps.forEach(p => {
        p.x += p.drift + Math.sin(p.y * 0.01 + p.phase) * 0.12;
        p.y += p.rise;
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * window.innerWidth; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffe6a8';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch02/effect.js */

/* 第二章の演出 — 取り込んだ洗濯物から舞う、やわらかな綿ぼこり。 */
(function () {

  // ── ふわふわと宙を漂う白い綿毛・繊維 ──────────────────────
  function spawnFluff() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 1.4 + Math.random() * 3.2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.08 - Math.random() * 0.22,
      base: 0.16 + Math.random() * 0.28,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('fluff-drift', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(255,240,210,.12) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #232014 0%, #16140c 64%, #0e0c06 100%), #14110a',
    step(ps, { W, H }) {
      while (ps.length < 30) ps.push(spawnFluff());
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += p.vx + Math.sin(p.sway) * 0.4;
        p.y += p.vy;
        if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.fillStyle = '#fdf6ea';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = p.base * 0.4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 1.9, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch03/effect.js */

/* 第三章の演出 — 庭にそよぐ風と、舞い上がる花粉や小さな花びら。 */
(function () {

  // ── 陽光の庭を漂う花粉・小さな種子 ────────────────────────
  function spawnSeed() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10,
      r: 1 + Math.random() * 2.2,
      vx: 0.2 + Math.random() * 0.6,
      vy: -0.15 - Math.random() * 0.35,
      base: 0.2 + Math.random() * 0.3,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.012 + Math.random() * 0.022,
      warm: Math.random() > 0.5,
    };
  }
  registerEffect('garden-breeze', {
    bg: 'radial-gradient(ellipse at 30% 10%, rgba(180,230,140,.14) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 80% 20%, rgba(255,225,120,.16) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 60%, #1f2c14 0%, #14200c 62%, #0c1406 100%), #121c0a',
    step(ps, { W }) {
      if (ps.length < 34 && Math.random() < 0.5) ps.push(spawnSeed());
      ps = ps.filter(p => p.y > -12 && p.x < W + 12);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += p.vx + Math.sin(p.sway) * 0.5;
        p.y += p.vy + Math.cos(p.sway * 0.7) * 0.2;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.fillStyle = p.warm ? '#fff0b0' : '#d8f0a8';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
