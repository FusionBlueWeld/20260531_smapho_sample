/* 終章の演出。 */
(function () {

  // ── 終章の１〜３：逆襲と再生の夜明け。昇る暖色の光と、立ちのぼる緑の粒 ──
  function spawnRise() {
    const W = window.innerWidth, H = window.innerHeight;
    const warm = Math.random() > 0.45;
    return {
      x: Math.random() * W, y: H * (0.5 + Math.random() * 0.55),
      r: 0.7 + Math.random() * 1.8,
      vy: -(0.2 + Math.random() * 0.6), vx: (Math.random() - 0.5) * 0.2,
      swirl: Math.random() * Math.PI * 2, sw: 0.008 + Math.random() * 0.016,
      base: 0.18 + Math.random() * 0.4, warm, life: 0, maxLife: 220 + Math.random() * 200,
    };
  }
  registerEffect('reversal-dawn', {
    bg: 'radial-gradient(ellipse at 50% 96%, rgba(230,170,80,.20) 0%, rgba(120,80,30,.08) 30%, transparent 56%), '
      + 'radial-gradient(ellipse at 50% 30%, rgba(60,180,130,.07) 0%, transparent 48%), '
      + 'radial-gradient(ellipse at 50% 50%, #16221c 0%, #0e1814 60%, #070d0a 100%), #050a07',
    step(ps, { H }) {
      if (ps.length < 62 && Math.random() < 0.5) ps.push(spawnRise());
      ps = ps.filter(p => p.life < p.maxLife && p.y > -20);
      ps.forEach(p => {
        p.life++; p.swirl += p.sw;
        p.y += p.vy; p.x += p.vx + Math.sin(p.swirl) * 0.5;
      });
      return ps;
    },
    draw(ctx, p) {
      const fade = Math.min(p.life / 50, 1) * Math.min((p.maxLife - p.life) / 70, 1);
      ctx.save();
      ctx.globalAlpha = p.base * fade;
      ctx.fillStyle = p.warm ? '#f0c074' : '#5fe6b0';
      ctx.shadowColor = p.warm ? '#f0c074' : '#5fe6b0'; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

  // ── 終章の４：聖域の果実。やわらかな夕日の金と、ひとつ灯る緑の生命 ──
  function spawnMote() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.7 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.12, vy: -(0.03 + Math.random() * 0.12),
      base: 0.14 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2, freq: 0.006 + Math.random() * 0.014,
      gold: Math.random() > 0.4,
    };
  }
  registerEffect('green-fruit', {
    bg: 'radial-gradient(ellipse at 50% 86%, rgba(235,180,90,.18) 0%, rgba(150,100,40,.07) 34%, transparent 60%), '
      + 'radial-gradient(circle at 50% 52%, rgba(220,70,60,.10) 0%, transparent 16%), '
      + 'radial-gradient(ellipse at 50% 44%, #1c1a12 0%, #14110b 60%, #0a0805 100%), #080604',
    step(ps, { H }) {
      if (ps.length < 50 && Math.random() < 0.38) ps.push(spawnMote());
      ps = ps.filter(p => p.y > -20);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.phase += p.freq; });
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.gold ? '#ecc878' : '#7fd8a8';
      ctx.shadowColor = p.gold ? '#ecc878' : '#7fd8a8'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
