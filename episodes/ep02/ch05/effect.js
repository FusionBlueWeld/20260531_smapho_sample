/* 第五章の演出。 */
(function () {

  // ── 第五章の１：雨のテラス。激しい斜めの豪雨 ────────────
  function spawnHeavyRain() {
    const W = window.innerWidth;
    return {
      x: Math.random() * W * 1.3 - W * 0.15, y: -30,
      len: 22 + Math.random() * 30, vy: 13 + Math.random() * 8,
      alpha: 0.1 + Math.random() * 0.16,
    };
  }
  registerEffect('terrace-rain', {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(70,110,160,.10) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 55%, #11151f 0%, #090c14 62%, #04060c 100%), #04050a',
    step(ps, { H }) {
      if (ps.length < 130 && Math.random() < 0.95) ps.push(spawnHeavyRain());
      ps = ps.filter(p => p.y < H + 40);
      ps.forEach(p => { p.y += p.vy; p.x -= 3.2; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = '#aac0e0'; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 3.5, p.y + p.len); ctx.stroke();
      ctx.restore();
    },
  });

  // ── 第五章の２：制御の実証。形成される明るい量子ゲート ────
  function spawnGateParticle() {
    return {
      ang: Math.random() * Math.PI * 2,
      rad: 30 + Math.random() * 180,
      r: 0.7 + Math.random() * 1.6,
      base: 0.3 + Math.random() * 0.5,
      spin: 0.01 + Math.random() * 0.012,
      pull: 0.25 + Math.random() * 0.25,
    };
  }
  registerEffect('control-gate', {
    bg: 'radial-gradient(ellipse at 50% 46%, rgba(90,210,255,.20) 0%, rgba(40,120,200,.08) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 50%, #0a1c2e 0%, #06121f 60%, #030a14 100%), #040a12',
    step(ps) {
      if (ps.length < 110 && Math.random() < 0.7) ps.push(spawnGateParticle());
      ps = ps.filter(p => p.rad > 3);
      ps.forEach(p => { p.ang += p.spin; p.rad -= p.pull; });
      return ps;
    },
    draw(ctx, p, { W, H }) {
      const cx = W / 2, cy = H * 0.46;
      const x = cx + Math.cos(p.ang) * p.rad;
      const y = cy + Math.sin(p.ang) * p.rad * 0.72;
      const fade = Math.min(p.rad / 30, 1);
      ctx.save();
      ctx.globalAlpha = p.base * fade;
      ctx.fillStyle = '#8fe6ff'; ctx.shadowColor = '#8fe6ff'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第五章の３：屋上の祈り。雨と、立ち上り散る砂 ──────────
  function spawnRDrop() {
    const W = window.innerWidth;
    return { kind: 'rain', x: Math.random() * W * 1.2 - W * 0.1, y: -20,
      len: 20 + Math.random() * 26, vy: 12 + Math.random() * 7, alpha: 0.08 + Math.random() * 0.12 };
  }
  function spawnSand() {
    const W = window.innerWidth, H = window.innerHeight;
    return { kind: 'sand', x: W * (0.3 + Math.random() * 0.4), y: H * (0.4 + Math.random() * 0.35),
      r: 0.6 + Math.random() * 1.4, vy: -(0.4 + Math.random() * 0.8), vx: (Math.random() - 0.5) * 0.5,
      swirl: Math.random() * Math.PI * 2, sw: 0.02 + Math.random() * 0.03,
      base: 0.3 + Math.random() * 0.45, life: 0, maxLife: 150 + Math.random() * 120 };
  }
  registerEffect('rooftop-dissolve', {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(150,120,200,.10) 0%, transparent 46%), '
      + 'radial-gradient(ellipse at 50% 56%, #100c1c 0%, #080612 62%, #040208 100%), #040308',
    step(ps, { H }) {
      if (ps.length < 150) {
        if (Math.random() < 0.9) ps.push(spawnRDrop());
        if (Math.random() < 0.35) ps.push(spawnSand());
      }
      ps = ps.filter(p => (p.kind === 'rain') ? p.y < H + 30 : (p.life < p.maxLife && p.y > -20));
      ps.forEach(p => {
        if (p.kind === 'rain') { p.y += p.vy; p.x -= 2.6; }
        else { p.life++; p.swirl += p.sw; p.y += p.vy; p.x += p.vx + Math.sin(p.swirl) * 0.7; p.vy -= 0.003; }
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      if (p.kind === 'rain') {
        ctx.globalAlpha = p.alpha; ctx.strokeStyle = '#9fb0d0'; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 2.8, p.y + p.len); ctx.stroke();
      } else {
        const fade = Math.min(p.life / 30, 1) * Math.min((p.maxLife - p.life) / 50, 1);
        ctx.globalAlpha = p.base * fade; ctx.fillStyle = '#cbb8e8';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  });

})();
