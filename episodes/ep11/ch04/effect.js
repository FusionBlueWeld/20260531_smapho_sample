/* Source: episodes/ep11/ch10/effect.js */

/* 第十章の演出 — 雨上がりの夕暮れの庭。淡い靄(もや)と、ちらつく宵の光。 */
(function () {

  // ── 雨上がりの庭に立ちこめる、ほのかな靄 ────────────────
  function spawnHaze() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.5 + Math.random() * H * 0.5,
      r: 40 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.15,
      base: 0.03 + Math.random() * 0.045,
      phase: Math.random() * Math.PI * 2,
      freq: 0.003 + Math.random() * 0.006,
    };
  }
  function spawnSpark() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      spark: true,
      x: Math.random() * W, y: Math.random() * H * 0.8,
      r: 0.5 + Math.random() * 1.2,
      base: 0.15 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      freq: 0.01 + Math.random() * 0.02,
    };
  }
  registerEffect('dusk-garden', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(180,120,90,.22) 0%, rgba(110,70,60,.1) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 45%, #221c20 0%, #16121a 60%, #0e0b12 100%), #130f16',
    step(ps, { W }) {
      while (ps.filter(p => !p.spark).length < 6) ps.push(spawnHaze());
      while (ps.filter(p => p.spark).length < 22) ps.push(spawnSpark());
      ps.forEach(p => {
        if (!p.spark) { p.x += p.vx; if (p.x < -p.r) p.x = W + p.r; if (p.x > W + p.r) p.x = -p.r; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.spark) {
        const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffe0b0';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        const a = p.base * (0.6 + 0.4 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, '#9aa0b0'); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch11/effect.js */

/* 第十一章の演出 — 冷える夜の、あたたかな炉ばたのような、ほのかなぬくもり。 */
(function () {

  // ── 暖色の光がやわらかく明滅する、ぬくもりの粒 ────────────
  function spawnEmber() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.4 + Math.random() * H * 0.6,
      r: 1 + Math.random() * 2.4,
      vy: -0.08 - Math.random() * 0.16,
      vx: (Math.random() - 0.5) * 0.12,
      base: 0.14 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2,
      freq: 0.008 + Math.random() * 0.016,
    };
  }
  registerEffect('hearth-warm', {
    bg: 'radial-gradient(ellipse at 50% 90%, rgba(230,140,70,.20) 0%, rgba(150,80,40,.08) 36%, transparent 62%), '
      + 'radial-gradient(ellipse at 50% 50%, #221a12 0%, #15100a 62%, #0d0906 100%), #120d08',
    step(ps, { H }) {
      while (ps.length < 30) ps.push(spawnEmber());
      ps.forEach(p => {
        p.phase += p.freq;
        p.x += p.vx + Math.sin(p.phase) * 0.1;
        p.y += p.vy;
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * window.innerWidth; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.4);
      g.addColorStop(0, '#ffcf8a'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch12/effect.js */

/* 第十二章の演出 — 穏やかな夜空の星と、足もとに灯る、ぬくもりの残り火。 */
(function () {

  // ── 静かに瞬く星 ────────────────────────────────────────
  function spawnStar() {
    return {
      star: true,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.75,
      r: 0.4 + Math.random() * 1.2,
      base: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      freq: 0.006 + Math.random() * 0.016,
      warm: Math.random() > 0.8,
    };
  }
  // ── 下のほうで揺れる、暖かな灯りの粒 ────────────────────
  function spawnGlow() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.7 + Math.random() * H * 0.3,
      r: 1 + Math.random() * 2,
      vy: -0.05 - Math.random() * 0.1,
      base: 0.12 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      freq: 0.01 + Math.random() * 0.018,
    };
  }
  registerEffect('night-hearthstars', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(220,140,70,.20) 0%, rgba(130,70,35,.08) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 45%, #0e0c1a 0%, #080714 60%, #040310 100%), #050410',
    step(ps, { H }) {
      while (ps.filter(p => p.star).length < 48) ps.push(spawnStar());
      while (ps.filter(p => !p.star).length < 16) ps.push(spawnGlow());
      ps.forEach(p => {
        if (!p.star) {
          p.x += Math.sin(p.phase) * 0.08; p.phase += p.freq; p.y += p.vy;
          if (p.y < H * 0.6) { p.y = H + 4; p.x = Math.random() * window.innerWidth; }
        }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.star) {
        const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = p.warm ? '#ffd8a0' : '#e8eeff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.6);
        g.addColorStop(0, '#ffcf8a'); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
