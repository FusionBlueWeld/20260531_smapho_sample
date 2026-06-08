/* 第二章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する：
 *   bg   … body に適用する background ショートハンド文字列
 *   step … (particles, {W,H,t}) を受けて粒子配列を更新して返す
 *   draw … (ctx, particle, {W,H,t}) で粒子1つを描画する
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {
  const W = () => window.innerWidth, H = () => window.innerHeight;

  // ── 第二章の１：図書室の暖かな光（掌のぬくもり） ──────────
  function libMote() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 1.5 + Math.random() * 3, base: 0.18 + Math.random() * 0.34,
      phase: Math.random() * 6.28, freq: 0.006 + Math.random() * 0.014,
      vy: -(0.04 + Math.random() * 0.14), vx: (Math.random() - 0.5) * 0.1 };
  }
  registerEffect('c2-library', {
    bg: 'radial-gradient(ellipse at 72% 22%, rgba(255,205,110,.16) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 55%, #2c1d0c 0%, #1a1006 62%, #0e0904 100%), #160d05',
    step(ps) {
      while (ps.length < 26) ps.push(libMote());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; if (p.y < -5) { p.y = H() + 5; p.x = Math.random() * W(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffd98a'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第二章の２・８：夜に灯る暖かな光（細い繋がり／灯火） ────
  function glowMote() {
    return { x: Math.random() * W(), y: H() + Math.random() * 40,
      r: 2 + Math.random() * 4, base: 0.22 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.01 + Math.random() * 0.02,
      vy: -(0.12 + Math.random() * 0.32), vx: (Math.random() - 0.5) * 0.18,
      warm: Math.random() > 0.5 };
  }
  registerEffect('c2-glow', {
    bg: 'radial-gradient(ellipse at 50% 96%, rgba(255,170,90,.22) 0%, rgba(150,80,30,.08) 32%, transparent 60%), '
      + 'radial-gradient(ellipse at 50% 40%, #15182e 0%, #0c0c1c 62%, #050510 100%), #07071a',
    step(ps) {
      if (ps.length < 30 && Math.random() < 0.2) ps.push(glowMote());
      ps = ps.filter(p => p.y > -10);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; });
      return ps;
    },
    draw(c, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      c.save(); c.globalAlpha = a; c.fillStyle = p.warm ? '#ffca7a' : '#ffb0c8';
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.5; c.fillStyle = '#fff4e6';
      c.beginPath(); c.arc(p.x, p.y, p.r * 0.4, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第二章の３：勉強机、薄れる鉛筆の線（変わりたい） ────────
  function stroke() {
    return { x: Math.random() * W(), y: 40 + Math.random() * (H() - 80),
      len: 25 + Math.random() * 70, angle: (Math.random() - 0.5) * 0.09,
      maxAlpha: 0.07 + Math.random() * 0.1, life: 0, maxLife: 160 + Math.random() * 140 };
  }
  registerEffect('c2-study', {
    bg: 'repeating-linear-gradient(0deg, transparent 0, transparent 27px, '
      + 'rgba(190,200,245,.046) 27px, rgba(190,200,245,.046) 28px), '
      + 'radial-gradient(ellipse at 50% 50%, #191c2a 0%, #0d1018 65%, #080910 100%), #101420',
    step(ps) {
      if (ps.length < 9 && Math.random() < 0.045) ps.push(stroke());
      ps = ps.filter(p => p.life < p.maxLife); ps.forEach(p => p.life++);
      return ps;
    },
    draw(c, p) {
      const fi = Math.min(p.life / 25, 1), fo = Math.min((p.maxLife - p.life) / 55, 1);
      c.save(); c.globalAlpha = p.maxAlpha * fi * fo; c.strokeStyle = '#9090a0';
      c.lineWidth = 0.7 + Math.random() * 0.5; c.lineCap = 'round';
      c.translate(p.x, p.y); c.rotate(p.angle);
      c.beginPath(); c.moveTo(-p.len / 2, 0); c.lineTo(p.len / 2, 0); c.stroke(); c.restore();
    },
  });

  // ── 第二章の４：初夏の新緑（眼鏡を外した日） ───────────────
  function leaf() {
    return { x: Math.random() * W(), y: -10, r: 3 + Math.random() * 3.5,
      vy: 0.4 + Math.random() * 0.9, vx: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.04,
      alpha: 0.4 + Math.random() * 0.35, hue: Math.random() > 0.5 ? '#9ed46a' : '#bce28a' };
  }
  registerEffect('c2-fresh', {
    bg: 'radial-gradient(ellipse at 50% 6%, rgba(160,225,130,.2) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #143020 0%, #0c1f15 60%, #06120c 100%), #0a1c12',
    step(ps, { H }) {
      if (ps.length < 14 && Math.random() < 0.11) ps.push(leaf());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.012 + p.r) * 0.35; p.angle += p.va; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.translate(p.x, p.y); c.rotate(p.angle); c.globalAlpha = p.alpha;
      c.fillStyle = p.hue; c.beginPath(); c.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, 6.283); c.fill();
      c.globalAlpha = p.alpha * 0.4; c.fillStyle = '#eafbd8';
      c.beginPath(); c.ellipse(0, 0, p.r * 0.4, p.r * 0.22, 0, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第二章の５：体育祭、色づく世界（色づきゆく世界） ────────
  const VIVID = ['#ff8fae', '#7fd1ff', '#ffd866', '#9ee37d', '#ffa45c', '#c89bff'];
  function confetti() {
    return { x: Math.random() * W(), y: -10, w: 4 + Math.random() * 4, h: 2 + Math.random() * 3,
      vy: 0.6 + Math.random() * 1.1, vx: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.12,
      alpha: 0.4 + Math.random() * 0.4, col: VIVID[(Math.random() * VIVID.length) | 0] };
  }
  registerEffect('c2-vivid', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(120,190,255,.18) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 55%, #1b2238 0%, #11152480 60%, #0a0d18 100%), #0c1020',
    step(ps, { H }) {
      if (ps.length < 18 && Math.random() < 0.14) ps.push(confetti());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.02) * 0.4; p.angle += p.va; });
      return ps;
    },
    draw(c, p) {
      c.save(); c.translate(p.x, p.y); c.rotate(p.angle); c.globalAlpha = p.alpha;
      c.fillStyle = p.col; c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); c.restore();
    },
  });

  // ── 第二章の６：ざわめく影、沈む心（ざわめく影） ───────────
  function haze() {
    return { x: Math.random() * W(), y: -40, r: 40 + Math.random() * 80,
      vy: 0.15 + Math.random() * 0.3, vx: (Math.random() - 0.5) * 0.12,
      alpha: 0.03 + Math.random() * 0.05, life: 0, maxLife: 700 + Math.random() * 400 };
  }
  registerEffect('c2-shadow', {
    bg: 'radial-gradient(ellipse at 50% 50%, #1c2230 0%, #11151e 60%, #080a10 100%), #0a0d14',
    step(ps) {
      if (ps.length < 10 && Math.random() < 0.03) ps.push(haze());
      ps = ps.filter(p => p.life < p.maxLife); ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.life++; });
      return ps;
    },
    draw(c, p) {
      const fade = Math.min(p.life / 120, 1) * Math.min((p.maxLife - p.life) / 120, 1);
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, 'rgba(20,24,34,' + p.alpha * fade + ')'); g.addColorStop(1, 'transparent');
      c.save(); c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第二章の７：体育館、スポットライトの熱気（試合の日） ────
  function dust() {
    return { x: Math.random() * W(), y: Math.random() * H(),
      r: 0.6 + Math.random() * 1.8, base: 0.25 + Math.random() * 0.4,
      phase: Math.random() * 6.28, freq: 0.01 + Math.random() * 0.02,
      vy: (Math.random() - 0.5) * 0.25, vx: (Math.random() - 0.5) * 0.25 };
  }
  registerEffect('c2-arena', {
    bg: 'radial-gradient(ellipse at 50% 0%, rgba(150,200,255,.2) 0%, transparent 42%), '
      + 'radial-gradient(ellipse at 50% 60%, #16223a 0%, #0c1424 62%, #060b16 100%), #0a1322',
    step(ps) {
      while (ps.length < 34) ps.push(dust());
      ps.forEach(p => { p.y += p.vy; p.x += p.vx;
        if (p.x < 0 || p.x > W() || p.y < 0 || p.y > H()) { p.x = Math.random() * W(); p.y = Math.random() * H(); } });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#cfe2ff'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

  // ── 第二章の９：夜明け、前を向く（前へ） ───────────────────
  function dawnMote() {
    return { x: Math.random() * W(), y: H() + Math.random() * 30,
      r: 1.4 + Math.random() * 2.6, base: 0.2 + Math.random() * 0.34,
      phase: Math.random() * 6.28, freq: 0.008 + Math.random() * 0.014,
      vy: -(0.08 + Math.random() * 0.2), vx: (Math.random() - 0.5) * 0.12 };
  }
  registerEffect('c2-dawn', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,190,130,.26) 0%, rgba(220,140,90,.1) 34%, transparent 62%), '
      + 'radial-gradient(ellipse at 50% 30%, #1b2440 0%, #131a30 58%, #0c1124 100%), #0e1530',
    step(ps) {
      if (ps.length < 26 && Math.random() < 0.16) ps.push(dawnMote());
      ps = ps.filter(p => p.y > -8); ps.forEach(p => { p.y += p.vy; p.x += p.vx; });
      return ps;
    },
    draw(c, p, { t }) {
      c.save(); c.globalAlpha = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      c.fillStyle = '#ffdca6'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); c.restore();
    },
  });

})();
