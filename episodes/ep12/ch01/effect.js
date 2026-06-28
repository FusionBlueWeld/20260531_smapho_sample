/* Source: episodes/ep12/ch01/effect.js */

/* 第一章の演出 — 薄暗い実験室。計器のかすかな点滅と冷たい光。 */
(function () {

  // ── 暗がりにぽつぽつと灯る、計器のインジケータ ──────────
  function spawnBlink() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 1.6,
      base: 0.12 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
      freq: 0.01 + Math.random() * 0.04,
      green: Math.random() > 0.45,
    };
  }
  registerEffect('dim-lab', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(120,180,180,.07) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #14181c 0%, #0c0f12 64%, #07090b 100%), #0a0c0e',
    step(ps) {
      while (ps.length < 30) ps.push(spawnBlink());
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.3 + 0.7 * Math.pow(Math.max(0, Math.sin(t * p.freq + p.phase)), 3));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.green ? '#7fe0c0' : '#d88080';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = a * 0.4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep12/ch02/effect.js */

/* 第二章の演出 — 籠の中の薄明かり。格子の影と、ただよう塵。 */
(function () {

  // ── ゆっくり漂う塵と、ときおりよぎる格子の気配 ──────────
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1,
      base: 0.08 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      freq: 0.005 + Math.random() * 0.01,
    };
  }
  registerEffect('cage-dim', {
    bg: 'repeating-linear-gradient(90deg, transparent 0 46px, rgba(150,160,170,.05) 46px 48px), '
      + 'radial-gradient(ellipse at 50% 40%, rgba(150,170,180,.05) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #15161a 0%, #0d0e11 64%, #08090b 100%), #0b0c0f',
    step(ps, { W, H }) {
      while (ps.length < 34) ps.push(spawnMote());
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -4) p.x = W + 4; if (p.x > W + 4) p.x = -4;
        if (p.y < -4) p.y = H + 4; if (p.y > H + 4) p.y = -4;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c0c8cc';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep12/ch03/effect.js */

/* 第三章の演出 — 暗がりの彼方に、ただ一つ、にじむ太陽のような遠い光。
 * 太陽そのものは背景グラデーションに焼き込み、漂う塵がほのかな揺らぎを添える。 */
(function () {

  function spawnFleck() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.4 + Math.random() * 1,
      base: 0.06 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      freq: 0.006 + Math.random() * 0.012,
    };
  }
  registerEffect('distant-sun', {
    bg: 'radial-gradient(circle at 78% 22%, rgba(255,210,120,.16) 0%, rgba(200,150,70,.05) 12%, transparent 30%), '
      + 'radial-gradient(ellipse at 50% 55%, #121318 0%, #0a0b0f 64%, #060709 100%), #090a0d',
    step(ps) {
      while (ps.length < 26) ps.push(spawnFleck());
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#cfd6dc';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
