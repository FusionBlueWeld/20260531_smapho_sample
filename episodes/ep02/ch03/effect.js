/* Source: episodes/ep02/ch04/effect.js */

/* 第四章の演出。 */
(function () {

  // ── 第四章の１：渦の痕跡。中心へ巻き込まれる粒子の渦 ──────
  function spawnSpiral() {
    return {
      ang: Math.random() * Math.PI * 2,
      rad: 60 + Math.random() * 220,
      r: 0.6 + Math.random() * 1.4,
      base: 0.2 + Math.random() * 0.45,
      spin: 0.004 + Math.random() * 0.006,
      pull: 0.12 + Math.random() * 0.12,
    };
  }
  registerEffect('vortex-trace', {
    bg: 'radial-gradient(ellipse at 50% 46%, rgba(120,90,200,.14) 0%, transparent 42%), '
      + 'radial-gradient(ellipse at 50% 50%, #161028 0%, #0c0818 60%, #060410 100%), #05030c',
    step(ps, { W, H }) {
      if (ps.length < 80 && Math.random() < 0.5) ps.push(spawnSpiral());
      ps = ps.filter(p => p.rad > 4);
      ps.forEach(p => { p.ang += p.spin; p.rad -= p.pull; });
      return ps;
    },
    draw(ctx, p, { W, H }) {
      const cx = W / 2, cy = H * 0.46;
      const x = cx + Math.cos(p.ang) * p.rad;
      const y = cy + Math.sin(p.ang) * p.rad * 0.7;
      const fade = Math.min(p.rad / 60, 1);
      ctx.save();
      ctx.globalAlpha = p.base * fade;
      ctx.fillStyle = '#b89cff'; ctx.shadowColor = '#b89cff'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第四章の２：脅迫メール。明滅する不気味なグリフ ────────
  function spawnGlyph() {
    return {
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      size: 8 + Math.random() * 16,
      base: 0.06 + Math.random() * 0.14,
      phase: Math.random() * Math.PI * 2, freq: 0.02 + Math.random() * 0.05,
      rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.01,
      life: 0, maxLife: 160 + Math.random() * 160,
    };
  }
  registerEffect('mail-glyph', {
    bg: 'radial-gradient(ellipse at 50% 44%, #181024 0%, #0e0818 60%, #060410 100%), #05030c',
    step(ps) {
      if (ps.length < 18 && Math.random() < 0.08) ps.push(spawnGlyph());
      ps = ps.filter(p => p.life < p.maxLife);
      ps.forEach(p => { p.life++; p.rot += p.vr; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const fade = Math.min(p.life / 30, 1) * Math.min((p.maxLife - p.life) / 30, 1);
      const flick = (Math.sin(t * p.freq + p.phase) > -0.3) ? 1 : 0.25;
      ctx.save();
      ctx.globalAlpha = p.base * fade * flick;
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.strokeStyle = '#7a52c8'; ctx.lineWidth = 1;
      const s = p.size;
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.5, 0.4, Math.PI * 1.7);
      ctx.moveTo(0, -s * 0.5); ctx.lineTo(0, s * 0.5);
      ctx.moveTo(-s * 0.5, 0); ctx.lineTo(s * 0.5, 0);
      ctx.stroke();
      ctx.restore();
    },
  });

})();


/* Source: episodes/ep02/ch05/effect.js */

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
