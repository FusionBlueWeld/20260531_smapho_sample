/* Source: episodes/ep01/ch04/effect.js */

/* 第四章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {
  const W = () => window.innerWidth, H = () => window.innerHeight;

  // ── 第四章の１：暖かな家の灯り（佳作の知らせ） ─────────────
  function warmMote() {
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1.6 + Math.random() * 3, base: 0.2 + Math.random() * 0.36,
      phase: Math.random() * 6.28, freq: 0.008 + Math.random() * 0.014,
      vy: -(0.06 + Math.random() * 0.18), vx: (Math.random() - 0.5) * 0.12 };
  }
  registerEffect('c4-warm', {
    bg: 'radial-gradient(ellipse at 50% 94%, rgba(255,180,100,.22) 0%, rgba(170,90,40,.08) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 42%, #2a1c10 0%, #1a1008 62%, #0e0804 100%), #160d06',
    step(ps) {
      if (ps.length < 26 && Math.random() < 0.16) ps.push(warmMote());
      ps = ps.filter(p => p.y > -8); ps.forEach(p => { p.y += p.vy; p.x += p.vx; });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffd49a'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の２・８：美術室、水彩の滲み（新たな居場所 他） ───
  const AQUA = ['#7fc4e0', '#9ed8c0', '#b0c0ef', '#cfa7d8', '#86d0d8'];
  function bloom() {
    return { x: Math.random() * W(), y: Math.random() * H(), r: 6 + Math.random() * 16,
      base: 0.05 + Math.random() * 0.08, phase: Math.random() * 6.28, freq: 0.004 + Math.random() * 0.01,
      vy: (Math.random() - 0.5) * 0.12, vx: (Math.random() - 0.5) * 0.12,
      col: AQUA[(Math.random() * AQUA.length) | 0] };
  }
  registerEffect('c4-atelier', {
    bg: 'radial-gradient(ellipse at 32% 20%, rgba(150,210,235,.12) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #14222a 0%, #0d161d 62%, #070d12 100%), #0b141a',
    step(ps) {
      while (ps.length < 18) ps.push(bloom());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx;
        if (p.x < -20 || p.x > W() + 20 || p.y < -20 || p.y > H() + 20) { p.x = Math.random() * W(); p.y = Math.random() * H(); } });
      return ps;
    },
    draw(c, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.col); g.addColorStop(1, 'transparent');
      c.save(); c.globalAlpha = a; c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の３：表彰台のスポットライト（表彰台にて） ────────
  function beam() {
    return { x: W() * (0.3 + Math.random() * 0.4), width: 24 + Math.random() * 36,
      baseAlpha: 0.03 + Math.random() * 0.05, angle: (Math.random() - 0.5) * 0.16,
      phase: Math.random() * 6.28, speed: 0.0015 + Math.random() * 0.0025,
      life: 0, maxLife: 460 + Math.random() * 360 };
  }
  registerEffect('c4-stage', {
    bg: 'radial-gradient(ellipse at 50% 0%, rgba(255,240,200,.22) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 58%, #1c1d2c 0%, #111119 62%, #08080f 100%), #0c0c16',
    step(ps) {
      if (ps.length < 5 && Math.random() < 0.01) ps.push(beam());
      ps = ps.filter(p => p.life < p.maxLife); ps.forEach(p => p.life++);
      return ps;
    },
    draw(c, p, { t }) {
      const fade = Math.min(p.life / 120, 1) * Math.min((p.maxLife - p.life) / 120, 1);
      const sh = 0.65 + 0.35 * Math.sin(t * p.speed + p.phase);
      c.save(); c.globalAlpha = p.baseAlpha * fade * sh;
      c.translate(p.x, 0); c.rotate(p.angle);
      const g = c.createLinearGradient(-p.width / 2, 0, p.width / 2, 0);
      g.addColorStop(0, 'transparent'); g.addColorStop(0.5, '#fff2cc'); g.addColorStop(1, 'transparent');
      c.fillStyle = g; c.fillRect(-p.width / 2, 0, p.width, H() * 1.6); c.restore();
    },
  });

  // ── 第四章の４・６・７：秋、舞い散る紅葉（文化祭 他） ───────
  const AUT = ['#e8893a', '#d6603a', '#e8c24a', '#c87a35', '#b8513a'];
  function aleaf() {
    return { x: Math.random() * W(), y: -10, r: 3.5 + Math.random() * 4,
      vy: 0.5 + Math.random() * 1, vx: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.05,
      alpha: 0.4 + Math.random() * 0.35, col: AUT[(Math.random() * AUT.length) | 0] };
  }
  registerEffect('c4-autumn', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(230,160,80,.18) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #271708 0%, #190f05 60%, #0d0703 100%), #170e06',
    step(ps, { H }) {
      if (ps.length < 16 && Math.random() < 0.12) ps.push(aleaf());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.013 + p.r) * 0.4; p.angle += p.va; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.translate(p.x, p.y); c.rotate(p.angle); c.globalAlpha = p.alpha;
      c.fillStyle = p.col; c.beginPath(); c.ellipse(0, 0, p.r, p.r * 0.48, 0, 0, 6.283); c.fill();
      c.globalAlpha = p.alpha * 0.4; c.fillStyle = '#ffe8c0';
      c.beginPath(); c.ellipse(0, 0, p.r * 0.4, p.r * 0.2, 0, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の５：すれ違う影（希美の影） ─────────────────────
  function tension() {
    return { x: Math.random() * W(), y: -50, r: 44 + Math.random() * 80,
      vy: 0.16 + Math.random() * 0.3, vx: (Math.random() - 0.5) * 0.12,
      alpha: 0.035 + Math.random() * 0.05, life: 0, maxLife: 720 + Math.random() * 400 };
  }
  registerEffect('c4-shadow', {
    bg: 'radial-gradient(ellipse at 50% 48%, #1b1f29 0%, #11141b 60%, #080a0e 100%), #0a0c11',
    step(ps) {
      if (ps.length < 10 && Math.random() < 0.03) ps.push(tension());
      ps = ps.filter(p => p.life < p.maxLife); ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.life++; });
      return ps;
    },
    draw(c, p) {
      const fade = Math.min(p.life / 130, 1) * Math.min((p.maxLife - p.life) / 130, 1);
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, 'rgba(18,20,28,' + p.alpha * fade + ')'); g.addColorStop(1, 'transparent');
      c.save(); c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の８：穏やかな光（蒼のままで、光を描く） ─────────
  function calmMote() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 1.4 + Math.random() * 2.8, base: 0.16 + Math.random() * 0.3,
      phase: Math.random() * 6.28, freq: 0.006 + Math.random() * 0.012,
      vy: -(0.04 + Math.random() * 0.12), vx: (Math.random() - 0.5) * 0.1 };
  }
  registerEffect('c4-calm', {
    bg: 'radial-gradient(ellipse at 60% 26%, rgba(255,210,140,.13) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #221a18 0%, #15100e 62%, #0a0706 100%), #130e0b',
    step(ps) {
      while (ps.length < 22) ps.push(calmMote());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; if (p.y < -5) { p.y = H() + 5; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffe2b0'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

})();


/* Source: episodes/ep01/ch04b/effect.js */

