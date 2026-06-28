/* Source: episodes/ep04/ch05/effect.js */

/* 第五章の演出。 */
(function () {

  // ── 第五章：静寂と雨。まっすぐ落ちる銀の雨脚と、結晶の淡い青白い燐光 ──
  function spawnRain() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: -20 - Math.random() * H,
      len: 10 + Math.random() * 22,
      vy: 6 + Math.random() * 5, vx: -0.4 - Math.random() * 0.5,
      base: 0.1 + Math.random() * 0.22, rain: true,
    };
  }
  function spawnHalo() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 0.06, vy: -0.05 - Math.random() * 0.06,
      base: 0.15 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.018,
      rain: false,
    };
  }
  registerEffect('silent-rain', {
    bg: 'radial-gradient(ellipse at 50% 75%, rgba(110,180,220,.05) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 40%, #131820 0%, #0c0f15 60%, #06080c 100%), #04060a',
    step(ps, { H }) {
      if (ps.length < 90) {
        if (Math.random() < 0.85) ps.push(spawnRain());
        if (Math.random() < 0.25) ps.push(spawnHalo());
      }
      ps = ps.filter(p => p.rain ? p.y < H + 30 : p.y > -20);
      ps.forEach(p => {
        if (p.rain) { p.y += p.vy; p.x += p.vx; }
        else { p.x += p.drift; p.y += p.vy; p.phase += p.freq; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.rain) {
        ctx.globalAlpha = p.base;
        ctx.strokeStyle = '#aacbe0'; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 1.4, p.y + p.len); ctx.stroke();
      } else {
        const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#9fdcff';
        ctx.shadowColor = '#9fdcff'; ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep04/ch06/effect.js */

/* 第六章の演出。 */
(function () {

  // ── 第六章：雨上がり。静かに立ちのぼる、結晶の青白い灯のような光の粒 ──
  function spawnLantern() {
    const W = window.innerWidth, H = window.innerHeight;
    const warm = Math.random() > 0.7;
    return {
      x: Math.random() * W, y: H + 10,
      r: 0.7 + Math.random() * 1.9,
      drift: (Math.random() - 0.5) * 0.1, vy: -0.18 - Math.random() * 0.3,
      base: 0.16 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.007 + Math.random() * 0.018,
      warm,
    };
  }
  registerEffect('lantern-glow', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(150,210,240,.06) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 55%, #141a22 0%, #0e131a 60%, #070a0f 100%), #05080c',
    step(ps, {}) {
      if (ps.length < 52 && Math.random() < 0.5) ps.push(spawnLantern());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.x += p.drift + Math.sin(p.phase) * 0.12; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.warm ? '#cfe2c0' : '#a6dcf2';
      ctx.shadowColor = p.warm ? '#cfe2c0' : '#a6dcf2'; ctx.shadowBlur = 9;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep04/ch07/effect.js */

/* 第七章の演出。 */
(function () {

  // ── 第七章：灰の夜明け。斜めに差す淡い光条と、北へ流れていく青い光の種 ──
  function spawnSeed() {
    const W = window.innerWidth, H = window.innerHeight;
    const ray = Math.random() > 0.7;
    if (ray) {
      return {
        ray: true,
        x: Math.random() * W, y: -10,
        len: 60 + Math.random() * 120,
        vy: 0.3 + Math.random() * 0.5, vx: 0.12 + Math.random() * 0.2,
        base: 0.03 + Math.random() * 0.07,
      };
    }
    return {
      ray: false,
      x: -10, y: H * (0.2 + Math.random() * 0.6),
      r: 0.7 + Math.random() * 1.6,
      vx: 0.3 + Math.random() * 0.7, vy: -0.05 - Math.random() * 0.1,
      base: 0.18 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.018,
    };
  }
  registerEffect('ashen-dawn', {
    bg: 'linear-gradient(115deg, rgba(170,210,235,.05) 0%, transparent 40%), '
      + 'radial-gradient(ellipse at 70% 18%, rgba(150,200,235,.10) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 60%, #1a2029 0%, #11151c 60%, #0a0d12 100%), #080a0e',
    step(ps, { W, H }) {
      if (ps.length < 54 && Math.random() < 0.5) ps.push(spawnSeed());
      ps = ps.filter(p => p.ray ? p.y < H + 30 : p.x < W + 30);
      ps.forEach(p => {
        if (p.ray) { p.y += p.vy; p.x += p.vx; }
        else { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.1; p.phase += p.freq; }
      });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      if (p.ray) {
        ctx.globalAlpha = p.base;
        const g = ctx.createLinearGradient(p.x, p.y, p.x + p.vx * 30, p.y + p.len);
        g.addColorStop(0, 'rgba(190,220,245,0)');
        g.addColorStop(0.5, 'rgba(190,220,245,0.9)');
        g.addColorStop(1, 'rgba(190,220,245,0)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 30, p.y + p.len); ctx.stroke();
      } else {
        const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#a6dcf2';
        ctx.shadowColor = '#a6dcf2'; ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
