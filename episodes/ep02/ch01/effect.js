/* Source: episodes/ep02/ch01/effect.js */

/* 第一章の演出。registerEffect(name, { bg, step, draw }) でエンジンに登録する。
 * 描画ループ／canvas管理／ページのくり抜きは index.html の汎用エンジンが担当。 */
(function () {

  // ── 第一章の１：黄昏の都市消失。砂粒が宙へ吸い上げられ渦を巻く ──
  function spawnGrain() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H * (0.55 + Math.random() * 0.5),
      r: 0.6 + Math.random() * 1.6,
      vy: -(0.3 + Math.random() * 0.9), vx: (Math.random() - 0.5) * 0.3,
      swirl: Math.random() * Math.PI * 2, sw: 0.01 + Math.random() * 0.02,
      alpha: 0.3 + Math.random() * 0.5, warm: Math.random() > 0.5,
      life: 0, maxLife: 200 + Math.random() * 180,
    };
  }
  registerEffect('disappearance-dusk', {
    bg: 'radial-gradient(ellipse at 50% 92%, rgba(232,128,60,.30) 0%, rgba(150,60,30,.12) 26%, transparent 54%), '
      + 'radial-gradient(ellipse at 50% 38%, #2a2546 0%, #15172e 58%, #0a0b1a 100%), #080913',
    step(ps, { H }) {
      if (ps.length < 70 && Math.random() < 0.5) ps.push(spawnGrain());
      ps = ps.filter(p => p.life < p.maxLife && p.y > -20);
      ps.forEach(p => {
        p.life++; p.swirl += p.sw;
        p.y += p.vy; p.x += p.vx + Math.sin(p.swirl) * 0.6;
        p.vy -= 0.002;
      });
      return ps;
    },
    draw(ctx, p) {
      const fade = Math.min(p.life / 40, 1) * Math.min((p.maxLife - p.life) / 60, 1);
      ctx.save();
      ctx.globalAlpha = p.alpha * fade;
      ctx.fillStyle = p.warm ? '#f0b87a' : '#c8d4ee';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第一章の２：追悼。立ち上る灰／燠火の粒 ──────────────
  function spawnAsh() {
    return {
      x: Math.random() * window.innerWidth, y: window.innerHeight + 10,
      r: 0.7 + Math.random() * 1.4,
      vy: -(0.2 + Math.random() * 0.5), vx: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.02,
      base: 0.18 + Math.random() * 0.32, ember: Math.random() > 0.7,
    };
  }
  registerEffect('memorial-ash', {
    bg: 'radial-gradient(ellipse at 50% 108%, rgba(150,55,20,.34) 0%, rgba(70,25,8,.14) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 45%, #1a1410 0%, #0e0a08 62%, #070504 100%), #0a0806',
    step(ps, { H }) {
      if (ps.length < 40 && Math.random() < 0.18) ps.push(spawnAsh());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * freqWobble(p)) * 0.3; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.55 + 0.45 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.ember ? '#e87838' : '#8a7a70';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });
  function freqWobble(p) { return 0.012 + (p.freq - 0.01) * 0.4; }

  // ── 第一章の３：予測の科学。高次元の青いデータ格子 ─────────
  function spawnNode() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.5,
      base: 0.25 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.03,
      drift: (Math.random() - 0.5) * 0.12,
    };
  }
  registerEffect('quantum-grid', {
    bg: 'repeating-linear-gradient(0deg, transparent 0, transparent 43px, rgba(90,150,230,.05) 43px, rgba(90,150,230,.05) 44px), '
      + 'repeating-linear-gradient(90deg, transparent 0, transparent 43px, rgba(90,150,230,.05) 43px, rgba(90,150,230,.05) 44px), '
      + 'radial-gradient(ellipse at 50% 42%, #0e1d33 0%, #081424 60%, #040a14 100%), #050b16',
    step(ps, { W }) {
      while (ps.length < 60) ps.push(spawnNode());
      ps.forEach(p => { p.x += p.drift; if (p.x > W + 5) p.x = -5; if (p.x < -5) p.x = W + 5; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#7fd0ff';
      ctx.shadowColor = '#7fd0ff'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
