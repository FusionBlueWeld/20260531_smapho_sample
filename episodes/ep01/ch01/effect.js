/* Source: episodes/ep01/ch01/effect.js */

/* 第一章の演出。各セクションが effect 名で参照する。
 * registerEffect(name, { bg, step, draw }) でエンジンに登録する：
 *   bg   … body に適用する background ショートハンド文字列（null で無背景）
 *   step … (particles, {W,H,t}) を受けて粒子配列を更新し、新しい配列を返す
 *   draw … (ctx, particle, {W,H,t}) で粒子1つを描画する
 * 描画のクリップ／rAFループ／canvas管理は index.html 側の汎用エンジンが担当。 */
(function () {

  // ── 第一章の１：春の青空＋桜の花びら ──────────────────
  function spawnPetal() {
    return {
      x: Math.random() * window.innerWidth, y: -10,
      r: 3 + Math.random() * 3.5,
      vy: 0.5 + Math.random() * 1.1, vx: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * Math.PI * 2, va: (Math.random() - 0.5) * 0.035,
      alpha: 0.45 + Math.random() * 0.35,
    };
  }
  registerEffect('spring-sakura', {
    bg: 'radial-gradient(ellipse at 50% 5%, rgba(120,185,240,.24) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 50%, #162e4a 0%, #0a1c2e 55%, #050f18 100%), #09192e',
    step(ps, { H }) {
      if (ps.length < 14 && Math.random() < 0.12) ps.push(spawnPetal());
      ps = ps.filter(p => p.y < H + 20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.012 + p.r) * 0.35; p.angle += p.va; });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.globalAlpha = p.alpha; ctx.fillStyle = '#f8b8cc';
      ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = p.alpha * 0.45; ctx.fillStyle = '#fff5f8';
      ctx.beginPath(); ctx.ellipse(0, 0, p.r * 0.45, p.r * 0.28, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 第一章の２：図書室の窓から差す光 ───────────────────
  function spawnRay() {
    const W = window.innerWidth;
    return {
      x: W * (0.2 + Math.random() * 0.6), y: 0,
      width: 18 + Math.random() * 28,
      baseAlpha: 0.028 + Math.random() * 0.04,
      angle: Math.PI * 0.22 + (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0015 + Math.random() * 0.0025,
      life: 0, maxLife: 500 + Math.random() * 400,
    };
  }
  registerEffect('library-rays', {
    bg: 'repeating-linear-gradient(0deg, transparent 0, transparent 59px, '
      + 'rgba(210,150,70,.04) 59px, rgba(210,150,70,.04) 60px), '
      + 'radial-gradient(ellipse at 74% 22%, rgba(255,200,90,.16) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 55%, #321c0a 0%, #200e06 62%, #110804 100%), #180e04',
    step(ps) {
      if (ps.length < 5 && Math.random() < 0.007) ps.push(spawnRay());
      ps = ps.filter(p => p.life < p.maxLife);
      ps.forEach(p => p.life++);
      return ps;
    },
    draw(ctx, p, { t }) {
      const fade = Math.min(p.life / 120, 1) * Math.min((p.maxLife - p.life) / 120, 1);
      const shimmer = 0.65 + 0.35 * Math.sin(t * p.speed + p.phase);
      ctx.save();
      ctx.globalAlpha = p.baseAlpha * fade * shimmer;
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      const H = window.innerHeight * 1.6;
      const g = ctx.createLinearGradient(-p.width / 2, 0, p.width / 2, 0);
      g.addColorStop(0, 'transparent'); g.addColorStop(0.5, '#ffc870'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(-p.width / 2, 0, p.width, H);
      ctx.restore();
    },
  });

  // ── 第一章の３：ノート／勉強、薄れる鉛筆の線 ────────────
  function spawnStroke() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: 40 + Math.random() * (H - 80),
      len: 25 + Math.random() * 70,
      angle: (Math.random() - 0.5) * 0.09,
      maxAlpha: 0.07 + Math.random() * 0.1,
      life: 0, maxLife: 160 + Math.random() * 140,
    };
  }
  registerEffect('notebook-strokes', {
    bg: 'repeating-linear-gradient(0deg, transparent 0, transparent 27px, '
      + 'rgba(190,200,245,.046) 27px, rgba(190,200,245,.046) 28px), '
      + 'radial-gradient(ellipse at 50% 50%, #191c2a 0%, #0d1018 65%, #080910 100%), #101420',
    step(ps) {
      if (ps.length < 9 && Math.random() < 0.045) ps.push(spawnStroke());
      ps = ps.filter(p => p.life < p.maxLife);
      ps.forEach(p => p.life++);
      return ps;
    },
    draw(ctx, p) {
      const fadeIn = Math.min(p.life / 25, 1);
      const fadeOut = Math.min((p.maxLife - p.life) / 55, 1);
      ctx.save();
      ctx.globalAlpha = p.maxAlpha * fadeIn * fadeOut;
      ctx.strokeStyle = '#9090a0';
      ctx.lineWidth = 0.7 + Math.random() * 0.5;
      ctx.lineCap = 'round';
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.beginPath(); ctx.moveTo(-p.len / 2, 0); ctx.lineTo(p.len / 2, 0);
      ctx.stroke();
      ctx.restore();
    },
  });

  // ── 第一章の４：夜空、瞬く星 ───────────────────────────
  function spawnStar() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.4 + Math.random() * 1.3,
      base: 0.35 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      freq: 0.007 + Math.random() * 0.018,
      warm: Math.random() > 0.78,
    };
  }
  registerEffect('night-stars', {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(120,60,15,.65) 0%, rgba(75,28,6,.2) 30%, transparent 58%), '
      + 'radial-gradient(ellipse at 50% 50%, #0b081e 0%, #060416 60%, #030210 100%), #04030e',
    step(ps) {
      while (ps.length < 55) ps.push(spawnStar());
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.45 + 0.55 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.warm ? '#ffd8a0' : '#e8eeff';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
