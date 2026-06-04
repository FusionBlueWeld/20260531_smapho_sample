/* 第三章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {
  const W = () => window.innerWidth, H = () => window.innerHeight;

  // ── 第三章の１：夏の強い日差し（夏への決意） ───────────────
  function sunMote() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 1 + Math.random() * 2.6, base: 0.2 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.006 + Math.random() * 0.016,
      vy: -(0.05 + Math.random() * 0.2), vx: (Math.random() - 0.5) * 0.25 };
  }
  registerEffect('c3-summer', {
    bg: 'radial-gradient(ellipse at 50% 4%, rgba(255,225,140,.24) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 58%, #103030 0%, #0a2222 60%, #061414 100%), #0a2020',
    step(ps) {
      while (ps.length < 28) ps.push(sunMote());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; if (p.y < -5) { p.y = H() + 5; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#fff0b0'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第三章の２・３・６：美術室、絵の具の色（光を描く 他） ────
  const PIG = ['#ffb27a', '#7fb0e0', '#e0a0c0', '#9ed0a0', '#ffd980', '#c89bff'];
  function pigment() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 2 + Math.random() * 4, base: 0.15 + Math.random() * 0.3,
      phase: Math.random() * 6.28, freq: 0.005 + Math.random() * 0.012,
      vy: (Math.random() - 0.5) * 0.18, vx: (Math.random() - 0.5) * 0.18,
      col: PIG[(Math.random() * PIG.length) | 0] };
  }
  registerEffect('c3-atelier', {
    bg: 'radial-gradient(ellipse at 30% 18%, rgba(255,200,120,.14) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #241a2a 0%, #15101c 62%, #0b0810 100%), #130e1a',
    step(ps) {
      while (ps.length < 22) ps.push(pigment());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx;
        if (p.x < 0 || p.x > W() || p.y < 0 || p.y > H()) { p.x = Math.random() * W(); p.y = Math.random() * H(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = p.col; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第三章の４：スランプの闇（闇の中で） ───────────────────
  function dark() {
    return { x: Math.random() * W(), y: -50, r: 50 + Math.random() * 90,
      vy: 0.18 + Math.random() * 0.32, vx: (Math.random() - 0.5) * 0.1,
      alpha: 0.04 + Math.random() * 0.06, life: 0, maxLife: 800 + Math.random() * 400 };
  }
  registerEffect('c3-slump', {
    bg: 'radial-gradient(ellipse at 50% 45%, #14161f 0%, #0b0c12 58%, #050609 100%), #06070b',
    step(ps) {
      if (ps.length < 9 && Math.random() < 0.028) ps.push(dark());
      ps = ps.filter(p => p.life < p.maxLife); ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.life++; });
      return ps;
    },
    draw(c, p) {
      const fade = Math.min(p.life / 140, 1) * Math.min((p.maxLife - p.life) / 140, 1);
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, 'rgba(8,9,14,' + p.alpha * fade + ')'); g.addColorStop(1, 'transparent');
      c.save(); c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第三章の５：夏祭りの花火（夏祭りの夜） ─────────────────
  const FW = ['#ff7a8a', '#ffd86a', '#7fd0ff', '#9ee37d', '#ffa45c', '#e6a3ff'];
  function burst(ps) {
    const cx = W() * (0.2 + Math.random() * 0.6), cy = H() * (0.08 + Math.random() * 0.32);
    const col = FW[(Math.random() * FW.length) | 0], n = 26 + ((Math.random() * 10) | 0);
    const sp = 1.1 + Math.random() * 1.6;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283 + Math.random() * 0.1, s = sp * (0.6 + Math.random() * 0.6);
      ps.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        r: 1 + Math.random() * 1.4, col, life: 0, maxLife: 60 + Math.random() * 40 });
    }
  }
  registerEffect('c3-fireworks', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,150,60,.22) 0%, rgba(150,70,20,.08) 26%, transparent 52%), '
      + 'radial-gradient(ellipse at 50% 36%, #0a0a22 0%, #06061a 60%, #030310 100%), #04040f',
    step(ps) {
      if (ps.length < 90 && Math.random() < 0.05) burst(ps);
      ps = ps.filter(p => p.life < p.maxLife);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.022; p.vx *= 0.99; p.life++; });
      return ps;
    },
    draw(c, p) {
      const a = Math.min((p.maxLife - p.life) / p.maxLife, 1);
      c.save(); c.globalAlpha = a; c.fillStyle = p.col;
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.4; c.fillStyle = '#fff6e0';
      c.beginPath(); c.arc(p.x, p.y, p.r * 0.5, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第三章の７：澄んだ秋空、新学期（光の先へ） ─────────────
  function clearMote() {
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1.3 + Math.random() * 2.4, base: 0.18 + Math.random() * 0.32,
      phase: Math.random() * 6.28, freq: 0.007 + Math.random() * 0.013,
      vy: -(0.07 + Math.random() * 0.18), vx: (Math.random() - 0.5) * 0.14 };
  }
  registerEffect('c3-clear', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(150,200,255,.2) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #142238 0%, #0d182a 60%, #070e1a 100%), #0b1626',
    step(ps) {
      if (ps.length < 24 && Math.random() < 0.15) ps.push(clearMote());
      ps = ps.filter(p => p.y > -8); ps.forEach(p => { p.y += p.vy; p.x += p.vx; });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#d6e8ff'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

})();
