/* Source: episodes/ep03/ch08/effect.js */

/* 第八章の演出。 */
(function () {

  // ── 第八章の１・２：境界を越えて。暖色と緑、二つの流れが中央で出会い溶け合う ──
  function spawnStream() {
    const W = window.innerWidth, H = window.innerHeight;
    const fromLeft = Math.random() < 0.5;
    return {
      x: fromLeft ? -10 : W + 10, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.7,
      vx: (fromLeft ? 1 : -1) * (0.3 + Math.random() * 0.7),
      vy: (Math.random() - 0.5) * 0.15,
      base: 0.16 + Math.random() * 0.36,
      phase: Math.random() * Math.PI * 2, freq: 0.008 + Math.random() * 0.016,
      warm: fromLeft,
    };
  }
  registerEffect('border-cross', {
    bg: 'linear-gradient(90deg, rgba(220,150,70,.07) 0%, transparent 42%, transparent 58%, rgba(60,180,130,.07) 100%), '
      + 'radial-gradient(ellipse at 50% 50%, #15201c 0%, #0e1714 60%, #070d0a 100%), #050a07',
    step(ps, { W }) {
      if (ps.length < 60 && Math.random() < 0.5) ps.push(spawnStream());
      ps = ps.filter(p => p.x > -30 && p.x < W + 30);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy + Math.sin(p.phase) * 0.2; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.warm ? '#e8b46e' : '#5fe6b0';
      ctx.shadowColor = p.warm ? '#e8b46e' : '#5fe6b0'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第八章の３：夜を編む。明滅する不安定な緑の光（気まぐれな副次効果）──
  function spawnFlicker() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      drift: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.08,
      base: 0.1 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2, freq: 0.05 + Math.random() * 0.12,
    };
  }
  registerEffect('night-weave', {
    bg: 'repeating-linear-gradient(0deg, transparent 0, transparent 32px, rgba(60,150,120,.04) 32px, rgba(60,150,120,.04) 33px), '
      + 'radial-gradient(ellipse at 50% 50%, #0c1a16 0%, #081310 62%, #040b08 100%), #030806',
    step(ps) {
      while (ps.length < 54) ps.push(spawnFlicker());
      ps.forEach(p => { p.x += p.drift; p.y += p.vy; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      // 不規則に明滅させ、点いては消える「気まぐれな」灯りを表現
      const flick = Math.sin(t * p.freq + p.phase);
      const a = p.base * Math.max(0, flick) * (0.4 + 0.6 * Math.random());
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#6fe6b4';
      ctx.shadowColor = '#6fe6b4'; ctx.shadowBlur = 9;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
