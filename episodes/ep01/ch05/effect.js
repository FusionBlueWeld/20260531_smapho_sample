/* Source: episodes/ep01/ch05/effect.js */

/* 第五章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {
  const W = () => window.innerWidth, H = () => window.innerHeight;

  // ── 第五章の１・４：冬の中で揺れる炎（冬の炎／揺れる炎） ────
  function ember() {
    const blue = Math.random() > 0.78;
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1 + Math.random() * 2.4, base: 0.3 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.02 + Math.random() * 0.04,
      vy: -(0.3 + Math.random() * 0.7), vx: (Math.random() - 0.5) * 0.2,
      sway: Math.random() * 6.28, col: blue ? '#86b6ff' : (Math.random() > 0.5 ? '#ff9a52' : '#ffcf6a') };
  }
  registerEffect('c5-ember', {
    bg: 'radial-gradient(ellipse at 50% 98%, rgba(255,140,60,.16) 0%, rgba(120,60,20,.06) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 42%, #141a2c 0%, #0d1120 60%, #060810 100%), #080b16',
    step(ps) {
      if (ps.length < 32 && Math.random() < 0.3) ps.push(ember());
      ps = ps.filter(p => p.y > -10);
      ps.forEach(p => { p.sway += 0.05; p.y += p.vy; p.x += p.vx + Math.sin(p.sway) * 0.3; });
      return ps;
    },
    draw(c, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      c.save(); c.globalAlpha = a; c.fillStyle = p.col;
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.5; c.fillStyle = '#fff2dc';
      c.beginPath(); c.arc(p.x, p.y, p.r * 0.45, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の２・６：降る雪（初雪の日／祈りの時間） ─────────
  function flake() {
    return { x: Math.random() * W(), y: -10, r: 1 + Math.random() * 2.4,
      vy: 0.35 + Math.random() * 0.95, vx: (Math.random() - 0.5) * 0.3,
      sway: Math.random() * 6.28, alpha: 0.4 + Math.random() * 0.45 };
  }
  registerEffect('c5-snow', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(180,205,240,.16) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #18202f 0%, #101724 60%, #080d16 100%), #0c1320',
    step(ps, { H }) {
      if (ps.length < 40 && Math.random() < 0.3) ps.push(flake());
      ps = ps.filter(p => p.y < H + 12);
      ps.forEach(p => { p.sway += 0.02; p.y += p.vy; p.x += p.vx + Math.sin(p.sway) * 0.4; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.globalAlpha = p.alpha; c.fillStyle = '#eaf2ff';
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の３：冬の図書室、最後の勉強会（最後の勉強会） ────
  function libMote() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 1.4 + Math.random() * 2.8, base: 0.16 + Math.random() * 0.3,
      phase: Math.random() * 6.28, freq: 0.006 + Math.random() * 0.012,
      vy: -(0.04 + Math.random() * 0.12), vx: (Math.random() - 0.5) * 0.1 };
  }
  registerEffect('c5-library', {
    bg: 'radial-gradient(ellipse at 72% 24%, rgba(255,200,120,.12) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #221c1a 0%, #15110f 62%, #0a0807 100%), #120e0c',
    step(ps) {
      while (ps.length < 22) ps.push(libMote());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; if (p.y < -5) { p.y = H() + 5; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffdca0'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の５：クリスマスのイルミネーション（お守り） ─────
  const XMAS = ['#ff6f7a', '#7fe0a0', '#ffd86a', '#7fbfff', '#e6a3ff', '#ff9f5c'];
  function light() {
    const snow = Math.random() < 0.3;
    return { snow, x: Math.random() * W(), y: snow ? -10 : Math.random() * H(),
      r: snow ? 1 + Math.random() * 1.8 : 2.5 + Math.random() * 6,
      base: snow ? 0.5 : 0.25 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.012 + Math.random() * 0.03,
      vy: snow ? 0.4 + Math.random() * 0.7 : (Math.random() - 0.5) * 0.08,
      vx: (Math.random() - 0.5) * 0.12, sway: Math.random() * 6.28,
      col: XMAS[(Math.random() * XMAS.length) | 0] };
  }
  registerEffect('c5-illumi', {
    bg: 'radial-gradient(ellipse at 50% 92%, rgba(255,170,90,.16) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 40%, #14122a 0%, #0c0a1c 60%, #050410 100%), #07061a',
    step(ps, { H }) {
      while (ps.length < 34) ps.push(light());
      ps = ps.filter(p => !(p.snow && p.y > H + 12));
      ps.forEach(p => { p.sway += 0.02; p.y += p.vy; p.x += p.vx + (p.snow ? Math.sin(p.sway) * 0.3 : 0);
        if (p.snow && p.y > H + 12) { p.y = -10; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      if (p.snow) { c.save(); c.globalAlpha = p.base; c.fillStyle = '#eef4ff';
        c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore(); return; }
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.col); g.addColorStop(0.6, p.col); g.addColorStop(1, 'transparent');
      c.save(); c.globalAlpha = a; c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の７：暁を待つ炎（合格、夕暮れの完成） ───────────
  function dawnEmber() {
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1 + Math.random() * 2.2, base: 0.3 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.018 + Math.random() * 0.035,
      vy: -(0.25 + Math.random() * 0.6), vx: (Math.random() - 0.5) * 0.18,
      sway: Math.random() * 6.28, col: Math.random() > 0.7 ? '#86b6ff' : '#ffb46a' };
  }
  registerEffect('c5-dawn', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,160,90,.26) 0%, rgba(200,90,60,.1) 32%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 28%, #1c2342 0%, #161a34 56%, #0f1228 100%), #11163a',
    step(ps) {
      if (ps.length < 28 && Math.random() < 0.26) ps.push(dawnEmber());
      ps = ps.filter(p => p.y > -10);
      ps.forEach(p => { p.sway += 0.045; p.y += p.vy; p.x += p.vx + Math.sin(p.sway) * 0.28; });
      return ps;
    },
    draw(c, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      c.save(); c.globalAlpha = a; c.fillStyle = p.col;
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.5; c.fillStyle = '#fff0d6';
      c.beginPath(); c.arc(p.x, p.y, p.r * 0.45, 0, 6.283); c.fill(); c.restore();
    },
  });

})();


/* Source: episodes/ep01/ch05b/effect.js */

