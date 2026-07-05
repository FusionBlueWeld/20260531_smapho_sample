/* Source: episodes/ep07/ch03/effect.js */

/* 第三章前半の演出。 */
(function () {

  // ── 飢えと寒さ：冷たい灰青(はいあお)の空から、まばらに落ちる粉雪と灰 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: -10 - Math.random() * 30,
      r: 0.5 + Math.random() * 1.7,
      vx: -0.08 + Math.random() * 0.16, vy: 0.18 + Math.random() * 0.4,
      base: 0.06 + Math.random() * 0.2,
      sway: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.01,
    };
  }
  registerEffect('cold-famine', {
    bg: 'radial-gradient(ellipse at 50% 12%, rgba(170,185,200,.06) 0%, transparent 58%), '
      + 'linear-gradient(180deg, #2b3138 0%, #1c2128 55%, #12161b 100%), #0c0f12',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.55) ps.push(spawn());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * p.sway; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#c4cdd6';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();

/* 第三章後半の演出。 */
(function () {

  // ── 鉛色の空、生贄の刻(とき)：枯れ木を裂く風に流れる、横なぐりの塵 ──
  function spawn() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: -20, y: Math.random() * H,
      r: 0.5 + Math.random() * 1.8,
      vx: 0.4 + Math.random() * 0.9, vy: -0.05 + Math.random() * 0.1,
      base: 0.05 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('grey-offering', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(150,150,158,.05) 0%, transparent 58%), '
      + 'linear-gradient(180deg, #34343a 0%, #232328 55%, #16161a 100%), #0f0f12',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.6) ps.push(spawn());
      ps = ps.filter(p => p.x < W + 20);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.08; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.4 + 0.6 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#aeaeb6';
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 1.8, p.r * 0.6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep07/ch04/effect.js */

/* Effects from ep07/ch07. */
/* 第七章の演出（3種）。 */
(function () {

  // ── 失われた文明・地の底の鼓動：青く明滅(めいめつ)し、土の下から昇る技術の光 ──
  function spawnCiv() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10 + Math.random() * 40,
      r: 0.5 + Math.random() * 1.6,
      vx: -0.05 + Math.random() * 0.1, vy: -0.1 - Math.random() * 0.3,
      base: 0.07 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2, freq: 0.01 + Math.random() * 0.03,
    };
  }
  registerEffect('lost-civilization', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(90,210,190,.14) 0%, transparent 55%), '
      + 'linear-gradient(180deg, #102a2a 0%, #08191a 55%, #040d0e 100%), #030808',
    step(ps, { W, H }) {
      if (ps.length < 52 && Math.random() < 0.55) ps.push(spawnCiv());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.1; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      // 鼓動するように、明滅を強めに
      const pulse = 0.3 + 0.7 * Math.pow(0.5 + 0.5 * Math.sin(t * p.freq + p.phase), 2);
      ctx.save();
      ctx.globalAlpha = p.base * pulse;
      ctx.fillStyle = '#7fe6cf';
      ctx.shadowColor = '#5fd8c0'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 灰に還る空：落下する暗い灰と火の粉 ──
  function spawnRuin() {
    const W = window.innerWidth, H = window.innerHeight;
    const ember = Math.random() < 0.18;
    return {
      x: Math.random() * W, y: -10 - Math.random() * 30,
      r: 0.5 + Math.random() * 1.8,
      vx: -0.1 + Math.random() * 0.2, vy: 0.2 + Math.random() * 0.5,
      base: 0.06 + Math.random() * 0.2,
      ember,
      phase: Math.random() * Math.PI * 2, freq: 0.005 + Math.random() * 0.012,
    };
  }
  registerEffect('ruin-dark', {
    bg: 'radial-gradient(ellipse at 50% 20%, rgba(180,90,50,.07) 0%, transparent 58%), '
      + 'linear-gradient(180deg, #2a211c 0%, #1a1310 55%, #100b09 100%), #080504',
    step(ps, { W, H }) {
      if (ps.length < 50 && Math.random() < 0.6) ps.push(spawnRuin());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.2; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.ember ? '#d87038' : '#6a605a';
      if (p.ember) { ctx.shadowColor = '#e08040'; ctx.shadowBlur = 5; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 蘇る谷：芽吹きと清流、ゆるやかに昇る緑の光 ──
  function spawnGreen() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: H + 10 + Math.random() * 30,
      r: 0.6 + Math.random() * 1.7,
      vx: -0.06 + Math.random() * 0.12, vy: -0.06 - Math.random() * 0.16,
      base: 0.07 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2, freq: 0.004 + Math.random() * 0.011,
    };
  }
  registerEffect('verdant-return', {
    bg: 'radial-gradient(ellipse at 50% 88%, rgba(120,200,120,.12) 0%, transparent 58%), '
      + 'linear-gradient(180deg, #1c3826 0%, #102218 55%, #0a160e 100%), #060d08',
    step(ps, { W, H }) {
      if (ps.length < 48 && Math.random() < 0.5) ps.push(spawnGreen());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.vx + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#aee098';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
