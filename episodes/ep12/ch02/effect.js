/* Source: episodes/ep12/ch04/effect.js */

/* 第四章の演出 — 無機質な箱の中。冷たく沈んだ闇に、わずかな金属の反射。 */
(function () {

  // ── ごくまれに、金属の縁がにぶく光る ──────────────────────
  function spawnGlint() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      len: 10 + Math.random() * 26,
      angle: (Math.random() - 0.5) * 0.5 + Math.PI * 0.25,
      base: 0.05 + Math.random() * 0.1,
      life: 0, maxLife: 120 + Math.random() * 160,
    };
  }
  registerEffect('plain-box', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(120,130,140,.04) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #101114 0%, #08090b 66%, #050506 100%), #070809',
    step(ps) {
      if (ps.length < 7 && Math.random() < 0.03) ps.push(spawnGlint());
      ps = ps.filter(p => p.life < p.maxLife);
      ps.forEach(p => p.life++);
      return ps;
    },
    draw(ctx, p) {
      const fade = Math.min(p.life / 40, 1) * Math.min((p.maxLife - p.life) / 40, 1);
      ctx.save();
      ctx.globalAlpha = p.base * fade;
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      const g = ctx.createLinearGradient(-p.len / 2, 0, p.len / 2, 0);
      g.addColorStop(0, 'transparent'); g.addColorStop(0.5, '#a8b4bc'); g.addColorStop(1, 'transparent');
      ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-p.len / 2, 0); ctx.lineTo(p.len / 2, 0); ctx.stroke();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep12/ch05/effect.js */

/* 第五章の演出 — 存在の不確かさ。点が現れては消え、明滅して定まらない。 */
(function () {

  // ── 出現と消滅を繰り返す、確率の粒。実体が定まらない ────
  function spawnQ() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 2.2,
      base: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      freq: 0.02 + Math.random() * 0.06,
      jitter: 0.3 + Math.random() * 0.8,
    };
  }
  registerEffect('uncertain-flux', {
    bg: 'radial-gradient(ellipse at 50% 45%, rgba(120,200,190,.05) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #0e1316 0%, #080b0d 64%, #050607 100%), #070a0c',
    step(ps, { W, H }) {
      while (ps.length < 40) ps.push(spawnQ());
      ps.forEach(p => {
        p.x += (Math.random() - 0.5) * p.jitter;
        p.y += (Math.random() - 0.5) * p.jitter;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      // 確率振幅のように、明滅して実在感が定まらない
      const s = Math.sin(t * p.freq + p.phase);
      const a = p.base * Math.max(0, s) * Math.max(0, s);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#a8e6dc';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep12/ch06/effect.js */

/* 第六章の演出 — 青白い燐光と、向こうに広がる暖かな楽園。
 * 二つの光が重なり合い、生と死の重ね合わせを思わせる。 */
(function () {

  // ── ふわりと浮遊する燐光の珠。青白と、ほのかな暖色が混じる ──
  function spawnOrb() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + Math.random() * 40,
      r: 2 + Math.random() * 5,
      vy: -0.15 - Math.random() * 0.3,
      base: 0.18 + Math.random() * 0.3,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.008 + Math.random() * 0.016,
      warm: Math.random() > 0.5,
    };
  }
  registerEffect('pale-paradise', {
    bg: 'radial-gradient(ellipse at 50% 90%, rgba(255,210,150,.16) 0%, rgba(200,150,90,.06) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 30%, rgba(130,210,220,.12) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #0e1820 0%, #0a1218 62%, #060c10 100%), #081016',
    step(ps, { H }) {
      while (ps.length < 30) ps.push(spawnOrb());
      ps = ps.filter(p => p.y > -10);
      ps.forEach(p => {
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * 0.5;
        p.y += p.vy;
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * 0.01 + p.sway));
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.6);
      g.addColorStop(0, p.warm ? '#ffe2b0' : '#bfeef0');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep12/ch07/effect.js */

/* 第七章の演出 — 蓋が開き、光が差し込む「収束」。
 * 中心へ向かって光条が集まり、すべてが一点に折りたたまれてゆく。 */
(function () {

  function spawnRay() {
    const a = Math.random() * Math.PI * 2;
    return {
      angle: a,
      dist: 0.4 + Math.random() * 0.7,   // 中心からの相対距離(0..1)
      width: 0.04 + Math.random() * 0.07,
      base: 0.05 + Math.random() * 0.12,
      speed: 0.0006 + Math.random() * 0.0014,
      phase: Math.random() * Math.PI * 2,
    };
  }
  registerEffect('collapse-light', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(255,250,235,.14) 0%, rgba(220,225,230,.05) 22%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #14161a 0%, #0b0d10 64%, #07080a 100%), #0a0c0e',
    step(ps) {
      while (ps.length < 16) ps.push(spawnRay());
      ps.forEach(p => {
        p.dist -= p.speed * 60;          // ゆっくり中心へ収束
        if (p.dist < 0.05) { p.dist = 0.4 + Math.random() * 0.7; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      const W = window.innerWidth, H = window.innerHeight;
      const cx = W * 0.5, cy = H * 0.3;
      const shimmer = 0.5 + 0.5 * Math.sin(t * 0.01 + p.phase);
      const r = Math.max(W, H);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.base * shimmer * Math.min(1, p.dist + 0.2);
      const inner = r * 0.05, outer = r * p.dist;
      const g = ctx.createLinearGradient(0, inner, 0, outer);
      g.addColorStop(0, '#fff8ec'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      const w = r * p.width;
      ctx.beginPath();
      ctx.moveTo(-w * 0.2, inner); ctx.lineTo(w * 0.2, inner);
      ctx.lineTo(w, outer); ctx.lineTo(-w, outer);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    },
  });

})();
