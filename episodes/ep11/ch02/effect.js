/* Source: episodes/ep11/ch04/effect.js */

/* 第四章の演出 — 夜の室内。テレビの光がほのかに揺れる、くつろぎの薄明かり。 */
(function () {

  // ── 暗い部屋にゆっくり明滅する、画面の灯りのような光球 ────
  function spawnGlow() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * 0.3 + Math.random() * H * 0.6,
      r: 30 + Math.random() * 70,
      base: 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      freq: 0.004 + Math.random() * 0.008,
      drift: (Math.random() - 0.5) * 0.08,
      hue: Math.random() > 0.5 ? '#7fb0d8' : '#d8b87f',
    };
  }
  registerEffect('cozy-dim', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(120,160,200,.07) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 60%, #18160f 0%, #100e09 64%, #090804 100%), #0c0a06',
    step(ps) {
      while (ps.length < 7) ps.push(spawnGlow());
      ps.forEach(p => { p.x += p.drift; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.hue); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch05/effect.js */

/* 第五章の演出 — 朝のキッチン。明るい光と、ほかほかと立ちのぼる湯気。 */
(function () {

  // ── ゆらゆらと立ちのぼる、あたたかな湯気 ──────────────────
  function spawnSteam() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: W * (0.2 + Math.random() * 0.6), y: H + 10,
      r: 8 + Math.random() * 16,
      vy: -0.3 - Math.random() * 0.5,
      base: 0.06 + Math.random() * 0.08,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.015 + Math.random() * 0.02,
      grow: 0.04 + Math.random() * 0.05,
    };
  }
  registerEffect('morning-kitchen', {
    bg: 'radial-gradient(ellipse at 70% 8%, rgba(255,235,180,.20) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #2c2818 0%, #1e1a10 62%, #14100a 100%), #1a160e',
    step(ps) {
      if (ps.length < 16 && Math.random() < 0.3) ps.push(spawnSteam());
      ps = ps.filter(p => p.y > -p.r && p.base > 0.005);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        p.r += p.grow;
        p.base *= 0.992;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, '#fff6e2'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep11/ch06/effect.js */

/* 第六章の演出 — 窓ガラスを流れ落ちる雨だれ。 */
(function () {

  // ── ガラスを伝って落ちる雨粒。たまに膨らみ、つっと走る ────
  function spawnDrop() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W, y: -10,
      r: 1.2 + Math.random() * 2.4,
      vy: 0,
      accel: 0.02 + Math.random() * 0.05,
      maxv: 1.2 + Math.random() * 2.6,
      base: 0.1 + Math.random() * 0.18,
      wait: Math.random() * 120,
    };
  }
  registerEffect('rain-window', {
    bg: 'radial-gradient(ellipse at 50% 0%, rgba(150,180,210,.08) 0%, transparent 45%), '
      + 'radial-gradient(ellipse at 50% 55%, #161c24 0%, #0e1218 64%, #080b10 100%), #0c1016',
    step(ps, { H }) {
      if (ps.length < 38 && Math.random() < 0.4) ps.push(spawnDrop());
      ps = ps.filter(p => p.y < H + 12);
      ps.forEach(p => {
        if (p.wait > 0) { p.wait--; return; }
        p.vy = Math.min(p.vy + p.accel, p.maxv);
        p.y += p.vy;
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.base;
      ctx.strokeStyle = '#bcd4ec';
      ctx.lineWidth = p.r;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y - p.vy * 3 - p.r);
      ctx.stroke();
      ctx.globalAlpha = p.base * 1.4;
      ctx.fillStyle = '#d4e6f8';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.9, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