/* 第五章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {
  const W = () => window.innerWidth, H = () => window.innerHeight;

  // ── 第五章の１・４：冬の中で揺れる炎（冬の炎／揺れる炎） ────
  function ember() {
    const blue = Math.random() > 0.78;
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1 + Math.random() * 2.4, base: 0.3 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.02 + Math.random() * 0.04,
      vy: -(0.3 + Math.random() * 0.7), vx: (Math.random() - 0.5) * 0.2,
      sway: Math.random() * 6.28, col: blue ? '#86b6ff' : (Math.random() > 0.5 ? '#ff9a52' : '#ffcf6a') };
  }
  registerEffect('c5-ember', {
    bg: 'radial-gradient(ellipse at 50% 98%, rgba(255,140,60,.16) 0%, rgba(120,60,20,.06) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 42%, #141a2c 0%, #0d1120 60%, #060810 100%), #080b16',
    step(ps) {
      if (ps.length < 32 && Math.random() < 0.3) ps.push(ember());
      ps = ps.filter(p => p.y > -10);
      ps.forEach(p => { p.sway += 0.05; p.y += p.vy; p.x += p.vx + Math.sin(p.sway) * 0.3; });
      return ps;
    },
    draw(c, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      c.save(); c.globalAlpha = a; c.fillStyle = p.col;
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.5; c.fillStyle = '#fff2dc';
      c.beginPath(); c.arc(p.x, p.y, p.r * 0.45, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の２・６：降る雪（初雪の日／祈りの時間） ─────────
  function flake() {
    return { x: Math.random() * W(), y: -10, r: 1 + Math.random() * 2.4,
      vy: 0.35 + Math.random() * 0.95, vx: (Math.random() - 0.5) * 0.3,
      sway: Math.random() * 6.28, alpha: 0.4 + Math.random() * 0.45 };
  }
  registerEffect('c5-snow', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(180,205,240,.16) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #18202f 0%, #101724 60%, #080d16 100%), #0c1320',
    step(ps, { H }) {
      if (ps.length < 40 && Math.random() < 0.3) ps.push(flake());
      ps = ps.filter(p => p.y < H + 12);
      ps.forEach(p => { p.sway += 0.02; p.y += p.vy; p.x += p.vx + Math.sin(p.sway) * 0.4; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.globalAlpha = p.alpha; c.fillStyle = '#eaf2ff';
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の３：冬の図書室、最後の勉強会（最後の勉強会） ────
  function libMote() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 1.4 + Math.random() * 2.8, base: 0.16 + Math.random() * 0.3,
      phase: Math.random() * 6.28, freq: 0.006 + Math.random() * 0.012,
      vy: -(0.04 + Math.random() * 0.12), vx: (Math.random() - 0.5) * 0.1 };
  }
  registerEffect('c5-library', {
    bg: 'radial-gradient(ellipse at 72% 24%, rgba(255,200,120,.12) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #221c1a 0%, #15110f 62%, #0a0807 100%), #120e0c',
    step(ps) {
      while (ps.length < 22) ps.push(libMote());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; if (p.y < -5) { p.y = H() + 5; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffdca0'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の５：クリスマスのイルミネーション（お守り） ─────
  const XMAS = ['#ff6f7a', '#7fe0a0', '#ffd86a', '#7fbfff', '#e6a3ff', '#ff9f5c'];
  function light() {
    const snow = Math.random() < 0.3;
    return { snow, x: Math.random() * W(), y: snow ? -10 : Math.random() * H(),
      r: snow ? 1 + Math.random() * 1.8 : 2.5 + Math.random() * 6,
      base: snow ? 0.5 : 0.25 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.012 + Math.random() * 0.03,
      vy: snow ? 0.4 + Math.random() * 0.7 : (Math.random() - 0.5) * 0.08,
      vx: (Math.random() - 0.5) * 0.12, sway: Math.random() * 6.28,
      col: XMAS[(Math.random() * XMAS.length) | 0] };
  }
  registerEffect('c5-illumi', {
    bg: 'radial-gradient(ellipse at 50% 92%, rgba(255,170,90,.16) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 40%, #14122a 0%, #0c0a1c 60%, #050410 100%), #07061a',
    step(ps, { H }) {
      while (ps.length < 34) ps.push(light());
      ps = ps.filter(p => !(p.snow && p.y > H + 12));
      ps.forEach(p => { p.sway += 0.02; p.y += p.vy; p.x += p.vx + (p.snow ? Math.sin(p.sway) * 0.3 : 0);
        if (p.snow && p.y > H + 12) { p.y = -10; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      if (p.snow) { c.save(); c.globalAlpha = p.base; c.fillStyle = '#eef4ff';
        c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore(); return; }
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.col); g.addColorStop(0.6, p.col); g.addColorStop(1, 'transparent');
      c.save(); c.globalAlpha = a; c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第五章の７：暁を待つ炎（合格、夕暮れの完成） ───────────
  function dawnEmber() {
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1 + Math.random() * 2.2, base: 0.3 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.018 + Math.random() * 0.035,
      vy: -(0.25 + Math.random() * 0.6), vx: (Math.random() - 0.5) * 0.18,
      sway: Math.random() * 6.28, col: Math.random() > 0.7 ? '#86b6ff' : '#ffb46a' };
  }
  registerEffect('c5-dawn', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,160,90,.26) 0%, rgba(200,90,60,.1) 32%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 28%, #1c2342 0%, #161a34 56%, #0f1228 100%), #11163a',
    step(ps) {
      if (ps.length < 28 && Math.random() < 0.26) ps.push(dawnEmber());
      ps = ps.filter(p => p.y > -10);
      ps.forEach(p => { p.sway += 0.045; p.y += p.vy; p.x += p.vx + Math.sin(p.sway) * 0.28; });
      return ps;
    },
    draw(c, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      c.save(); c.globalAlpha = a; c.fillStyle = p.col;
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.5; c.fillStyle = '#fff0d6';
      c.beginPath(); c.arc(p.x, p.y, p.r * 0.45, 0, 6.283); c.fill(); c.restore();
    },
  });

})();
