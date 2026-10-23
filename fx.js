/* Hiệu ứng trang trí: nền động, sao, hoa anh đào, sprite pixel, pháo giấy, thông báo nhỏ */
const FX = (() => {
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);
  let on = true;

  const INVADER = ['00100000100', '00010001000', '00111111100', '01101110110', '11111111111', '10111111101', '10100000101', '00011011000'];
  const sprite = () => {
    let r = '';
    INVADER.forEach((row, y) => [...row].forEach((c, x) => { if (c === '1') r += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`; }));
    return `<svg viewBox="0 0 11 8" shape-rendering="crispEdges" fill="currentColor">${r}<rect x="3" y="3" width="1" height="1" fill="#ffd1ec"/><rect x="7" y="3" width="1" height="1" fill="#ffd1ec"/></svg>`;
  };

  const SPRITES = [
    { c: '#ffc837', l: 6, b: 9, s: 46 }, { c: '#a78bfa', l: 30, b: 3, s: 40 },
    { c: '#ff6fb5', l: 62, b: 7, s: 44 }, { c: '#4f9dff', l: 90, b: 2, s: 42 },
    { c: '#34d399', l: 47, b: 19, s: 34, sm: 1 }, { c: '#ff9a5a', l: 78, b: 24, s: 32, sm: 1 }
  ];

  function init() {
    const deco = document.createElement('div');
    deco.className = 'deco';
    deco.setAttribute('aria-hidden', 'true');
    let html = '<div class="aurora a1"></div><div class="aurora a2"></div><div class="aurora a3"></div><div class="stars"></div>';
    for (let i = 0; i < 14; i++) {
      html += `<i class="petal" style="--x:${rnd(0, 100).toFixed(1)}%;--s:${rnd(8, 17).toFixed(1)}px;--t:${rnd(14, 28).toFixed(1)}s;--d:${(-rnd(0, 28)).toFixed(1)}s"></i>`;
    }
    deco.innerHTML = html;
    /* sprite nằm trên nội dung (như bản mẫu) nhưng không bắt chuột */
    const front = document.createElement('div');
    front.className = 'deco-front';
    front.setAttribute('aria-hidden', 'true');
    front.innerHTML = SPRITES.map(p =>
      `<div class="inv ${p.sm ? 'sm-hide' : ''}" style="left:${p.l}%;bottom:${p.b}%;--c:${p.c};--sz:${p.s}px;--t:${rnd(6, 10).toFixed(1)}s;--d:${(-rnd(0, 6)).toFixed(1)}s">${sprite()}</div>`).join('');
    document.body.prepend(deco, front);
  }

  function setOn(v) {
    on = !!v;
    document.body.classList.toggle('fx-off', !on);
  }

  function confetti() {
    if (!on || reduced) return;
    const cv = document.createElement('canvas');
    cv.className = 'confetti';
    cv.width = innerWidth; cv.height = innerHeight;
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d');
    const cols = ['#8b7bff', '#5ea0ff', '#ff6fb5', '#ffc837', '#34d399'];
    const ps = Array.from({ length: 130 }, () => ({
      x: rnd(0, cv.width), y: rnd(-cv.height * .6, -10), vx: rnd(-1.6, 1.6), vy: rnd(2, 5.5),
      s: rnd(6, 12), r: rnd(0, 6), vr: rnd(-.25, .25), c: cols[Math.floor(rnd(0, cols.length))]
    }));
    let f = 0;
    (function step() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6);
        ctx.restore();
      });
      if (++f < 200) requestAnimationFrame(step); else cv.remove();
    })();
  }

  function toast(text) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  return { init, setOn, confetti, toast };
})();
