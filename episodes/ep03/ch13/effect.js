/* 終章の演出。 */
(function () {

  // ── 終章の１・２：秋の光。降りそそぐ金色の木漏れ日と、舞う落ち葉のような粒 ──
  function spawnLeaf() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: -10,
      r: 0.9 + Math.random() * 2.0,
      vy: 0.2 + Math.random() * 0.5, vx: (Math.random() - 0.5) * 0.4,
      swing: Math.random() * Math.PI * 2, sw: 0.01 + Math.random() * 0.02,
      base: 0.14 + Math.random() * 0.34, warm: Math.random() > 0.4,
    };
  }
  registerEffect('autumn-light', {
    bg: 'radial-gradient(ellipse at 50% 8%, rgba(236,196,110,.12) 0%, transparent 44%), '
      + 'radial-gradient(ellipse at 50% 60%, #1c1a12 0%, #14110b 60%, #0a0805 100%), #080604',
    step(ps, { H }) {
      if (ps.length < 50 && Math.random() < 0.4) ps.push(spawnLeaf());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.swing += p.sw; p.y += p.vy; p.x += p.vx + Math.sin(p.swing) * 0.5; });
      return ps;
    },
    draw(ctx, p, { t }) {
      ctx.save();
      ctx.globalAlpha = p.base * (0.6 + 0.4 * Math.sin(p.swing));
      ctx.fillStyle = p.warm ? '#e2b266' : '#c98a4a';
      ctx.shadowColor = p.warm ? '#e2b266' : '#c98a4a'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 終章の３：聖域の果実。夕日の金と、ひとつ灯る赤い果実、立ちのぼる緑の生命 ──
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    const kind = Math.random();
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.7,
      vx: (Math.random() - 0.5) * 0.12, vy: -(0.03 + Math.random() * 0.12),
      base: 0.14 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.014,
      col: kind > 0.55 ? '#ecc878' : (kind > 0.2 ? '#7fd8a8' : '#e4604e'),
    };
  }
  registerEffect('sanctum-fruit', {
    bg: 'radial-gradient(ellipse at 50% 86%, rgba(235,180,90,.18) 0%, rgba(150,100,40,.07) 34%, transparent 60%), '
      + 'radial-gradient(circle at 50% 50%, rgba(220,70,55,.12) 0%, transparent 15%), '
      + 'radial-gradient(ellipse at 50% 44%, #1c1a12 0%, #14110b 60%, #0a0805 100%), #080604',
    step(ps, { H }) {
      if (ps.length < 52 && Math.random() < 0.4) ps.push(spawnMote());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
