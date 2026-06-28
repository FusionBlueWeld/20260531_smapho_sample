/* Source: episodes/ep11/ch07/effect.js */

/* 第七章の演出 — じゃれ遊びの羽根が、ふわりふわりと宙を舞う。 */
(function () {

  // ── ひらひらと不規則に舞い落ちる羽根 ────────────────────
  function spawnFeather() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -14,
      len: 9 + Math.random() * 10,
      vy: 0.35 + Math.random() * 0.6,
      base: 0.22 + Math.random() * 0.3,
      angle: Math.random() * Math.PI * 2,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.02 + Math.random() * 0.03,
      spin: (Math.random() - 0.5) * 0.04,
      warm: Math.random() > 0.6,
    };
  }
  registerEffect('feather-play', {
    bg: 'radial-gradient(ellipse at 50% 12%, rgba(255,225,180,.12) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #261f16 0%, #18130c 64%, #100c07 100%), #14100a',
    step(ps, { H }) {
      if (ps.length < 14 && Math.random() < 0.1) ps.push(spawnFeather());
      ps = ps.filter(p => p.y < H + 16);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 1.1;
        p.y += p.vy;
        p.angle += p.spin + Math.sin(p.sway) * 0.02;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.globalAlpha = p.base;
      ctx.fillStyle = p.warm ? '#f6e2b8' : '#eef0f4';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.len * 0.32, p.len, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = p.base * 0.5;
      ctx.strokeStyle = '#c8b890';
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(0, -p.len); ctx.lineTo(0, p.len); ctx.stroke();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch08/effect.js */

/* 第八章の演出 — 引越しの段ボールから舞う、乾いた埃。少し落ち着かない空気。 */
(function () {

  // ── 段ボールの埃が、ふわりと宙に舞う ────────────────────
  function spawnDust() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.18,
      base: 0.1 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      freq: 0.006 + Math.random() * 0.012,
    };
  }
  registerEffect('dusty-boxes', {
    bg: 'radial-gradient(ellipse at 50% 10%, rgba(210,180,130,.10) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #2a2418 0%, #1c1810 64%, #12100a 100%), #18140d',
    step(ps, { W, H }) {
      while (ps.length < 40) ps.push(spawnDust());
      ps.forEach(p => {
        p.phase += p.freq;
        p.x += p.vx + Math.sin(p.phase) * 0.12;
        p.y += p.vy + Math.cos(p.phase * 0.8) * 0.1;
        if (p.x < -6) p.x = W + 6; if (p.x > W + 6) p.x = -6;
        if (p.y < -6) p.y = H + 6; if (p.y > H + 6) p.y = -6;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#d8c4a0';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch09/effect.js */

/* 第九章の演出 — 新居のウッドデッキ。夕暮れの庭に舞う木の葉。 */
(function () {

  // ── 夕風に乗って、ゆっくり舞い落ちる木の葉 ──────────────
  function spawnLeaf() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -16,
      r: 4 + Math.random() * 5,
      vy: 0.4 + Math.random() * 0.7,
      base: 0.28 + Math.random() * 0.3,
      angle: Math.random() * Math.PI * 2,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.018 + Math.random() * 0.025,
      spin: (Math.random() - 0.5) * 0.05,
      hue: ['#e0a85a', '#d88a48', '#c8b060'][Math.floor(Math.random() * 3)],
    };
  }
  registerEffect('new-terrace', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(220,140,60,.30) 0%, rgba(150,80,30,.12) 32%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 45%, #2a2012 0%, #1c150c 60%, #120d07 100%), #17110a',
    step(ps, { H }) {
      if (ps.length < 16 && Math.random() < 0.12) ps.push(spawnLeaf());
      ps = ps.filter(p => p.y < H + 18);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 0.9;
        p.y += p.vy;
        p.angle += p.spin;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.globalAlpha = p.base;
      ctx.fillStyle = p.hue;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  });

})();
