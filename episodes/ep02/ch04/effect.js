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
