/* 第六章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する。
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {
  const W = () => window.innerWidth, H = () => window.innerHeight;

  // ── 第六章の１：春の気配の中で、伝えた想い（伝えたかった言葉） ─
  function springMote() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 1.6 + Math.random() * 3, base: 0.18 + Math.random() * 0.32,
      phase: Math.random() * 6.28, freq: 0.006 + Math.random() * 0.013,
      vy: -(0.05 + Math.random() * 0.15), vx: (Math.random() - 0.5) * 0.12,
      warm: Math.random() > 0.5 };
  }
  registerEffect('c6-spring', {
    bg: 'radial-gradient(ellipse at 50% 96%, rgba(255,180,150,.2) 0%, rgba(200,120,110,.07) 32%, transparent 58%), '
      + 'radial-gradient(ellipse at 50% 40%, #2a2032 0%, #1a1422 60%, #0e0a14 100%), #160f1c',
    step(ps) {
      while (ps.length < 24) ps.push(springMote());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; if (p.y < -5) { p.y = H() + 5; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = p.warm ? '#ffd0b0' : '#ffc0d0';
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第六章の２・６：桜舞う門出（上野藝術大学へ／光を描く） ──
  function petal() {
    return { x: Math.random() * W(), y: -10, r: 3 + Math.random() * 3.5,
      vy: 0.5 + Math.random() * 1.1, vx: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.035,
      alpha: 0.45 + Math.random() * 0.35 };
  }
  registerEffect('c6-sakura', {
    bg: 'radial-gradient(ellipse at 50% 5%, rgba(120,185,240,.24) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 50%, #162e4a 0%, #0a1c2e 55%, #050f18 100%), #09192e',
    step(ps, { H }) {
      if (ps.length < 16 && Math.random() < 0.13) ps.push(petal());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.012 + p.r) * 0.35; p.angle += p.va; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.translate(p.x, p.y); c.rotate(p.angle); c.globalAlpha = p.alpha;
      c.fillStyle = '#f8b8cc'; c.beginPath(); c.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.283); c.fill();
      c.globalAlpha = p.alpha * 0.45; c.fillStyle = '#fff5f8';
      c.beginPath(); c.ellipse(0, 0, p.r * 0.45, p.r * 0.28, 0, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第六章の３：羽川家の夜、暖かな食卓（羽川家の夜と新アトリエ） ─
  function homeMote() {
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1.6 + Math.random() * 3, base: 0.2 + Math.random() * 0.36,
      phase: Math.random() * 6.28, freq: 0.008 + Math.random() * 0.014,
      vy: -(0.05 + Math.random() * 0.16), vx: (Math.random() - 0.5) * 0.12 };
  }
  registerEffect('c6-home', {
    bg: 'radial-gradient(ellipse at 50% 92%, rgba(255,185,110,.22) 0%, rgba(170,95,45,.08) 34%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 42%, #2a1d12 0%, #1a1109 62%, #0e0805 100%), #160e07',
    step(ps) {
      if (ps.length < 24 && Math.random() < 0.16) ps.push(homeMote());
      ps = ps.filter(p => p.y > -8); ps.forEach(p => { p.y += p.vy; p.x += p.vx; });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffd79c'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第六章の４：黄金色のイチョウ、夏秋の戦友（戦友たちの夏秋） ─
  const GOLD = ['#e8c24a', '#d8a838', '#f0d264', '#caa030', '#e0b840'];
  function ginkgo() {
    return { x: Math.random() * W(), y: -10, r: 3.5 + Math.random() * 4,
      vy: 0.5 + Math.random() * 1, vx: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.05,
      alpha: 0.4 + Math.random() * 0.35, col: GOLD[(Math.random() * GOLD.length) | 0] };
  }
  registerEffect('c6-autumn', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(235,190,90,.18) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #261d08 0%, #181205 60%, #0c0803 100%), #161005',
    step(ps, { H }) {
      if (ps.length < 16 && Math.random() < 0.12) ps.push(ginkgo());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.013 + p.r) * 0.4; p.angle += p.va; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.translate(p.x, p.y); c.rotate(p.angle); c.globalAlpha = p.alpha;
      c.fillStyle = p.col; c.beginPath(); c.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, 6.283); c.fill();
      c.globalAlpha = p.alpha * 0.4; c.fillStyle = '#fff0c0';
      c.beginPath(); c.ellipse(0, 0, p.r * 0.4, p.r * 0.22, 0, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第六章の５：冬の試練、降る雪（冬の試練、そして春へ） ────
  function flake() {
    return { x: Math.random() * W(), y: -10, r: 1 + Math.random() * 2.4,
      vy: 0.35 + Math.random() * 0.95, vx: (Math.random() - 0.5) * 0.3,
      sway: Math.random() * 6.28, alpha: 0.4 + Math.random() * 0.45 };
  }
  registerEffect('c6-snow', {
    bg: 'radial-gradient(ellipse at 50% 98%, rgba(255,150,80,.1) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 55%, #16202f 0%, #0e1624 60%, #070c16 100%), #0b1220',
    step(ps, { H }) {
      if (ps.length < 38 && Math.random() < 0.3) ps.push(flake());
      ps = ps.filter(p => p.y < H + 12);
      ps.forEach(p => { p.sway += 0.02; p.y += p.vy; p.x += p.vx + Math.sin(p.sway) * 0.4; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.globalAlpha = p.alpha; c.fillStyle = '#eaf2ff';
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

})();
