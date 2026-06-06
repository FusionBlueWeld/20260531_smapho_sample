/* 第三章の演出 — 暗がりの彼方に、ただ一つ、にじむ太陽のような遠い光。
 * 太陽そのものは背景グラデーションに焼き込み、漂う塵がほのかな揺らぎを添える。 */
(function () {

  function spawnFleck() {
    const W = window.innerWidth, H = window.innerHeight;
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 0.4 + Math.random() * 1,
      base: 0.06 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      freq: 0.006 + Math.random() * 0.012,
    };
  }
  registerEffect('distant-sun', {
    bg: 'radial-gradient(circle at 78% 22%, rgba(255,210,120,.16) 0%, rgba(200,150,70,.05) 12%, transparent 30%), '
      + 'radial-gradient(ellipse at 50% 55%, #121318 0%, #0a0b0f 64%, #060709 100%), #090a0d',
    step(ps) {
      while (ps.length < 26) ps.push(spawnFleck());
      return ps;
    },
    draw(ctx, p, { t }) {
      const a = p.base * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#cfd6dc';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },
  });

})();