/* 第四章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {
  const W = () => window.innerWidth, H = () => window.innerHeight;

  // ── 第四章の１：暖かな家の灯り（佳作の知らせ） ─────────────
  function warmMote() {
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1.6 + Math.random() * 3, base: 0.2 + Math.random() * 0.36,
      phase: Math.random() * 6.28, freq: 0.008 + Math.random() * 0.014,
      vy: -(0.06 + Math.random() * 0.18), vx: (Math.random() - 0.5) * 0.12 };
  }
  registerEffect('c4-warm', {
    bg: 'radial-gradient(ellipse at 50% 94%, rgba(255,180,100,.22) 0%, rgba(170,90,40,.08) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 42%, #2a1c10 0%, #1a1008 62%, #0e0804 100%), #160d06',
    step(ps) {
      if (ps.length < 26 && Math.random() < 0.16) ps.push(warmMote());
      ps = ps.filter(p => p.y > -8); ps.forEach(p => { p.y += p.vy; p.x += p.vx; });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffd49a'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の２・８：美術室、水彩の滲み（新たな居場所 他） ───
  const AQUA = ['#7fc4e0', '#9ed8c0', '#b0c0ef', '#cfa7d8', '#86d0d8'];
  function bloom() {
    return { x: Math.random() * W(), y: Math.random() * H(), r: 6 + Math.random() * 16,
      base: 0.05 + Math.random() * 0.08, phase: Math.random() * 6.28, freq: 0.004 + Math.random() * 0.01,
      vy: (Math.random() - 0.5) * 0.12, vx: (Math.random() - 0.5) * 0.12,
      col: AQUA[(Math.random() * AQUA.length) | 0] };
  }
  registerEffect('c4-atelier', {
    bg: 'radial-gradient(ellipse at 32% 20%, rgba(150,210,235,.12) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #14222a 0%, #0d161d 62%, #070d12 100%), #0b141a',
    step(ps) {
      while (ps.length < 18) ps.push(bloom());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx;
        if (p.x < -20 || p.x > W() + 20 || p.y < -20 || p.y > H() + 20) { p.x = Math.random() * W(); p.y = Math.random() * H(); } });
      return ps;
    },
    draw(c, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.col); g.addColorStop(1, 'transparent');
      c.save(); c.globalAlpha = a; c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の３：表彰台のスポットライト（表彰台にて） ────────
  function beam() {
    return { x: W() * (0.3 + Math.random() * 0.4), width: 24 + Math.random() * 36,
      baseAlpha: 0.03 + Math.random() * 0.05, angle: (Math.random() - 0.5) * 0.16,
      phase: Math.random() * 6.28, speed: 0.0015 + Math.random() * 0.0025,
      life: 0, maxLife: 460 + Math.random() * 360 };
  }
  registerEffect('c4-stage', {
    bg: 'radial-gradient(ellipse at 50% 0%, rgba(255,240,200,.22) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 58%, #1c1d2c 0%, #111119 62%, #08080f 100%), #0c0c16',
    step(ps) {
      if (ps.length < 5 && Math.random() < 0.01) ps.push(beam());
      ps = ps.filter(p => p.life < p.maxLife); ps.forEach(p => p.life++);
      return ps;
    },
    draw(c, p, { t }) {
      const fade = Math.min(p.life / 120, 1) * Math.min((p.maxLife - p.life) / 120, 1);
      const sh = 0.65 + 0.35 * Math.sin(t * p.speed + p.phase);
      c.save(); c.globalAlpha = p.baseAlpha * fade * sh;
      c.translate(p.x, 0); c.rotate(p.angle);
      const g = c.createLinearGradient(-p.width / 2, 0, p.width / 2, 0);
      g.addColorStop(0, 'transparent'); g.addColorStop(0.5, '#fff2cc'); g.addColorStop(1, 'transparent');
      c.fillStyle = g; c.fillRect(-p.width / 2, 0, p.width, H() * 1.6); c.restore();
    },
  });

  // ── 第四章の４・６・７：秋、舞い散る紅葉（文化祭 他） ───────
  const AUT = ['#e8893a', '#d6603a', '#e8c24a', '#c87a35', '#b8513a'];
  function aleaf() {
    return { x: Math.random() * W(), y: -10, r: 3.5 + Math.random() * 4,
      vy: 0.5 + Math.random() * 1, vx: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.05,
      alpha: 0.4 + Math.random() * 0.35, col: AUT[(Math.random() * AUT.length) | 0] };
  }
  registerEffect('c4-autumn', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(230,160,80,.18) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #271708 0%, #190f05 60%, #0d0703 100%), #170e06',
    step(ps, { H }) {
      if (ps.length < 16 && Math.random() < 0.12) ps.push(aleaf());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.013 + p.r) * 0.4; p.angle += p.va; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.translate(p.x, p.y); c.rotate(p.angle); c.globalAlpha = p.alpha;
      c.fillStyle = p.col; c.beginPath(); c.ellipse(0, 0, p.r, p.r * 0.48, 0, 0, 6.283); c.fill();
      c.globalAlpha = p.alpha * 0.4; c.fillStyle = '#ffe8c0';
      c.beginPath(); c.ellipse(0, 0, p.r * 0.4, p.r * 0.2, 0, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の５：すれ違う影（希美の影） ─────────────────────
  function tension() {
    return { x: Math.random() * W(), y: -50, r: 44 + Math.random() * 80,
      vy: 0.16 + Math.random() * 0.3, vx: (Math.random() - 0.5) * 0.12,
      alpha: 0.035 + Math.random() * 0.05, life: 0, maxLife: 720 + Math.random() * 400 };
  }
  registerEffect('c4-shadow', {
    bg: 'radial-gradient(ellipse at 50% 48%, #1b1f29 0%, #11141b 60%, #080a0e 100%), #0a0c11',
    step(ps) {
      if (ps.length < 10 && Math.random() < 0.03) ps.push(tension());
      ps = ps.filter(p => p.life < p.maxLife); ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.life++; });
      return ps;
    },
    draw(c, p) {
      const fade = Math.min(p.life / 130, 1) * Math.min((p.maxLife - p.life) / 130, 1);
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, 'rgba(18,20,28,' + p.alpha * fade + ')'); g.addColorStop(1, 'transparent');
      c.save(); c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第四章の８：穏やかな光（蒼のままで、光を描く） ─────────
  function calmMote() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 1.4 + Math.random() * 2.8, base: 0.16 + Math.random() * 0.3,
      phase: Math.random() * 6.28, freq: 0.006 + Math.random() * 0.012,
      vy: -(0.04 + Math.random() * 0.12), vx: (Math.random() - 0.5) * 0.1 };
  }
  registerEffect('c4-calm', {
    bg: 'radial-gradient(ellipse at 60% 26%, rgba(255,210,140,.13) 0%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 55%, #221a18 0%, #15100e 62%, #0a0706 100%), #130e0b',
    step(ps) {
      while (ps.length < 22) ps.push(calmMote());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; if (p.y < -5) { p.y = H() + 5; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffe2b0'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

})();
