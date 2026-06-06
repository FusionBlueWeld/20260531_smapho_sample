/* 終章の演出。 */
(function () {

  // ── 終章：シミュレーション。落下する端末文字（コードの雨）と冷却光 ──
  const GLYPHS = '01<>{}[]#/\\;=+*アサ消失神QPU';
  function spawnCol() {
    const W = window.innerWidth;
    return {
      x: Math.floor(Math.random() * (W / 14)) * 14 + 4,
      y: -Math.random() * window.innerHeight,
      speed: 1.2 + Math.random() * 2.6,
      len: 5 + Math.floor(Math.random() * 12),
      base: 0.12 + Math.random() * 0.22,
      ch: Array.from({ length: 18 }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]),
    };
  }
  registerEffect('sim-terminal', {
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(40,180,140,.08) 0%, transparent 50%), '
      + 'radial-gradient(ellipse at 50% 42%, #061410 0%, #030c0a 62%, #010605 100%), #010403',
    step(ps, { H }) {
      if (ps.length < 46 && Math.random() < 0.5) ps.push(spawnCol());
      ps = ps.filter(p => p.y - p.len * 16 < H + 20);
      ps.forEach(p => {
        p.y += p.speed;
        if (Math.random() < 0.06) p.ch[(Math.random() * p.ch.length) | 0] = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      });
      return ps;
    },
    draw(ctx, p) {
      ctx.save();
      ctx.font = '13px monospace'; ctx.textBaseline = 'top';
      for (let i = 0; i < p.len; i++) {
        const yy = p.y - i * 16;
        if (yy < -16 || yy > window.innerHeight + 16) continue;
        const head = i === 0;
        ctx.globalAlpha = p.base * (1 - i / p.len) * (head ? 2.2 : 1);
        ctx.fillStyle = head ? '#9fffd8' : '#3fbf90';
        ctx.fillText(p.ch[i % p.ch.length], p.x, yy);
      }
      ctx.restore();
    },
  });

})();
